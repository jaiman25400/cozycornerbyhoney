"use client";

import { useMemo, useState } from "react";
import { site } from "@/lib/site";
import { ArrowIcon } from "@/components/Icons";

export function ContactForm({ candles }: { candles: string[] }) {
  const [name, setName] = useState("");
  const [candle, setCandle] = useState("Not sure yet");
  const [note, setNote] = useState("");
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = useMemo(() => {
    const lines = [
      `Hi Honey — this is ${name}.`,
      `I'd like to ask about: ${candle}.`,
      note.trim() ? `\n${note.trim()}` : "",
    ];
    return lines.filter(Boolean).join("\n");
  }, [name, candle, note]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReady(true);
    setCopied(false);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="contact-card">
      <form onSubmit={onSubmit} className="form">
        <label className="field">
          <span>Your name</span>
          <input
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setReady(false);
            }}
          />
        </label>
        <label className="field">
          <span>Candle</span>
          <select
            name="candle"
            value={candle}
            onChange={(event) => {
              setCandle(event.target.value);
              setReady(false);
            }}
          >
            <option>Not sure yet</option>
            {candles.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Note</span>
          <textarea
            name="note"
            required
            placeholder="A scent you love, a room, a gift, a question."
            value={note}
            onChange={(event) => {
              setNote(event.target.value);
              setReady(false);
            }}
          />
        </label>
        <button className="btn btn-fill" type="submit">
          Prepare my note
          <ArrowIcon />
        </button>
      </form>

      {ready ? (
        <div className="note-ready" role="status">
          <p className="eyebrow no-rule">Ready to send</p>
          <p>
            Instagram can’t open with this note already typed. Copy it, then paste it into Honey’s
            messages.
          </p>
          <blockquote>{message}</blockquote>
          <div className="hero-actions">
            <button className="btn btn-line" type="button" onClick={copy}>
              {copied ? "Copied" : "Copy note"}
            </button>
            <a className="btn btn-fill" href={site.dm} target="_blank" rel="noreferrer">
              Open Instagram
              <ArrowIcon />
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
