import fs from 'fs';
import path from 'path';
import type { LessonMeta, PhaseMeta } from '@/lib/backend-course';

export type { LessonMeta as AzureLessonMeta, PhaseMeta as AzurePhaseMeta };

export type AzureLessonData = LessonMeta & {
  phaseNumber: number;
  phaseName: string;
  bodyHtml: string;
  script: string;
  prev: { slug: string; title: string; urlSegment: string } | null;
  next: { slug: string; title: string; urlSegment: string } | null;
};

// ── Phase definitions ──────────────────────────────────────────────────────

export const AZURE_PHASES: PhaseMeta[] = [
  {
    number: 1,
    name: 'Module 1 — Identity & Governance',
    urlSegment: 'module-1',
    contentDir: 'azure-admin',
    lessons: [
      { slug: 'azure-resource-hierarchy', title: 'Azure Resource Hierarchy', subtitle: 'How Azure organises every resource into a five-level scope model — the foundation every policy, RBAC role, and cost allocation is built on.', number: 1, file: '0001-azure-resource-hierarchy.html' },
      { slug: 'entra-id-users-groups', title: 'Entra ID: Users, Groups & Identities', subtitle: 'The identity plane that controls who can authenticate to Azure — users, groups, service principals, and managed identities.', number: 2, file: '0002-entra-id-users-groups.html' },
      { slug: 'rbac', title: 'Role-Based Access Control', subtitle: 'How Azure decides who can do what, where — roles, scope, and the deny-assignments model that governs every action in the portal.', number: 3, file: '0003-rbac.html' },
      { slug: 'azure-policy', title: 'Azure Policy: Governance at Scale', subtitle: 'Enforcing compliance at scale — how policies evaluate resources, deny non-compliant deployments, and auto-remediate drift.', number: 4, file: '0004-azure-policy.html' },
      { slug: 'locks-tags-cost', title: 'Resource Locks, Tags & Cost Management', subtitle: 'Protecting critical resources from accidental deletion, organising at scale with tags, and tracking spend before it surprises you.', number: 5, file: '0005-locks-tags-cost.html' },
    ],
  },
  {
    number: 2,
    name: 'Module 2 — Storage',
    urlSegment: 'module-2',
    contentDir: 'azure-admin',
    lessons: [
      { slug: 'storage-accounts', title: 'Storage Accounts', subtitle: 'The foundation of Azure storage — redundancy options, performance tiers, and the configuration decisions that affect durability and cost.', number: 6, file: '0006-storage-accounts.html' },
      { slug: 'blob-storage', title: 'Azure Blob Storage', subtitle: 'Object storage for unstructured data — access tiers, lifecycle rules, and the security model that keeps blobs private or globally accessible.', number: 7, file: '0007-blob-storage.html' },
      { slug: 'azure-files', title: 'Azure Files & File Sync', subtitle: 'Fully managed file shares in the cloud — mounting over SMB, syncing with on-premises servers, and replacing traditional file servers.', number: 8, file: '0008-azure-files.html' },
    ],
  },
  {
    number: 3,
    name: 'Module 3 — Compute',
    urlSegment: 'module-3',
    contentDir: 'azure-admin',
    lessons: [
      { slug: 'virtual-machines', title: 'Virtual Machines', subtitle: 'Deploying, sizing, and making VMs resilient — availability sets, zones, and the configuration choices that determine uptime SLA.', number: 9, file: '0009-virtual-machines.html' },
      { slug: 'vmss-bastion-jit', title: 'VM Scale Sets, Bastion & JIT', subtitle: 'Auto-scaling VM fleets, eliminating public RDP exposure with Bastion, and locking down admin access with Just-In-Time.', number: 10, file: '0010-vmss-bastion-jit.html' },
      { slug: 'app-service', title: 'Azure App Service', subtitle: 'PaaS web hosting without managing infrastructure — deployment slots, scaling rules, and the networking options that keep apps secure.', number: 11, file: '0011-app-service.html' },
      { slug: 'containers', title: 'Containers: ACI, Container Apps & AKS', subtitle: 'Running containers in Azure across the spectrum from single-instance ACI to fully managed Kubernetes.', number: 12, file: '0012-containers.html' },
      { slug: 'bicep-arm', title: 'Bicep & ARM Templates', subtitle: 'Infrastructure as Code in Azure — declarative deployments that are idempotent, version-controlled, and repeatable.', number: 13, file: '0013-bicep-arm.html' },
    ],
  },
  {
    number: 4,
    name: 'Module 4 — Networking',
    urlSegment: 'module-4',
    contentDir: 'azure-admin',
    lessons: [
      { slug: 'virtual-networks', title: 'Virtual Networks & Subnets', subtitle: 'The private network layer in Azure — subnets, address spaces, and the routing model that controls traffic between resources.', number: 14, file: '0014-virtual-networks.html' },
      { slug: 'nsgs', title: 'Network Security Groups & ASGs', subtitle: 'Stateful packet filtering for Azure resources — inbound and outbound rules, default flows, and application security groups for dynamic membership.', number: 15, file: '0015-nsgs.html' },
      { slug: 'vnet-peering-private-endpoints', title: 'VNet Peering & Private Endpoints', subtitle: 'Connecting VNets, locking storage to a subnet, and routing PaaS traffic privately without a public IP.', number: 16, file: '0016-vnet-peering-private-endpoints.html' },
      { slug: 'dns', title: 'DNS in Azure', subtitle: 'Name resolution inside and between VNets — Azure DNS zones, private DNS, and the resolution chain from VM to internet.', number: 17, file: '0017-dns.html' },
      { slug: 'load-balancing', title: 'Load Balancing in Azure', subtitle: 'Distributing traffic across Azure\'s four load balancing services — when to use Load Balancer, Application Gateway, Traffic Manager, or Front Door.', number: 18, file: '0018-load-balancing.html' },
    ],
  },
  {
    number: 5,
    name: 'Module 5 — Monitor & Maintain',
    urlSegment: 'module-5',
    contentDir: 'azure-admin',
    lessons: [
      { slug: 'azure-monitor', title: 'Azure Monitor', subtitle: 'The observability platform for everything in Azure — metrics, logs, alerts, and the data pipeline that feeds every diagnostic tool.', number: 19, file: '0019-azure-monitor.html' },
      { slug: 'kql-log-analytics', title: 'Log Analytics & KQL', subtitle: 'Writing Kusto queries to turn raw logs into actionable insight — the query language behind every Azure monitoring workflow.', number: 20, file: '0020-kql-log-analytics.html' },
      { slug: 'azure-backup', title: 'Azure Backup & Recovery Services Vault', subtitle: 'Protecting VMs, databases, and file shares — backup policies and the restore paths that matter when things go wrong.', number: 21, file: '0021-azure-backup.html' },
      { slug: 'site-recovery-network-watcher', title: 'Site Recovery & Network Watcher', subtitle: 'Replicating workloads for disaster recovery and diagnosing network connectivity issues before they become outages.', number: 22, file: '0022-site-recovery-network-watcher.html' },
    ],
  },
  {
    number: 6,
    name: 'Module 6 — Enterprise Architecture',
    urlSegment: 'module-6',
    contentDir: 'azure-admin',
    lessons: [
      { slug: 'defender-for-cloud', title: 'Microsoft Defender for Cloud', subtitle: 'The unified security posture management platform — Secure Score, recommendations, and workload protection for the most attacked Azure services.', number: 23, file: '0023-defender-for-cloud.html' },
      { slug: 'landing-zones', title: 'Landing Zones & Cloud Adoption Framework', subtitle: 'The governance blueprint for enterprise-scale Azure deployments — management groups, policy, and the CAF structure that scales to thousands of subscriptions.', number: 24, file: '0024-landing-zones.html' },
      { slug: 'cost-management', title: 'Cost Management & FinOps', subtitle: 'Understanding the Azure billing model, setting budgets and alerts, and building the FinOps practices that prevent cloud spend from spiraling.', number: 25, file: '0025-cost-management.html' },
    ],
  },
];

