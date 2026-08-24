import pkg from "pg";

const { Pool } = pkg;

/**
 * A pre-built template stack, as stored in `marketing.stacks`.
 * The recommendation flow (see /api/architect/recommend) picks one of these by
 * name and returns the full metadata to the UI.
 */
export type Stack = {
  id: string;
  name: string;
  tagline: string | null;
  description: string;
  languages: string[];
  frameworks: string[];
  hosting: string[];
  best_for: string[];
  sample_repo_url: string | null;
  speed: number;
  customizability: number;
  portability: number;
  integrated: number;
};

const globalForPool = globalThis as unknown as { architectPool?: InstanceType<typeof Pool> };

function getPool() {
  if (!globalForPool.architectPool) {
    const connectionString =
      import.meta.env.DIRECT_URL || import.meta.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DIRECT_URL / DATABASE_URL is not configured");
    }
    globalForPool.architectPool = new Pool({ connectionString, max: 3 });
  }
  return globalForPool.architectPool;
}

const SELECT_COLUMNS = `
  id, name, tagline, description,
  languages, frameworks, hosting, best_for,
  sample_repo_url, speed, customizability, portability, integrated
`;

/** All template stacks, ordered by name. */
export async function getAllStacks(): Promise<Stack[]> {
  const { rows } = await getPool().query<Stack>(
    `select ${SELECT_COLUMNS} from marketing.stacks order by name`,
  );
  return rows;
}

/** Look up a single stack by its exact name (case-insensitive). */
export async function getStackByName(name: string): Promise<Stack | null> {
  const { rows } = await getPool().query<Stack>(
    `select ${SELECT_COLUMNS} from marketing.stacks where lower(name) = lower($1) limit 1`,
    [name.trim()],
  );
  return rows[0] ?? null;
}
