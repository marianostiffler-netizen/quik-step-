# Investigación e-commerce — pagos y legal (2026-10-28)

Base para la Parte B (`docs/plan-ecommerce.md`). La hicieron agentes de investigación de
solo lectura y está parafraseada. **[V]** = dicho por una fuente oficial; **[I]** =
inferencia a validar. Consultado el 2026-10-28; la documentación cambia, así que hay que
revisarla de nuevo antes de implementar.

---

## Parte 1 — Pagos (Mercado Pago Argentina)

El agente **no usó** la skill deep-research: investigó directo, en unas 16 páginas. La
documentación oficial se leyó a través de resúmenes de modelo, no en el texto literal.

### Recomendación
1. **Checkout Pro con la Orders API (`POST /v1/orders`).** La referencia oficial marca Orders como la opción recomendada y a Preferences como *legacy*: sigue soportada, pero las funciones nuevas solo salen para Orders [V]. No se encontró fecha de baja de Preferences.
2. **El webhook es la única fuente de verdad.** El flujo es validar la firma → responder 200 → consultar `GET /v1/orders/{id}` → recién ahí marcar el pedido como pagado. Las URLs de retorno sirven solo para la experiencia del cliente.
3. **La transferencia y el pago al retirar no pasan por Mercado Pago.** Son medios de pago del pedido propio, con estados, vencimiento y confirmación manual.
4. Usar el SDK oficial `mercadopago` v2 (Node ≥ 18; la v1 está deprecada) **solo del lado del servidor**: Route Handlers o Server Actions [V].
5. **Comisiones y plazos de acreditación: no hay cifra oficial accesible.** La página de costos devolvió 403 o pidió iniciar sesión. Las cifras de terceros que aparecieron no sirven para cotizar. El dueño tiene que leerlas en el panel de su cuenta.

### Crear la orden [V]
- `X-Idempotency-Key` es **obligatorio**: entre 1 y 128 caracteres, y un UUID sirve. Si falta, la respuesta es 400.
- Campos obligatorios: `type: "online"`, `processing_mode: "manual"` y `total_amount`. Si se mandan `items`, la suma de `unit_price × quantity` tiene que dar exactamente `total_amount`.
- Campos opcionales útiles: `external_reference` (el id del pedido) y `expiration_time` (ISO 8601). Si no se manda vencimiento, la orden en estado `created` dura 24 h en producción y 1 h en prueba.
- Las URLs de retorno van en `config.online` (`success_url`, `failure_url`, `pending_url`, `auto_return`). En Preferences se llamaban `back_urls`.
- Cuotas: `config.payment_method.max_installments` (de 1 a 36), cuotas sin interés y quién paga su costo.
- Cancelar (`POST /v1/orders/{id}/cancel`) solo funciona en los estados `created` y `action_required`. Reembolsar (total o parcial) solo en `processed`.
- [I] Conviene una clave de idempotencia determinística, por ejemplo `pedido-<id>-intento-<n>`. El `total_amount` se calcula siempre en el servidor.

### Webhooks [V salvo lo indicado]
- Usan el topic `order` y se configuran **por separado** para prueba y para producción.
- La firma llega en el header `x-signature` (`ts=…,v1=…`) y se valida con la "firma secreta" de la aplicación. La documentación recomienda el validador del SDK, con los parámetros `x-signature`, `x-request-id`, `data.id` (de la query) y el secreto.
- Manifest para validarlo a mano: `id:[data.id];request-id:[x-request-id];ts:[ts];` con HMAC-SHA256 en hex. Este dato salió de páginas de Checkout Pro clásico y Wallet Connect, no de la de Orders. **Hay que verificarlo en vivo**, incluido si `data.id` va en minúsculas.
- Hay que responder **200 o 201 en menos de 22 s**. Si no, Mercado Pago reintenta: aparecen intervalos de 15 min, 30 min, 6 h, 48 h y 96 h.
- La documentación no publica IPs de origen.
- No existe una clave de idempotencia de *entrega*. [I] Hay que deduplicar del lado propio:
  - una tabla `webhook_events` con unique sobre `x-request-id`;
  - transiciones de estado condicionales (`UPDATE … WHERE estado = …`);
  - consultar siempre el estado actual de la orden, porque las notificaciones pueden llegar repetidas o desordenadas.
