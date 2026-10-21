import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { ZONAS } from "@/lib/zonas";
import { blogPosts } from "./blog/[slug]/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const hoy = new Date();
  const u = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") =>
    ({ url: `${SITE_URL}${path}`, lastModified: hoy, changeFrequency, priority });
  return [
    u("/", 1, "weekly"),
    u("/calculadora/", 0.9),
    u("/mudanzas/", 0.8),
    ...ZONAS.map((z) => u(`/mudanzas/${z.slug}/`, z.slug === "huelva" ? 0.9 : 0.8)),
    u("/servicios/", 0.7),
    u("/contacto/", 0.7),
    u("/blog/", 0.5, "weekly"),
    ...blogPosts.map((p: { slug: string }) => u(`/blog/${p.slug}/`, 0.5)),
    u("/privacidad/", 0.1, "yearly"),
  ];
}
