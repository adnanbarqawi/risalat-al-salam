import { createClient } from "@supabase/supabase-js";

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL      ?? "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(
  url  || "https://placeholder.supabase.co",
  anon || "placeholder",
);

export function supabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "placeholder";
  return createClient(
    url  || "https://placeholder.supabase.co",
    serviceKey,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