- [I] En Vercel:
  - un Route Handler con `runtime = 'nodejs'`;
  - el trabajo corto se hace en línea; los mails, con `after()` o una cola;
  - un cron de conciliación que consulte las órdenes pendientes por `external_reference`.

### URLs de retorno
- [V] Llegan por GET con `status`, `external_reference`, `payment_id` y otros parámetros. En pagos en efectivo (Rapipago, Pago Fácil) el cliente vuelve por `pending_url`.
- [V] No se pueden usar `localhost` ni `127.0.0.1` en esas URLs.
- [I] **Nunca marcar un pedido como pagado por el query string.** Esos parámetros los puede manipular el cliente, y además puede cerrar la pestaña antes de volver. La página de retorno muestra el estado que tiene la base de datos y, como mucho, refresca consultando la API desde el servidor.

### Pruebas [V]
- Se usan las credenciales de **prueba** de la aplicación. Se pueden crear hasta 15 cuentas de prueba, todas del mismo país.
- Tarjetas de prueba para Argentina:
  - Mastercard 5031 7557 3453 0604;
  - Visa 4509 9535 6623 3704;
  - CVV 123, vencimiento 11/30, DNI 12345678.
- El resultado se fuerza con el nombre del titular: `APRO` (aprobado), `CONT` (pendiente), `OTHE` (rechazado), `FUND` (fondos insuficientes).
- [I] Variables de entorno separadas por entorno de Vercel: Preview con credenciales de prueba y Production con las reales. Nunca con prefijo `NEXT_PUBLIC_`. Los webhooks necesitan una URL pública, sea Preview o túnel.

### Flujo de un pedido de punta a punta
Estados propios del pedido:
- Camino principal: `pendiente_pago` → `pagado` → `preparando` → `listo_para_retirar` | `despachado` → `entregado`.
- Estados laterales: `vencido`, `cancelado`, `reembolsado`, `en_revision`.

1. **Mercado Pago.**
   - El pedido queda en `pendiente_pago` con vencimiento.
   - Se crea la orden con `external_reference = pedido.id` y la clave de idempotencia, se guarda `mp_order_id` y se redirige al `checkout_url`.
   - Llega el webhook → se valida la firma → se deduplica → `GET /v1/orders/{id}` → se verifica que coincidan la referencia, la moneda y el monto → `pagado`.
   - Si falla o vence, el pedido pasa a `vencido` o `cancelado`.
2. **Transferencia.**
   - El pedido queda en `pendiente_pago` y se muestran CBU o alias, el monto y la referencia.
   - El admin confirma a mano, y queda registrado quién y cuándo.
   - Un cron lo pasa a `vencido` cuando se cumple el plazo. Un pago que llega después de vencido se revisa a mano.
3. **Pago al retirar.**
   - El pedido queda confirmado sin cobro online y con un plazo para retirarlo.
   - El cobro se registra en el mostrador.
   - [I] Para limitar abusos se puede pedir seña, tope de monto o teléfono.
4. **Cambio de medio de pago.** Antes de pasar a transferencia hay que cancelar la orden de Mercado Pago, si todavía se puede, para evitar un doble cobro.

### Riesgos

| Riesgo | Mitigación |
|---|---|
| Marcar pagado por la URL de retorno | Solo el webhook más la consulta a la API cambian el estado |
| Webhook falso | Firma HMAC comparada en tiempo constante, más la consulta con el token propio |
| Notificaciones duplicadas o desordenadas | Tabla de eventos con unique y transiciones idempotentes |
| Webhook que nunca llega | Cron de conciliación |
| Doble orden por doble clic | Idempotency key determinística y `mp_order_id` único por pedido |
| Monto manipulado | Total calculado en el servidor y comparado al recibir el webhook |
| Doc de Orders con inconsistencias (`order_id` en el retorno, estados que no se listan) | Probar cada flujo en el entorno de prueba antes de mapear estados |
| Comisión desconocida | Pedirla al dueño desde su panel antes de fijar recargos |

### Pendientes antes de implementar
1. Leer en vivo la lista completa de `status` y `status_detail` de Orders, y el manifest de firma de Orders.
2. Confirmar que Orders para Checkout Pro está habilitada para la cuenta del comercio (no se sabe si sigue en beta).
3. Conseguir comisiones y plazos desde el panel de Mercado Pago del cliente.
4. Definir los vencimientos de cada medio de pago y la política de seña para el pago al retirar.

