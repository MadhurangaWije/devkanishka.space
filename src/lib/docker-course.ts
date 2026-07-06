import fs from 'fs';
import path from 'path';
import type { LessonMeta, PhaseMeta } from '@/lib/backend-course';
import { extractHeadingsAndInjectIds, type LessonHeading } from '@/lib/lesson-toc';
import { LESSON_QUIZ_JS } from '@/lib/lesson-quiz-script';

export type { LessonMeta as DockerLessonMeta, PhaseMeta as DockerPhaseMeta };

export type DockerLessonData = LessonMeta & {
  phaseNumber: number;
  phaseName: string;
  bodyHtml: string;
  script: string;
  headings: LessonHeading[];
  prev: { slug: string; title: string; urlSegment: string } | null;
  next: { slug: string; title: string; urlSegment: string } | null;
};

// ── Phase definitions ──────────────────────────────────────────────────────

export const DOCKER_PHASES: PhaseMeta[] = [
  {
    number: 1,
    name: 'Phase 1 — Container Foundations',
    urlSegment: 'phase-1',
    contentDir: 'docker-fundamentals',
    lessons: [
      { slug: 'shipping-container-analogy', title: 'The Shipping Container Analogy', subtitle: 'Why software needed its own intermodal container — and what "works on my machine" actually costs a team.', number: 1, file: '0001-the-shipping-container-analogy.html' },
      { slug: 'containers-vs-vms', title: 'Containers vs VMs — Layers of Isolation', subtitle: 'Shared kernel vs. emulated hardware — the architectural difference that makes containers fast and VMs heavy.', number: 2, file: '0002-containers-vs-vms.html' },
      { slug: 'container-ecosystem', title: "The Container Ecosystem — It's Not Just Docker", subtitle: 'OCI, containerd, CRI-O, Podman — how the ecosystem standardized around Docker\'s ideas without locking you into Docker.', number: 3, file: '0003-the-container-ecosystem.html' },
      { slug: 'installing-docker-and-first-run', title: 'Installing Docker & Your First Container', subtitle: 'From a clean machine to `docker run hello-world` — and what actually happened when you ran it.', number: 4, file: '0004-installing-docker-and-first-run.html' },
      { slug: 'anatomy-of-a-running-container', title: 'Anatomy of a Running Container', subtitle: 'Namespaces, cgroups, and the union filesystem — the Linux primitives a container is built from.', number: 5, file: '0005-anatomy-of-a-running-container.html' },
      { slug: 'images-deep-dive', title: 'Images Deep Dive — What IS an Image?', subtitle: 'Layers, manifests, and content-addressable storage — the read-only blueprint every container starts from.', number: 6, file: '0006-images-deep-dive.html' },
    ],
  },
  {
    number: 2,
    name: 'Phase 2 — Building Images',
    urlSegment: 'phase-2',
    contentDir: 'docker-fundamentals',
    lessons: [
      { slug: 'your-first-dockerfile', title: 'Your First Dockerfile', subtitle: 'FROM, COPY, RUN, CMD — the instructions that turn a Dockerfile into a reproducible image.', number: 7, file: '0007-your-first-dockerfile.html' },
      { slug: 'layer-caching-and-build-optimization', title: 'Layer Caching & Build Optimization', subtitle: 'Order your Dockerfile so Docker reuses layers instead of rebuilding everything on every change.', number: 8, file: '0008-layer-caching-and-build-optimization.html' },
      { slug: 'tags-registries-and-distribution', title: 'Tags, Registries & Distribution', subtitle: 'How images get named, versioned, pushed, and pulled — Docker Hub, ACR, ECR, and private registries.', number: 9, file: '0009-tags-registries-and-distribution.html' },
      { slug: 'building-for-production', title: 'Building for Production', subtitle: 'Multi-stage builds, minimal base images, and the difference between a dev image and a shippable one.', number: 10, file: '0010-building-for-production.html' },
    ],
  },
  {
    number: 3,
    name: 'Phase 3 — Running Containers in Practice',
    urlSegment: 'phase-3',
    contentDir: 'docker-fundamentals',
    lessons: [
      { slug: 'container-lifecycle', title: 'Container Lifecycle', subtitle: 'Create, start, stop, pause, and remove — the state machine every container moves through.', number: 11, file: '0011-container-lifecycle.html' },
      { slug: 'environment-config-and-secrets', title: 'Environment, Config & Secrets', subtitle: 'Getting configuration into a container without baking it into the image or leaking it in a layer.', number: 12, file: '0012-environment-config-and-secrets.html' },
      { slug: 'volumes-and-persistent-data', title: 'Volumes & Persistent Data', subtitle: 'Containers are ephemeral by design — volumes and bind mounts are how data survives a restart.', number: 13, file: '0013-volumes-and-persistent-data.html' },
      { slug: 'container-networking-fundamentals', title: 'Container Networking Fundamentals', subtitle: 'Bridge networks, port publishing, and how containers find and talk to each other.', number: 14, file: '0014-container-networking-fundamentals.html' },
      { slug: 'docker-compose', title: 'Docker Compose — Multi-Container Applications', subtitle: 'Define an entire multi-service stack in one YAML file and bring it up with a single command.', number: 15, file: '0015-docker-compose.html' },
      { slug: 'health-checks-and-restart-policies', title: 'Health Checks & Restart Policies', subtitle: 'Teaching Docker what "healthy" means for your app, and what to do automatically when it isn\'t.', number: 16, file: '0016-health-checks-and-restart-policies.html' },
    ],
  },
  {
    number: 4,
    name: 'Phase 4 — Production & Observability',
    urlSegment: 'phase-4',
    contentDir: 'docker-fundamentals',
    lessons: [
      { slug: 'containers-in-ci-cd', title: 'Containers in CI/CD Pipelines', subtitle: 'Building, testing, and pushing images as part of an automated pipeline instead of by hand.', number: 17, file: '0017-containers-in-ci-cd.html' },
      { slug: 'local-development-with-containers', title: 'Local Development with Containers', subtitle: 'Using Docker so "it works on my machine" becomes true for the whole team, not just you.', number: 18, file: '0018-local-development-with-containers.html' },
      { slug: 'twelve-factor-app-and-containers', title: 'The Twelve-Factor App & Containers', subtitle: 'Why the twelve-factor methodology and container design point at exactly the same architecture.', number: 19, file: '0019-twelve-factor-app-and-containers.html' },
      { slug: 'logging-monitoring-and-observability', title: 'Logging, Monitoring & Observability', subtitle: 'Getting logs and metrics out of ephemeral containers and into a place you can actually query them.', number: 20, file: '0020-logging-monitoring-and-observability.html' },
      { slug: 'security-least-privilege', title: 'Security — Least Privilege Containers', subtitle: 'Non-root users, read-only filesystems, and dropped capabilities — the defaults production containers need.', number: 21, file: '0021-security-least-privilege.html' },
      { slug: 'image-supply-chain-security', title: 'Image Supply Chain Security', subtitle: 'Vulnerability scanning, image signing, and SBOMs — trusting what\'s actually inside your images.', number: 22, file: '0022-image-supply-chain-security.html' },
    ],
  },
  {
    number: 5,
    name: 'Phase 5 — Orchestration Primer',
    urlSegment: 'phase-5',
    contentDir: 'docker-fundamentals',
    lessons: [
      { slug: 'why-orchestration', title: 'Why Orchestration?', subtitle: 'What happens when one container becomes a fleet, and why you stop managing them by hand.', number: 23, file: '0023-why-orchestration.html' },
      { slug: 'kubernetes-10000ft-view', title: 'Kubernetes — The 10,000ft View', subtitle: 'Pods, deployments, and services — enough of the Kubernetes mental model to know where Docker ends.', number: 24, file: '0024-kubernetes-10000ft-view.html' },
      { slug: 'docker-swarm-and-alternatives', title: 'Docker Swarm & Alternatives', subtitle: 'Docker\'s own orchestrator and where it still fits next to Kubernetes and Nomad.', number: 25, file: '0025-docker-swarm-and-alternatives.html' },
      { slug: 'service-discovery-and-load-balancing', title: 'Service Discovery & Load Balancing', subtitle: 'How a cluster of containers finds a healthy instance of another service without a hardcoded IP.', number: 26, file: '0026-service-discovery-and-load-balancing.html' },
      { slug: 'scaling-patterns', title: 'Scaling Patterns', subtitle: 'Horizontal scaling, autoscaling triggers, and the difference between scaling a container and scaling a system.', number: 27, file: '0027-scaling-patterns.html' },
    ],
  },
  {
    number: 6,
    name: 'Phase 6 — Advanced & Production Hardening',
    urlSegment: 'phase-6',
    contentDir: 'docker-fundamentals',
    lessons: [
      { slug: 'building-your-own-container-runtime', title: 'Building Your Own Container Runtime', subtitle: 'Namespaces and cgroups from scratch — what `docker run` is really doing under the hood.', number: 28, file: '0028-building-your-own-container-runtime.html' },
      { slug: 'advanced-networking', title: 'Advanced Networking — Overlay, Mesh, eBPF', subtitle: 'Beyond bridge networks — how multi-host overlays, service meshes, and eBPF reshape container traffic.', number: 29, file: '0029-advanced-networking.html' },
      { slug: 'the-future', title: 'The Future — WASM, Unikernels & Beyond', subtitle: 'What might replace or complement containers next, and why isolation keeps getting lighter.', number: 30, file: '0030-the-future.html' },
      { slug: 'image-size-optimization', title: 'Image Size Optimization & Build Performance', subtitle: 'Shrinking a 1.2GB image down to megabytes without breaking the app it ships.', number: 31, file: '0031-image-size-optimization.html' },
      { slug: 'production-hardening-checklist', title: 'Production Hardening Checklist', subtitle: 'A concrete, opinionated checklist to run through before any container ships to production.', number: 32, file: '0032-production-hardening-checklist.html' },
      { slug: 'container-anti-patterns', title: 'Container Anti-Patterns and How to Fix Them', subtitle: 'The mistakes almost every team makes early — fat images, mutable tags, secrets in layers — and their fixes.', number: 33, file: '0033-container-anti-patterns.html' },
    ],
  },
];

