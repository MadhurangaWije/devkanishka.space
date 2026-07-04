import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMLLessonData, ML_PHASES } from '@/lib/ml-course';
import { MLLessonReader } from '@/components/course/MLLessonReader';
import { LessonTOC } from '@/components/course/LessonTOC';
import { ML_COURSE_CSS } from '@/lib/ml-course-styles';

type Props = {
  params: Promise<{ phase: string; lesson: string }>;
};

export function generateStaticParams() {
  return ML_PHASES.flatMap((phase) =>
    phase.lessons.map((lesson) => ({
      phase: phase.urlSegment,
      lesson: lesson.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { phase: phaseSlug, lesson: slug } = await params;
  const phase = ML_PHASES.find((p) => p.urlSegment === phaseSlug);
  const meta = phase?.lessons.find((l) => l.slug === slug);
  if (!meta) return {};
  return {
    title: `${meta.title} — ML & DL Mastery`,
    description: meta.subtitle,
  };
}

const COURSE_BASE = '/tutorials/ml-and-dl-mastery';

export default async function MLLessonPage({ params }: Props) {
  const { phase: phaseSlug, lesson: slug } = await params;

  const phase = ML_PHASES.find((p) => p.urlSegment === phaseSlug);
  if (!phase || !phase.lessons.find((l) => l.slug === slug)) notFound();

  let data;
  try {
    data = getMLLessonData(phaseSlug, slug);
  } catch {
    notFound();
  }

  return (
    <div className="lesson-page-wrapper">
      <style dangerouslySetInnerHTML={{ __html: ML_COURSE_CSS }} />

      <div className="flex items-start gap-6 xl:pl-6">
        <LessonTOC headings={data.headings} />
        <div className="min-w-0 flex-1">
          <MLLessonReader bodyHtml={data.bodyHtml} script={data.script} />
        </div>
      </div>

      <nav className="ml-lesson-bottom-nav">
        <div className="ml-lesson-bottom-nav-inner">
          {data.prev ? (
            <Link
              href={`${COURSE_BASE}/${data.prev.urlSegment}/${data.prev.slug}`}
              className="ml-lesson-nav-link"
            >
              <span className="ml-lesson-nav-dir">← Previous</span>
              <span className="ml-lesson-nav-title">{data.prev.title}</span>
            </Link>
          ) : (
            <Link href={COURSE_BASE} className="ml-lesson-nav-link">
              <span className="ml-lesson-nav-dir">← Overview</span>
              <span className="ml-lesson-nav-title">Course Overview</span>
            </Link>
          )}

          {data.next ? (
            <Link
              href={`${COURSE_BASE}/${data.next.urlSegment}/${data.next.slug}`}
              className="ml-lesson-nav-link ml-lesson-nav-link--next"
            >
              <span className="ml-lesson-nav-dir">Next →</span>
              <span className="ml-lesson-nav-title">{data.next.title}</span>
            </Link>
          ) : (
            <div className="ml-lesson-nav-link ml-lesson-nav-link--next ml-lesson-nav-link--complete">
              <span className="ml-lesson-nav-dir">✓ Course complete</span>
              <span className="ml-lesson-nav-title">
                All {ML_PHASES.reduce((s, p) => s + p.lessons.length, 0)} lessons done
              </span>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
