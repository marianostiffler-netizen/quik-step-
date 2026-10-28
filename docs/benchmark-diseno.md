# Benchmark de diseño — Maderera Don Antonio

Guía de diseño del rediseño. Leer antes de trabajar cada pantalla.

Objetivo: llevar el sitio a un nivel de primera línea en UX y diseño, inspirado en
las mejores tiendas de madera online, **sin copiar textos, imágenes, logos ni
colores exactos de ningún sitio**. Se toman patrones y nivel de calidad, no la copia.

## Referencias

Benchmark ya hecho; usar como guía de patrones, no como plantilla.

1. **Madera Fina (maderafina.es)** — referencia visual principal.
   Estética cálida y premium. Fondo crema, primario terracota, títulos en grotesca
   expresiva (tipo Bricolage Grotesque) + cuerpo en Inter, radios ~16px, botones
   pill. Configurador: material → espesor → medidas → precio al instante, sin
   registro. Bloques "Cómo funciona en 3 pasos", reseñas de Google, "¿No sabés por
   dónde empezar?" con WhatsApp.
   - Aire generoso, fondo cálido, títulos grandes y con carácter, pocos colores.
   - Botones tipo píldora, tarjetas con radio suave, fotos de producto grandes
     sobre fondo limpio.
   - Secciones claras y en orden: hero → categorías → cómo funciona → confianza
     → contacto.
2. **Woodworkers Source (EE.UU.)**: guía "cómo comprar madera online" en 3 pasos,
   tabla educativa de medidas comerciales vs reales, selector "envío / retiro en
   local" al inicio, atención humana visible (teléfono, horarios).
   - Tomar: guía de medidas y selector retiro/envío.
3. **Timber2uDirect (UK)**: navegación doble por CATEGORÍA y por USO, precio
   "desde $X" con unidad, más vendidos, vistos recientemente.
   - Tomar: navegación por categoría Y por uso, con tarjetas con imagen.
4. **Sodimac Argentina**: unidad pegada al precio (c/u, m², por pie, por metro
   lineal), descuento por cantidad ("desde 10 u."), filtros por material, medida,
   stock, precio y tipo de entrega; medios de pago visibles.
   - Tomar: precio con unidad bien visible en cada tarjeta.
5. **Anti-patrón (Madersama)**: no mostrar precios. Evitar también sliders pesados
   y estética Bootstrap genérica.

## Patrones a implementar

Adaptados a una maderera del interior de Santa Fe.

- Precio siempre con unidad explícita y formato ARS ($ 12.345); "desde" cuando
  hay variantes de medida.
- Medidas en el formato que usa el rubro en Argentina (pulgadas x pulgadas x pies /
  metros) + mini guía de medidas comerciales.
- Navegación por categoría y por uso/proyecto (ej.: techos, decks, cercos,
  construcción, muebles). Las categorías reales salen de los productos cargados.
- Calculadora simple de cantidad en las fichas donde aplique (ej.: m² a cubrir →
  unidades de machimbre/tablas), con margen de desperdicio configurable.
- Selector de entrega: retiro en el local / envío (zonas y costos = pregunta abierta).
- Pedido por WhatsApp con el carrito pre-armado (producto, medida, cantidad,
  subtotal) como CTA principal o alternativo al checkout.
- Bloques de confianza: dirección, horarios, mapa, WhatsApp flotante con horario,
  reseñas (solo reales; si no hay, dejar el bloque preparado y oculto).
- "Cómo comprar en 3 pasos" y bloque "¿No sabés qué necesitás? Te asesoramos".
- Mobile-first: el cliente típico entra desde el celular.

## Preguntas abiertas (no asumir; dejar configurable o marcar TODO)

- ¿Cortan a medida? Si no, nada de configurador con precio al instante.
- ¿Cobran online (Mercado Pago) o el pedido se cierra por WhatsApp?
- ¿Envían? ¿A qué zonas y con qué costo?
- ¿Venta mayorista además de minorista? ¿Cuotas?
- ¿Tienen reseñas en Google?
- ¿Los precios se cargan en ARS o en USD? (hoy pisos/zócalos están en USD y espejos en ARS)

## Ronda 3 — Benchmark de estructura (2026-10-28)

