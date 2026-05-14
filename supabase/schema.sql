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
