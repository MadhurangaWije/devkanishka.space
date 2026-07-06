import { notFound } from 'next/navigation';
import { AZURE_ARCHITECT_PHASES } from '@/lib/azure-architect-course';
import { tutorials } from '@/lib/data/tutorials';
import { CourseOverviewPage } from '@/components/course/CourseOverviewPage';

export const metadata = {
  title: 'Azure Solutions Architect (AZ-305)',
  description: 'A complete path to AZ-305 and professional architect skills — governance, networking, compute, data platforms, security, reliability, advanced patterns, case studies, and a capstone.',
};

export default function AzureArchitectCourseOverviewPage() {
  const tutorial = tutorials.find((t) => t.slug === 'azure-solutions-architect');
  if (!tutorial) notFound();

  return (
    <CourseOverviewPage
      tutorial={tutorial}
      phases={AZURE_ARCHITECT_PHASES}
      courseBase="/tutorials/azure-solutions-architect"
    />
  );
}
