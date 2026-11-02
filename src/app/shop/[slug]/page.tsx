import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { FlavourOrder } from "@/components/FlavourOrder";
import { JsonLd } from "@/components/JsonLd";
import { ArrowIcon, InstagramIcon } from "@/components/Icons";
import { candlePrice, candles, formatPrice, getCandle, relatedCandles } from "@/data/candles";
import { pagesUrl, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return candles.map((candle) => ({ slug: candle.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const candle = getCandle(slug);
  if (!candle) return { title: "Candle" };
  return {
    title: candle.name,
    description:
      candle.kind === "design" && !candle.lockedScent
        ? `${candle.name} is a handmade candle design from ${site.fullName}. Choose a flavour when you order.`
        : `${candle.name} is a handmade candle scented with ${candle.scent}. A small-batch homemade candle from ${site.fullName}.`,
    alternates: { canonical: `/shop/${candle.slug}/` },
    openGraph: {
      title: `${candle.name} · handmade candle`,
      description:
        candle.kind === "design" && !candle.lockedScent
          ? candle.story
          : `${candle.scent}. ${candle.story}`,
      images: [{ url: candle.image, alt: `${candle.name} handmade candle` }],
    },
  };
}

export default async function CandlePage({ params }: Props) {
  const { slug } = await params;
  const candle = getCandle(slug);
  if (!candle) notFound();
  const related = relatedCandles(candle.slug);

  return (
    <div className="page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: candle.name,
          description:
            candle.kind === "design" && !candle.lockedScent
              ? `${candle.story} Choose a flavour when you order.`
              : `${candle.story} Handmade candle scented with ${candle.scent}.`,
          image: `${pagesUrl}${candle.image}`,
          url: `${pagesUrl}/shop/${candle.slug}/`,
          category: "Handmade candles",
          material: candle.wax,
          brand: { "@type": "Brand", name: site.fullName },
          offers: {
            "@type": "Offer",
            priceCurrency: "CAD",
            price: String(candlePrice(candle.kind)),
            availability:
              candle.kind === "simple"
                ? "https://schema.org/InStock"
                : "https://schema.org/PreOrder",
            url: `${pagesUrl}/shop/${candle.slug}/`,
          },
          additionalProperty: [
            { "@type": "PropertyValue", name: "Size", value: candle.size },
            { "@type": "PropertyValue", name: "Burn time", value: candle.burn },
            {
              "@type": "PropertyValue",
              name: "Scent",
              value:
                candle.kind === "design" && !candle.lockedScent
                  ? "Chosen from the flavour list"
                  : candle.scent,
            },
          ],
        }}
      />
      <article className="wrap">
        <Link href="/shop" className="back-link">
          ← Collection
        </Link>
        <div className="product">
          <div className="product-media">
            <Image
              src={candle.image}
              alt={`${candle.name} candle`}
              fill
              priority
              sizes="(max-width: 860px) 100vw, 58vw"
            />
          </div>
          <div className="product-copy">
            <p className="eyebrow">{candle.kind === "design" ? "Design" : "In stock"}</p>
            <h1>{candle.name}</h1>
            <p className="product-scent">{candle.scent}</p>
            <dl className="facts">
              <div>
                <dt>Size</dt>
                <dd>{candle.size}</dd>
              </div>
              <div>
                <dt>Burn</dt>
                <dd>{candle.burn}</dd>
              </div>
              <div>
                <dt>Wax</dt>
                <dd>{candle.wax}</dd>
              </div>
              <div>
                <dt>Price</dt>
                <dd>{formatPrice(candlePrice(candle.kind))}</dd>
              </div>
            </dl>
            <p className="lede" style={{ marginBottom: "1.4rem" }}>
              {candle.story}
            </p>
            {candle.kind === "simple" || candle.lockedScent ? (
              <dl className="notes">
                <div>
                  <dt>Top</dt>
                  <dd>{candle.notes.top}</dd>
                </div>
                <div>
                  <dt>Heart</dt>
                  <dd>{candle.notes.heart}</dd>
                </div>
                <div>
                  <dt>Base</dt>
                  <dd>{candle.notes.base}</dd>
                </div>
              </dl>
            ) : null}
            {candle.kind === "design" && !candle.lockedScent ? (
              <FlavourOrder candleName={candle.name} />
            ) : (
              <div className="hero-actions">
                <a className="btn btn-fill" href={site.dm} target="_blank" rel="noreferrer">
                  <InstagramIcon />
                  Reserve on Instagram
                </a>
                <Link className="btn btn-line" href="/contact">
                  Write a note
                  <ArrowIcon />
                </Link>
              </div>
            )}
            <p className="standin">
              {candle.kind === "simple"
                ? "This scent is already in the jar. Availability is confirmed on Instagram."
                : candle.confirmed
                  ? "Availability is confirmed on Instagram."
                  : "Size and burn time for this design are still being filled in. Availability is confirmed on Instagram."}
            </p>
          </div>
        </div>
      </article>
      <section className="wrap related">
        <h2>You may also like</h2>
        <div className="catalog">
          {related.map((item) => (
            <ProductCard key={item.slug} candle={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
