import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDockerLessonData, DOCKER_PHASES } from '@/lib/docker-course';
import { DockerLessonReader } from '@/components/course/DockerLessonReader';
import { LessonTOC } from '@/components/course/LessonTOC';
import { DOCKER_COURSE_CSS } from '@/lib/docker-course-styles';

type Props = {
  params: Promise<{ phase: string; lesson: string }>;
};

export function generateStaticParams() {
  return DOCKER_PHASES.flatMap((phase) =>
    phase.lessons.map((lesson) => ({
      phase: phase.urlSegment,
      lesson: lesson.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { phase: phaseSlug, lesson: slug } = await params;
  const phase = DOCKER_PHASES.find((p) => p.urlSegment === phaseSlug);
  const meta = phase?.lessons.find((l) => l.slug === slug);
  if (!meta) return {};
  return {
    title: `${meta.title} — Docker: Containers to Production`,
    description: meta.subtitle,
  };
}

const COURSE_BASE = '/tutorials/docker-fundamentals';

export default async function DockerLessonPage({ params }: Props) {
  const { phase: phaseSlug, lesson: slug } = await params;

  const phase = DOCKER_PHASES.find((p) => p.urlSegment === phaseSlug);
  if (!phase || !phase.lessons.find((l) => l.slug === slug)) notFound();

  let data;
  try {
    data = getDockerLessonData(phaseSlug, slug);
  } catch {
    notFound();
  }

  return (
    <div className="lesson-page-wrapper">
      <style dangerouslySetInnerHTML={{ __html: DOCKER_COURSE_CSS }} />

      <div className="flex items-start gap-6 xl:pl-6">
        <LessonTOC headings={data.headings} />
        <div className="min-w-0 flex-1">
          <DockerLessonReader bodyHtml={data.bodyHtml} script={data.script} />
        </div>
      </div>

      <nav className="docker-lesson-bottom-nav">
        <div className="docker-lesson-bottom-nav-inner">
          {data.prev ? (
            <Link
              href={`${COURSE_BASE}/${data.prev.urlSegment}/${data.prev.slug}`}
              className="docker-lesson-nav-link"
            >
              <span className="docker-lesson-nav-dir">← Previous</span>
              <span className="docker-lesson-nav-title">{data.prev.title}</span>
            </Link>
          ) : (
            <Link href={COURSE_BASE} className="docker-lesson-nav-link">
              <span className="docker-lesson-nav-dir">← Overview</span>
              <span className="docker-lesson-nav-title">Course Overview</span>
            </Link>
          )}

          {data.next ? (
            <Link
              href={`${COURSE_BASE}/${data.next.urlSegment}/${data.next.slug}`}
              className="docker-lesson-nav-link docker-lesson-nav-link--next"
            >
              <span className="docker-lesson-nav-dir">Next →</span>
              <span className="docker-lesson-nav-title">{data.next.title}</span>
            </Link>
          ) : (
            <div className="docker-lesson-nav-link docker-lesson-nav-link--next docker-lesson-nav-link--complete">
              <span className="docker-lesson-nav-dir">✓ Course complete</span>
              <span className="docker-lesson-nav-title">
                All {DOCKER_PHASES.reduce((s, p) => s + p.lessons.length, 0)} lessons done
              </span>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
