import { CourseSidebar } from '@/components/course/CourseSidebar';
import { PHASES, COMING_SOON_PHASES } from '@/lib/python-course';

export default function PythonCourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-16">
      <CourseSidebar
        phases={PHASES}
        comingSoonPhases={COMING_SOON_PHASES}
        courseBase="/tutorials/python-from-a-to-z"
        courseTitle="Python: Print to Production"
        totalPhaseCount={6}
      />
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}
