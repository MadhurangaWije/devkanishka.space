import { CourseSidebar } from '@/components/course/CourseSidebar';
import { ML_PHASES } from '@/lib/ml-course';

const ML_COMING_SOON = ['Phase 6 — MLOps & Production'];

export default function MLCourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-16">
      <CourseSidebar
        phases={ML_PHASES}
        comingSoonPhases={ML_COMING_SOON}
        courseBase="/tutorials/ml-and-dl-mastery"
        courseTitle="ML & DL Mastery"
        totalPhaseCount={6}
      />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
