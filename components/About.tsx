export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-6"
      style={{ background: "var(--sand)" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-14 md:gap-20">
        {/* Portrait */}
        <div className="flex-shrink-0 flex flex-col items-center gap-4">
          <div
            className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden flex items-center justify-center"
            style={{ border: "3px solid var(--gold)", background: "var(--ivory)" }}
          >
            {/* Portrait placeholder — replace src with actual photo */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ color: "var(--green)" }}
            >
              <circle cx="50" cy="38" r="20" fill="currentColor" opacity="0.3" />
              <ellipse cx="50" cy="85" rx="32" ry="22" fill="currentColor" opacity="0.2" />
            </svg>
          </div>
          <p
            className="font-ui text-xs tracking-widest uppercase text-center"
            style={{ color: "var(--muted)" }}
          >
            Portrait coming soon
          </p>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-6">
          <span
            className="font-ui text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--gold)" }}
          >
            About
          </span>
          <h2
            className="font-display text-4xl md:text-5xl"
            style={{ color: "var(--green)" }}
          >
            About Me
          </h2>
          <div className="divider-gold" style={{ margin: "0" }} />

          <div
            className="font-display text-base md:text-lg leading-loose flex flex-col gap-4"
            style={{ color: "var(--muted)" }}
          >
            <p>
              I believe that we each have the ability to connect directly,
              personally, and intimately with God.
            </p>
            <p>
              Each of our paths is as unique as our fingerprints.
            </p>
            <p>
              I am passionate about sharing insights and holding space for you
              as you continue on your own path.
            </p>
          </div>

          <blockquote
            className="pl-5 py-2 font-display italic text-base md:text-lg"
            style={{
              borderLeft: "3px solid var(--gold)",
              color: "var(--green)",
            }}
          >
            &ldquo;When we are actively fulfilling our destiny, we experience
            fulfillment.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
