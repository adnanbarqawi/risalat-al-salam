"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import type { Video } from "@/lib/types";
import { Upload, Trash2, Eye, EyeOff, Plus } from "lucide-react";

const TOPICS = [
  { key: "meaning-of-peace",       label: "Peace"       },
  { key: "meaning-of-forgiveness", label: "Forgiveness" },
  { key: "meaning-of-love",        label: "Love"        },
];

const card = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(200,164,93,0.15)",
  borderRadius: 16,
  padding: 20,
};

export default function AdminVideos() {
  const [videos, setVideos]     = useState<Video[]>([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm]         = useState({
    title_en: "", title_ar: "", description_en: "", topic: TOPICS[0].key,
  });
  const videoRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("videos").select("*").order("created_at", { ascending: false });
    setVideos((data as Video[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    const videoFile = videoRef.current?.files?.[0];
    const thumbFile = thumbRef.current?.files?.[0];
    if (!videoFile) return;

    setUploading(true);

    // Upload video
    const videoPath = `videos/${Date.now()}-${videoFile.name}`;
    const { error: vErr } = await supabase.storage
      .from("media")
      .upload(videoPath, videoFile, { contentType: videoFile.type });
    if (vErr) { alert("Video upload failed: " + vErr.message); setUploading(false); return; }

    const videoUrl = supabase.storage.from("media").getPublicUrl(videoPath).data.publicUrl;

    // Optional thumbnail
    let thumbnailUrl: string | null = null;
    if (thumbFile) {
      const thumbPath = `thumbnails/${Date.now()}-${thumbFile.name}`;
      const { error: tErr } = await supabase.storage
        .from("media")
        .upload(thumbPath, thumbFile, { contentType: thumbFile.type });
      if (!tErr) {
        thumbnailUrl = supabase.storage.from("media").getPublicUrl(thumbPath).data.publicUrl;
      }
    }

    await supabase.from("videos").insert({
      ...form,
      video_url: videoUrl,
      thumbnail_url: thumbnailUrl,
      duration: 0,
      published: false,
    });

    setForm({ title_en: "", title_ar: "", description_en: "", topic: TOPICS[0].key });
    setShowForm(false);
    setUploading(false);
    load();
  };

  const togglePublish = async (v: Video) => {
    await supabase.from("videos").update({ published: !v.published }).eq("id", v.id);
    load();
  };

  const deleteVideo = async (v: Video) => {
    if (!confirm(`Delete "${v.title_en}"?`)) return;
    await supabase.from("videos").delete().eq("id", v.id);
    load();
  };

  const inp = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(200,164,93,0.2)",
    borderRadius: 10,
    padding: "10px 14px",
    color: "var(--sand)",
    fontSize: "0.875rem",
    outline: "none",
    width: "100%",
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold" style={{ color: "var(--sand)" }}>Videos</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors"
          style={{ background: "var(--gold)", color: "var(--green)" }}
        >
          <Plus size={15} />
          Upload Video
        </button>
      </div>

      {/* Upload form */}
      {showForm && (
        <div style={card}>
          <h2 className="text-base font-medium mb-5" style={{ color: "var(--gold)" }}>
            New Video
          </h2>
          <form onSubmit={upload} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs block mb-1" style={{ color: "rgba(232,221,199,0.5)" }}>Title (English)</label>
                <input style={inp} required value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} />
              </div>
              <div>
                <label className="text-xs block mb-1" style={{ color: "rgba(232,221,199,0.5)" }}>العنوان (Arabic)</label>
                <input style={{ ...inp, direction: "rtl" }} value={form.title_ar} onChange={(e) => setForm({ ...form, title_ar: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="text-xs block mb-1" style={{ color: "rgba(232,221,199,0.5)" }}>Description</label>
              <textarea
                style={{ ...inp, resize: "vertical" }}
                rows={3}
                value={form.description_en}
                onChange={(e) => setForm({ ...form, description_en: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs block mb-1" style={{ color: "rgba(232,221,199,0.5)" }}>Topic</label>
              <select style={inp} value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
                {TOPICS.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs block mb-1" style={{ color: "rgba(232,221,199,0.5)" }}>
                  <Upload size={12} className="inline mr-1" />
                  Video File (MP4, MOV, WebM)
                </label>
                <input ref={videoRef} type="file" accept="video/*" required style={inp} />
              </div>
              <div>
                <label className="text-xs block mb-1" style={{ color: "rgba(232,221,199,0.5)" }}>
                  Thumbnail (optional)
                </label>
                <input ref={thumbRef} type="file" accept="image/*" style={inp} />
              </div>
            </div>

            <div className="flex gap-3 mt-2">
              <button
                type="submit"
                disabled={uploading}
                className="px-5 py-2.5 rounded-xl text-sm"
                style={{ background: uploading ? "var(--muted)" : "var(--gold)", color: "var(--green)" }}
              >
                {uploading ? "Uploading…" : "Upload & Save"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-xl text-sm"
                style={{ background: "rgba(255,255,255,0.06)", color: "var(--sand)" }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Video list */}
      {loading ? (
        <p className="text-sm" style={{ color: "rgba(232,221,199,0.4)" }}>Loading…</p>
      ) : videos.length === 0 ? (
        <div style={card} className="text-center py-14">
          <p className="text-sm" style={{ color: "rgba(232,221,199,0.35)" }}>
            No videos yet. Upload your first video above.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {videos.map((v) => (
            <div key={v.id} className="flex items-center gap-4" style={card}>
              {/* Thumbnail */}
              <div
                className="w-24 h-14 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.4)" }}
              >
                {v.thumbnail_url
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={v.thumbnail_url} alt="" className="w-full h-full object-cover" />
                  : <span style={{ color: "rgba(232,221,199,0.2)", fontSize: 22 }}>▷</span>
                }
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: "var(--sand)" }}>
                  {v.title_en}
                </p>
                <p className="text-xs mt-0.5 truncate" style={{ color: "rgba(232,221,199,0.4)" }}>
                  {TOPICS.find((t) => t.key === v.topic)?.label ?? v.topic}
                </p>
              </div>

              {/* Status */}
              <span
                className="text-xs px-2.5 py-1 rounded-full flex-shrink-0"
                style={{
                  background: v.published ? "rgba(39,174,96,0.15)" : "rgba(255,255,255,0.06)",
                  color: v.published ? "#2ecc71" : "rgba(232,221,199,0.4)",
                }}
              >
                {v.published ? "Published" : "Draft"}
              </span>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => togglePublish(v)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                  title={v.published ? "Unpublish" : "Publish"}
                >
                  {v.published
                    ? <EyeOff size={14} style={{ color: "rgba(232,221,199,0.5)" }} />
                    : <Eye size={14} style={{ color: "var(--gold)" }} />
                  }
                </button>
                <button
                  onClick={() => deleteVideo(v)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                  title="Delete"
                >
                  <Trash2 size={14} style={{ color: "#e74c3c" }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
