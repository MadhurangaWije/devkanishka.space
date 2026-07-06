import { CourseSidebar } from '@/components/course/CourseSidebar';
import { AZURE_ARCHITECT_PHASES } from '@/lib/azure-architect-course';

export default function AzureArchitectCourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-16">
      <CourseSidebar
        phases={AZURE_ARCHITECT_PHASES}
        comingSoonPhases={[]}
        courseBase="/tutorials/azure-solutions-architect"
        courseTitle="Azure Solutions Architect (AZ-305)"
        totalPhaseCount={8}
      />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
