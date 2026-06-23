"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Play } from "lucide-react";

type Video = {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  thumbnail_url: string | null;
  topic: string;
  duration: number;
};

export default function VideoLibrary({ videos }: { videos: Video[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const topics = [
    { key: "all",                 label: "All"         },
    { key: "meaning-of-peace",    label: "Peace"       },
    { key: "meaning-of-forgiveness", label: "Forgiveness" },
    { key: "meaning-of-love",     label: "Love"        },
  ];

  const filtered = videos.filter((v) => {
    const matchesTopic = filter === "all" || v.topic === filter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      v.title_en.toLowerCase().includes(q) ||
      v.description_en.toLowerCase().includes(q);
    return matchesTopic && matchesSearch;
  });

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <section
      id="videos"
      className="py-24 px-6"
      style={{ background: "var(--green)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 flex flex-col items-center gap-4">
          <span
            className="font-ui text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--gold)" }}
          >
            Watch &amp; Reflect
          </span>
          <h2
            className="font-display text-4xl md:text-5xl"
            style={{ color: "var(--ivory)" }}
          >
            Video Library
          </h2>
          <div className="divider-gold" />
          <p
            className="font-display italic text-base max-w-md"
            style={{ color: "rgba(232,221,199,0.65)" }}
          >
            Teachings, reflections, and insights — available whenever you need them.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "rgba(232,221,199,0.4)" }}
            />
            <input
              type="text"
              placeholder="Search videos…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl font-ui text-sm outline-none"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(200,164,93,0.2)",
                color: "var(--ivory)",
              }}
            />
          </div>

          {/* Topic filters */}
          <div className="flex gap-2 flex-wrap">
            {topics.map((t) => (
              <button
                key={t.key}
                onClick={() => setFilter(t.key)}
                className="font-ui text-xs px-4 py-2 rounded-full transition-all duration-200"
                style={{
                  background: filter === t.key ? "var(--gold)" : "rgba(255,255,255,0.06)",
                  color: filter === t.key ? "var(--green)" : "rgba(232,221,199,0.7)",
                  border: "1px solid",
                  borderColor: filter === t.key ? "var(--gold)" : "rgba(200,164,93,0.2)",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center gap-4">
            {videos.length === 0 ? (
              <>
                <span
                  className="font-ui text-xs tracking-[0.25em] uppercase px-4 py-1.5 rounded-full"
                  style={{
                    background: "rgba(200,164,93,0.12)",
                    color: "var(--gold)",
                    border: "1px solid rgba(200,164,93,0.3)",
                  }}
                >
                  In Progress
                </span>
                <p
                  className="font-display italic text-xl"
                  style={{ color: "rgba(232,221,199,0.75)" }}
                >
                  Videos are on their way.
                </p>
                <p
                  className="font-ui text-sm max-w-xs"
                  style={{ color: "rgba(232,221,199,0.4)" }}
                >
                  Stay tuned — teachings and reflections will be uploaded here soon.
                </p>
              </>
            ) : (
              <p
                className="font-display italic text-lg"
                style={{ color: "rgba(232,221,199,0.4)" }}
              >
                No videos match your search.
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((v) => (
              <VideoCard key={v.id} video={v} fmt={fmt} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            href="/videos"
            className="font-ui text-sm px-8 py-3 rounded-full border transition-all duration-200 inline-block"
            style={{
              borderColor: "rgba(200,164,93,0.4)",
              color: "var(--gold)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(200,164,93,0.1)";
              e.currentTarget.style.borderColor = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(200,164,93,0.4)";
            }}
          >
            View All Videos →
          </Link>
        </div>
      </div>
    </section>
  );
}

function VideoCard({
  video,
  fmt,
}: {
  video: Video;
  fmt: (s: number) => string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300 cursor-pointer group"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(200,164,93,0.15)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(200,164,93,0.4)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(200,164,93,0.15)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Thumbnail / player */}
      <div
        className="relative aspect-video flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.4)" }}
        onClick={() => setPlaying(true)}
      >
        {playing ? (
          <video
            src={video.thumbnail_url ?? undefined}
            controls
            autoPlay
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            {video.thumbnail_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={video.thumbnail_url}
                alt={video.title_en}
                className="w-full h-full object-cover absolute inset-0"
              />
            )}
            <div
              className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: "rgba(200,164,93,0.9)" }}
            >
              <Play size={22} style={{ color: "var(--green)" }} />
            </div>
            {video.duration > 0 && (
              <span
                className="absolute bottom-2 right-3 font-ui text-xs px-2 py-0.5 rounded"
                style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}
              >
                {fmt(video.duration)}
              </span>
            )}
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-2">
        <p className="font-arabic text-base" style={{ color: "var(--gold-light)", lineHeight: 1.6 }}>
          {video.title_ar}
        </p>
        <h3 className="font-display text-base" style={{ color: "var(--ivory)" }}>
          {video.title_en}
        </h3>
        <p
          className="font-ui text-xs leading-relaxed line-clamp-2"
          style={{ color: "rgba(232,221,199,0.55)" }}
        >
          {video.description_en}
        </p>
      </div>
    </div>
  );
}
