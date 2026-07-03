import { CourseSidebar } from '@/components/course/CourseSidebar';
import { SD_PHASES } from '@/lib/system-design-course';

export default function SystemDesignCourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-16">
      <CourseSidebar
        phases={SD_PHASES}
        comingSoonPhases={[]}
        courseBase="/tutorials/system-design-beyond-the-prompt"
        courseTitle="System Design: Beyond the Prompt"
        totalPhaseCount={15}
      />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
