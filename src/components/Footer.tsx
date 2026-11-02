import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-mark">
            Cozy Corner
            <span>by Honey</span>
          </p>
          <p className="footer-note">
            A small candle studio. This site is the front of the shop — jars are reserved on Instagram
            until checkout lives here.
          </p>
        </div>
        <div>
          <p className="footer-label">Visit</p>
          <a href={site.instagram} target="_blank" rel="noreferrer">
            @{site.handle}
          </a>
          <a href={site.dm} target="_blank" rel="noreferrer">
            Message Honey
          </a>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          <Link href="/shop">Collection</Link>
          <Link href="/custom">Custom</Link>
          <Link href="/about">The studio</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <p className="footer-label">A note</p>
          <p className="footer-note">
            Ordering, pricing, and delivery are confirmed on Instagram.
          </p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>© {new Date().getFullYear()} {site.fullName}</p>
      </div>
    </footer>
  );
}
