import fs from 'fs';
import path from 'path';
import type { LessonMeta, PhaseMeta } from '@/lib/backend-course';
import { extractHeadingsAndInjectIds, type LessonHeading } from '@/lib/lesson-toc';

export type { LessonMeta as CicdLessonMeta, PhaseMeta as CicdPhaseMeta };

export type CicdLessonData = LessonMeta & {
  phaseNumber: number;
  phaseName: string;
  bodyHtml: string;
  headings: LessonHeading[];
  prev: { slug: string; title: string; urlSegment: string } | null;
  next: { slug: string; title: string; urlSegment: string } | null;
};

// ── Phase definitions ──────────────────────────────────────────────────────

export const CICD_PHASES: PhaseMeta[] = [
  {
    number: 1,
    name: 'Phase 1 — CI Fundamentals',
    urlSegment: 'phase-1',
    contentDir: 'cicd-pipelines',
    lessons: [
      { slug: 'what-is-a-cicd-pipeline', title: 'What Is a CI/CD Pipeline?', subtitle: 'The mental model — CI, Continuous Delivery, and Continuous Deployment — and the DORA metrics that prove it matters.', number: 1, file: '0001-what-is-a-cicd-pipeline.html' },
      { slug: 'first-github-actions-workflow', title: 'Your First GitHub Actions Workflow', subtitle: 'Write and run a real workflow file — events, jobs, steps, and runners.', number: 2, file: '0002-first-github-actions-workflow.html' },
      { slug: 'triggers-and-events', title: 'Triggers & Events: Controlling When Pipelines Run', subtitle: 'push, pull_request, schedule, workflow_dispatch — choosing exactly when a pipeline fires.', number: 3, file: '0003-triggers-and-events.html' },
      { slug: 'jobs-parallelism-dependencies', title: 'Jobs, Parallelism & Dependencies', subtitle: 'Fan jobs out in parallel or chain them with `needs` — and know which one you actually want.', number: 4, file: '0004-jobs-parallelism-dependencies.html' },
      { slug: 'real-ci-lint-test-build', title: 'Real CI: Lint, Test & Build', subtitle: 'Turning a toy workflow into a pipeline that actually protects your main branch.', number: 5, file: '0005-real-ci-lint-test-build.html' },
      { slug: 'caching-and-optimization', title: 'Caching & Pipeline Optimization', subtitle: 'Dependency caching and job layout changes that cut CI time from minutes to seconds.', number: 6, file: '0006-caching-and-optimization.html' },
      { slug: 'secrets-environments-variables', title: 'Secrets, Environments & Variables', subtitle: 'Keeping credentials out of your workflow files while still using them safely.', number: 7, file: '0007-secrets-environments-variables.html' },
      { slug: 'artifacts-and-outputs', title: 'Artifacts & Job Outputs', subtitle: 'Passing build results and computed values between jobs and workflow runs.', number: 8, file: '0008-artifacts-and-outputs.html' },
      { slug: 'matrix-builds', title: 'Matrix Builds', subtitle: 'Run the same job across every OS/version combination you support, in parallel, from one block.', number: 9, file: '0009-matrix-builds.html' },
      { slug: 'deployment-strategies', title: 'Deployment Strategies', subtitle: 'Rolling, blue-green, and canary — the tradeoffs behind how a new version actually reaches users.', number: 10, file: '0010-deployment-strategies.html' },
    ],
  },
  {
    number: 2,
    name: 'Phase 2 — Deploying to Azure',
    urlSegment: 'phase-2',
    contentDir: 'cicd-pipelines',
    lessons: [
      { slug: 'azure-oidc-authentication', title: 'Azure OIDC: Zero-Secret Authentication', subtitle: 'Authenticate GitHub Actions to Azure with short-lived federated tokens — no stored secrets at all.', number: 11, file: '0011-azure-oidc-authentication.html' },
      { slug: 'deploy-azure-app-service', title: 'Deploy to Azure App Service', subtitle: 'Ship a workflow that builds and deploys straight to App Service on every merge.', number: 12, file: '0012-deploy-azure-app-service.html' },
      { slug: 'container-pipelines-docker-acr', title: 'Container Pipelines: Docker Build & Push to ACR', subtitle: 'Build, tag, and push container images to Azure Container Registry as part of CI.', number: 13, file: '0013-container-pipelines-docker-acr.html' },
      { slug: 'deploy-to-aks', title: 'Deploy to AKS', subtitle: 'Get a built image from ACR into a running Kubernetes deployment on AKS.', number: 14, file: '0014-deploy-to-aks.html' },
      { slug: 'helm-based-deployments', title: 'Helm-Based Deployments', subtitle: 'Package Kubernetes manifests as versioned Helm charts and deploy them from CI.', number: 15, file: '0015-helm-based-deployments.html' },
      { slug: 'reusable-workflows', title: 'Reusable Workflows', subtitle: 'Stop copy-pasting YAML across repos — call one workflow from another with typed inputs.', number: 16, file: '0016-reusable-workflows.html' },
      { slug: 'composite-actions-monorepo', title: 'Composite Actions & Mono-Repo Pipelines', subtitle: 'Package repeated step sequences as actions, and scope pipelines to only the parts of a monorepo that changed.', number: 17, file: '0017-composite-actions-monorepo.html' },
    ],
  },
  {
    number: 3,
    name: 'Phase 3 — GitOps & ArgoCD',
    urlSegment: 'phase-3',
    contentDir: 'cicd-pipelines',
    lessons: [
      { slug: 'gitops-principles', title: 'GitOps Principles: The Paradigm Shift', subtitle: 'Pull-based delivery — Git as the single source of truth, and a cluster agent that reconciles toward it.', number: 18, file: '0018-gitops-principles.html' },
      { slug: 'argocd-installation', title: 'ArgoCD Installation & Architecture', subtitle: 'Get ArgoCD running in-cluster and understand the components that make GitOps work.', number: 19, file: '0019-argocd-installation.html' },
      { slug: 'argocd-applications-sync-policies', title: 'ArgoCD Applications & Sync Policies', subtitle: 'Define what ArgoCD manages and how aggressively it reconciles drift back to Git.', number: 20, file: '0020-argocd-applications-sync-policies.html' },
      { slug: 'ci-gitops-flow', title: 'The CI→GitOps Flow', subtitle: 'Wiring CI (build/push an image) to GitOps (update a manifest) without the pipeline ever touching the cluster.', number: 21, file: '0021-ci-gitops-flow.html' },
      { slug: 'app-of-apps-applicationset', title: 'App-of-Apps & ApplicationSet', subtitle: 'Manage dozens of ArgoCD Applications declaratively instead of registering each one by hand.', number: 22, file: '0022-app-of-apps-applicationset.html' },
      { slug: 'argo-rollouts-progressive-delivery', title: 'Argo Rollouts: Progressive Delivery', subtitle: 'Canary and blue-green rollouts with automated analysis and rollback, driven from GitOps.', number: 23, file: '0023-argo-rollouts-progressive-delivery.html' },
      { slug: 'secrets-in-gitops', title: 'Secrets in GitOps', subtitle: "You can't commit secrets to Git — how sealed secrets and external secret stores square that circle.", number: 24, file: '0024-secrets-in-gitops.html' },
      { slug: 'multi-environment-promotion', title: 'Multi-Environment Promotion', subtitle: 'Promoting the same artifact through dev → staging → prod with GitOps instead of separate builds.', number: 25, file: '0025-multi-environment-promotion.html' },
    ],
  },
  {
    number: 4,
    name: 'Phase 4 — Hardening & Supply Chain Security',
    urlSegment: 'phase-4',
    contentDir: 'cicd-pipelines',
    lessons: [
      { slug: 'hardening-github-actions', title: 'Hardening GitHub Actions Workflows', subtitle: 'Pinned actions, least-privilege tokens, and the supply-chain attacks this actually prevents.', number: 26, file: '0026-hardening-github-actions.html' },
      { slug: 'image-signing-cosign', title: 'Image Signing & Verification (Cosign)', subtitle: 'Cryptographically sign every image your pipeline builds, and refuse to deploy anything unsigned.', number: 27, file: '0027-image-signing-cosign.html' },
      { slug: 'policy-as-code-gatekeeper', title: 'Policy-as-Code: OPA Gatekeeper', subtitle: 'Enforce cluster-wide rules — no unsigned images, no `:latest` tags — as code, not tribal knowledge.', number: 28, file: '0028-policy-as-code-gatekeeper.html' },
    ],
  },
  {
    number: 5,
    name: 'Phase 5 — Operating Pipelines at Scale',
    urlSegment: 'phase-5',
    contentDir: 'cicd-pipelines',
    lessons: [
      { slug: 'optimization-and-cost', title: 'Pipeline Optimization & Cost', subtitle: 'Runner minutes add up — concrete tactics for faster, cheaper pipelines at scale.', number: 29, file: '0029-optimization-and-cost.html' },
      { slug: 'observability-for-pipelines', title: 'Observability for Pipelines', subtitle: 'Treat your CI/CD system itself as production — metrics, tracing, and alerting on the pipeline.', number: 30, file: '0030-observability-for-pipelines.html' },
      { slug: 'disaster-recovery', title: 'Disaster Recovery for CI/CD', subtitle: "What happens when your runner fleet, registry, or GitOps repo disappears — and how you recover fast.", number: 31, file: '0031-disaster-recovery.html' },
      { slug: 'release-pipelines', title: 'Release Pipelines & Semantic Versioning', subtitle: 'Automating changelogs, version bumps, and releases so shipping isn\'t a manual ceremony.', number: 32, file: '0032-release-pipelines.html' },
    ],
  },
  {
    number: 6,
    name: 'Phase 6 — Capstone',
    urlSegment: 'phase-6',
    contentDir: 'cicd-pipelines',
    lessons: [
      { slug: 'architecture-decisions-capstone', title: 'Architecture Decisions Capstone', subtitle: 'Pull every decision — push vs. pull deployment, GitOps vs. direct, rollout strategy — into one coherent design.', number: 33, file: '0033-architecture-decisions-capstone.html' },
      { slug: 'projects', title: 'Projects — Real-World CI/CD Challenges', subtitle: 'A set of open-ended builds to cement everything, from a from-scratch pipeline to a full GitOps migration.', number: 34, file: '0034-projects.html' },
    ],
  },
];

