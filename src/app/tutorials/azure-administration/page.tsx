import { notFound } from 'next/navigation';
import { AZURE_PHASES } from '@/lib/azure-course';
import { tutorials } from '@/lib/data/tutorials';
import { CourseOverviewPage } from '@/components/course/CourseOverviewPage';

export const metadata = {
  title: 'Azure Administration (AZ-104) — Full Course',
  description:
    'A complete, practitioner-oriented guide to Azure Administration — 25 lessons across 6 modules covering every AZ-104 exam domain: identity, storage, compute, networking, monitoring, and enterprise governance.',
};

export default function AzureCoursePage() {
  const tutorial = tutorials.find((t) => t.slug === 'azure-administration');
  if (!tutorial) notFound();

  return (
    <CourseOverviewPage
      tutorial={tutorial}
      phases={AZURE_PHASES}
      courseBase="/tutorials/azure-administration"
      unitLabel="module"
    />
  );
}
