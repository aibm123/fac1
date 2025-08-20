import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { payload } = req.body || {};
  // NOTE: Serverless environments do not keep long-lived connections.
  // In production, point this endpoint to an external Kafka REST Proxy (e.g., Confluent, Redpanda Console) via fetch.
  // Example: await fetch(process.env.KAFKA_REST_URL as string, { method: 'POST', body: JSON.stringify({ records: [{ value: payload }] }) })
  res.status(200).json({ status: 'queued', payload });
}