// ── Flat lesson index for cross-phase navigation ───────────────────────────

type FlatLesson = LessonMeta & { urlSegment: string };

const ALL_CICD_LESSONS: FlatLesson[] = CICD_PHASES.flatMap((phase) =>
  phase.lessons.map((l) => ({ ...l, urlSegment: phase.urlSegment }))
);

// ── Nav link rewriting ─────────────────────────────────────────────────────

const COURSE_BASE = '/tutorials/cicd-pipelines-with-github-actions';

function buildNavLinkMap(): Record<string, string> {
  const map: Record<string, string> = {};
  CICD_PHASES.forEach((phase) => {
    phase.lessons.forEach((lesson) => {
      map[lesson.file] = `${COURSE_BASE}/${phase.urlSegment}/${lesson.slug}`;
    });
  });
  return map;
}

const NAV_LINK_MAP = buildNavLinkMap();

function replaceNavLinks(html: string): string {
  let result = html;
  for (const [file, route] of Object.entries(NAV_LINK_MAP)) {
    result = result.split(`href="${file}"`).join(`href="${route}"`);
    result = result.split(`href="./${file}"`).join(`href="${route}"`);
    result = result.split(`href="../${file}"`).join(`href="${route}"`);
  }
  return result;
}

// ── HTML parsing ───────────────────────────────────────────────────────────
// Source format: bare fragments — <div class="lesson-meta">, <h1>, <p>
// subtitle, <div class="progress">, then sections with <h2>/.key-insight/
// .warning/.diagram/.compare/.exercise/.recall (native <details>). No
// scripts, no built-in nav — these lessons are entirely static markup.