// ── Flat lesson index for cross-module navigation ──────────────────────────

type FlatLesson = LessonMeta & { urlSegment: string };

const ALL_LESSONS: FlatLesson[] = AZURE_PHASES.flatMap((phase) =>
  phase.lessons.map((l) => ({ ...l, urlSegment: phase.urlSegment }))
);

// ── Inline quiz.js (DOMContentLoaded replaced with direct call) ────────────

const AZURE_QUIZ_JS = `function initQuiz() {
  const questions = document.querySelectorAll('.quiz-question');
  let answered = 0;
  let correct = 0;
  const total = questions.length;

  questions.forEach(q => {
    const correctAnswer = q.dataset.correct;
    const options = q.querySelectorAll('.quiz-option');
    const feedback = q.querySelector('.quiz-feedback');
    let done = false;

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        if (done) return;
        done = true;
        answered++;

        const chosen = opt.dataset.option;
        const isCorrect = chosen === correctAnswer;

        options.forEach(o => {
          if (o.dataset.option === correctAnswer) o.classList.add('correct');
          if (o === opt && !isCorrect) o.classList.add('wrong');
          const radio = o.querySelector('input[type="radio"]');
          if (radio) radio.disabled = true;
        });

        if (feedback) {
          feedback.classList.add('show');
          feedback.classList.add(isCorrect ? 'correct-msg' : 'wrong-msg');
        }

        if (isCorrect) correct++;

        if (answered === total) {
          const scoreEl = document.querySelector('.quiz-score');
          if (scoreEl) {
            const pct = Math.round((correct / total) * 100);
            scoreEl.textContent = 'Score: ' + correct + ' / ' + total + '  (' + pct + '%) — ' + (pct >= 70 ? '✓ Pass threshold reached' : 'Keep reviewing and try again');
            scoreEl.classList.add('show');
          }
        }
      });
    });
  });
}
initQuiz();`;

