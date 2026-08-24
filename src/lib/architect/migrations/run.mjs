// Applies the /architect stack migrations against the marketing database.
// Usage: node src/lib/architect/migrations/run.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import pkg from "pg";

const { Pool } = pkg;
const __dirname = dirname(fileURLToPath(import.meta.url));

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DIRECT_URL / DATABASE_URL is not set");
  process.exit(1);
}

const files = ["0001_create_stacks.sql", "0002_seed_stacks.sql"];
const pool = new Pool({ connectionString });

try {
  for (const file of files) {
    const sql = readFileSync(join(__dirname, file), "utf8");
    console.log(`Applying ${file}...`);
    await pool.query(sql);
  }
  const { rows } = await pool.query(
    "select name, cardinality(languages) as langs from marketing.stacks order by name",
  );
  console.log("Stacks in DB:");
  for (const r of rows) console.log(` - ${r.name} (${r.langs} languages)`);
  console.log(`Total: ${rows.length}`);
} catch (err) {
  console.error("Migration failed:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