function parseCicdLesson(rawHtml: string): { bodyHtml: string } {
  const bodyStart = rawHtml.indexOf('<body>');
  const bodyEnd = rawHtml.lastIndexOf('</body>');
  let body =
    bodyStart !== -1 && bodyEnd !== -1
      ? rawHtml.slice(bodyStart + '<body>'.length, bodyEnd)
      : rawHtml;

  // Drop the built-in .lesson-meta block.
  body = body.replace(/<div class="lesson-meta">[\s\S]*?<\/div>\s*/, '');

  // Drop the h1 title (rendered by the site's own header) — keep everything after it.
  const h1End = body.indexOf('</h1>');
  if (h1End !== -1) body = body.slice(h1End + '</h1>'.length);

  // Drop the built-in progress indicator (3 nested divs: progress >
  // progress-bar > progress-fill).
  body = body.replace(/<div class="progress">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*/, '');

  body = replaceNavLinks(body).trim();

  return { bodyHtml: body };
}

// ── Public API ─────────────────────────────────────────────────────────────

export function getCicdLessonData(phaseUrlSegment: string, slug: string): CicdLessonData {
  const allIndex = ALL_CICD_LESSONS.findIndex(
    (l) => l.urlSegment === phaseUrlSegment && l.slug === slug
  );
  if (allIndex === -1) throw new Error(`CI/CD lesson not found: ${phaseUrlSegment}/${slug}`);

  const meta = ALL_CICD_LESSONS[allIndex];
  const phase = CICD_PHASES.find((p) => p.urlSegment === phaseUrlSegment)!;

  const contentPath = path.join(process.cwd(), 'src', 'content', 'cicd-pipelines', meta.file);
  const rawHtml = fs.readFileSync(contentPath, 'utf-8');
  const { bodyHtml: parsedBodyHtml } = parseCicdLesson(rawHtml);
  const { bodyHtml, headings } = extractHeadingsAndInjectIds(parsedBodyHtml);

  const prevMeta = allIndex > 0 ? ALL_CICD_LESSONS[allIndex - 1] : null;
  const nextMeta = allIndex < ALL_CICD_LESSONS.length - 1 ? ALL_CICD_LESSONS[allIndex + 1] : null;

  return {
    ...meta,
    phaseNumber: phase.number,
    phaseName: phase.name,
    bodyHtml,
    headings,
    prev: prevMeta ? { slug: prevMeta.slug, title: prevMeta.title, urlSegment: prevMeta.urlSegment } : null,
    next: nextMeta ? { slug: nextMeta.slug, title: nextMeta.title, urlSegment: nextMeta.urlSegment } : null,
  };
}