Foco: cómo organizan catálogo, navegación y compra las madereras y corralones.
Relevado por dos agentes de investigación de solo lectura. Todo está parafraseado.
**[V]** = verificado en la página; **[I]** = inferencia.

**Límites del relevamiento.**
- Firecrawl tuvo límite de tasa y algunas páginas se leyeron con resúmenes de WebFetch, que son menos confiables.
- No se leyó **ningún carrito ni checkout**, ni en Argentina ni afuera. Tampoco se pudieron abrir las fichas de Llavallol y Madersama.
- Lo relativo al checkout sale de los informes de pagos y legal (`docs/investigacion-ecommerce.md`), no de este benchmark.

### Argentina

| Sitio | Plataforma | Menú / árbol | Tarjeta y ficha | Compra | Confianza |
|---|---|---|---|---|---|
| Llavallol (tienda.maderera.com.ar) | Billowshop [I] | 6 rubros planos: Maderas, Construcción en seco, Aislantes, Revestimiento de piso, Ferretería, Placa de yeso [V] | Medida y unidad de venta dentro del nombre (por ejemplo, "por metro lineal") [V] | Ficha y carrito no verificados | Ayuda en el menú: envíos, pagos, sucursales y botón de arrepentimiento [V]. WhatsApp flotante [V] |
| Madersama | WooCommerce | Mezcla categorías con productos sueltos al mismo nivel; "Tirantes" apunta a un producto [V] | Sin precio; "Seleccionar opciones" [V] | Carrito de cotización ("Mi cotización") [V] | Antigüedad, reseñas de Google, guía técnica descargable [V] |
| Megacom | Tiendanube | Pocos rubros grandes con submenú Machimbre / Tirantes [V] | Medidas en pies y metros en el nombre. La ficha muestra precio sin impuestos, descuento en efectivo y cuotas [V] | Carrito clásico [V] | WhatsApp, marcas [V] |
| Sodimac | Propia | Árbol profundo con migas: Construcción › Maderas y tableros › Maderas para techos [V] | Unidad junto al precio (c/u, m²), descuento, "Agregar al carro" en la tarjeta [V] | Pide ubicación antes de mostrar stock; retiro en 2 h o envío [V] | Cuotas y bancos arriba del todo, arrepentimiento [V] |
| Easy | VTEX | Construcción y maderas › Techos › Tirantes [V] | "Precio sin impuestos nacionales" en cada tarjeta. La unidad no se ve; la medida va en el nombre [V] | Retiro al día siguiente o envío en 24 h (solo CABA/GBA) [V] | Cuotas, texto educativo bajo el listado [V] |
| Contino | Tiendanube | Materiales de construcción › Maderas de obra [V] | Medidas en metros dentro del nombre [V] | No verificado | WhatsApp, redes |
| La Carlota | WooCommerce | Categorías **por uso**: maderas para techos, para obra, construcción en seco [V] | Unidad al final del nombre ("x M2", "x ML") [V] | Solo consulta, sin carrito [V] | Bloques de inspiración que cruzan rubros [V] |
| Juan B. Justo (mjbj.ar) | — | 8 rubros: Techos, Placas, Pisos, Molduras, Decks… [V con WebFetch] | Sin precio en el home | Sin carrito visible | Muchas reseñas de Google [V con WebFetch] |

**Patrones repetidos**
1. Árbol por rubro y por uso a la vez (La Carlota, Sodimac, Easy).
2. Medida dentro del nombre del producto. Es la norma, pero obliga a leer en vez de filtrar.
3. Unidad de venta explícita (c/u, m², metro lineal).
4. Filtros por medida o largo (Sodimac: "maderas de 3 a 4 m").
5. "Precio sin impuestos nacionales" como dato secundario en la tarjeta (Easy, Megacom).
6. Cuotas y medios de pago visibles en el home (los grandes).
7. Retiro o envío decididos al principio (Sodimac, Easy).
8. Las madereras chicas usan cotización o consulta en vez de carrito (Madersama, La Carlota).
9. Confianza basada en antigüedad y reseñas de Google reales.
10. Texto educativo corto bajo el listado (Easy, tirantes).

**Errores a evitar**
1. Menú que mezcla categorías y productos al mismo nivel (Madersama).
2. Precios en "$0,00" o "-0% OFF" visibles. Se vio en dos Tiendanube; no se confirmó si era un artefacto de la captura.
3. Unidades y sistemas de medida mezclados sin criterio (pies, pulgadas y metros).
4. Home con bloques repetidos o con temporadas que tapan al rubro principal.
5. Errores técnicos visibles en la página, o sitios enteros sin un solo precio.

