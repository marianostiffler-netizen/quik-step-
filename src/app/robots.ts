import type { MetadataRoute } from "next";
import { urlSitio } from "@/config/negocio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/landing" },
    sitemap: `${urlSitio()}/sitemap.xml`,
  };
}
