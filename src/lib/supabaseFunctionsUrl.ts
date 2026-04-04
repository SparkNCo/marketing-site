/** All Supabase Edge Functions live under `${PUBLIC_SUPABASE_URL}/functions/v1`. */
export function supabaseFunctionsUrl(path: string): string {
  const base = import.meta.env.PUBLIC_SUPABASE_URL?.trim();
  if (!base) {
    throw new Error("PUBLIC_SUPABASE_URL is not configured");
  }
  const root = `${base.replace(/\/$/, "")}/functions/v1`;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${root}${p}`;
}
