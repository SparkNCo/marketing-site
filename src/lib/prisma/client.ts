// src/lib/prisma/client.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";

const { Pool } = pkg;

console.log(import.meta.env.DATABASE_URL);

const pool = new Pool({
  connectionString: import.meta.env.DIRECT_URL,
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["query", "error"],
  });

if (import.meta.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
