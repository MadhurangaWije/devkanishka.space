import { notFound } from 'next/navigation';
import { DOCKER_PHASES } from '@/lib/docker-course';
import { tutorials } from '@/lib/data/tutorials';
import { CourseOverviewPage } from '@/components/course/CourseOverviewPage';

export const metadata = {
  title: 'Docker: Containers to Production',
  description: 'A complete, hands-on path through Docker — from the shipping-container analogy to production hardening, image supply-chain security, and an orchestration primer.',
};

export default function DockerCourseOverviewPage() {
  const tutorial = tutorials.find((t) => t.slug === 'docker-fundamentals');
  if (!tutorial) notFound();

  return (
    <CourseOverviewPage
      tutorial={tutorial}
      phases={DOCKER_PHASES}
      courseBase="/tutorials/docker-fundamentals"
    />
  );
}
