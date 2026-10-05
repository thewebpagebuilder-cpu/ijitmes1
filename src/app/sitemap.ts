import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ijitmes.com";
  const routes = [
    ["", 1, "weekly"],
    ["/issues", 0.9, "weekly"],
    ["/submit", 0.9, "monthly"],
    ["/about", 0.8, "monthly"],
    ["/guidelines", 0.8, "monthly"],
    ["/publish", 0.8, "monthly"],
    ["/fees", 0.75, "monthly"],
    ["/peer-review", 0.75, "monthly"],
    ["/editorial-board", 0.7, "monthly"],
    ["/track", 0.7, "monthly"],
    ["/contact", 0.6, "yearly"],
    ["/faq", 0.6, "monthly"],
    ["/privacy", 0.3, "yearly"],
    ["/terms", 0.3, "yearly"],
  ] as const;

  return routes.map(([path, priority, changeFrequency]) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
