import { CourseSidebar } from '@/components/course/CourseSidebar';
import { K8S_PHASES } from '@/lib/k8s-course';

export default function K8sCourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-16">
      <CourseSidebar
        phases={K8S_PHASES}
        comingSoonPhases={[]}
        courseBase="/tutorials/kubernetes-mastery"
        courseTitle="Kubernetes Mastery"
        totalPhaseCount={14}
      />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
