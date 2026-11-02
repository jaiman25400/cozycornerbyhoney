"use client";

import { useMemo, useState } from "react";
import { candlePrice, flavours, formatPrice } from "@/data/candles";
import { evenSplit, setShare } from "@/lib/mix";
import { site } from "@/lib/site";
import { InstagramIcon } from "@/components/Icons";

const MAX_FLAVOURS = 3;

export function CustomBuilder() {
  const [picked, setPicked] = useState<string[]>([]);
  const [shares, setShares] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);
  const price = formatPrice(candlePrice("design"));

  const message = useMemo(() => {
    if (picked.length === 0) return "";
    const mix = picked.map((name) => `${name} ${shares[name] ?? 0}%`).join(", ");
    return `Hi Honey — I'd like a custom candle.\nFlavours: ${mix}.\nPrice: ${price}.`;
  }, [picked, shares, price]);

  function toggleFlavour(name: string) {
    setCopied(false);
    setPicked((current) => {
      const has = current.includes(name);
      if (has) {
        const next = current.filter((item) => item !== name);
        setShares(evenSplit(next));
        return next;
      }
      if (current.length >= MAX_FLAVOURS) return current;
      const next = [...current, name];
      setShares(evenSplit(next));
      return next;
    });
  }

  async function copy() {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const full = picked.length >= MAX_FLAVOURS;

  return (
    <div className="order-box">
      <section>
        <p className="eyebrow no-rule">Flavours</p>
        <p className="order-lead">
          Choose up to three. One scent is the whole candle. Two or three split the wax, and the
          shares always add up to 100%.
        </p>
        <div className="flavour-grid" role="group" aria-label="Choose flavours">
          {flavours.map((item) => {
            const on = picked.includes(item);
            const blocked = full && !on;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={on}
                disabled={blocked}
                className={on ? "chip is-on" : "chip"}
                onClick={() => toggleFlavour(item)}
              >
                {item}
              </button>
            );
          })}
        </div>
      </section>

      {picked.length > 0 ? (
        <section className="mix-list" aria-label="Flavour shares">
          {picked.map((name) => (
            <div className="mix-row" key={name}>
              <div>
                <div className="mix-label">
                  <span>{name}</span>
                  <strong>{shares[name]}%</strong>
                </div>
                {picked.length > 1 ? (
                  <input
                    type="range"
                    min={10}
                    max={100 - (picked.length - 1) * 10}
                    step={5}
                    value={shares[name] ?? 0}
                    aria-label={`${name} share`}
                    onChange={(event) => {
                      setCopied(false);
                      setShares(setShare(shares, name, Number(event.target.value)));
                    }}
                  />
                ) : null}
              </div>
            </div>
          ))}
          <p className="mix-total">
            {picked.reduce((sum, name) => sum + (shares[name] ?? 0), 0)}% of the candle
          </p>
        </section>
      ) : null}

      {message ? (
        <div className="note-ready" role="status">
          <p className="eyebrow no-rule">Ready to send</p>
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