### Fuentes
- **Orders (Checkout Pro):**
  - https://www.mercadopago.com.ar/developers/en/reference/online-payments/checkout-pro-orders/overview.md
  - https://www.mercadopago.com.ar/developers/es/docs/checkout-pro-orders/overview
  - https://www.mercadopago.com.ar/developers/es/docs/checkout-pro-orders/create-order
  - https://www.mercadopago.com.ar/developers/es/reference/online-payments/checkout-pro/create-order/post.md
  - https://www.mercadopago.com.ar/developers/es/docs/checkout-pro-orders/web-integration/configure-back-urls
  - https://www.mercadopago.com.ar/developers/es/docs/checkout-pro-orders/notifications
- **Notificaciones y firma:**
  - https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks
  - https://www.mercadopago.com.ar/developers/en/docs/checkout-pro/payment-notifications
  - https://www.mercadopago.com.ar/developers/es/docs/wallet-connect/notifications
- **Checkout Pro clásico (Preferences):**
  - https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/configure-back-urls
  - https://www.mercadopago.com.co/developers/es/docs/checkout-pro-preferences/create-payment-preference
- **Pruebas:**
  - https://www.mercadopago.com.ar/developers/en/docs/your-integrations/test/accounts
  - https://www.mercadopago.com.ar/developers/en/docs/checkout-pro/integration-test/test-purchase
- **SDK:** https://github.com/mercadopago/sdk-nodejs
- **No accesibles:** las páginas de costos de Mercado Pago Argentina (403 o pedían iniciar sesión).

---

## Parte 2 — Legal (Argentina)

El agente **no usó** la skill deep-research: investigó directo en unas 15 páginas oficiales.
Algunos textos tenían problemas de codificación, así que antes de implementar hay que
contrastar cada punto con el Boletín Oficial.

> **Todo lo que sigue es para verificar con el contador o el abogado del cliente. No es asesoramiento legal.**

### Cambio de vigencia importante
- **La Res. SCI 424/2020 (botón de arrepentimiento) está derogada** [V]. La reemplazó la **Disposición 954/2025** (Subsecretaría de Defensa del Consumidor, publicada en el B.O. el 04/09/2025, art. 10).
- La complementa la **Disposición 3/2026** (B.O. 06/02/2026).
- Ojo: la página de la 424/2020 en argentina.gob.ar no muestra la nota de derogación.

### Checklist: norma → qué exige → cómo se ve en el sitio

