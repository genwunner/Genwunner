-- Fix shows table: add all missing columns
-- Run in Supabase SQL Editor

ALTER TABLE shows
  ADD COLUMN IF NOT EXISTS state text,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS event_date_text text,
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'completed' CHECK (status IN ('upcoming', 'completed', 'cancelled')),
  ADD COLUMN IF NOT EXISTS role text DEFAULT 'headliner',
  ADD COLUMN IF NOT EXISTS headline_act text,
  ADD COLUMN IF NOT EXISTS tour_name text,
  ADD COLUMN IF NOT EXISTS attendance integer,
  ADD COLUMN IF NOT EXISTS sold_out boolean,
  ADD COLUMN IF NOT EXISTS guarantee numeric,
  ADD COLUMN IF NOT EXISTS merch_sales numeric,
  ADD COLUMN IF NOT EXISTS confidence text DEFAULT 'high',
  ADD COLUMN IF NOT EXISTS source_urls text,
  ADD COLUMN IF NOT EXISTS notes text;

-- Make event_date nullable (many shows have approximate/missing dates)
ALTER TABLE shows ALTER COLUMN event_date DROP NOT NULL;

-- Make city nullable (a few shows have no city)
ALTER TABLE shows ALTER COLUMN city DROP NOT NULL;

-- Make venue nullable
ALTER TABLE shows ALTER COLUMN venue DROP NOT NULL;

-- Add performed_here boolean to conventions (fed by show history)
ALTER TABLE conventions
  ADD COLUMN IF NOT EXISTS performed_here boolean DEFAULT false;
