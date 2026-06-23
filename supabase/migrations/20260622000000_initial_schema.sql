-- Run this in your Supabase SQL Editor to set up the database

-- Topics
create table if not exists topics (
  id         uuid default gen_random_uuid() primary key,
  slug       text unique not null,
  title_ar   text not null,
  title_en   text not null,
  content_ar text,
  content_en text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Videos
create table if not exists videos (
  id              uuid default gen_random_uuid() primary key,
  title_ar        text not null default '',
  title_en        text not null,
  description_ar  text,
  description_en  text not null default '',
  video_url       text not null,
  thumbnail_url   text,
  topic           text not null default 'meaning-of-peace',
  duration        integer not null default 0,
  published       boolean not null default false,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- Contact submissions
create table if not exists contact_submissions (
  id         uuid default gen_random_uuid() primary key,
  name       text not null,
  email      text not null,
  message    text not null,
  read       boolean not null default false,
  created_at timestamptz default now()
);

-- Storage bucket: media (for videos and thumbnails)
-- Run in Supabase Dashboard > Storage > New Bucket
-- Name: media
-- Public: true (for video streaming)

-- RLS Policies
alter table contact_submissions enable row level security;
alter table videos              enable row level security;
alter table topics              enable row level security;

-- Public can read published videos
create policy "Public videos" on videos for select using (published = true);

-- Public can read topics
create policy "Public topics" on topics for select using (true);

-- Service role bypasses RLS — used for admin writes
-- Admin operations use the service role key server-side

-- Allow anonymous inserts for contact form
create policy "Anyone can submit contact" on contact_submissions for insert with check (true);
