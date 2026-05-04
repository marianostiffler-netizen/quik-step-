# Hero Video — Prompt Cinematográfico

Prompt de referencia para generar el video de fondo del Hero de la Home en herramientas de IA (Sora, Google Veo, Runway Gen-3, Kling, etc.).

## Prompt principal

```
Ultra cinematic commercial shot of premium wooden flooring, macro lens.

Camera slowly gliding over a high-end wooden surface, showcasing natural grain,
texture and subtle imperfections.
Soft warm lighting coming from the side, creating depth and shadows across the
wood veins.

Shallow depth of field, focus shifting smoothly along the surface.
Tiny floating dust particles visible in the air, illuminated by light rays.

The camera gently pushes forward, then slightly tilts, revealing more of the
wood pattern.
Hyper-realistic textures, 4K, photorealistic rendering.

Color palette: warm browns, golden tones, soft ambient light.
Mood: luxury, calm, high-end craftsmanship.

No people, no text, no logos.

Style references: Apple product ads, high-end furniture commercials.
Smooth motion, no abrupt cuts.
```

## Especificaciones técnicas recomendadas

- **Formato**: MP4 (H.264) y/o WebM (VP9) para máxima compatibilidad
- **Resolución**: 1920x1080 mínimo (4K si el peso lo permite)
- **Duración**: 8–15 segundos (loopeable)
- **Aspect ratio**: 16:9 (paisaje)
- **Audio**: SIN audio (el video se reproduce con `muted` autoplay)
- **Peso máximo recomendado**: 4 MB para mobile, 8 MB para desktop

## Cómo subirlo al sitio

1. Renombrar el archivo final a `hero-video.mp4` (y opcional `hero-video.webm`)
2. Colocarlo en `public/hero-video.mp4`
3. El componente Hero ya lo detecta automáticamente y reemplaza la imagen de fondo
4. La imagen `public/hero-background.png` queda como **poster/fallback** (se muestra mientras carga el video o si el navegador no lo soporta)

## Tips para los generadores de IA

- **Sora / Veo**: Pegá el prompt completo. Pedí "loopable" si la herramienta lo soporta.
- **Runway Gen-3**: Reducí descripción a 1–2 párrafos clave, ellos truncan.
- **Kling**: Funciona mejor con prompts cortos en inglés y `motion: subtle camera move`.

## Optimización post-generación

```bash
# Comprimir para web sin perder calidad visual
ffmpeg -i input.mp4 -vcodec libx264 -crf 24 -preset slow -an hero-video.mp4

# Generar versión WebM (más liviana en navegadores modernos)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 32 -b:v 0 -an hero-video.webm
```
