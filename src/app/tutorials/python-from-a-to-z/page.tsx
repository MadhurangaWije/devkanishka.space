import { notFound } from 'next/navigation';
import { PHASES } from '@/lib/python-course';
import { tutorials } from '@/lib/data/tutorials';
import { CourseOverviewPage } from '@/components/course/CourseOverviewPage';

export const metadata = {
  title: 'Python: Print to Production',
  description: 'A complete path through Python — from your first print() to production-ready code.',
};

export default function CourseOverviewPage_() {
  const tutorial = tutorials.find((t) => t.slug === 'python-from-a-to-z');
  if (!tutorial) notFound();

  return (
    <CourseOverviewPage
      tutorial={tutorial}
      phases={PHASES}
      courseBase="/tutorials/python-from-a-to-z"
      note="Phase 3 has a few gaps in the middle (dataclasses, memory management, and testing) that aren't written yet — everything else, including the FastAPI, ML/AI, and CPython Internals phases, is complete and ready to go."
    />
  );
}
