import { CourseSidebar } from '@/components/course/CourseSidebar';
import { AZURE_PHASES } from '@/lib/azure-course';

export default function AzureCourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-16">
      <CourseSidebar
        phases={AZURE_PHASES}
        comingSoonPhases={[]}
        courseBase="/tutorials/azure-administration"
        courseTitle="Azure Administration"
        totalPhaseCount={6}
      />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
