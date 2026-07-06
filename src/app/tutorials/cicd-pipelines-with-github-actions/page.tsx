import { notFound } from 'next/navigation';
import { CICD_PHASES } from '@/lib/cicd-course';
import { tutorials } from '@/lib/data/tutorials';
import { CourseOverviewPage } from '@/components/course/CourseOverviewPage';

export const metadata = {
  title: 'CI/CD Pipelines with GitHub Actions',
  description: 'A complete path through CI/CD — from your first GitHub Actions workflow through Azure deployments, GitOps with ArgoCD, supply-chain hardening, and operating pipelines at scale.',
};

export default function CicdCourseOverviewPage() {
  const tutorial = tutorials.find((t) => t.slug === 'cicd-pipelines-with-github-actions');
  if (!tutorial) notFound();

  return (
    <CourseOverviewPage
      tutorial={tutorial}
      phases={CICD_PHASES}
      courseBase="/tutorials/cicd-pipelines-with-github-actions"
    />
  );
}
