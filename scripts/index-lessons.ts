/**
 * Reindex every lesson across every guide into Supabase for the RAG chatbot.
 *
 * One-time setup: run supabase/schema.sql in the Supabase SQL editor first.
 *
 * Usage:
 *   npm run index-content                 # reindex every course
 *   npm run index-content -- docker-fundamentals   # reindex just one course
 *
 * Safe to re-run any time lesson content changes — each course's existing
 * rows are deleted and reinserted (full reindex per course_slug), so there's
 * no diffing logic to keep in sync.
 */
import { embedMany } from 'ai';
import { COURSE_REGISTRY } from '../src/lib/ai/course-registry';
import { chunkLessonHtml } from '../src/lib/ai/chunk-text';
import { getEmbeddingModel, EMBEDDING_PROVIDER_OPTIONS } from '../src/lib/ai/providers';
import { getSupabaseAdmin } from '../src/lib/ai/supabase';

// Gemini's free tier caps embedding calls at 100 requests/minute *and* a
// fixed number of requests/day. Larger batches trade a little per-request
// risk for far fewer total requests — worth it given the daily cap is the
// tighter constraint in practice for a full ~500-lesson reindex.
const EMBED_BATCH_SIZE = 100;
const EMBED_DELAY_MS = 1500;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type PendingRow = {
  course_slug: string;
  course_title: string;
  lesson_slug: string;
  lesson_title: string;
  url: string;
  heading: string | null;
  chunk_index: number;
  content: string;
};

async function embedBatch(texts: string[]): Promise<number[][]> {
  const { embeddings } = await embedMany({
    model: getEmbeddingModel(),
    values: texts,
    providerOptions: EMBEDDING_PROVIDER_OPTIONS,
    maxParallelCalls: 1,
    maxRetries: 5,
  });
  return embeddings;
}

async function main() {
  const onlySlug = process.argv[2];
  const courses = onlySlug
    ? COURSE_REGISTRY.filter((c) => c.slug === onlySlug)
    : COURSE_REGISTRY;

  if (onlySlug && courses.length === 0) {
    console.error(`No course found with slug "${onlySlug}". Known slugs:`);
    COURSE_REGISTRY.forEach((c) => console.error(`  - ${c.slug}`));
    process.exit(1);
  }

  const supabase = getSupabaseAdmin();
  const succeeded: string[] = [];
  const failed: string[] = [];

  for (const course of courses) {
    console.log(`\n=== ${course.title} (${course.slug}) ===`);

    try {
      await indexCourse(course, supabase);
      succeeded.push(course.slug);
    } catch (err) {
      console.error(`  ! ${course.slug} failed, skipping to next course:`, err instanceof Error ? err.message : err);
      failed.push(course.slug);
    }
  }

  console.log(`\nReindex complete. ${succeeded.length} succeeded, ${failed.length} failed.`);
  if (failed.length) {
    console.log('Failed courses (re-run individually once unblocked):');
    failed.forEach((slug) => console.log(`  npm run index-content -- ${slug}`));
  }
}

async function indexCourse(course: (typeof COURSE_REGISTRY)[number], supabase: ReturnType<typeof getSupabaseAdmin>) {
  const rows: PendingRow[] = [];
    for (const phase of course.phases) {
      for (const lesson of phase.lessons) {
        let bodyHtml: string;
        try {
          bodyHtml = course.getBodyHtml(phase, lesson.slug);
        } catch (err) {
          console.error(`  ! failed to load ${lesson.slug}:`, err);
          continue;
        }

        const chunks = chunkLessonHtml(bodyHtml);
        const url = `${course.courseBase}/${phase.urlSegment}/${lesson.slug}`;
        for (const chunk of chunks) {
          rows.push({
            course_slug: course.slug,
            course_title: course.title,
            lesson_slug: lesson.slug,
            lesson_title: lesson.title,
            url,
            heading: chunk.heading,
            chunk_index: chunk.chunkIndex,
            content: chunk.content,
          });
        }
      }
    }

    console.log(`  ${rows.length} chunks across ${course.phases.reduce((s, p) => s + p.lessons.length, 0)} lessons`);

    const embeddings: number[][] = [];
    for (let i = 0; i < rows.length; i += EMBED_BATCH_SIZE) {
      const batch = rows.slice(i, i + EMBED_BATCH_SIZE).map((r) => r.content);
      const batchEmbeddings = await embedBatch(batch);
      embeddings.push(...batchEmbeddings);
      process.stdout.write(`  embedded ${Math.min(i + EMBED_BATCH_SIZE, rows.length)}/${rows.length}\r`);
      if (i + EMBED_BATCH_SIZE < rows.length) await sleep(EMBED_DELAY_MS);
    }
    console.log('');

    const { error: deleteError } = await supabase
      .from('lesson_chunks')
      .delete()
      .eq('course_slug', course.slug);
    if (deleteError) {
      throw new Error(`failed to clear old rows for ${course.slug}: ${deleteError.message}`);
    }

    const toInsert = rows.map((row, i) => ({ ...row, embedding: embeddings[i] }));
    const INSERT_BATCH_SIZE = 200;
    for (let i = 0; i < toInsert.length; i += INSERT_BATCH_SIZE) {
      const batch = toInsert.slice(i, i + INSERT_BATCH_SIZE);
      const { error } = await supabase.from('lesson_chunks').insert(batch);
      if (error) {
        throw new Error(`insert failed for ${course.slug} (rows ${i}-${i + batch.length}): ${error.message}`);
      }
    }

  console.log(`  done — ${toInsert.length} chunks indexed`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
