import { notFound } from 'next/navigation';
import { ML_PHASES } from '@/lib/ml-course';
import { tutorials } from '@/lib/data/tutorials';
import { CourseOverviewPage } from '@/components/course/CourseOverviewPage';

export const metadata = {
  title: 'ML & DL Mastery',
  description: 'A structured, from-scratch path through machine learning and deep learning — built for engineers who want to understand the math and code, not just import sklearn.',
};

export default function MLCourseOverviewPage() {
  const tutorial = tutorials.find((t) => t.slug === 'ml-and-dl-mastery');
  if (!tutorial) notFound();

  return (
    <CourseOverviewPage
      tutorial={tutorial}
      phases={ML_PHASES}
      courseBase="/tutorials/ml-and-dl-mastery"
    />
  );
}