| # | Norma | Qué exige | Cómo se ve en el sitio |
|---|---|---|---|
| 1 | Disp. 954/2025 art. 1 [V] | Un enlace con el texto "BOTÓN DE ARREPENTIMIENTO" a simple vista, destacado y desde el primer acceso, sin registro previo | Enlace en el header o el home y en el footer, con ese texto exacto, visible sin login |
| 2 | Disp. 954/2025 art. 5 [V] | Dentro de las 24 h, informar un código de registro de la solicitud por el mismo medio | Formulario con pedido, nombre y contacto, y mail automático con un código (`ARR-000123`); registro interno |
| 3 | Disp. 954/2025 art. 3 [V] | Excepciones: casos del art. 1116 CCyC (por ejemplo, hecho a medida), producto usado, compras para reventa o para un proceso productivo | Aclararlo en los T&C y en la ficha de los productos alcanzados |
| 4 | Disp. 3/2026 art. 1 [V] | Se permite verificar la identidad de forma razonable, solo para eso | Pedir número de pedido más email o DNI. No exigir cuenta ni documentación extra |
| 5 | Ley 24.240 art. 34 y CCyC arts. 1110-1111 [V] | 10 días corridos para revocar la compra, desde la entrega o la celebración (lo que ocurra último). Es irrenunciable, los gastos de devolución corren por el vendedor y debe informarse en caracteres destacados justo antes de aceptar | Leyenda destacada en el último paso del checkout, arriba de "Confirmar", más T&C, ficha y mail de confirmación |
| 6 | Ley 24.240 art. 4 [V] | Información cierta, clara y detallada del producto | Medidas, especie, tratamiento, unidad de venta y condiciones de entrega en la ficha |
| 7 | **Res. SIyC 4/2025 art. 2.a-b** [V] | **Precio en pesos** (USD solo como dato adicional). Precio final = lo que paga el consumidor | El precio principal va en ARS con IVA incluido. Si se muestra USD, que sea secundario |
| 8 | **Res. 4/2025 art. 2.c y 7** [V] | **"PRECIO SIN IMPUESTOS NACIONALES"**, en letra más chica que el precio final. **Obligatorio desde el 01/04/2025** para todo proveedor que venda a consumidor final, también en la web | Debajo del precio final, en listado, ficha, carrito y publicidad |
| 9 | Res. 4/2025 art. 2.e [V] | Precio por unidad de medida (m², metro, etc.). No es exigible si coincide con el precio de venta | "$ X / m²" o "$ X / metro lineal". Si se vende por unidad, alcanza con el precio de venta |
| 10 | Res. 4/2025 art. 2.d [V] | Si hay cuotas: precio de contado, cantidad y monto de cada cuota y "costo financiero total efectivo anual" | Mostrarlo en la ficha o el checkout si se ofrecen cuotas |
| 11 | **Res. 4/2025 art. 3** [V] | Precio claro y legible. **No se puede impedir el acceso al precio antes de decidir la compra** | No esconder precios tras un login. "Consultar precio" en el catálogo choca con esta norma (ver la nota de abajo) |
| 12 | Res. SCI 270/2020 (incorpora Res. GMC 37/2019, art. 2) [V] | Antes de cerrar el contrato: razón social, domicilio, email, CUIT, características, precio con impuestos y costos adicionales (envío), formas de pago, disponibilidad y garantía | Footer con razón social, CUIT, domicilio, email, teléfono y horario. Costo de envío visible antes de pagar |
| 13 | Res. GMC 37/2019 arts. 3-7 [V] | T&C accesibles y que se puedan guardar, resumen antes de confirmar, posibilidad de corregir errores, confirmación expresa y canal de reclamos | Resumen del pedido, casilla de T&C sin tildar, T&C imprimibles, canal de reclamos |
| 14 | Ley 24.240 arts. 11-13 [V] | Garantía legal de 6 meses en cosas muebles no consumibles | Sección "Garantía" en los T&C y constancia junto con la entrega |
| 15 | Disp. 954/2025 art. 6 [V, según un resumen] | El horario de atención no puede ser menor al comercial; si la atención es solo remota, al menos 8 h de lunes a viernes. Hay que informar el canal y el área responsable | Página de contacto con canal, horario y responsable |
| 16 | Disp. 954/2025 art. 4 (botón de baja) [V] | Aplica a servicios contratados a distancia | [I] No aplica a la venta de bienes. Revisar solo si se vende instalación online |
| 17 | Ley 25.326 art. 6 y Res. AAIP 14/2018 [V] | Antes de recolectar datos: finalidad, destinatarios, responsable con domicilio, si los datos son obligatorios y los derechos de acceso, rectificación y supresión | Política de privacidad enlazada desde el footer y desde cada formulario, con un texto breve debajo de cada uno |
| 18 | Ley 25.326 y Decreto 1558/2001: registro de bases [V parcial] | Inscribir las bases de datos en el registro nacional (AAIP, trámite TAD) | El contador o abogado define si corresponde. Si se inscribe, mostrarlo en la política de privacidad |
| 19 | Ley 25.326: seguridad [V] | Medidas técnicas y organizativas | HTTPS, no guardar tarjetas (lo hace Mercado Pago), control de accesos al panel |

### Lo que no se encontró como obligación
- **Data fiscal o QR de ARCA en el sitio.** No apareció ninguna norma que lo exija para tiendas online. La RG 4892/2020 regula el QR **en los comprobantes**.
- **Enlace a la Ventanilla Federal Única de Reclamos.** La Disp. 890/2025 derogó la Res. 274/2021 y no lo exige. Una guía de Derecho Fácil todavía lo presenta como obligatorio: hay que confirmarlo.
- **Ley 27.743 y RG ARCA 5614/2024.** Exigen discriminar el IVA **en la factura**. Es una obligación distinta de la exhibición del precio sin impuestos en el sitio, y hay que cumplir las dos.

