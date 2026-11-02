import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ArrowIcon } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Handmade candle studio",
  description:
    "The studio behind Cozy Corner by Honey. Small-batch handmade and homemade candles, poured for the quiet parts of a home.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="The studio"
        title="Made for the corner you love."
        lede="Honey pours handmade candles for the quiet parts of a home — the chair by the window, the kitchen after dinner, the hour when the day finally gets soft."
      />

      <section className="wrap story-grid" style={{ paddingBottom: "4rem" }}>
        <div className="story-copy prose">
          <p>
            Cozy Corner started as a small making practice: wax, wick, and a scent that feels like
            someone turned the lights down on purpose. The jars are poured in batches small enough to
            watch.
          </p>
          <p>
            This website is the front room. You can look, choose, and send a note. Checkout will come
            later. For now, Instagram is the counter — @{site.handle}.
          </p>
          <p>
            If you are here from a gift, a story, or a scroll, you are in the right place. Pick a jar
            that sounds like your room and tell Honey which one.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-fill" href="/shop">
              Browse jars
              <ArrowIcon />
            </Link>
          </div>
        </div>
        <figure className="still">
          <Image
            src="/images/daisy.jpg"
            alt="Daisy Day, a white candle topped with a wax daisy"
            fill
            sizes="(max-width: 860px) 100vw, 42vw"
          />
          <figcaption>Daisy Day</figcaption>
        </figure>
      </section>

      <section className="wrap" style={{ paddingBottom: "4rem" }}>
        <div className="portrait-break">
          <Image className="fill-img" src="/images/heirloom-knit.jpg" alt="Heirloom Knit, an amber jar candle" fill sizes="100vw" />
          <div className="quote-veil" />
          <p>Warmth you can hold, then set back down on the table.</p>
        </div>
      </section>

      <section className="wrap care-grid" style={{ paddingBottom: "4.5rem" }}>
        <div>
          <p className="eyebrow">Care</p>
          <h2 style={{ margin: "0.7rem 0 0.8rem" }}>A good burn.</h2>
          <p className="lede">A few habits that help a jar candle last and stay even.</p>
        </div>
        <ul className="care-list">
          <li>Trim the wick to about a quarter inch before every light.</li>
          <li>On the first burn, let the wax melt all the way to the glass so the candle doesn’t tunnel.</li>
          <li>Keep it away from drafts, and always within sight. Clear of anything that can catch, and of children and pets.</li>
          <li>Stop when a little wax remains, so the glass doesn’t overheat.</li>
        </ul>
      </section>
    </div>
  );
}
