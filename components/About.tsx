const arabicInline: React.CSSProperties = {
  fontFamily: "Amiri, 'Traditional Arabic', serif",
  fontSize: "1.15em",
  lineHeight: "1.4",
};

const translit: React.CSSProperties = {
  fontFamily: "Cormorant Garamond, Georgia, serif",
  fontStyle: "italic",
  fontSize: "0.9em",
  color: "var(--green)",
  opacity: 0.72,
  letterSpacing: "0.03em",
};

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
            className="font-display text-lg md:text-xl leading-loose flex flex-col gap-5"
            style={{ color: "var(--muted)" }}
          >
            <p>
              My name is{" "}
              <span style={arabicInline}>عَدْنَان</span>{" "}
              <span style={translit}>(Adnān)</span>. My mother was born in{" "}
              <span style={arabicInline}>غَزَّة</span>{" "}
              <span style={translit}>(Ghazzah / Gaza)</span>, and my father was
              born in{" "}
              <span style={arabicInline}>طُولْ كَرَم</span>{" "}
              <span style={translit}>(Ṭūl Karm / Tulkarm)</span>.
            </p>

            <p>
              My greatest passion is seeking{" "}
              <span style={arabicInline}>ٱللَّٰه</span>{" "}
              <span style={translit}>(Allāh)</span>. I love God with all my
              heart.
            </p>

            <p>
              Throughout my life, I have been deeply committed to answering two
              questions:
            </p>

            <ul className="list-none flex flex-col gap-3 pl-2">
              <li className="flex items-start gap-3">
                <span style={{ color: "var(--gold)", marginTop: "0.3em", flexShrink: 0 }}>✦</span>
                <span>How can I become the best version of myself?</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: "var(--gold)", marginTop: "0.3em", flexShrink: 0 }}>✦</span>
                <span>How can I fulfill the purpose for which I was created?</span>
              </li>
            </ul>

            <p>
              That lifelong journey of seeking and reflection is what inspired
              me to create and share this message with you.
            </p>

            <p>
              If you are searching for your purpose, I would be honored to help
              guide you. Together, we can cultivate a personal, intimate, and
              direct relationship with God — rooted in sincerity, reflection,
              and love.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
