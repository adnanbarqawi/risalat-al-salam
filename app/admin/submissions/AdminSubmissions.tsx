"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { ContactSubmission } from "@/lib/types";
import { Mail, MailOpen, Trash2 } from "lucide-react";

const card = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(200,164,93,0.15)",
  borderRadius: 14,
  padding: "16px 20px",
};

export default function AdminSubmissions() {
  const [items, setItems]   = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setItems((data as ContactSubmission[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: string, read: boolean) => {
    await supabase.from("contact_submissions").update({ read }).eq("id", id);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    await supabase.from("contact_submissions").delete().eq("id", id);
    load();
  };

  const unread = items.filter((i) => !i.read).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold" style={{ color: "var(--sand)" }}>
          Contact Submissions
        </h1>
        {unread > 0 && (
          <span
            className="text-xs px-2.5 py-1 rounded-full"
            style={{ background: "var(--gold)", color: "var(--green)" }}
          >
            {unread} new
          </span>
        )}
      </div>

      {loading ? (
        <p className="text-sm" style={{ color: "rgba(232,221,199,0.4)" }}>Loading…</p>
      ) : items.length === 0 ? (
        <div style={card} className="text-center py-14">
          <p className="text-sm" style={{ color: "rgba(232,221,199,0.35)" }}>
            No messages yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.id} style={{ ...card, opacity: item.read ? 0.65 : 1 }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium" style={{ color: "var(--sand)" }}>
                      {item.name}
                    </span>
                    {!item.read && (
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: "var(--gold)" }}
                      />
                    )}
                  </div>
                  <a
                    href={`mailto:${item.email}`}
                    className="text-xs"
                    style={{ color: "var(--gold)" }}
                  >
                    {item.email}
                  </a>
                  <p
                    className="text-sm mt-3 leading-relaxed whitespace-pre-wrap"
                    style={{ color: "rgba(232,221,199,0.7)" }}
                  >
                    {item.message}
                  </p>
                  <p
                    className="text-xs mt-3"
                    style={{ color: "rgba(232,221,199,0.3)" }}
                  >
                    {new Date(item.created_at).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => markRead(item.id, !item.read)}
                    className="p-2 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                    title={item.read ? "Mark unread" : "Mark read"}
                  >
                    {item.read
                      ? <Mail size={14} style={{ color: "rgba(232,221,199,0.4)" }} />
                      : <MailOpen size={14} style={{ color: "var(--gold)" }} />
                    }
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="p-2 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                    title="Delete"
                  >
                    <Trash2 size={14} style={{ color: "#e74c3c" }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