### Internacional — qué tomar por tipo de página

**Home**
- **Alta.** Barra superior con 3-4 promesas concretas: retiro, plazo, garantía (Madera Fina).
- **Alta.** Tiles "por uso" además de "por material" (Timber2uDirect, Home Depot).
- **Alta.** Bloque "cómo funciona" en pasos (Madera Fina, Woodworkers Source).
- **Alta.** WhatsApp fijo y visible.
- **Media.** Reseñas de Google, solo si son reales.

**Categoría**
- **Alta.** Filtros por medida y espesor; en placas es lo que decide la compra (Maderas y Chapas, Home Depot).
- **Alta.** "También vas a necesitar" como enlaces a categorías relacionadas (Home Depot).
- **Media.** Explicación breve del material antes del listado (Madera Fina).
- **Baja.** Texto SEO largo al pie.

**Ficha**
- **Alta.** Ejemplos concretos de precio por pieza (Madera Fina).
- **Alta.** Reglas de uso del tipo "si la luz supera X, usá el espesor mayor" (Madera Fina).
- **Alta.** Reglas de corte publicadas: desperdicio por corte, mínimos, sin devolución de piezas a medida (Leroy Merlin). Aplica solo si el cliente corta a medida, que es una pregunta abierta.
- **Media.** Cuidados y preguntas frecuentes del material.
- **Media.** Medida y espesor elegidos juntos en un solo selector (Woodworkers Source).

**Carrito**
- Sin datos verificados en ningún sitio.
- [I] Para una maderera chica, el equivalente inmediato es el "pedido por WhatsApp" con el resumen armado en la ficha.

**Ayuda**
- **Alta.** Envíos, devoluciones y "cómo comprar" enlazados desde el mismo bloque del footer (Woodworkers Source, Timber2uDirect).
- **Alta.** Aclarar qué servicio es gratis y cuál se cobra (Leroy Merlin, corte).
- **Media.** Guías de compra y equivalencias de medidas comerciales contra medidas reales.

### Conclusiones para Don Antonio
- La agrupación en 4 grupos coincide con lo que hacen Llavallol, Juan B. Justo y Megacom: pocos rubros de primer nivel.
- La **navegación por uso** (techos, obra, revestir) es lo que distingue a los mejores. Hay que mantener "Comprá por proyecto" como segundo eje, no como subcategoría.
- Ningún competidor chico tiene un buen checkout. Un carrito con precios visibles y unidad clara ya es diferencial, aunque cierre por WhatsApp.

### Fuentes
- **Argentina:**
  - https://tienda.maderera.com.ar/
  - https://tienda.maderera.com.ar/ficha-2123-alfajias-de-eucalipto-grandis-venta-por-metro-lineal
  - https://madersama.com.ar/
  - https://madersama.com.ar/guia-clasificacion-madera-aserrada-estructural/
  - https://www.megacomsa.com.ar/
  - https://www.megacomsa.com.ar/maderas/
  - https://www.sodimac.com.ar/sodimac-ar/
  - https://www.sodimac.com.ar/sodimac-ar/category/cat4070036/maderas-para-techos/
  - https://www.easy.com.ar/
  - https://www.easy.com.ar/construccion-y-maderas/construccion-de-techos/tirantes
  - https://corraloncontinotienda.com/materiales-de-construcciones/maderas-de-obra/
  - https://lacarlotamaderas.com/
  - https://mjbj.ar/
- **Internacional:**
  - https://www.maderafina.es/
  - https://maderafina.es/categoria-producto/tableros-alistonados/tablero-de-madera-a-medida-roble/
  - https://www.woodworkerssource.com/
  - https://www.timber2udirect.co.uk/
  - https://www.homedepot.com/b/Lumber-Composites/N-5yc1vZbqpg
  - https://www.leroymerlin.es/servicios/servicio-de-corte-de-madera.html
  - https://amedida.leroymerlin.es/configurador-de-corte-de-tableros/
  - https://maderasychapas.net/tienda/
- **No disponibles:**
  - maderasychapas.com: es un dominio en venta.
  - Woodworkers Source "how to buy": devolvió 403.
