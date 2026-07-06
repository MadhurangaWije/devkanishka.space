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
