import type { NextConfig } from "next";

// Redirecciones 301 desde las rutas anteriores del catálogo. La query string se conserva sola.
const redirecciones = [
  ["/construccion-y-maderas", "/maderas-y-construccion"],
  ["/cielorrasos", "/maderas-y-construccion?uso=cielorrasos"],
  ["/pisos-flotantes", "/pisos-y-revestimientos/pisos-flotantes"],
  ["/pisos-flotantes/:path*", "/pisos-y-revestimientos/pisos-flotantes/:path*"],
  ["/melaminas", "/placas-y-melaminas"],
  ["/articulos-hogar", "/hogar-y-deco/articulos-del-hogar"],
  ["/espejos-inteligentes", "/hogar-y-deco/espejos/led"],
  ["/espejos-artesanales", "/hogar-y-deco/espejos/artesanales"],
] as const;

const nextConfig: NextConfig = {
  transpilePackages: ["framer-motion"],
  async redirects() {
    return redirecciones.map(([source, destination]) => ({ source, destination, statusCode: 301 }));
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.faplaconline.com.ar",
      },
    ],
  },
};

export default nextConfig;
