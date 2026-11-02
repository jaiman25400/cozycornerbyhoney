"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { candlePrice, flavours, formatPrice } from "@/data/candles";
import { site } from "@/lib/site";
import { InstagramIcon } from "@/components/Icons";

export function FlavourOrder({ candleName }: { candleName: string }) {
  const [flavour, setFlavour] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const message = useMemo(() => {
    if (!flavour) return "";
    return `Hi Honey — I'd like a ${candleName}.\nFlavour: ${flavour}.\nPrice: ${formatPrice(candlePrice("design"))}.`;
  }, [candleName, flavour]);

  async function copy() {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="order-box">
      <p className="eyebrow no-rule">Flavour</p>
      <p className="order-lead">The look stays. Pick one scent from the list.</p>
      <div className="flavour-grid" role="group" aria-label="Choose a flavour">
        {flavours.map((item) => {
          const on = item === flavour;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={on}
              className={on ? "chip is-on" : "chip"}
              onClick={() => {
                setFlavour(item);
                setCopied(false);
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
      <p className="order-aside">
        Want a blend of flavours? <Link href="/custom">Mix a custom candle</Link>.
      </p>
      {flavour ? (
        <div className="note-ready" role="status">
          <blockquote>{message}</blockquote>
          <div className="hero-actions">
            <button className="btn btn-line" type="button" onClick={copy}>
              {copied ? "Copied" : "Copy note"}
            </button>
            <a className="btn btn-fill" href={site.dm} target="_blank" rel="noreferrer">
              <InstagramIcon />
              Send on Instagram
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
