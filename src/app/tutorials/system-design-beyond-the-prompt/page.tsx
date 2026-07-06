import { notFound } from 'next/navigation';
import { SD_PHASES } from '@/lib/system-design-course';
import { tutorials } from '@/lib/data/tutorials';
import { CourseOverviewPage } from '@/components/course/CourseOverviewPage';

export const metadata = {
  title: 'System Design: Beyond the Prompt',
  description: "A complete, from-scratch path through system design — 15 chapters, 65 lessons, and a quiz plus interview questions for every chapter.",
};

export default function SystemDesignCourseOverviewPage() {
  const tutorial = tutorials.find((t) => t.slug === 'system-design-beyond-the-prompt');
  if (!tutorial) notFound();

  return (
    <CourseOverviewPage
      tutorial={tutorial}
      phases={SD_PHASES}
      courseBase="/tutorials/system-design-beyond-the-prompt"
      unitLabel="chapter"
    />
  );
}
