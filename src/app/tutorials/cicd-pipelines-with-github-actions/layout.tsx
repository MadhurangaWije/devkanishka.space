import { CourseSidebar } from '@/components/course/CourseSidebar';
import { CICD_PHASES } from '@/lib/cicd-course';

export default function CicdCourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-16">
      <CourseSidebar
        phases={CICD_PHASES}
        comingSoonPhases={[]}
        courseBase="/tutorials/cicd-pipelines-with-github-actions"
        courseTitle="CI/CD Pipelines with GitHub Actions"
        totalPhaseCount={6}
      />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
