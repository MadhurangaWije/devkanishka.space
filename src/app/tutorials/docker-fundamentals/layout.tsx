import { CourseSidebar } from '@/components/course/CourseSidebar';
import { DOCKER_PHASES } from '@/lib/docker-course';

export default function DockerCourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-16">
      <CourseSidebar
        phases={DOCKER_PHASES}
        comingSoonPhases={[]}
        courseBase="/tutorials/docker-fundamentals"
        courseTitle="Docker: Containers to Production"
        totalPhaseCount={6}
      />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
