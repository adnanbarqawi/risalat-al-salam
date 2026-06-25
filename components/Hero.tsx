"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle particle / light animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,164,93,${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-24"
      style={{ background: "linear-gradient(160deg, var(--green) 0%, #0D2B1E 60%, #0A1F16 100%)" }}
    >
      {/* Animated particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(200,164,93,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10 text-center max-w-3xl mx-auto">
        {/* Bismillah */}
        <div className="animate-fade-in delay-100 flex flex-col items-center gap-2">
          <p className="font-arabic text-2xl md:text-3xl" style={{ color: "var(--gold-light)" }}>
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <p className="transliteration text-sm md:text-base" style={{ color: "rgba(200,164,93,0.8)" }}>
            Bismillāh ar-Raḥmān ar-Raḥīm
          </p>
          <p className="font-display italic text-base" style={{ color: "rgba(232,221,199,0.75)" }}>
            In the name of God, the Most Compassionate, the Most Merciful.
          </p>
        </div>

        <div className="divider-gold animate-fade-in delay-200" />

        {/* Title */}
        <div className="animate-fade-up delay-300 flex flex-col items-center gap-2">
          <h1 className="font-arabic text-5xl md:text-7xl" style={{ color: "var(--ivory)" }}>
            رِسَالَةُ السَّلَامِ
          </h1>
          <p className="transliteration text-base md:text-lg" style={{ color: "rgba(200,164,93,0.85)" }}>
            Risālat as-Salām
          </p>
          <p
            className="font-display text-xl md:text-2xl tracking-[0.18em] uppercase"
            style={{ color: "var(--gold)", letterSpacing: "0.2em" }}
          >
            The Message of Peace
          </p>
        </div>

        <div className="divider-gold animate-fade-in delay-400" />

        {/* Greeting */}
        <div className="animate-fade-up delay-500 flex flex-col items-center gap-2">
          <p className="font-arabic text-xl md:text-2xl" style={{ color: "rgba(232,221,199,0.9)" }}>
            السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ
          </p>
          <p className="transliteration text-sm md:text-base" style={{ color: "rgba(200,164,93,0.8)" }}>
            As-salāmu ʿalaykum wa raḥmatullāhi wa barakātuh
          </p>
          <p className="font-display italic text-base md:text-lg" style={{ color: "rgba(232,221,199,0.75)" }}>
            May the Peace and Mercy and Blessings of God be upon you.
          </p>
        </div>

        {/* Intro text */}
        <div
          className="animate-fade-up delay-700 max-w-xl mx-auto font-display text-base md:text-lg leading-relaxed"
          style={{ color: "rgba(232,221,199,0.82)" }}
        >
          <p className="mb-3">Welcome to The Message of Peace.</p>
          <p className="mb-3">This message is from my heart to yours.</p>
          <p className="mb-3">
            I am sharing with you my calling — a reminder to myself and to anyone who resonates
            with this message.
          </p>
          <p className="mb-3">
            A reminder that we are all one. That all lives are sacred. And that we each have a
            destiny to fulfill.
          </p>
          <p>
            May this message serve as a resource for you as you continue to fulfill your destiny.
          </p>
        </div>

        {/* CTAs */}
        <div className="animate-fade-up delay-900 flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link
            href="/#topics"
            className="font-ui px-8 py-3 rounded-full text-sm tracking-wide transition-all duration-300"
            style={{ background: "var(--gold)", color: "var(--green)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-light)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gold)")}
          >
            Explore Topics
          </Link>
          <Link
            href="/#connect"
            className="font-ui px-8 py-3 rounded-full text-sm tracking-wide border transition-all duration-300"
            style={{ borderColor: "rgba(200,164,93,0.5)", color: "var(--gold)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--gold)";
              e.currentTarget.style.background = "rgba(200,164,93,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(200,164,93,0.5)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Book a Session
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float"
        style={{ color: "rgba(200,164,93,0.5)" }}
      >
        <div
          style={{
            width: 1,
            height: 48,
            background: "linear-gradient(to bottom, transparent, var(--gold))",
          }}
        />
      </div>
    </section>
  );
}
