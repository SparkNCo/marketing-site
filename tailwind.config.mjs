/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
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
