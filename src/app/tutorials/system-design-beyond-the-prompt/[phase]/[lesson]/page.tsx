import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSDLessonData, SD_PHASES } from '@/lib/system-design-course';
import { LessonReader } from '@/components/course/LessonReader';
import { LessonTOC } from '@/components/course/LessonTOC';
import { SD_COURSE_CSS } from '@/lib/system-design-course-styles';

type Props = {
  params: Promise<{ phase: string; lesson: string }>;
};

export function generateStaticParams() {
  return SD_PHASES.flatMap((phase) =>
    phase.lessons.map((lesson) => ({
      phase: phase.urlSegment,
      lesson: lesson.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { phase: phaseSlug, lesson: slug } = await params;
  const phase = SD_PHASES.find((p) => p.urlSegment === phaseSlug);
  const meta = phase?.lessons.find((l) => l.slug === slug);
  if (!meta) return {};
  return {
    title: `${meta.title} — System Design: Beyond the Prompt`,
    description: meta.subtitle,
  };
}

const COURSE_BASE = '/tutorials/system-design-beyond-the-prompt';

export default async function SystemDesignLessonPage({ params }: Props) {
  const { phase: phaseSlug, lesson: slug } = await params;

  const phase = SD_PHASES.find((p) => p.urlSegment === phaseSlug);
  if (!phase || !phase.lessons.find((l) => l.slug === slug)) notFound();

  let data;
  try {
    data = getSDLessonData(phaseSlug, slug);
  } catch {
    notFound();
  }

  return (
    <div className="lesson-page-wrapper">
      <style dangerouslySetInnerHTML={{ __html: SD_COURSE_CSS }} />

      <div className="flex items-start gap-6 xl:pl-6">
        <LessonTOC headings={data.headings} />
        <div className="min-w-0 flex-1">
          <div className="sd-lesson-host">
            <LessonReader
              lessonCss={data.lessonCss}
              bodyHtml={data.bodyHtml}
              script={data.script}
            />
          </div>
        </div>
      </div>

      <nav className="sd-lesson-bottom-nav">
        <div className="sd-lesson-bottom-nav-inner">
          {data.prev ? (
            <Link
              href={`${COURSE_BASE}/${data.prev.urlSegment}/${data.prev.slug}`}
              className="sd-lesson-nav-link"
            >
              <span className="sd-lesson-nav-dir">← Previous</span>
              <span className="sd-lesson-nav-title">{data.prev.title}</span>
            </Link>
          ) : (
            <Link href={COURSE_BASE} className="sd-lesson-nav-link">
              <span className="sd-lesson-nav-dir">← Overview</span>
              <span className="sd-lesson-nav-title">Course Overview</span>
            </Link>
          )}

          {data.next ? (
            <Link
              href={`${COURSE_BASE}/${data.next.urlSegment}/${data.next.slug}`}
              className="sd-lesson-nav-link sd-lesson-nav-link--next"
            >
              <span className="sd-lesson-nav-dir">Next →</span>
              <span className="sd-lesson-nav-title">{data.next.title}</span>
            </Link>
          ) : (
            <div className="sd-lesson-nav-link sd-lesson-nav-link--next sd-lesson-nav-link--complete">
              <span className="sd-lesson-nav-dir">✓ Course complete</span>
              <span className="sd-lesson-nav-title">All 15 chapters done</span>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
