import { notFound } from 'next/navigation';
import { AI_ENGINEERING_PHASES } from '@/lib/ai-engineering-course';
import { tutorials } from '@/lib/data/tutorials';
import { CourseOverviewPage } from '@/components/course/CourseOverviewPage';

export const metadata = {
  title: 'AI Engineering',
  description: 'A practical, project-driven path through AI engineering — calling LLM APIs, prompt engineering, RAG pipelines, agents and tool use, and shipping AI features safely in production.',
};

export default function AiEngineeringCourseOverviewPage() {
  const tutorial = tutorials.find((t) => t.slug === 'ai-engineering');
  if (!tutorial) notFound();

  return (
    <CourseOverviewPage
      tutorial={tutorial}
      phases={AI_ENGINEERING_PHASES}
      courseBase="/tutorials/ai-engineering"
      unitLabel="module"
    />
  );
}
