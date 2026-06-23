"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#topics",   label: "Topics" },
  { href: "/#videos",   label: "Videos" },
  { href: "/#about",    label: "About" },
  { href: "/#connect",  label: "Connect" },
  { href: "/#contact",  label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        backgroundColor: scrolled ? "rgba(250,248,242,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(200,164,93,0.2)" : "none",
        transition: "all 0.4s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start leading-tight">
          <span
            className="font-arabic text-lg"
            style={{ color: "var(--green)", lineHeight: 1.3 }}
          >
            رسالة السلام
          </span>
          <span
            className="font-display text-xs tracking-[0.2em] uppercase"
            style={{ color: "var(--gold)", letterSpacing: "0.18em" }}
          >
            The Message of Peace
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-ui text-sm tracking-wide transition-colors duration-200"
              style={{ color: "var(--muted)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--gold)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted)")
              }
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#connect"
            className="font-ui text-sm px-5 py-2 rounded-full transition-all duration-200"
            style={{
              background: "var(--green)",
              color: "var(--ivory)",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--green-light)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--green)")
            }
          >
            Book a Session
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{ color: "var(--green)" }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden py-6 px-6 flex flex-col gap-5 border-t"
          style={{
            background: "var(--ivory)",
            borderColor: "rgba(200,164,93,0.2)",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-ui text-base"
              style={{ color: "var(--muted)" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#connect"
            className="font-ui text-sm px-5 py-2.5 rounded-full text-center mt-2"
            style={{ background: "var(--green)", color: "var(--ivory)" }}
            onClick={() => setOpen(false)}
          >
            Book a Session
          </Link>
        </div>
      )}
    </header>
  );
}
