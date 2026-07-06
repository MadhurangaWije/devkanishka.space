import { notFound } from 'next/navigation';
import { K8S_PHASES } from '@/lib/k8s-course';
import { tutorials } from '@/lib/data/tutorials';
import { CourseOverviewPage } from '@/components/course/CourseOverviewPage';

export const metadata = {
  title: 'Kubernetes Mastery',
  description: 'A complete, certification-aligned path through Kubernetes — architecture, core workloads, networking, storage, scheduling, security, observability, operators, service mesh, and production operations.',
};

export default function K8sCourseOverviewPage() {
  const tutorial = tutorials.find((t) => t.slug === 'kubernetes-mastery');
  if (!tutorial) notFound();

  return (
    <CourseOverviewPage
      tutorial={tutorial}
      phases={K8S_PHASES}
      courseBase="/tutorials/kubernetes-mastery"
      unitLabel="chapter"
    />
  );
}
