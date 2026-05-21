-- Admin Portal: Agent & Module Tables
-- Run this in: Supabase Dashboard → SQL Editor

-- Track Library (Module A) — required by Release Checklist & EPK
create table if not exists tracks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  pokemon_name text,
  status text default 'released' check (status in ('released', 'unreleased', 'in_progress')),
  release_date date,
  hypeddit_url text,
  spotify_url text,
  cover_image text,
  streams bigint default 0,
  isrc text,
  upc text,
  notes text,
  created_at timestamptz default now()
);

-- Release Checklist items per track (Agent 2)
create table if not exists release_checklist (
  id uuid default gen_random_uuid() primary key,
  track_id uuid references tracks(id) on delete cascade,
  category text not null check (category in ('creative', 'legal', 'distribution', 'promotion', 'post_release')),
  item text not null,
  completed boolean default false,
  completed_at timestamptz,
  priority text default 'p0' check (priority in ('p0', 'p1', 'p2')),
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Show History (Module B) — required by Convention Scout scoring
create table if not exists shows (
  id uuid default gen_random_uuid() primary key,
  venue text not null,
  city text not null,
  state text,
  date date not null,
  status text default 'upcoming' check (status in ('upcoming', 'completed', 'cancelled')),
  attendance integer,
  guarantee numeric,
  merch_sales numeric,
  notes text,
  created_at timestamptz default now()
);

-- Convention Scout database (Agent 1)
create table if not exists conventions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  organization text,
  city text not null,
  state text,
  venue text,
  start_date date,
  end_date date,
  submission_deadline date,
  expected_attendance integer,
  submission_url text,
  booking_email text,
  secondary_contacts text,
  past_performers text,
  tier text default 'B' check (tier in ('S', 'A', 'B', 'C')),
  pokemon_friendly boolean default false,
  score integer default 0,
  status text default 'researching' check (status in ('researching', 'applied', 'confirmed', 'skip')),
  city_fan_density integer default 0,
  travel_cost_estimate numeric,
  notes text,
  created_at timestamptz default now()
);

-- Notes to Actions (Agent 5)
create table if not exists brain_dumps (
  id uuid default gen_random_uuid() primary key,
  raw_input text not null,
  created_at timestamptz default now()
);

create table if not exists idea_actions (
  id uuid default gen_random_uuid() primary key,
  dump_id uuid references brain_dumps(id) on delete cascade,
  idea_title text not null,
  summary text,
  goal text,
  steps jsonb default '[]',
  feasibility integer default 5 check (feasibility between 1 and 10),
  priority_score integer default 5 check (priority_score between 1 and 10),
  impact integer default 5 check (impact between 1 and 10),
  status text default 'not_started' check (status in ('not_started', 'in_progress', 'done', 'blocked')),
  created_at timestamptz default now()
);

-- Analytics snapshots (Agent 4) — manual input
create table if not exists analytics_snapshots (
  id uuid default gen_random_uuid() primary key,
  snapshot_date date not null default current_date,
  spotify_monthly_listeners integer,
  spotify_total_streams bigint,
  spotify_top_city text,
  youtube_subscribers integer,
  youtube_monthly_views integer,
  tiktok_followers integer,
  tiktok_monthly_views integer,
  instagram_followers integer,
  notes text,
  created_at timestamptz default now()
);

-- Social content scheduler (Agent 4)
create table if not exists scheduled_posts (
  id uuid default gen_random_uuid() primary key,
  platform text not null check (platform in ('youtube', 'tiktok', 'instagram', 'twitter', 'discord')),
  content_type text default 'video' check (content_type in ('video', 'short', 'photo', 'text', 'community')),
  caption text,
  hashtags text,
  scheduled_at timestamptz,
  status text default 'draft' check (status in ('draft', 'scheduled', 'posted', 'failed')),
  external_url text,
  notes text,
  created_at timestamptz default now()
);

-- Enable RLS for all new tables (same user can access after auth)
alter table tracks enable row level security;
alter table release_checklist enable row level security;
alter table shows enable row level security;
alter table conventions enable row level security;
alter table brain_dumps enable row level security;
alter table idea_actions enable row level security;
alter table analytics_snapshots enable row level security;
alter table scheduled_posts enable row level security;

-- Policies: authenticated users (admin) can do everything
create policy "admin_all" on tracks for all using (auth.role() = 'authenticated');
create policy "admin_all" on release_checklist for all using (auth.role() = 'authenticated');
create policy "admin_all" on shows for all using (auth.role() = 'authenticated');
create policy "admin_all" on conventions for all using (auth.role() = 'authenticated');
create policy "admin_all" on brain_dumps for all using (auth.role() = 'authenticated');
create policy "admin_all" on idea_actions for all using (auth.role() = 'authenticated');
create policy "admin_all" on analytics_snapshots for all using (auth.role() = 'authenticated');
create policy "admin_all" on scheduled_posts for all using (auth.role() = 'authenticated');