### En el radar
- **Res. GMC 31/26 (Mercosur).** Según una nota oficial del 11/09/2026, regiría desde marzo de 2027. Exigiría domicilio físico y electrónico, mecanismos de reclamo y autorizaciones, con posible baja del dominio si no se cumple. No se leyó el texto.

### Impacto directo en el sitio actual [I]
- **Los precios de pisos y zócalos están en USD como precio principal.** La Res. 4/2025 pide el precio en pesos (USD solo como dato adicional). Hay que mostrar ARS como precio principal.
- **"Consultar precio" en el 75% del catálogo.** El art. 3 dice que no se puede impedir el acceso al precio antes de decidir la compra. Hoy el sitio es un catálogo con consulta, no una venta online. Con checkout esto pasa a ser un riesgo concreto. Hay que consultar con el abogado si un producto sin precio puede figurar en una tienda online.
- **"Precio sin impuestos nacionales" es obligatorio, no opcional**, para quien vende a consumidor final. Falta resolver el caso de un monotributista (duda 1).

### Dudas abiertas (para el contador o el abogado)
1. Qué se muestra como "precio sin impuestos nacionales" si el vendedor es monotributista.
2. Confirmar que la Res. 4/2025 no tuvo modificaciones en 2026.
3. Qué artículos de la Disp. 954/2025 tenían plazo de adecuación.
4. Si el arrepentimiento aplica a madera cortada a medida, ya instalada o tratada (art. 1116 CCyC y la excepción de producto "usado").
5. Gastos de devolución de material voluminoso (art. 34 y CCyC art. 1115).
6. Cuotas: si alcanza con lo que muestra Mercado Pago o el comercio también debe mostrar el costo financiero total.
7. Data fiscal o QR en el sitio: no hay norma, pero conviene confirmarlo.
8. Registro de bases de datos: si corresponde inscribirse, el número del decreto (1558 o "1588") y si hay renovación anual.
9. Cookies y marketing por email: no se encontró norma específica.
10. Ventanilla Federal Única: una guía oficial y la norma vigente se contradicen.
11. Normativa de Santa Fe (Ley provincial de defensa del consumidor) y de San Jorge: no se revisó.
12. Cómo informar envíos por zona (costos, plazos y daños en tránsito).
13. Descuento por transferencia o efectivo: cómo se exhibe.

### Fuentes
- Disp. 954/2025:
  - https://www.argentina.gob.ar/normativa/nacional/norma-417152/texto
  - https://www.boletinoficial.gob.ar/detalleAviso/primera/330827/20250904
- Disp. 3/2026:
  - https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423007/norma.htm
  - https://www.argentina.gob.ar/normativa/nacional/norma-423007/normas-modificadas
- Ley 24.240: https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/638/texact.htm
- CCyC: https://servicios.infoleg.gob.ar/infolegInternet/anexos/235000-239999/235975/texact.htm
- Res. SIyC 4/2025: https://www.argentina.gob.ar/normativa/nacional/resoluci%C3%B3n-4-2025-408455/texto
- FAQ oficial de exhibición de precios: https://www.argentina.gob.ar/sites/default/files/2025/04/preguntas_frecuentes_exhibicion_de_precios.pdf
- Res. GMC 37/2019: https://www.argentina.gob.ar/normativa/nacional/norma-341934/texto
- Res. SCI 270/2020: https://www.boletinoficial.gob.ar/pdf/aviso/primera/234662/20211027
- AAIP:
  - https://www.argentina.gob.ar/aaip/datospersonales/responsables/obligaciones
  - https://www.argentina.gob.ar/aaip/datospersonales/tramites
- Disp. 890/2025: https://www.argentina.gob.ar/normativa/nacional/norma-416600/texto
- RG ARCA 5614/2024: https://www.argentina.gob.ar/normativa/nacional/resoluci%C3%B3n-5614-2024-407183/texto
- RG 4892/2020 (QR en comprobantes): https://www.arca.gob.ar/fe/qr/vigencia-y-aplicacion.asp
- Mercosur GMC 31/26: https://www.argentina.gob.ar/noticias/mercosur-refuerza-la-proteccion-de-los-consumidores-en-el-comercio-electronico
- Derecho Fácil, Ventanilla Única: https://www.argentina.gob.ar/justicia/derechofacil/leysimple/ventanilla-unica-federal-de-reclamos-de-defensa-del-consumidor
