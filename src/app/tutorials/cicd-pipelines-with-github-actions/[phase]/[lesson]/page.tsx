import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCicdLessonData, CICD_PHASES } from '@/lib/cicd-course';
import { CicdLessonReader } from '@/components/course/CicdLessonReader';
import { LessonTOC } from '@/components/course/LessonTOC';
import { CICD_COURSE_CSS } from '@/lib/cicd-course-styles';

type Props = {
  params: Promise<{ phase: string; lesson: string }>;
};

export function generateStaticParams() {
  return CICD_PHASES.flatMap((phase) =>
    phase.lessons.map((lesson) => ({
      phase: phase.urlSegment,
      lesson: lesson.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { phase: phaseSlug, lesson: slug } = await params;
  const phase = CICD_PHASES.find((p) => p.urlSegment === phaseSlug);
  const meta = phase?.lessons.find((l) => l.slug === slug);
  if (!meta) return {};
  return {
    title: `${meta.title} — CI/CD Pipelines with GitHub Actions`,
    description: meta.subtitle,
  };
}

const COURSE_BASE = '/tutorials/cicd-pipelines-with-github-actions';

export default async function CicdLessonPage({ params }: Props) {
  const { phase: phaseSlug, lesson: slug } = await params;

  const phase = CICD_PHASES.find((p) => p.urlSegment === phaseSlug);
  if (!phase || !phase.lessons.find((l) => l.slug === slug)) notFound();

  let data;
  try {
    data = getCicdLessonData(phaseSlug, slug);
  } catch {
    notFound();
  }

  return (
    <div className="lesson-page-wrapper">
      <style dangerouslySetInnerHTML={{ __html: CICD_COURSE_CSS }} />

      <div className="flex items-start gap-6 xl:pl-6">
        <LessonTOC headings={data.headings} />
        <div className="min-w-0 flex-1">
          <CicdLessonReader bodyHtml={data.bodyHtml} />
        </div>
      </div>

      <nav className="cicd-lesson-bottom-nav">
        <div className="cicd-lesson-bottom-nav-inner">
          {data.prev ? (
            <Link
              href={`${COURSE_BASE}/${data.prev.urlSegment}/${data.prev.slug}`}
              className="cicd-lesson-nav-link"
            >
              <span className="cicd-lesson-nav-dir">← Previous</span>
              <span className="cicd-lesson-nav-title">{data.prev.title}</span>
            </Link>
          ) : (
            <Link href={COURSE_BASE} className="cicd-lesson-nav-link">
              <span className="cicd-lesson-nav-dir">← Overview</span>
              <span className="cicd-lesson-nav-title">Course Overview</span>
            </Link>
          )}

          {data.next ? (
            <Link
              href={`${COURSE_BASE}/${data.next.urlSegment}/${data.next.slug}`}
              className="cicd-lesson-nav-link cicd-lesson-nav-link--next"
            >
              <span className="cicd-lesson-nav-dir">Next →</span>
              <span className="cicd-lesson-nav-title">{data.next.title}</span>
            </Link>
          ) : (
            <div className="cicd-lesson-nav-link cicd-lesson-nav-link--next cicd-lesson-nav-link--complete">
              <span className="cicd-lesson-nav-dir">✓ Course complete</span>
              <span className="cicd-lesson-nav-title">
                All {CICD_PHASES.reduce((s, p) => s + p.lessons.length, 0)} lessons done
              </span>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
