import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon, InstagramIcon } from "@/components/Icons";
import { candles, flavours } from "@/data/candles";
import { site } from "@/lib/site";

const scents = flavours.map((flavour) => flavour.toLowerCase());

export default function HomePage() {
  const featuredSlugs = ["iced-coffee", "matcha-berry", "heirloom-knit"];
  const featured = featuredSlugs.map((slug) => candles.find((candle) => candle.slug === slug)!);
  const float = candles.find((candle) => candle.slug === "heirloom-knit")!;
  const rest = candles.filter((candle) => !featuredSlugs.includes(candle.slug));

  return (
    <>
      <section className="hero">
        <div className="wrap-wide hero-grid">
          <div>
            <p className="eyebrow no-rule">
              <span className="flame" aria-hidden="true" />
              Hand-poured, small batch
            </p>
            <h1 className="hero-title">
              <span>Light for</span>
              <span>
                the <em>quiet</em> hours.
              </span>
            </h1>
            <p className="lede">
              {site.fullName} makes handmade candles for the rooms you actually live in. Soft scent,
              warm soy wax, and a glow that stays low.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-fill" href="/shop">
                Shop the collection
                <ArrowIcon />
              </Link>
              <a className="btn btn-line" href={site.dm} target="_blank" rel="noreferrer">
                <InstagramIcon />
                Instagram
              </a>
            </div>
            <dl className="hero-meta">
              <div>
                <dt>Wax</dt>
                <dd>Soy blend</dd>
              </div>
              <div>
                <dt>Wick</dt>
                <dd>Cotton</dd>
              </div>
              <div>
                <dt>Order</dt>
                <dd>On Instagram</dd>
              </div>
            </dl>
          </div>
          <div className="hero-stage">
            <div className="hero-frame">
              <div className="hero-photo">
                <Image
                  src="/images/fruit-pour.jpg"
                  alt="Four fruit candles — orange, strawberry, raspberry, and blueberry — on a wood round"
                  fill
                  priority
                  sizes="(max-width: 860px) 100vw, 46vw"
                />
              </div>
              <p className="hero-caption">Fruit pours</p>
            </div>
            <div className="hero-float">
              <Image
                src={float.image}
                alt={`${float.name}, an amber jar candle`}
                fill
                sizes="20vw"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-group" key={copy}>
              {Array.from({ length: 3 }, () => scents)
                .flat()
                .map((scent, index) => (
                  <span key={`${copy}-${scent}-${index}`}>
                    {scent}
                    <i>·</i>
                  </span>
                ))}
            </div>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <div>
                <p className="eyebrow">The edit</p>
                <h2 style={{ marginTop: "0.7rem" }}>
                  Three to start
                  <br />
                  the evening.
                </h2>
              </div>
              <p>A short list for the first look. The full collection is one page over, ready when you are.</p>
            </div>
          </Reveal>
          <div className="edit-grid">
            {featured.map((candle) => (
              <ProductCard key={candle.slug} candle={candle} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="promises">
            <article>
              <span className="num">01</span>
              <strong>Poured slowly</strong>
              <p>Small batches, so each jar gets the time it needs. Nothing rushed off a line.</p>
            </article>
            <article>
              <span className="num">02</span>
              <strong>Scent that stays close</strong>
              <p>Fragrances chosen for a room, not for a hallway. Warm, soft, and easy to live with.</p>
            </article>
            <article>
              <span className="num">03</span>
              <strong>Ordered by note</strong>
              <p>No checkout yet. Choose a jar here, then send Honey a message on Instagram.</p>
            </article>
          </div>
        </div>
      </section>

      <figure className="quote">
        <Image
          className="fill-img"
          src="/images/evening-light.jpg"
          alt=""
          fill
          sizes="100vw"
        />
        <blockquote className="sr-only">A candle should feel like the room took a breath.</blockquote>
        <figcaption>{site.fullName}</figcaption>
      </figure>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <div>
                <p className="eyebrow">Collection</p>
                <h2 style={{ marginTop: "0.7rem" }}>The rest of the shelf.</h2>
              </div>
              <Link className="btn btn-line" href="/shop">
                View all
                <ArrowIcon />
              </Link>
            </div>
          </Reveal>
          <div className={rest.length % 3 === 2 ? "catalog catalog-pair" : "catalog"}>
            {rest.map((candle) => (
              <ProductCard key={candle.slug} candle={candle} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">How to order</p>
            <h2 style={{ margin: "0.7rem 0 1.8rem", maxWidth: "12ch" }}>Simple, on purpose.</h2>
          </Reveal>
          <div className="steps">
            <article>
              <span>01</span>
              <h3>Choose a look</h3>
              <p>Pick a design and a flavour, one of the jars already poured, or mix your own.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Write to Honey</h3>
              <p>Send a note on Instagram with the candle name. She’ll confirm it’s available.</p>
            </article>
            <article>
              <span>03</span>
              <h3>She takes it from there</h3>
              <p>Price and how the jar gets to you are settled in that conversation. Payments aren’t on this site yet.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="ig-band">
            <div>
              <p className="eyebrow no-rule" style={{ color: "#c9aa88" }}>
                @{site.handle}
              </p>
              <h2 style={{ marginTop: "0.6rem" }}>See what’s pouring this week.</h2>
              <p>New jars, behind-the-scenes wax, and the real way to reserve one.</p>
            </div>
            <a className="btn btn-fill" href={site.dm} target="_blank" rel="noreferrer">
              <InstagramIcon />
              Open Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
