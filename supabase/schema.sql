-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query)
-- before running `npm run index-content` for the first time.
--
-- The vector(768) dimension below must match EMBEDDING_DIMENSIONS in
-- src/lib/ai/providers.ts. If you ever change embedding models/dimensions,
-- drop and recreate this table (embeddings from different models/dimensions
-- can't be mixed) and re-run the indexing script.

create extension if not exists vector;

create table if not exists lesson_chunks (
  id uuid primary key default gen_random_uuid(),
  course_slug text not null,
  course_title text not null,
  lesson_slug text not null,
  lesson_title text not null,
  url text not null,
  heading text,
  chunk_index int not null,
  content text not null,
  embedding vector(768) not null,
  created_at timestamptz not null default now()
);

create index if not exists lesson_chunks_embedding_idx
  on lesson_chunks using hnsw (embedding vector_cosine_ops);

create index if not exists lesson_chunks_course_slug_idx
  on lesson_chunks (course_slug);

-- Vector similarity search, optionally scoped to one course. The API route
-- queries with match_course_slug set to the guide the user is currently
-- reading, and falls back to a site-wide query (match_course_slug = null)
-- when the in-course results are weak.
create or replace function match_lesson_chunks(
  query_embedding vector(768),
  match_course_slug text default null,
  match_count int default 5
)
returns table (
  course_slug text,
  course_title text,
  lesson_slug text,
  lesson_title text,
  url text,
  heading text,
  content text,
  similarity float
)
language sql stable
as $$
  select
    course_slug, course_title, lesson_slug, lesson_title, url, heading, content,
    1 - (embedding <=> query_embedding) as similarity
  from lesson_chunks
  where match_course_slug is null or course_slug = match_course_slug
  order by embedding <=> query_embedding
  limit match_count;
$$;

-- Very small per-IP daily cap on the chat endpoint. Not a serious
-- anti-abuse system — just enough to stop a runaway loop or scraper from
-- burning through the LLM/embedding free tier unattended.
create table if not exists chat_rate_limits (
  ip text not null,
  day date not null default current_date,
  count int not null default 0,
  primary key (ip, day)
);

-- ── Memories app (memories.devkanishka.space) ──────────────────────────────
-- Photo bytes live in Google Drive (see src/lib/drive.ts); only the Drive
-- file id is stored here. Photos are never served directly from Drive —
-- every request goes through /api/memories/photo/[photoId], which checks
-- the parent memory's visibility before streaming bytes back, so a
-- "private" memory's photos are never reachable without the owner session.
create table if not exists memories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  story text not null default '',
  area text not null default 'family' check (area in ('family', 'personal', 'work')),
  visibility text not null default 'public' check (visibility in ('public', 'private')),
  memory_date date,
  location text,
  mood text,
  people text[] not null default '{}',
  added_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists memories_visibility_idx on memories (visibility);
create index if not exists memories_memory_date_idx on memories (memory_date desc);

create table if not exists memory_photos (
  id uuid primary key default gen_random_uuid(),
  memory_id uuid not null references memories (id) on delete cascade,
  drive_file_id text not null,
  mime_type text not null,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists memory_photos_memory_id_idx on memory_photos (memory_id);
