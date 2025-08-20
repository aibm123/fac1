create table if not exists metrics (
  ts timestamptz primary key,
  value double precision not null
);
create table if not exists anomalies (
  id serial primary key,
  ts timestamptz not null,
  severity text not null check (severity in ('low','medium','high')),
  message text not null
);
