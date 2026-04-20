import { supabaseFunctionsUrl } from "./supabaseFunctionsUrl";

/**
 * Shared Contentful fetch via Supabase Edge Function `contentfull`.
 * @see Post1Client, blog/[slug].astro
 */

/** Content type for /post-1, /post-2, etc. (IG-style promos) */
export const CONTENTFUL_CONTENT_TYPE_SOCIAL_MEDIA_BLOG_PROMO =
  "igPost";

/** Content type for /blog/[slug] */
export const CONTENTFUL_CONTENT_TYPE_BLOG_POST = "blogPost";

export type ContentfulPostFields = {
  title?: string;
  author?: string;
  coverImage?: string;
  /** Markdown body - API may use any of these keys */
  content?: string;
  body?: string;
  markdown?: string;
  [key: string]: unknown;
};

/** Supabase Edge Functions expect the anon JWT (and often `apikey`) on every request. */
function contentfulAuthHeaders(): HeadersInit {
  const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  if (!key) {
    return {};
  }
  return {
    Authorization: `Bearer ${key}`,
    apikey: key,
  };
}

export async function fetchPostByUrl(
  url: string,
  contentType: string,
): Promise<ContentfulPostFields> {
  const params = new URLSearchParams();
  params.set("url", url);
  params.set("contentType", contentType);

  const res = await fetch(
    `${supabaseFunctionsUrl("contentfull")}?${params.toString()}`,
    {
      headers: contentfulAuthHeaders(),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${res.status}`);
  }

  return res.json();
}

/** List entries by Contentful content type (e.g. landing posts grid). */
export async function fetchContentfulList(
  contentType: string,
): Promise<Record<string, unknown>[]> {
  const params = new URLSearchParams({ contentType });
  const res = await fetch(
    `${supabaseFunctionsUrl("contentfull")}?${params.toString()}`,
    {
      headers: contentfulAuthHeaders(),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch entries: ${res.status}`);
  }

  const json = await res.json();
  return Array.isArray(json) ? json : [];
}

export function getMarkdownFromPost(post: ContentfulPostFields): string {
  const c = post.content.content[0].content[0].value;
  console.log(post);
  return typeof c === "string" ? c : "";
}
