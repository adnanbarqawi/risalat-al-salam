"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AdminVideos from "./videos/AdminVideos";
import AdminSubmissions from "./submissions/AdminSubmissions";
import { LogOut, Video, Mail, Home } from "lucide-react";
import Link from "next/link";

type Tab = "videos" | "submissions";

export default function AdminPage() {
  const [session, setSession] = useState<boolean | null>(null);
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab]           = useState<Tab>("videos");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(!!s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setLoginError(error.message);
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  if (session === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--gold)" }} />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div
          className="w-full max-w-sm rounded-2xl p-10 flex flex-col gap-6"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,164,93,0.2)" }}
        >
          <div className="text-center">
            <p className="font-arabic text-2xl mb-1" style={{ color: "var(--gold)" }}>رسالة السلام</p>
            <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(232,221,199,0.4)" }}>
              Admin Dashboard
            </p>
          </div>

          <form onSubmit={login} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-3 rounded-xl text-sm outline-none"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(200,164,93,0.2)",
                color: "var(--sand)",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-4 py-3 rounded-xl text-sm outline-none"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(200,164,93,0.2)",
                color: "var(--sand)",
              }}
            />
            {loginError && (
              <p className="text-xs text-center" style={{ color: "#e74c3c" }}>{loginError}</p>
            )}
            <button
              type="submit"
              className="py-3 rounded-xl text-sm font-medium transition-colors duration-200"
              style={{ background: "var(--gold)", color: "var(--green)" }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className="w-56 flex-shrink-0 flex flex-col py-8 px-4 gap-2"
        style={{ background: "rgba(0,0,0,0.3)", borderRight: "1px solid rgba(200,164,93,0.12)" }}
      >
        <div className="mb-6 px-2">
          <p className="font-arabic text-lg" style={{ color: "var(--gold)" }}>رسالة السلام</p>
          <p className="text-xs" style={{ color: "rgba(232,221,199,0.35)" }}>Admin</p>
        </div>

        {(["videos", "submissions"] as Tab[]).map((t) => {
          const Icon = t === "videos" ? Video : Mail;
          const label = t === "videos" ? "Videos" : "Submissions";
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all duration-150"
              style={{
                background: tab === t ? "rgba(200,164,93,0.15)" : "transparent",
                color: tab === t ? "var(--gold)" : "rgba(232,221,199,0.5)",
              }}
            >
              <Icon size={15} />
              {label}
            </button>
          );
        })}

        <div className="mt-auto flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors"
            style={{ color: "rgba(232,221,199,0.4)" }}
          >
            <Home size={15} /> View Site
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors"
            style={{ color: "rgba(232,221,199,0.4)" }}
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-auto">
        {tab === "videos"      && <AdminVideos />}
        {tab === "submissions" && <AdminSubmissions />}
      </main>
    </div>
  );
}
