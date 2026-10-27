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
