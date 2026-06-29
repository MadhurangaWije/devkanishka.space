import { CourseSidebar } from '@/components/course/CourseSidebar';
import { ML_PHASES } from '@/lib/ml-course';

const ML_COMING_SOON = [
  'Phase 2 — Classical Machine Learning',
  'Phase 3 — Deep Learning Fundamentals',
  'Phase 4 — NLP & Large Language Models',
  'Phase 5 — Computer Vision',
  'Phase 6 — MLOps & Production',
];

export default function MLCourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-16">
      <CourseSidebar phases={ML_PHASES} comingSoonPhases={ML_COMING_SOON} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