// ── Flat lesson index for cross-phase navigation ───────────────────────────

type FlatLesson = LessonMeta & { urlSegment: string };

const ALL_DOCKER_LESSONS: FlatLesson[] = DOCKER_PHASES.flatMap((phase) =>
  phase.lessons.map((l) => ({ ...l, urlSegment: phase.urlSegment }))
);

// ── Nav link rewriting ─────────────────────────────────────────────────────

const COURSE_BASE = '/tutorials/docker-fundamentals';

function buildNavLinkMap(): Record<string, string> {
  const map: Record<string, string> = {
    '0000-overview.html': COURSE_BASE,
  };
  DOCKER_PHASES.forEach((phase) => {
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
// Source format: bare fragments — <h1>, <div class="lesson-meta">, sections
// with <h2>/<p>/<div class="callout|quiz|hands-on|takeaways|diagram">, and a
// closing <nav class="lesson-nav">. No <article>/<header> wrapper, no inline
// <style>. We strip everything outside <body>, drop the <h1>/.lesson-meta
// (the site renders its own header chrome from DOCKER_PHASES metadata) and
// the trailing <nav class="lesson-nav">/<script src> tags.

function parseDockerLesson(rawHtml: string): { bodyHtml: string } {
  const bodyStart = rawHtml.indexOf('<body>');
  const bodyEnd = rawHtml.lastIndexOf('</body>');
  let body =
    bodyStart !== -1 && bodyEnd !== -1
      ? rawHtml.slice(bodyStart + '<body>'.length, bodyEnd)
      : rawHtml;

  // Drop the h1 title (rendered by the site's own header) — keep everything after it.
  const h1End = body.indexOf('</h1>');
  if (h1End !== -1) body = body.slice(h1End + '</h1>'.length);

  // Drop the built-in .lesson-meta block.
  body = body.replace(/<div class="lesson-meta">[\s\S]*?<\/div>\s*/, '');

  // Drop the trailing built-in nav and any external <script src> tags.
  body = body.replace(/<nav class="lesson-nav">[\s\S]*?<\/nav>\s*/, '');
  body = body.replace(/<script[^>]*src="[^"]*"[^>]*><\/script>\s*/g, '');

  body = replaceNavLinks(body).trim();

  return { bodyHtml: body };
}

// ── Public API ─────────────────────────────────────────────────────────────

export function getDockerLessonData(phaseUrlSegment: string, slug: string): DockerLessonData {
  const allIndex = ALL_DOCKER_LESSONS.findIndex(
    (l) => l.urlSegment === phaseUrlSegment && l.slug === slug
  );
  if (allIndex === -1) throw new Error(`Docker lesson not found: ${phaseUrlSegment}/${slug}`);

  const meta = ALL_DOCKER_LESSONS[allIndex];
  const phase = DOCKER_PHASES.find((p) => p.urlSegment === phaseUrlSegment)!;

  const contentPath = path.join(process.cwd(), 'src', 'content', 'docker-fundamentals', meta.file);
  const rawHtml = fs.readFileSync(contentPath, 'utf-8');
  const { bodyHtml: parsedBodyHtml } = parseDockerLesson(rawHtml);
  const { bodyHtml, headings } = extractHeadingsAndInjectIds(parsedBodyHtml);

  const prevMeta = allIndex > 0 ? ALL_DOCKER_LESSONS[allIndex - 1] : null;
  const nextMeta = allIndex < ALL_DOCKER_LESSONS.length - 1 ? ALL_DOCKER_LESSONS[allIndex + 1] : null;

  return {
    ...meta,
    phaseNumber: phase.number,
    phaseName: phase.name,
    bodyHtml,
    script: LESSON_QUIZ_JS,
    headings,
    prev: prevMeta ? { slug: prevMeta.slug, title: prevMeta.title, urlSegment: prevMeta.urlSegment } : null,
    next: nextMeta ? { slug: nextMeta.slug, title: nextMeta.title, urlSegment: nextMeta.urlSegment } : null,
  };
}
