# Quick-Step — Arquitectura Web

## Mapa de Páginas

```
/                          → Home (Hero + Beneficios + Preview de categorías)
/productos                 → Catálogo completo (grilla + filtros)
/productos/smart           → Categoría Smart (6 productos)
/productos/catedral        → Categoría Catedral (3 productos)
/productos/premiere-plus   → Categoría Premiere Plus (4 productos)
/productos/nesto           → Categoría Nesto (3 productos)
/productos/eligna-wide     → Categoría Eligna Wide (7 productos)
/productos/impressive      → Categoría Impressive (1 producto)
/productos/vision          → Categoría Vision (4 productos)
/productos/[slug]          → Ficha de producto individual
/tecnologia                → Hydroseal, Uniclic, Clasificación AC
/donde-comprar             → Mapa / listado de distribuidores
/contacto                  → Formulario de contacto / presupuesto
```

## Secciones por Página

### Home `/`
1. **Hero** — Título + CTA principal
2. **Beneficios** — 4 íconos (Laminado, Hydroseal, Rayaduras, Uniclic)
3. **Categorías** — Cards de las 7 líneas con tagline y specs resumidos
4. **CTA Final** — "Encontrá tu piso ideal" / "Contactanos"

### Catálogo `/productos`
1. **Filtros laterales** — Por línea, espesor, clasificación AC, uso
2. **Grilla de productos** — Cards con imagen, SKU, línea, dimensiones, rating
3. **Ordenamiento** — Por línea (sort_order) o por espesor

### Página de Categoría `/productos/[categoria]`
1. **Header** — Nombre, tagline, descripción
2. **Specs de la línea** — Dimensiones, espesor, rating, uso
3. **Highlights** — Lista de características destacadas
4. **Grilla de productos** — Todos los diseños de esa línea

### Ficha de Producto `/productos/[slug]`
1. **Imagen principal** — Foto ambientada del piso
2. **Info técnica** — SKU, dimensiones, espesor, rating, resistencia al agua
3. **Badges de características** — Los 4 sellos (Laminado, Hydroseal, etc.)
4. **Relacionados** — Otros diseños de la misma línea

### Tecnología `/tecnologia`
1. **Hydroseal** — Explicación de la protección al agua
2. **Uniclic** — Explicación del sistema de encastre
3. **Clasificación AC** — AC4 vs AC5, qué significa cada nivel

## Jerarquía de Categorías (de accesible a premium)

| Orden | Línea          | Espesor | Rating | Ancho  | Largo   | Productos | Diferenciador              |
|-------|----------------|---------|--------|--------|---------|-----------|----------------------------|
| 1     | Smart          | 7mm     | AC4    | 190mm  | 1200mm  | 6         | Entrada, precio accesible  |
| 2     | Catedral       | 7mm     | AC4    | 190mm  | 1200mm  | 3         | Diseños roble europeo      |
| 3     | Premiere Plus  | 7mm     | AC4    | 215mm  | 1200mm  | 4         | 6hs resist. agua, ancha    |
| 4     | Nesto          | 8mm     | AC4    | 192mm  | 1261mm  | 3         | Mayor espesor y confort    |
| 5     | Eligna Wide    | 8mm     | AC4    | 190mm  | 1355mm  | 7         | Extra larga, wide look     |
| 6     | Impressive     | 8mm     | AC5    | 190mm  | 1380mm  | 1         | AC5, uso comercial         |
| 7     | Vision         | 8mm     | AC5    | 215mm  | 1800mm  | 4         | Gran formato, premium      |

## Datos

Todo el contenido está en `data/site-structure.json`:
- `site` → Info global de la marca
- `navigation` → Menú principal
- `sections` → Hero, beneficios, tecnología
- `categories` → 7 líneas con descripción, specs y highlights
- `products` → 28 fichas con SKU, imagen, dimensiones, features
- `ui_texts` → Todos los textos de interfaz
- `seo` → Títulos y descripciones para cada tipo de página
