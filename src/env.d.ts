/// <reference path="../.astro/types.d.ts" />

/** Meta (Facebook) Pixel — injected by layout scripts */
interface Window {
  fbq?: (...args: unknown[]) => void;
}

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  readonly PUBLIC_SUPABASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    user?: {
      email: string;
    };
  }
}
