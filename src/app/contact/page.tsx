import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { InstagramIcon } from "@/components/Icons";
import { candles } from "@/data/candles";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order a handmade candle",
  description:
    "Ask Cozy Corner by Honey about a handmade candle, a homemade gift, or a scent for your room. Reserve the jar on Instagram.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Contact"
        title="Send a note."
        lede="Tell Honey which jar you’re curious about. This form prepares the message — it doesn’t charge a card or place an order by itself."
      />
      <section className="wrap contact-grid" style={{ paddingBottom: "4.5rem", alignItems: "start" }}>
        <div className="prose">
          <p>
            The fastest reply is on Instagram. Mention the candle name, whether it’s a gift, and
            anything the room should smell like.
          </p>
          <p>
            <a href={site.instagram} target="_blank" rel="noreferrer">
              @{site.handle}
            </a>
          </p>
          <div className="hero-actions">
            <a className="btn btn-line" href={site.dm} target="_blank" rel="noreferrer">
              <InstagramIcon />
              Message directly
            </a>
          </div>
        </div>
        <ContactForm candles={[...candles.map((candle) => candle.name), "A custom mix"]} />
      </section>
    </div>
  );
}
