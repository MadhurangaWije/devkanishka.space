import Script from 'next/script';
import { CourseSidebar } from '@/components/course/CourseSidebar';
import { ML_PHASES } from '@/lib/ml-course';

export default function MLCourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-16">
      <Script src="https://cdn.plot.ly/plotly-2.32.0.min.js" strategy="afterInteractive" />
      <CourseSidebar
        phases={ML_PHASES}
        comingSoonPhases={[]}
        courseBase="/tutorials/ml-and-dl-mastery"
        courseTitle="ML & DL Mastery"
        totalPhaseCount={6}
      />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
