"use client";

import Link from "next/link";

const topics = [
  {
    slug: "meaning-of-peace",
    arabic: "السَّلَام",
    transliteration: "As-Salām",
    english: "Peace",
    excerpt:
      "Peace is not merely the absence of conflict — it is a profound state of wholeness, harmony, and alignment with the Divine.",
    icon: "☽",
  },
  {
    slug: "meaning-of-forgiveness",
    arabic: "التَّسَامُح",
    transliteration: "At-Tasāmuḥ",
    english: "Forgiveness",
    excerpt:
      "Forgiveness is one of the most courageous acts of the human spirit — the choice to release resentment, restore peace within, and open the heart to healing and renewal.",
    icon: "✦",
  },
  {
    slug: "meaning-of-love",
    arabic: "الْمَحَبَّة",
    transliteration: "Al-Maḥabbah",
    english: "Love",
    excerpt:
      "Love is the original language of the soul — the force that connects all of creation back to its source.",
    icon: "◇",
  },
];

export default function Topics() {
  return (
    <section
      id="topics"
      className="py-24 px-6"
      style={{ background: "var(--ivory)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 flex flex-col items-center gap-4">
          <span
            className="font-ui text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--gold)" }}
          >
            Explore
          </span>
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: "var(--green)" }}>
            Topics
          </h2>
          <div className="divider-gold" />
          <p
            className="font-display italic text-base md:text-lg max-w-xl"
            style={{ color: "var(--muted)" }}
          >
            Three pillars of the spiritual journey, offered as a resource for
            reflection and growth.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topics.map((topic, i) => (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="group relative flex flex-col items-center text-center rounded-2xl p-10 transition-all duration-300"
              style={{
                background: "var(--sand)",
                border: "1px solid rgba(200,164,93,0.2)",
                animationDelay: `${i * 0.15}s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--gold)";
                el.style.boxShadow = "0 12px 40px rgba(31,77,58,0.12)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(200,164,93,0.2)";
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-6"
                style={{ background: "var(--green)", color: "var(--gold)" }}
              >
                {topic.icon}
              </div>

              {/* Arabic title */}
              <p
                className="font-arabic text-3xl mb-1"
                style={{ color: "var(--green)" }}
              >
                {topic.arabic}
              </p>

              {/* Transliteration */}
              <p
                className="transliteration text-sm mb-2"
                style={{ color: "var(--green)", opacity: 0.72 }}
              >
                {topic.transliteration}
              </p>

              {/* English title */}
              <h3
                className="font-display text-lg mb-4"
                style={{ color: "var(--green)" }}
              >
                {topic.english}
              </h3>

              <div className="divider-gold mb-5" />

              {/* Excerpt */}
              <p
                className="font-display italic text-base leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {topic.excerpt}
              </p>

              {/* Arrow */}
              <span
                className="mt-6 font-ui text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ color: "var(--gold)" }}
              >
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
