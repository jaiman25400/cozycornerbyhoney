"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { InstagramIcon } from "@/components/Icons";

const links = [
  { href: "/shop", label: "Collection" },
  { href: "/custom", label: "Custom" },
  { href: "/about", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

function isCurrent(pathname: string, href: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  const target = href.replace(/\/$/, "") || "/";
  return path === target || path.startsWith(`${target}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header className={scrolled ? "header is-scrolled" : "header"}>
      <div className="header-bar">
        <Link href="/" className="logo" aria-label={`${site.fullName} home`}>
          <span className="flame" aria-hidden="true" />
          <span>
            <strong>{site.name}</strong>
            <em>{site.byline}</em>
          </span>
        </Link>

        <nav className="desk-nav" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-end">
          <a className="btn btn-fill btn-sm desk-ig" href={site.instagram} target="_blank" rel="noreferrer">
            <InstagramIcon />
            Instagram
          </a>
          <button
            type="button"
            className={open ? "menu-btn is-open" : "menu-btn"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="bars" aria-hidden="true">
              <i />
              <i />
            </span>
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
    </header>

      <nav
        id="mobile-nav"
        className={open ? "mobile-nav is-open" : "mobile-nav"}
        aria-label="Mobile"
        aria-hidden={!open}
        inert={!open}
      >
        <p className="mobile-nav-label">Menu</p>
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            style={{ transitionDelay: open ? `${80 + index * 50}ms` : "0ms" }}
            aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
        <a href={site.instagram} target="_blank" rel="noreferrer">
          Instagram
        </a>
      </nav>
    </>
  );
}
