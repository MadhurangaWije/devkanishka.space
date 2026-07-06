import { notFound } from 'next/navigation';
import { PHASES } from '@/lib/backend-course';
import { tutorials } from '@/lib/data/tutorials';
import { CourseOverviewPage } from '@/components/course/CourseOverviewPage';

export const metadata = {
  title: 'Backend Engineering with Node.js',
  description: 'A complete learning path from zero to production — structured, progressive, no gaps.',
};

export default function CourseOverviewPage_() {
  const tutorial = tutorials.find((t) => t.slug === 'backend-engineering-with-nodejs');
  if (!tutorial) notFound();

  return (
    <CourseOverviewPage
      tutorial={tutorial}
      phases={PHASES}
      courseBase="/tutorials/backend-engineering-with-nodejs"
      note="Phases 3–7 (Data & Persistence, Auth & Security, Production Readiness, Infrastructure, and Advanced Topics) are still being written. Master the available phases first — each one builds directly on the last."
    />
  );
}
