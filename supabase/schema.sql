-- ============================================================
-- GENWUNNER WEBSITE — SUPABASE SCHEMA
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- EPK Settings (single row, id=1)
create table if not exists epk_settings (
  id          int primary key default 1,
  is_public   boolean not null default false,
  updated_at  timestamptz default now()
);
insert into epk_settings (id, is_public) values (1, false)
on conflict (id) do nothing;

-- EPK Highlights (editable press kit content blocks)
create table if not exists epk_highlights (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  body        text not null,
  category    text not null check (category in ('bio', 'press', 'stats', 'music', 'contact')),
  sort_order  int not null default 0,
  created_at  timestamptz default now()
);

-- EPK Views (analytics)
create table if not exists epk_views (
  id          uuid primary key default gen_random_uuid(),
  viewed_at   timestamptz default now(),
  referrer    text
);

-- Fans (SMS / presave / email signups, synced from Laylo webhook)
create table if not exists fans (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  phone       text,
  email       text,
  city        text,
  zip         text,
  source      text,             -- 'laylo', 'website', 'manual', etc.
  tags        text[] default '{}',
  created_at  timestamptz default now()
);
create index if not exists fans_city_idx on fans (city);
create index if not exists fans_source_idx on fans (source);

-- Content Posts (for future automation system)
create table if not exists content_posts (
  id            uuid primary key default gen_random_uuid(),
  platform      text not null,  -- 'instagram', 'twitter', 'tiktok', 'youtube'
  caption       text,
  media_url     text,
  status        text not null default 'draft' check (status in ('draft', 'scheduled', 'posted', 'failed')),
  scheduled_at  timestamptz,
  posted_at     timestamptz,
  external_id   text,           -- platform's post ID after posting
  created_at    timestamptz default now()
);

-- Content Analytics (per post metrics)
create table if not exists content_analytics (
  id          uuid primary key default gen_random_uuid(),
  post_id     uuid references content_posts(id) on delete cascade,
  platform    text not null,
  views       bigint default 0,
  likes       bigint default 0,
  comments    bigint default 0,
  shares      bigint default 0,
  saves       bigint default 0,
  reach       bigint default 0,
  fetched_at  timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table epk_settings enable row level security;
alter table epk_highlights enable row level security;
alter table epk_views enable row level security;
alter table fans enable row level security;
alter table content_posts enable row level security;
alter table content_analytics enable row level security;

-- EPK settings: public read when is_public = true
create policy "public can read epk settings"
  on epk_settings for select
  using (true);

-- EPK highlights: anyone can read (we gate at page level)
create policy "public can read epk highlights"
  on epk_highlights for select
  using (true);

-- EPK views: anyone can insert (anonymous view tracking)
create policy "anyone can log epk view"
  on epk_views for insert
  with check (true);

-- Admin-only writes (authenticated users only)
create policy "admin can manage epk settings"
  on epk_settings for all
  using (auth.role() = 'authenticated');

create policy "admin can manage epk highlights"
  on epk_highlights for all
  using (auth.role() = 'authenticated');

create policy "admin can manage fans"
  on fans for all
  using (auth.role() = 'authenticated');

-- Fans: allow inserts from webhook (use service role key on server)
create policy "service role can insert fans"
  on fans for insert
  with check (true);

create policy "admin can manage content"
  on content_posts for all
  using (auth.role() = 'authenticated');

create policy "admin can manage analytics"
  on content_analytics for all
  using (auth.role() = 'authenticated');

-- ============================================================
-- WUNNERDEX, BOOKINGS, SHOWS, FAN SUBMISSIONS
-- Run this block in Supabase SQL Editor
-- ============================================================

-- Wunnerdex fan registry (extended fan signup)
create table if not exists wunnerdex_signups (
  id                uuid primary key default gen_random_uuid(),
  email             text not null unique,
  phone             text,
  city              text not null,
  favorite_pokemon  text,
  favorite_song     text,
  social_handle     text,
  want_in_city      boolean default false,
  created_at        timestamptz default now()
);
create index if not exists wunnerdex_city_idx on wunnerdex_signups (city);

-- Booking inquiries
create table if not exists bookings (
  id                   uuid primary key default gen_random_uuid(),
  name                 text not null,
  company              text,
  email                text not null,
  phone                text,
  event_city           text not null,
  event_date           date,
  venue                text,
  event_type           text not null,
  budget               text not null,
  expected_attendance  text,
  performance_length   text,
  message              text,
  status               text not null default 'new' check (status in ('new', 'reviewed', 'booked', 'declined')),
  created_at           timestamptz default now()
);

-- Shows / Events
create table if not exists shows (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  venue        text,
  city         text not null,
  event_date   timestamptz not null,
  ticket_url   text,
  rsvp_url     text,
  is_upcoming  boolean not null default true,
  event_type   text,  -- 'convention', 'show', 'popup', 'activation'
  created_at   timestamptz default now()
);
create index if not exists shows_upcoming_idx on shows (is_upcoming, event_date);

-- Fan submissions (art, edits, memes, sightings)
create table if not exists fan_submissions (
  id                   uuid primary key default gen_random_uuid(),
  name                 text not null,
  email                text not null,
  social_handle        text,
  submission_type      text,  -- 'fan art', 'edit', 'meme', 'sighting', 'cosplay', 'remix'
  link                 text,
  permission_to_repost boolean default false,
  credit_name          text,
  status               text not null default 'pending' check (status in ('pending', 'approved', 'featured', 'declined')),
  created_at           timestamptz default now()
);

-- RLS for new tables
alter table wunnerdex_signups enable row level security;
alter table bookings enable row level security;
alter table shows enable row level security;
alter table fan_submissions enable row level security;

-- Wunnerdex: anyone can sign up
create policy "anyone can join wunnerdex"
  on wunnerdex_signups for insert
  with check (true);

create policy "admin can manage wunnerdex"
  on wunnerdex_signups for all
  using (auth.role() = 'authenticated');

-- Bookings: anyone can submit
create policy "anyone can submit booking"
  on bookings for insert
  with check (true);

create policy "admin can manage bookings"
  on bookings for all
  using (auth.role() = 'authenticated');

-- Shows: public read, admin write
create policy "public can view shows"
  on shows for select
  using (true);

create policy "admin can manage shows"
  on shows for all
  using (auth.role() = 'authenticated');

-- Fan submissions: anyone can submit
create policy "anyone can submit fan content"
  on fan_submissions for insert
  with check (true);

create policy "admin can manage fan submissions"
  on fan_submissions for all
  using (auth.role() = 'authenticated');
