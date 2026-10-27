import { ImageResponse } from "next/og";

export const alt = "Maderera Don Antonio - Pisos, maderas y materiales en San Jorge, Santa Fe";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagen para compartir en redes. Sin fuentes externas ni fetch.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1c1410 0%, #3e2723 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, display: "flex" }}>
          Maderera Don Antonio
        </div>
        <div style={{ marginTop: 28, fontSize: 40, color: "#f59e0b", display: "flex" }}>
          Pisos, maderas y materiales · San Jorge, Santa Fe
        </div>
      </div>
    ),
    { ...size },
  );
}
