import type { VercelRequest, VercelResponse } from '@vercel/node';
import { queryOrFallback } from './_db';
import fs from 'node:fs';
import path from 'node:path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const fallback = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'seed/anomalies.json'), 'utf-8'));
  const rows = await queryOrFallback(
    'select ts, severity, message from anomalies order by ts desc',
    [],
    fallback
  );
  res.status(200).json(rows);
}
