"use client";

export default function Connect() {
  return (
    <section
      id="connect"
      className="py-24 px-6"
      style={{ background: "var(--ivory)" }}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-8 text-center">
        {/* Header */}
        <span
          className="font-ui text-xs tracking-[0.3em] uppercase"
          style={{ color: "var(--gold)" }}
        >
          One-on-One
        </span>
        <h2
          className="font-display text-4xl md:text-5xl"
          style={{ color: "var(--green)" }}
        >
          Connect
        </h2>
        <div className="divider-gold" />

        <p
          className="font-display italic text-base md:text-lg leading-loose max-w-xl"
          style={{ color: "var(--muted)" }}
        >
          If you feel called to connect more deeply, I welcome the opportunity
          to meet with you.
        </p>
        <p
          className="font-display text-base leading-relaxed max-w-xl"
          style={{ color: "var(--muted)" }}
        >
          Book a one-on-one session using the calendar below. These sessions are
          a sacred space for reflection, guidance, and connection on your unique
          spiritual path.
        </p>

        {/* Cal.com embed */}
        <div
          className="w-full rounded-2xl overflow-hidden mt-4"
          style={{ border: "1px solid rgba(200,164,93,0.25)", minHeight: 550 }}
        >
          {/* Cal.com inline embed — replace YOUR_CAL_USERNAME with your actual Cal.com username */}
          <iframe
            src="https://cal.com/YOUR_CAL_USERNAME?embed=true&theme=light"
            width="100%"
            height="580"
            frameBorder="0"
            title="Book a session"
            style={{ display: "block" }}
          />
        </div>

        {/* Fallback button */}
        <a
          href="https://cal.com/YOUR_CAL_USERNAME"
          target="_blank"
          rel="noopener noreferrer"
          className="font-ui text-sm px-8 py-3 rounded-full transition-all duration-300 inline-block"
          style={{ background: "var(--green)", color: "var(--ivory)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--green-light)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "var(--green)")
          }
        >
          Book a Session →
        </a>
      </div>
    </section>
  );
}