// ── Nav link rewriting ─────────────────────────────────────────────────────

const COURSE_BASE = '/tutorials/azure-administration';

function buildNavLinkMap(): Record<string, string> {
  const map: Record<string, string> = {};
  AZURE_PHASES.forEach((phase) => {
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
    result = result.split(`href="./lessons/${file}"`).join(`href="${route}"`);
  }
  return result;
}

// ── Body extraction ────────────────────────────────────────────────────────

function parseAzureLesson(rawHtml: string): string {
  const bodyStart = rawHtml.indexOf('<body>');
  const bodyEnd = rawHtml.lastIndexOf('</body>');
  if (bodyStart === -1 || bodyEnd === -1) return rawHtml;

  let body = rawHtml.slice(bodyStart + '<body>'.length, bodyEnd);

  // Strip <script src="..."></script> tags (quiz.js is inlined separately)
  body = body.replace(/<script\b[^>]*\bsrc\b[^>]*><\/script>/gi, '');

  body = replaceNavLinks(body);
  return body.trim();
}

// ── Public API ────────────────────────────────────────────────────────────

export function getAzureLessonData(moduleSlug: string, slug: string): AzureLessonData {
  const allIndex = ALL_LESSONS.findIndex(
    (l) => l.urlSegment === moduleSlug && l.slug === slug
  );
  if (allIndex === -1) throw new Error(`Azure lesson not found: ${moduleSlug}/${slug}`);

  const meta = ALL_LESSONS[allIndex];
  const phase = AZURE_PHASES.find((p) => p.urlSegment === moduleSlug)!;

  const contentPath = path.join(
    process.cwd(),
    'src',
    'content',
    'azure-admin',
    meta.file
  );
  const rawHtml = fs.readFileSync(contentPath, 'utf-8');
  const bodyHtml = parseAzureLesson(rawHtml);

  const prevMeta = allIndex > 0 ? ALL_LESSONS[allIndex - 1] : null;
  const nextMeta = allIndex < ALL_LESSONS.length - 1 ? ALL_LESSONS[allIndex + 1] : null;

  return {
    ...meta,
    phaseNumber: phase.number,
    phaseName: phase.name,
    bodyHtml,
    script: AZURE_QUIZ_JS,
    prev: prevMeta
      ? { slug: prevMeta.slug, title: prevMeta.title, urlSegment: prevMeta.urlSegment }
      : null,
    next: nextMeta
      ? { slug: nextMeta.slug, title: nextMeta.title, urlSegment: nextMeta.urlSegment }
      : null,
  };
}
