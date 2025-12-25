import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from '@astrojs/node';

export default defineConfig({
  adapter: node({
    mode: "standalone",
  }),
  output: "server", 
  integrations: [react(), tailwind()],
  site: "http://localhost:4321",
});
