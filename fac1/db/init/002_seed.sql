insert into metrics (ts, value) values
  ('2025-08-01T00:00:00Z',120),
  ('2025-08-02T00:00:00Z',132),
  ('2025-08-03T00:00:00Z',98),
  ('2025-08-04T00:00:00Z',144),
  ('2025-08-05T00:00:00Z',158)
on conflict (ts) do nothing;

insert into anomalies (ts, severity, message) values
  ('2025-08-03T08:00:00Z','high','Sudden dip detected'),
  ('2025-08-05T14:00:00Z','medium','Spike beyond upper CI')
on conflict do nothing;
