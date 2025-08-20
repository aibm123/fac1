import React, { useEffect, useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Metric = { ts: string; value: number };
type Anomaly = { ts: string; severity: 'low'|'medium'|'high'; message: string };

export default function Index() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const [m, a] = await Promise.all([
          fetch('/api/metrics').then(r => r.json()),
          fetch('/api/anomalies').then(r => r.json()),
        ]);
        setMetrics(m);
        setAnomalies(a);
      } catch (e:any) {
        setError(e?.message || 'Load failed');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const chartData = useMemo(() => metrics.map(x => ({ ts: new Date(x.ts).toLocaleDateString(), value: x.value })), [metrics]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Line Viz Insight — Data (SQL/API)</h1>
      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-2">Key Metric</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ts" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Anomalies</h2>
        <div className="grid gap-2">
          {anomalies.map((a, i) => (
            <div key={i} className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <div className="font-medium">{new Date(a.ts).toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">{a.message}</div>
              </div>
              <Badge variant={a.severity==='high' ? 'destructive' : 'default'} className="capitalize">{a.severity}</Badge>
            </div>
          ))}
          {anomalies.length===0 && <div className="text-sm text-muted-foreground">No anomalies.</div>}
        </div>
      </Card>
    </div>
  );
}
