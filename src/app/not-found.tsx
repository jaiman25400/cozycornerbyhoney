import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="missing">
      <div>
        <p className="eyebrow">404</p>
        <h1>This page has burned out.</h1>
        <Link className="btn btn-fill" href="/">
          Back home
        </Link>
      </div>
    </div>
  );
}
