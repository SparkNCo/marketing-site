import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "src/lib/prisma/schema.prisma",

  datasource: {
    url: import.meta.env.DATABASE_URL!,
  },
});
