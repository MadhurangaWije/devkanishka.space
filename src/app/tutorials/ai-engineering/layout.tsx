import { CourseSidebar } from '@/components/course/CourseSidebar';
import { AI_ENGINEERING_PHASES } from '@/lib/ai-engineering-course';

export default function AiEngineeringCourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-16">
      <CourseSidebar
        phases={AI_ENGINEERING_PHASES}
        comingSoonPhases={[]}
        courseBase="/tutorials/ai-engineering"
        courseTitle="AI Engineering"
        totalPhaseCount={5}
      />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
