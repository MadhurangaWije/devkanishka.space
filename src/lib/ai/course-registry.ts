import type { PhaseMeta } from '@/lib/backend-course';

import { PHASES as BACKEND_PHASES, getLessonData as getBackendLessonData } from '@/lib/backend-course';
import { PHASES as PYTHON_PHASES, getLessonData as getPythonLessonData } from '@/lib/python-course';
import { ML_PHASES, getMLLessonData } from '@/lib/ml-course';
import { AZURE_PHASES, getAzureLessonData } from '@/lib/azure-course';
import { SD_PHASES, getSDLessonData } from '@/lib/system-design-course';
import { DOCKER_PHASES, getDockerLessonData } from '@/lib/docker-course';
import { AI_ENGINEERING_PHASES, getAiEngineeringLessonData } from '@/lib/ai-engineering-course';
import { CICD_PHASES, getCicdLessonData } from '@/lib/cicd-course';
import { AZURE_ARCHITECT_PHASES, getAzureArchitectLessonData } from '@/lib/azure-architect-course';
import { K8S_PHASES, getK8sLessonData } from '@/lib/k8s-course';

export type CourseEntry = {
  slug: string;
  title: string;
  courseBase: string;
  phases: PhaseMeta[];
  /** Returns the already-parsed, site-ready body HTML for one lesson. */
  getBodyHtml: (phase: PhaseMeta, lessonSlug: string) => string;
};

// One entry per course. `getBodyHtml` normalizes the two different
// getXLessonData() call shapes across the codebase (most take the phase's
// urlSegment; backend + python — the two oldest courses — take the numeric
// phase number instead) so the indexing script can treat every course the
// same way.
export const COURSE_REGISTRY: CourseEntry[] = [
  {
    slug: 'backend-engineering-with-nodejs',
    title: 'Backend Engineering with Node.js',
    courseBase: '/tutorials/backend-engineering-with-nodejs',
    phases: BACKEND_PHASES,
    getBodyHtml: (phase, slug) => getBackendLessonData(phase.number, slug).bodyHtml,
  },
  {
    slug: 'python-from-a-to-z',
    title: 'Python: Print to Production',
    courseBase: '/tutorials/python-from-a-to-z',
    phases: PYTHON_PHASES,
    getBodyHtml: (phase, slug) => getPythonLessonData(phase.number, slug).bodyHtml,
  },
  {
    slug: 'ml-and-dl-mastery',
    title: 'ML & DL Mastery',
    courseBase: '/tutorials/ml-and-dl-mastery',
    phases: ML_PHASES,
    getBodyHtml: (phase, slug) => getMLLessonData(phase.urlSegment, slug).bodyHtml,
  },
  {
    slug: 'azure-administration',
    title: 'Azure Administration (AZ-104)',
    courseBase: '/tutorials/azure-administration',
    phases: AZURE_PHASES,
    getBodyHtml: (phase, slug) => getAzureLessonData(phase.urlSegment, slug).bodyHtml,
  },
  {
    slug: 'system-design-beyond-the-prompt',
    title: 'System Design: Beyond the Prompt',
    courseBase: '/tutorials/system-design-beyond-the-prompt',
    phases: SD_PHASES,
    getBodyHtml: (phase, slug) => getSDLessonData(phase.urlSegment, slug).bodyHtml,
  },
  {
    slug: 'docker-fundamentals',
    title: 'Docker: Containers to Production',
    courseBase: '/tutorials/docker-fundamentals',
    phases: DOCKER_PHASES,
    getBodyHtml: (phase, slug) => getDockerLessonData(phase.urlSegment, slug).bodyHtml,
  },
  {
    slug: 'ai-engineering',
    title: 'AI Engineering',
    courseBase: '/tutorials/ai-engineering',
    phases: AI_ENGINEERING_PHASES,
    getBodyHtml: (phase, slug) => getAiEngineeringLessonData(phase.urlSegment, slug).bodyHtml,
  },
  {
    slug: 'cicd-pipelines-with-github-actions',
    title: 'CI/CD Pipelines with GitHub Actions',
    courseBase: '/tutorials/cicd-pipelines-with-github-actions',
    phases: CICD_PHASES,
    getBodyHtml: (phase, slug) => getCicdLessonData(phase.urlSegment, slug).bodyHtml,
  },
  {
    slug: 'azure-solutions-architect',
    title: 'Azure Solutions Architect (AZ-305)',
    courseBase: '/tutorials/azure-solutions-architect',
    phases: AZURE_ARCHITECT_PHASES,
    getBodyHtml: (phase, slug) => getAzureArchitectLessonData(phase.urlSegment, slug).bodyHtml,
  },
  {
    slug: 'kubernetes-mastery',
    title: 'Kubernetes Mastery',
    courseBase: '/tutorials/kubernetes-mastery',
    phases: K8S_PHASES,
    getBodyHtml: (phase, slug) => getK8sLessonData(phase.urlSegment, slug).bodyHtml,
  },
];
