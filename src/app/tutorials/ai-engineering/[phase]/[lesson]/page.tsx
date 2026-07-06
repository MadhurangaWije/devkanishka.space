import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAiEngineeringLessonData, AI_ENGINEERING_PHASES } from '@/lib/ai-engineering-course';
import { AiEngineeringLessonReader } from '@/components/course/AiEngineeringLessonReader';
import { LessonTOC } from '@/components/course/LessonTOC';
import { AI_ENGINEERING_COURSE_CSS } from '@/lib/ai-engineering-course-styles';

type Props = {
  params: Promise<{ phase: string; lesson: string }>;
};

export function generateStaticParams() {
  return AI_ENGINEERING_PHASES.flatMap((phase) =>
    phase.lessons.map((lesson) => ({
      phase: phase.urlSegment,
      lesson: lesson.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { phase: phaseSlug, lesson: slug } = await params;
  const phase = AI_ENGINEERING_PHASES.find((p) => p.urlSegment === phaseSlug);
  const meta = phase?.lessons.find((l) => l.slug === slug);
  if (!meta) return {};
  return {
    title: `${meta.title} — AI Engineering`,
    description: meta.subtitle,
  };
}

const COURSE_BASE = '/tutorials/ai-engineering';

export default async function AiEngineeringLessonPage({ params }: Props) {
  const { phase: phaseSlug, lesson: slug } = await params;

  const phase = AI_ENGINEERING_PHASES.find((p) => p.urlSegment === phaseSlug);
  if (!phase || !phase.lessons.find((l) => l.slug === slug)) notFound();

  let data;
  try {
    data = getAiEngineeringLessonData(phaseSlug, slug);
  } catch {
    notFound();
  }

  return (
    <div className="lesson-page-wrapper">
      <style dangerouslySetInnerHTML={{ __html: AI_ENGINEERING_COURSE_CSS }} />

      <div className="flex items-start gap-6 xl:pl-6">
        <LessonTOC headings={data.headings} />
        <div className="min-w-0 flex-1">
          <AiEngineeringLessonReader bodyHtml={data.bodyHtml} script={data.script} />
        </div>
      </div>

      <nav className="ai-engineering-lesson-bottom-nav">
        <div className="ai-engineering-lesson-bottom-nav-inner">
          {data.prev ? (
            <Link
              href={`${COURSE_BASE}/${data.prev.urlSegment}/${data.prev.slug}`}
              className="ai-engineering-lesson-nav-link"
            >
              <span className="ai-engineering-lesson-nav-dir">← Previous</span>
              <span className="ai-engineering-lesson-nav-title">{data.prev.title}</span>
            </Link>
          ) : (
            <Link href={COURSE_BASE} className="ai-engineering-lesson-nav-link">
              <span className="ai-engineering-lesson-nav-dir">← Overview</span>
              <span className="ai-engineering-lesson-nav-title">Course Overview</span>
            </Link>
          )}

          {data.next ? (
            <Link
              href={`${COURSE_BASE}/${data.next.urlSegment}/${data.next.slug}`}
              className="ai-engineering-lesson-nav-link ai-engineering-lesson-nav-link--next"
            >
              <span className="ai-engineering-lesson-nav-dir">Next →</span>
              <span className="ai-engineering-lesson-nav-title">{data.next.title}</span>
            </Link>
          ) : (
            <div className="ai-engineering-lesson-nav-link ai-engineering-lesson-nav-link--next ai-engineering-lesson-nav-link--complete">
              <span className="ai-engineering-lesson-nav-dir">✓ Course complete</span>
              <span className="ai-engineering-lesson-nav-title">
                All {AI_ENGINEERING_PHASES.reduce((s, p) => s + p.lessons.length, 0)} lessons done
              </span>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
