import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getK8sLessonData, K8S_PHASES } from '@/lib/k8s-course';
import { K8sLessonReader } from '@/components/course/K8sLessonReader';
import { LessonTOC } from '@/components/course/LessonTOC';
import { K8S_COURSE_CSS } from '@/lib/k8s-course-styles';

type Props = {
  params: Promise<{ phase: string; lesson: string }>;
};

export function generateStaticParams() {
  return K8S_PHASES.flatMap((phase) =>
    phase.lessons.map((lesson) => ({
      phase: phase.urlSegment,
      lesson: lesson.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { phase: phaseSlug, lesson: slug } = await params;
  const phase = K8S_PHASES.find((p) => p.urlSegment === phaseSlug);
  const meta = phase?.lessons.find((l) => l.slug === slug);
  if (!meta) return {};
  return {
    title: `${meta.title} — Kubernetes Mastery`,
    description: meta.subtitle,
  };
}

const COURSE_BASE = '/tutorials/kubernetes-mastery';

export default async function K8sLessonPage({ params }: Props) {
  const { phase: phaseSlug, lesson: slug } = await params;

  const phase = K8S_PHASES.find((p) => p.urlSegment === phaseSlug);
  if (!phase || !phase.lessons.find((l) => l.slug === slug)) notFound();

  let data;
  try {
    data = getK8sLessonData(phaseSlug, slug);
  } catch {
    notFound();
  }

  return (
    <div className="lesson-page-wrapper">
      <style dangerouslySetInnerHTML={{ __html: K8S_COURSE_CSS }} />

      <div className="flex items-start gap-6 xl:pl-6">
        <LessonTOC headings={data.headings} />
        <div className="min-w-0 flex-1">
          <K8sLessonReader bodyHtml={data.bodyHtml} script={data.script} />
        </div>
      </div>

      <nav className="k8s-lesson-bottom-nav">
        <div className="k8s-lesson-bottom-nav-inner">
          {data.prev ? (
            <Link
              href={`${COURSE_BASE}/${data.prev.urlSegment}/${data.prev.slug}`}
              className="k8s-lesson-nav-link"
            >
              <span className="k8s-lesson-nav-dir">← Previous</span>
              <span className="k8s-lesson-nav-title">{data.prev.title}</span>
            </Link>
          ) : (
            <Link href={COURSE_BASE} className="k8s-lesson-nav-link">
              <span className="k8s-lesson-nav-dir">← Overview</span>
              <span className="k8s-lesson-nav-title">Course Overview</span>
            </Link>
          )}

          {data.next ? (
            <Link
              href={`${COURSE_BASE}/${data.next.urlSegment}/${data.next.slug}`}
              className="k8s-lesson-nav-link k8s-lesson-nav-link--next"
            >
              <span className="k8s-lesson-nav-dir">Next →</span>
              <span className="k8s-lesson-nav-title">{data.next.title}</span>
            </Link>
          ) : (
            <div className="k8s-lesson-nav-link k8s-lesson-nav-link--next k8s-lesson-nav-link--complete">
              <span className="k8s-lesson-nav-dir">✓ Course complete</span>
              <span className="k8s-lesson-nav-title">
                All {K8S_PHASES.reduce((s, p) => s + p.lessons.length, 0)} lessons done
              </span>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
