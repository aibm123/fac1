import { Pool } from 'pg';

// DATABASE_URL example:
// postgres://user:password@host:5432/dbname
const connectionString = process.env.DATABASE_URL;

let pool: Pool | null = null;

export function getPool() {
  if (!connectionString) return null;
  if (!pool) {
    pool = new Pool({ connectionString, max: 1, ssl: process.env.PGSSL==='1' ? { rejectUnauthorized: false } : undefined });
  }
  return pool;
}

export async function queryOrFallback<T=any>(sql: string, params: any[], fallback: T): Promise<T> {
  const p = getPool();
  if (!p) return fallback as T;
  try {
    const { rows } = await p.query(sql, params);
    return rows as unknown as T;
  } catch (e) {
    console.error('DB query failed, using fallback:', e);
    return fallback as T;
  }
}
