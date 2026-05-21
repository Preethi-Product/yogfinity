-- Run once in Vercel Postgres SQL tab (Storage → your database → Query)
-- or via: psql $POSTGRES_URL -f sql/001_bookings.sql

CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  class_choice TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS bookings_created_at_idx
  ON bookings (created_at DESC);
