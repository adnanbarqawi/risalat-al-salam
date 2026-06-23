import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";

const schema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  message: z.string().min(10).max(5000),
});

// Basic honeypot / rate-limit via header
const RATE_LIMIT_WINDOW = 60_000;
const ipTimestamps = new Map<string, number>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const last = ipTimestamps.get(ip) ?? 0;

  if (now - last < RATE_LIMIT_WINDOW) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }
  ipTimestamps.set(ip, now);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed." }, { status: 422 });
  }

  const { name, email, message } = parsed.data;

  const admin = supabaseAdmin();
  const { error } = await admin.from("contact_submissions").insert({
    name,
    email,
    message,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Failed to save message." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
