import type { MetadataRoute } from "next";
import { candles } from "@/data/candles";
import { pagesUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/shop/", "/custom/", "/about/", "/contact/", ...candles.map((candle) => `/shop/${candle.slug}/`)];
  return paths.map((path) => ({
    url: `${pagesUrl}${path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
