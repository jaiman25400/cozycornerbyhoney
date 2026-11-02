import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { ArrowIcon } from "@/components/Icons";
import { candles } from "@/data/candles";
import { pagesUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Handmade candle collection",
  description:
    "Handmade candle designs you can scent yourself, plus three jars already poured, from Cozy Corner by Honey.",
  alternates: { canonical: "/shop/" },
};

export default function ShopPage() {
  const designs = candles.filter((candle) => candle.kind === "design");
  const simple = candles.filter((candle) => candle.kind === "simple");

  return (
    <div className="page">
      <PageHeader
        eyebrow="Collection"
        title="A look, then a scent."
        lede="Some designs are poured in one scent. The rest let you choose the flavour. Three jars are already poured, with the scent on the label."
      />
      <div className="wrap" style={{ paddingBottom: "4rem" }}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Handmade candles",
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            numberOfItems: candles.length,
            itemListElement: candles.map((candle, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${pagesUrl}/shop/${candle.slug}/`,
              name: candle.name,
            })),
          }}
        />
        <Link href="/custom" className="custom-band">
          <div>
            <p className="eyebrow no-rule">Custom</p>
            <h2>Mix a candle.</h2>
            <p>Up to three flavours, with the shares adding to 100%. A custom candle is $22 CAD.</p>
          </div>
          <span className="btn btn-fill">
            Start a mix
            <ArrowIcon />
          </span>
        </Link>

        <section className="shelf-block">
          <div className="section-head">
            <div>
              <p className="eyebrow">Designs</p>
              <h2>Choose the glass.</h2>
            </div>
            <p>Each one keeps its look. A few are poured in one scent. The others let you pick a flavour.</p>
          </div>
          <div className="catalog">
            {designs.map((candle) => (
              <ProductCard key={candle.slug} candle={candle} />
            ))}
          </div>
        </section>

        <section className="shelf-block">
          <div className="section-head">
            <div>
              <p className="eyebrow">In stock</p>
              <h2>Already poured.</h2>
            </div>
            <p>These three keep the scent on the jar. No flavour to choose.</p>
          </div>
          <div className="catalog">
            {simple.map((candle) => (
              <ProductCard key={candle.slug} candle={candle} />
            ))}
          </div>
        </section>

        <p className="standin">Price and delivery are confirmed on Instagram.</p>
      </div>
    </div>
  );
}
