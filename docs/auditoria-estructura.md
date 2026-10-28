# Auditoría de estructura — sitio actual (2026-10-28)

Auditoría de solo lectura del repo (rama `estructura`, igual a `main` en `2d7efc4`) y de
producción (https://quik-step-mhfm.vercel.app). La hizo un agente con curl y lectura de
código, sin navegador. **No pudo usar** las skills `frontend-design` ni
`revision-transversales`, así que aplicó sus criterios a mano. La comparación con el
benchmark (Ronda 3 en `benchmark-diseno.md`) la agregó el agente principal.

**[V]** = verificado en código o producción. **[I]** = inferencia.

## 1. Línea base de productos

Este conteo sirve para controlar que la Parte A no pierda productos.

| Archivo | Rubro | Filas | Con precio |
|---|---|---|---|
| `src/data/site-data.ts` → `products` | Pisos Quick-Step (7 líneas) | 28 | 28 (USD/m²) |
| `src/data/site-data.ts` → `accessories` | 9 zócalos + 1 manta | 10 | 9 en USD/vara. La manta tiene `price_usd: 0` y el precio aparte, en ARS |
| `src/data/construccion-data.ts` | Machimbres 6, tirantes 5, encofrado 3, estructura 4, aislantes 4, material seco 1 | 23 | 0 |
| `src/data/melaminas-data.ts` | Faplac, 10 líneas | 129 (72 melaminas + 57 revestimientos; 73 colores únicos) | 0 |
| `src/data/espejos-inteligentes-data.ts` | Espejos LED | 25 | 25 (ARS) |
| `src/data/espejos-artesanales-data.ts` | Espejos LED con foto | 5 | 0 |
| `src/data/hogar-data.ts` | Muebles | 29 | 0 |
| **Total** | | **249** | **63 (25%)** |

Producción coincide con estos números: muestra "129 colores", "25 modelos" y "23 productos" [V].

## 2. Hallazgos ordenados por impacto en ventas

### 1. WhatsApp sin número en todo el sitio [V] — bloqueante
- `src/config/negocio.ts:22` tiene `whatsapp: null`. Por eso `waLink` genera `https://wa.me/?text=…` sin número, y cada "Consultar" abre el selector de contactos del teléfono.
- También faltan teléfono, calle, horarios y `sitioUrl`.
- Sin esos datos, `LocalBusinessJsonLd` no se renderiza: producción tiene 0 bloques `ld+json`.
- **Sugerencia:** pedir estos 5 datos al cliente antes que cualquier otra cosa. Mientras no estén, la barra superior de la Parte A va a quedar oculta.

### 2. El 75% del catálogo es "Consultar precio" [V]
- No tienen precio construcción, melaminas, hogar ni espejos artesanales.
- En el home, 4 de las 6 tarjetas de categoría dicen "Consultá precio" (`src/components/home/Categorias.tsx:20-48`).
- El benchmark marca "sitio sin precios" como anti-patrón (Madersama, Juan B. Justo).
- **Sugerencia:** pedir precio y unidad de venta empezando por machimbres y tirantes, que son lo más vendido según el propio sitio.

### 3. Espejos duplicados en dos rutas y dos modelos de datos [V]
- `/espejos-inteligentes` tiene 25 modelos con precio y sin foto.
- `/espejos-artesanales` tiene 5 modelos con foto y sin precio. Ambos rubros son LED con las mismas funciones.
- El menú muestra los dos ítems (`site-data.ts:70,73`), pero el home tiene una sola tarjeta que apunta a inteligentes y usa la foto de un artesanal.
- [I] Las medidas coinciden (80×130 con GY01, 70×90 con L1036), así que probablemente sean las mismas piezas.
- **Sugerencia:** una sola categoría "Espejos LED". Hay que confirmar con el cliente si son las mismas piezas antes de fusionar los datos.

### 4. Moneda mezclada sin cotización visible [V]
- Pisos y zócalos están en USD. El único aviso es "Precios en dólares" al pie.
- La calculadora de la ficha devuelve el subtotal en USD, sin el equivalente en ARS (`CalculadoraCajas.tsx:102`).
- Los espejos están en ARS y además llevan un `price_usd` derivado a 1420 ARS/USD que no se muestra.
- `pricingInfo.price_date` dice "01/02/2026".
- Lo que está bien: la calculadora trabaja en centavos enteros y `precioDesde` ignora los ceros.
- **Sugerencia:** agregar cotización y fecha en `negocio.ts` y mostrar el ARS aproximado. Para la Parte B, una sola moneda de origen por precio (ver E1).

### 5. Los escalones mayoristas son decorativos [V]
- `escalonPara` y `rangoEscalon` solo se usan en tests.
- La tabla de `espejos-inteligentes/page.tsx:93-116` publica mínimos que en los datos están marcados "TODO(cliente): confirmar".
- El texto "¿Eres mayorista? Contáctanos" tutea, mientras el resto del sitio usa voseo.
- **Sugerencia:** ocultar la tabla hasta que el cliente confirme los mínimos.

### 6. Melaminas: conteo inflado y sin jerarquía [V]
- El sitio dice "129 colores", pero son 73. Hay 56 colores repetidos como melamina y como revestimiento.
- Las 129 tarjetas están en una sola grilla. El título nombra 3 líneas de las 10 que hay.
- Las imágenes salen del CDN de Faplac con URLs firmadas y hay un TODO de permiso de uso [I: las URLs pueden caducar].
- **Sugerencia:** agrupar por línea, mostrar "73 colores · 2 formatos" y resolver el permiso de las imágenes.

### 7. Navegación plana [V]
- 8 ítems al mismo nivel (`site-data.ts:67-78`), sin submenús, buscador ni barra superior. "Servicios" y "Contacto" están al mismo nivel que las categorías.
- El footer repite el mismo array y no tiene ayuda, envíos ni medios de pago.
- Es el error número 1 del benchmark (Madersama).
- **Sugerencia:** lo que propone la Parte A (puntos 2 y 4).

### 8. Cielorrasos es una sección fantasma [V]
- `/cielorrasos` dice "Próximamente" y tiene `noindex`.
- Aun así, el título global (`layout.tsx:19-21`) y el footer la siguen prometiendo.
- El producto real es el machimbre de 1/2"×4", que ya figura como "ideal para cielorrasos".
- **Sugerencia:** tratar "cielorrasos" como uso o proyecto que filtra machimbres, no como categoría. Redirigir con 301.

### 9. SEO básico [V]
- No hay `canonical` en ningún lado.
- `sitioUrl` es null, así que el sitemap usa el dominio `.vercel.app`.
- El título global habla de pisos y cielorrasos, no de la maderera.
- Solo los pisos tienen ficha propia (28). Construcción, melaminas, hogar y espejos no tienen URL individual.

### 10. Conviven dos sistemas de diseño [V]
- `servicios`, `contacto`, `cielorrasos` y `ContactForm` usan la paleta vieja (`da-dark`, `wood-*`, `amber-*`).
- Esas páginas no tienen migas y usan h1 con otro estilo.
- **Sugerencia:** migrarlas a los tokens actuales cuando se toquen en la Parte A.

### 11. Tres tarjetas y cinco modelos de datos [V]
- Tarjetas: `PisoCard`, `ItemCard` y una tarjeta inline de zócalos en `pisos-flotantes/page.tsx:116-139`, sin botón de acción.
- Precio: `price_usd_m2`, `price_usd`/`price_ars`, `precio{valor,moneda,unidad}`, `precio` sin unidad, y `title`/`description` en hogar.
- **Sugerencia:** un `ItemCatalogo` común con `unidad`, `moneda` y `variantes`, que es el punto 6 de la Parte A. Es la base para migrar a Supabase (E1).

### 12. Venta cruzada en el lugar equivocado [V]
- "Complementos para la instalación" (zócalo y manta) está al final del listado de pisos, no en la ficha.
- La ficha solo muestra otros diseños de la misma línea.
- **Sugerencia:** "También vas a necesitar" en la ficha de piso, usando los m² de la calculadora. Coincide con el patrón de prioridad alta del benchmark (Home Depot).

### 13. Accesibilidad [V]
- **Bien:** `focus-visible`, Escape en el menú móvil, labels en el formulario, `aria-current` en las migas y botones de 44 px.
- **Mal:** el texto de `.btn-whatsapp` tiene contraste **3,49:1** (blanco sobre `#1F9D55`, `globals.css:125-140`); el mínimo es 4,5:1.
- **Mal:** el menú móvil no atrapa el foco y su `aria-label` no cambia al abrirse o cerrarse.
- **Mal:** los links a WhatsApp con `target="_blank"` no avisan que abren una pestaña nueva.

### 14. Detalles de copy y unidades [V]
- Aparece escrito "Eliotis" y también "Elliotis".
- Medidas en 4 formatos distintos (`1830 x 2750 mm`, `90 × 70 cm`, `1/2" x 4"`, `2,40 mts`).
- El home dice "tradición y calidad artesanal" y "atención personalizada", que nadie confirmó (regla de no inventar).
- Hay TODO de cortes a medida en `layout.tsx`, `Footer.tsx` y `site-data.ts`.

## 3. Comparación con el benchmark

| Patrón del benchmark | Estado actual |
|---|---|
| Pocos rubros de primer nivel | ✗ 8 ítems planos → se resuelve con los 4 grupos de la Parte A |
| Navegación también por uso | ◐ Existe "Usos" en el home (`?uso=techos`), pero no está en el menú |
| Unidad de venta junto al precio | ◐ Pisos y espejos sí; el resto no tiene precio |
| Filtros por medida y espesor | ◐ Melaminas y construcción sí; pisos solo por línea |
| Precio sin impuestos nacionales | ✗ No existe → punto 7 de la Parte A |
| Retiro y envío visibles desde el principio | ✗ No hay barra superior → punto 2 de la Parte A |
| Cuotas y medios de pago visibles | ✗ No existe; además falta el dato del cliente |
| Ayuda (cómo comprar, envíos, cambios) | ✗ No existe → puntos 4 y 5 de la Parte A |
| "También vas a necesitar" en la ficha | ✗ Está en el listado, no en la ficha → punto 6 de la Parte A |
| Reseñas reales | ✗ No hay ninguna (correcto: no inventar) |
| Error: categorías y productos mezclados | ✗ Lo comete: "Servicios" y "Contacto" están al nivel de las categorías |
| Error: unidades mezcladas | ✗ Lo comete: 4 formatos de medida |

## 4. El plan de 4 grupos contra los datos reales

- **Maderas y construcción (23).** "Estructura" (4) y "material seco" (1) no estaban en la lista del plan y entran acá. "Cielorrasos" es un uso, no una categoría.
- **Pisos y revestimientos (38).** Pisos 28, zócalos 9 y manta 1. Ojo: las 57 melaminas "revestimiento" de Faplac **no** van acá. Van a Placas y melaminas, para que "revestimiento" no signifique dos cosas distintas.
- **Placas y melaminas (129).** El repo no tiene placas que no sean melamina (MDF, OSB, fenólico). Hay que confirmar con el cliente si las vende. Las tablas de encofrado quedan en Maderas.
- **Hogar y deco (59).** Hogar 29 y espejos 30 (25 + 5). Es el grupo más heterogéneo; los espejos quedan como subcategoría propia.
- **Fuera del catálogo:** Servicios y Contacto pasan a la barra superior y al footer.

**Redirecciones 301 necesarias.** No hay `redirects` en `next.config.ts`. Las query strings (`?uso=`) se tienen que conservar.

| Ruta actual | Destino |
|---|---|
| `/construccion-y-maderas` | Grupo "Maderas y construcción" |
| `/cielorrasos` | Filtro de uso de machimbres |
| `/pisos-flotantes` (+ 7 líneas y 28 fichas) | Grupo "Pisos y revestimientos" |
| `/melaminas` | Grupo "Placas y melaminas" |
| `/articulos-hogar` | Grupo "Hogar y deco" |
| `/espejos-inteligentes` y `/espejos-artesanales` | Una sola ruta de espejos |

## 5. Lo que importa para migrar a Supabase (Parte B)

- No hay una entidad común: existen 5 a 7 formas de producto distintas.
- Claves inconsistentes:
  - `Mirror.id`/`modelo` no son únicos (`F02` y `F02-60`).
  - Las melaminas repetidas solo se distinguen por un sufijo.
- Dinero como `number` con decimales (`12.90`). `price_usd: 0` se usa como "sin precio", y en los espejos `price_usd` es un dato derivado.
- Las medidas son texto libre. Habría que parsearlas a `largo_mm`, `ancho_mm` y `espesor_mm`, más un texto para mostrar.
- Imágenes:
  - Nombres de WhatsApp con espacios.
  - URLs externas de Faplac.
- Los textos de marketing (`features`, `highlights`) están pegados al dato de producto.

## 6. No verificado
- Si el cliente tiene ficha de Google Business o reseñas.
- Si hay stock real.
- La parte visual se evaluó a partir del código y el CSS, sin capturas.
