import { NextRequest, NextResponse } from 'next/server';
import { embed, streamText } from 'ai';
import { getChatModel, getEmbeddingModel, EMBEDDING_PROVIDER_OPTIONS } from '@/lib/ai/providers';
import { getSupabaseAdmin } from '@/lib/ai/supabase';

export const runtime = 'nodejs';

const MAX_QUESTION_LENGTH = 500;
const DAILY_LIMIT = 40;
// Below this cosine similarity, the in-course result isn't a real match —
// widen to a site-wide search instead of answering from a weak excerpt.
const SIMILARITY_THRESHOLD = 0.72;

type ChunkMatch = {
  course_slug: string;
  course_title: string;
  lesson_slug: string;
  lesson_title: string;
  url: string;
  heading: string | null;
  content: string;
  similarity: number;
};

async function checkRateLimit(ip: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const today = new Date().toISOString().slice(0, 10);

  const { data } = await supabase
    .from('chat_rate_limits')
    .select('count')
    .eq('ip', ip)
    .eq('day', today)
    .maybeSingle();

  const count = data?.count ?? 0;
  if (count >= DAILY_LIMIT) return false;

  await supabase
    .from('chat_rate_limits')
    .upsert({ ip, day: today, count: count + 1 }, { onConflict: 'ip,day' });
  return true;
}

async function searchChunks(embedding: number[], courseSlug: string | null, count = 5): Promise<ChunkMatch[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc('match_lesson_chunks', {
    query_embedding: embedding,
    match_course_slug: courseSlug,
    match_count: count,
  });
  if (error) {
    console.error('match_lesson_chunks failed:', error.message);
    return [];
  }
  return (data ?? []) as ChunkMatch[];
}

export async function POST(request: NextRequest) {
  let body: { prompt?: string; courseSlug?: string; lessonUrl?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const question = (body.prompt ?? '').trim();
  if (!question) {
    return NextResponse.json({ error: 'Question is required' }, { status: 400 });
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return NextResponse.json({ error: 'Question is too long — keep it under 500 characters.' }, { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const allowed = await checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "You've hit today's question limit for this chatbot — try again tomorrow." },
      { status: 429 }
    );
  }

  const { embedding } = await embed({
    model: getEmbeddingModel(),
    value: question,
    providerOptions: EMBEDDING_PROVIDER_OPTIONS,
  });

  // Prefer chunks from the guide the user is currently reading. Only widen
  // to a site-wide search if that guide's best match is weak — this keeps
  // an AI Engineering question from surfacing Kubernetes chunks by accident.
  let matches: ChunkMatch[] = body.courseSlug ? await searchChunks(embedding, body.courseSlug) : [];
  const topScore = matches[0]?.similarity ?? 0;

  if (topScore < SIMILARITY_THRESHOLD) {
    const siteWide = await searchChunks(embedding, null);
    if (siteWide.length > 0 && (siteWide[0].similarity ?? 0) > topScore) {
      matches = siteWide;
    }
  }

  if (matches.length === 0) {
    return new Response(
      "I couldn't find anything in the guides about that. Try rephrasing, or use the Ask Me page for a direct question.",
      { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
  }

  const context = matches
    .map((m, i) => `[Excerpt ${i + 1} — "${m.lesson_title}"${m.heading ? ` › ${m.heading}` : ''}]\n${m.content}`)
    .join('\n\n---\n\n');

  const system = `You are a helpful assistant embedded inside Kanishka's technical guides. Answer the user's question using ONLY the excerpts below — don't use outside knowledge and don't invent anything not in them. If the excerpts don't actually answer the question, say so plainly and suggest the "Ask Me" page instead of guessing. Keep answers concise and practical, and mention which lesson the answer comes from when it's useful.

${context}`;

  const result = streamText({
    model: getChatModel(),
    system,
    prompt: question,
  });

  return result.toTextStreamResponse();
}
