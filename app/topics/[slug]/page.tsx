import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

const topicData: Record<
  string,
  {
    arabic: string;
    english: string;
    subtitle: string;
    intro: string;
    reflections: string[];
  }
> = {
  "meaning-of-peace": {
    arabic: "مَعْنَى السَّلَامِ",
    english: "Meaning of Peace",
    subtitle:
      "Peace is not merely the absence of conflict — it is a profound state of wholeness, harmony, and alignment with the Divine.",
    intro:
      "The Arabic word 'السَّلَام' (Al-Salam) is one of the 99 Names of God — Al-Salam, the Source of Peace. Peace is not an external condition to be achieved; it is an inner reality to be uncovered. This section is a growing resource of teachings, reflections, and insights on the nature of peace.",
    reflections: [
      "True peace begins within — when the heart finds rest in the remembrance of God.",
      "Peace is the natural state of the soul when it is aligned with its purpose.",
      "Outer peace flows from inner peace; the world reflects the condition of our hearts.",
    ],
  },
  "meaning-of-forgiveness": {
    arabic: "مَعْنَى الْمَغْفِرَةِ",
    english: "Meaning of Forgiveness",
    subtitle:
      "Forgiveness is one of the greatest acts of courage. It liberates the soul and opens the heart to healing and renewal.",
    intro:
      "In Arabic, 'المَغْفِرَة' (Al-Maghfira) speaks to a covering and protection — God's forgiveness wraps the soul in mercy. Forgiving others is not condoning harm; it is releasing the weight that no longer serves you. This section will grow with teachings, stories, and practices on the transformative power of forgiveness.",
    reflections: [
      "Forgiveness is a gift you give yourself before it is a gift you give another.",
      "The capacity to forgive is a reflection of how deeply we have received forgiveness ourselves.",
      "Every act of genuine forgiveness is an act of healing for the entire world.",
    ],
  },
  "meaning-of-love": {
    arabic: "مَعْنَى الْمَحَبَّةِ",
    english: "Meaning of Love",
    subtitle:
      "Love is the original language of the soul — the force that connects all of creation back to its source.",
    intro:
      "The Arabic root 'حُبّ' (Hubb) speaks to a seed buried in the heart that, when nurtured, grows into the greatest force in existence. Divine love — المَحَبَّة الإلهية — is the foundation of all creation. This section will be a sanctuary for exploring love in its highest, most expansive form.",
    reflections: [
      "To love is to recognize the Divine in another — to see God's reflection in every soul.",
      "Love without boundaries is not attachment; it is the closest we come to Divine nature.",
      "The deepest love returns us to our origin — back to the One who created love itself.",
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = topicData[slug];
  if (!topic) return {};
  return {
    title: `${topic.english} | رسالة السلام`,
    description: topic.subtitle,
  };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = topicData[slug];
  if (!topic) notFound();

  return (
    <>
      <Navigation />
      <main style={{ background: "var(--ivory)" }}>
        {/* Hero */}
        <section
          className="pt-32 pb-20 px-6 text-center"
          style={{
            background:
              "linear-gradient(160deg, var(--green) 0%, #0D2B1E 100%)",
          }}
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
            <Link
              href="/#topics"
              className="font-ui text-xs tracking-widest uppercase transition-colors"
              style={{ color: "rgba(200,164,93,0.7)" }}
            >
              ← Back to Topics
            </Link>
            <h1
              className="font-arabic text-5xl md:text-6xl"
              style={{ color: "var(--ivory)" }}
            >
              {topic.arabic}
            </h1>
            <p
              className="font-display text-xl md:text-2xl tracking-wide"
              style={{ color: "var(--gold)" }}
            >
              {topic.english}
            </p>
            <div className="divider-gold" />
            <p
              className="font-display italic text-base md:text-lg max-w-xl"
              style={{ color: "rgba(232,221,199,0.75)" }}
            >
              {topic.subtitle}
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 px-6 max-w-3xl mx-auto">
          <p
            className="font-display text-lg md:text-xl leading-loose text-center"
            style={{ color: "var(--text)" }}
          >
            {topic.intro}
          </p>
        </section>

        {/* Reflections */}
        <section
          className="py-16 px-6"
          style={{ background: "var(--sand)" }}
        >
          <div className="max-w-3xl mx-auto">
            <h2
              className="font-display text-3xl md:text-4xl text-center mb-10"
              style={{ color: "var(--green)" }}
            >
              Reflections
            </h2>
            <div className="flex flex-col gap-6">
              {topic.reflections.map((r, i) => (
                <blockquote
                  key={i}
                  className="pl-6 py-4"
                  style={{ borderLeft: "3px solid var(--gold)" }}
                >
                  <p
                    className="font-display italic text-lg leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    &ldquo;{r}&rdquo;
                  </p>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Coming soon videos */}
        <section className="py-16 px-6 text-center">
          <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
              style={{ background: "var(--sand)", color: "var(--gold)" }}
            >
              ▷
            </div>
            <h3
              className="font-display text-2xl"
              style={{ color: "var(--green)" }}
            >
              Videos & Teachings
            </h3>
            <p
              className="font-display italic text-base"
              style={{ color: "var(--muted)" }}
            >
              In-depth teachings and reflections on this topic are being prepared
              and will be shared here soon.
            </p>
            <Link
              href="/#connect"
              className="font-ui text-sm px-6 py-2.5 rounded-full mt-2"
              style={{ background: "var(--green)", color: "var(--ivory)" }}
            >
              Connect for Personal Guidance
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
