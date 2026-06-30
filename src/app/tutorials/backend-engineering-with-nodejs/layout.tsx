import { CourseSidebar } from '@/components/course/CourseSidebar';
import { PHASES } from '@/lib/backend-course';

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-16">
      <CourseSidebar
        phases={PHASES}
        courseBase="/tutorials/backend-engineering-with-nodejs"
        courseTitle="Backend Engineering with Node.js"
        totalPhaseCount={7}
      />
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}
