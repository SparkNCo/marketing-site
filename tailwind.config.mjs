/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontSize: {
        heading1: ["40px", { lineHeight: "auto" }],
        heading2: ["24px", { lineHeight: "32px" }],
        largeBody: ["32px", { lineHeight: "auto" }],
        body: ["18px", { lineHeight: "auto" }],
        smalltext: ["16px", { lineHeight: "auto" }],
      },

      fontFamily: {
        title: ["var(--font-title)"],
        body: ["var(--font-body)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        surface: "var(--surface)",
        secondary: "var(--secondary)",
        card: "var(--card)",
      },
    },
  },
  plugins: [],
};
