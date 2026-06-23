import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://risalat-al-salam.com";
  return [
    { url: base,                                      lastModified: new Date(), priority: 1 },
    { url: `${base}/topics/meaning-of-peace`,         lastModified: new Date(), priority: 0.9 },
    { url: `${base}/topics/meaning-of-forgiveness`,   lastModified: new Date(), priority: 0.9 },
    { url: `${base}/topics/meaning-of-love`,          lastModified: new Date(), priority: 0.9 },
    { url: `${base}/videos`,                          lastModified: new Date(), priority: 0.8 },
  ];
}
