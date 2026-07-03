import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAzureLessonData, AZURE_PHASES } from '@/lib/azure-course';
import { AzureLessonReader } from '@/components/course/AzureLessonReader';
import { LessonTOC } from '@/components/course/LessonTOC';
import { AZURE_COURSE_CSS } from '@/lib/azure-course-styles';

type Props = {
  params: Promise<{ module: string; lesson: string }>;
};

export function generateStaticParams() {
  return AZURE_PHASES.flatMap((phase) =>
    phase.lessons.map((lesson) => ({
      module: phase.urlSegment,
      lesson: lesson.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module: moduleSlug, lesson: slug } = await params;
  const phase = AZURE_PHASES.find((p) => p.urlSegment === moduleSlug);
  const meta = phase?.lessons.find((l) => l.slug === slug);
  if (!meta) return {};
  return {
    title: `${meta.title} — Azure Administration`,
    description: meta.subtitle,
  };
}

const COURSE_BASE = '/tutorials/azure-administration';

export default async function AzureLessonPage({ params }: Props) {
  const { module: moduleSlug, lesson: slug } = await params;

  const phase = AZURE_PHASES.find((p) => p.urlSegment === moduleSlug);
  if (!phase || !phase.lessons.find((l) => l.slug === slug)) notFound();

  let data;
  try {
    data = getAzureLessonData(moduleSlug, slug);
  } catch {
    notFound();
  }

  return (
    <div className="lesson-page-wrapper">
      <style dangerouslySetInnerHTML={{ __html: AZURE_COURSE_CSS }} />

      <div className="flex items-start gap-6 xl:pl-6">
        <LessonTOC headings={data.headings} />
        <div className="min-w-0 flex-1">
          <AzureLessonReader bodyHtml={data.bodyHtml} script={data.script} />
        </div>
      </div>

      <nav className="az-bottom-nav">
        <div className="az-bottom-nav-inner">
          {data.prev ? (
            <Link
              href={`${COURSE_BASE}/${data.prev.urlSegment}/${data.prev.slug}`}
              className="az-nav-link"
            >
              <span className="az-nav-dir">← Previous</span>
              <span className="az-nav-title">{data.prev.title}</span>
            </Link>
          ) : (
            <Link href={COURSE_BASE} className="az-nav-link">
              <span className="az-nav-dir">← Overview</span>
              <span className="az-nav-title">Course Overview</span>
            </Link>
          )}

          {data.next ? (
            <Link
              href={`${COURSE_BASE}/${data.next.urlSegment}/${data.next.slug}`}
              className="az-nav-link az-nav-link--next"
            >
              <span className="az-nav-dir">Next →</span>
              <span className="az-nav-title">{data.next.title}</span>
            </Link>
          ) : (
            <div className="az-nav-link az-nav-link--next az-nav-link--complete">
              <span className="az-nav-dir">✓ Course complete</span>
              <span className="az-nav-title">All 25 lessons done</span>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
