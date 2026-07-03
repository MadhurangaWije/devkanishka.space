import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLessonData, PHASES } from '@/lib/python-course';
import { LessonReader } from '@/components/course/LessonReader';
import { LessonTOC } from '@/components/course/LessonTOC';
import { PY_COURSE_CSS } from '@/lib/python-course-styles';

type Props = {
  params: Promise<{ lesson: string }>;
};

const PHASE = PHASES.find((p) => p.number === 3)!;
const COURSE_BASE = '/tutorials/python-from-a-to-z';

export function generateStaticParams() {
  return PHASE.lessons.map((l) => ({ lesson: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lesson: slug } = await params;
  const meta = PHASE.lessons.find((l) => l.slug === slug);
  if (!meta) return {};
  return {
    title: `${meta.title} — Python: Print to Production`,
    description: meta.subtitle,
  };
}

export default async function LessonPage({ params }: Props) {
  const { lesson: slug } = await params;
  if (!PHASE.lessons.find((l) => l.slug === slug)) notFound();

  let data;
  try {
    data = getLessonData(3, slug);
  } catch {
    notFound();
  }

  const prevPhase = PHASES.find((p) => p.number === 2)!;

  return (
    <div className="lesson-page-wrapper">
      <style dangerouslySetInnerHTML={{ __html: PY_COURSE_CSS }} />

      <div className="flex items-start gap-6 xl:pl-6">
        <LessonTOC headings={data.headings} />
        <div className="min-w-0 flex-1">
          <div className="py-lesson-host">
            <LessonReader
              lessonCss={data.lessonCss}
              bodyHtml={data.bodyHtml}
              script={data.script}
            />
          </div>
        </div>
      </div>

      <nav className="lesson-bottom-nav">
        <div className="lesson-bottom-nav-inner">
          {data.prev ? (
            <Link
              href={`${COURSE_BASE}/${data.prev.urlSegment}/${data.prev.slug}`}
              className="lesson-nav-link"
            >
              <span className="lesson-nav-dir">← Previous</span>
              <span className="lesson-nav-title">{data.prev.title}</span>
            </Link>
          ) : (
            // First lesson in Phase 3 — link back to last lesson of Phase 2
            <Link
              href={`${COURSE_BASE}/${prevPhase.urlSegment}/${prevPhase.lessons[prevPhase.lessons.length - 1].slug}`}
              className="lesson-nav-link"
            >
              <span className="lesson-nav-dir">← Phase 2</span>
              <span className="lesson-nav-title">{prevPhase.lessons[prevPhase.lessons.length - 1].title}</span>
            </Link>
          )}

          {data.next ? (
            <Link
              href={`${COURSE_BASE}/${data.next.urlSegment}/${data.next.slug}`}
              className="lesson-nav-link lesson-nav-link--next"
            >
              <span className="lesson-nav-dir">Next →</span>
              <span className="lesson-nav-title">{data.next.title}</span>
            </Link>
          ) : (
            <div className="lesson-nav-link lesson-nav-link--next lesson-nav-link--complete">
              <span className="lesson-nav-dir">✓ Phase 3 (Advanced) in progress</span>
              <span className="lesson-nav-title">FastAPI &amp; ML/AI phases coming soon</span>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
