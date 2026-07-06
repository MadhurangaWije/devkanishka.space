import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAzureArchitectLessonData, AZURE_ARCHITECT_PHASES } from '@/lib/azure-architect-course';
import { AzureArchitectLessonReader } from '@/components/course/AzureArchitectLessonReader';
import { LessonTOC } from '@/components/course/LessonTOC';
import { AZURE_ARCHITECT_COURSE_CSS } from '@/lib/azure-architect-course-styles';

type Props = {
  params: Promise<{ phase: string; lesson: string }>;
};

export function generateStaticParams() {
  return AZURE_ARCHITECT_PHASES.flatMap((phase) =>
    phase.lessons.map((lesson) => ({
      phase: phase.urlSegment,
      lesson: lesson.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { phase: phaseSlug, lesson: slug } = await params;
  const phase = AZURE_ARCHITECT_PHASES.find((p) => p.urlSegment === phaseSlug);
  const meta = phase?.lessons.find((l) => l.slug === slug);
  if (!meta) return {};
  return {
    title: `${meta.title} — Azure Solutions Architect (AZ-305)`,
    description: meta.subtitle,
  };
}

const COURSE_BASE = '/tutorials/azure-solutions-architect';

export default async function AzureArchitectLessonPage({ params }: Props) {
  const { phase: phaseSlug, lesson: slug } = await params;

  const phase = AZURE_ARCHITECT_PHASES.find((p) => p.urlSegment === phaseSlug);
  if (!phase || !phase.lessons.find((l) => l.slug === slug)) notFound();

  let data;
  try {
    data = getAzureArchitectLessonData(phaseSlug, slug);
  } catch {
    notFound();
  }

  return (
    <div className="lesson-page-wrapper">
      <style dangerouslySetInnerHTML={{ __html: AZURE_ARCHITECT_COURSE_CSS }} />

      <div className="flex items-start gap-6 xl:pl-6">
        <LessonTOC headings={data.headings} />
        <div className="min-w-0 flex-1">
          <AzureArchitectLessonReader bodyHtml={data.bodyHtml} script={data.script} />
        </div>
      </div>

      <nav className="azure-architect-lesson-bottom-nav">
        <div className="azure-architect-lesson-bottom-nav-inner">
          {data.prev ? (
            <Link
              href={`${COURSE_BASE}/${data.prev.urlSegment}/${data.prev.slug}`}
              className="azure-architect-lesson-nav-link"
            >
              <span className="azure-architect-lesson-nav-dir">← Previous</span>
              <span className="azure-architect-lesson-nav-title">{data.prev.title}</span>
            </Link>
          ) : (
            <Link href={COURSE_BASE} className="azure-architect-lesson-nav-link">
              <span className="azure-architect-lesson-nav-dir">← Overview</span>
              <span className="azure-architect-lesson-nav-title">Course Overview</span>
            </Link>
          )}

          {data.next ? (
            <Link
              href={`${COURSE_BASE}/${data.next.urlSegment}/${data.next.slug}`}
              className="azure-architect-lesson-nav-link azure-architect-lesson-nav-link--next"
            >
              <span className="azure-architect-lesson-nav-dir">Next →</span>
              <span className="azure-architect-lesson-nav-title">{data.next.title}</span>
            </Link>
          ) : (
            <div className="azure-architect-lesson-nav-link azure-architect-lesson-nav-link--next azure-architect-lesson-nav-link--complete">
              <span className="azure-architect-lesson-nav-dir">✓ Course complete</span>
              <span className="azure-architect-lesson-nav-title">
                All {AZURE_ARCHITECT_PHASES.reduce((s, p) => s + p.lessons.length, 0)} lessons done
              </span>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
