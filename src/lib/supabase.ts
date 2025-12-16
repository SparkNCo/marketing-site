// src/lib/supabase/client.ts
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createClient() {
  const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase environment variables are missing!");
  }
  return createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
