"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{ background: "var(--green)", color: "var(--sand)" }}
      className="py-14 px-6"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 text-center">
        <div className="divider-gold" />

        <div className="flex flex-col items-center gap-1">
          <span className="font-arabic text-2xl" style={{ color: "var(--gold-light)" }}>
            رِسَالَةُ السَّلَامِ
          </span>
          <span
            className="font-display text-xs tracking-[0.22em] uppercase"
            style={{ color: "rgba(232,221,199,0.7)", letterSpacing: "0.2em" }}
          >
            The Message of Peace
          </span>
        </div>

        <nav className="flex flex-wrap justify-center gap-6">
          {[
            { href: "/#topics",  label: "Topics"  },
            { href: "/#videos",  label: "Videos"  },
            { href: "/#about",   label: "About"   },
            { href: "/#connect", label: "Connect" },
            { href: "/#contact", label: "Contact" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-ui text-xs tracking-wide transition-colors duration-200"
              style={{ color: "rgba(232,221,199,0.7)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--gold-light)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(232,221,199,0.7)")
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-1 mt-2">
          <p
            className="font-arabic text-base"
            style={{ color: "rgba(232,221,199,0.8)" }}
          >
            السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ
          </p>
          <p
            className="transliteration text-xs"
            style={{ color: "rgba(200,164,93,0.65)" }}
          >
            As-salāmu ʿalaykum wa raḥmatullāhi wa barakātuh
          </p>
        </div>

        <p
          className="font-ui text-xs mt-2"
          style={{ color: "rgba(232,221,199,0.4)" }}
        >
          © {new Date().getFullYear()} The Message of Peace. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
