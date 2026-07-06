import fs from 'fs';
import path from 'path';
import type { LessonMeta, PhaseMeta } from '@/lib/backend-course';
import { extractHeadingsAndInjectIds, type LessonHeading } from '@/lib/lesson-toc';
import { AZURE_ARCHITECT_DIAGRAMS_JS } from '@/lib/azure-architect-diagrams-script';

export type { LessonMeta as AzureArchitectLessonMeta, PhaseMeta as AzureArchitectPhaseMeta };

export type AzureArchitectLessonData = LessonMeta & {
  phaseNumber: number;
  phaseName: string;
  bodyHtml: string;
  script: string;
  headings: LessonHeading[];
  prev: { slug: string; title: string; urlSegment: string } | null;
  next: { slug: string; title: string; urlSegment: string } | null;
};

// ── Phase definitions ──────────────────────────────────────────────────────
// Lesson titles/slugs are taken from each file's actual <h1> (not the
// CURRICULUM.md blurb) — lesson 1 in particular was rewritten to cover
// governance/subscription design and no longer matches its old filename or
// curriculum title, so trust the file content over either of those.

export const AZURE_ARCHITECT_PHASES: PhaseMeta[] = [
  {
    number: 1,
    name: 'Phase 1 — Foundations',
    urlSegment: 'phase-1',
    contentDir: 'azure-solutions-architect',
    lessons: [
      { slug: 'governance-architecture-management-groups', title: 'Governance Architecture: Management Groups & Subscription Design', subtitle: 'Structuring an Azure tenant — management group topology, subscription strategy, and where policy gets assigned.', number: 1, file: '0001-azure-fundamentals-architect-mindset.html' },
      { slug: 'identity-fundamentals-entra-id', title: 'Identity Fundamentals with Entra ID', subtitle: 'Tenants, users, groups, service principals, and managed identities — how Azure authenticates everything.', number: 2, file: '0002-azure-resource-hierarchy-governance.html' },
      { slug: 'rbac-custom-roles-scope-inheritance', title: 'RBAC — Custom Roles, Scope Inheritance & Policy Trade-offs', subtitle: 'Custom role design, scope inheritance trade-offs, and RBAC vs. Azure Policy as enforcement mechanisms.', number: 3, file: '0003-identity-entra-id-rbac.html' },
      { slug: 'subscription-cost-management', title: 'Subscription & Cost Management', subtitle: 'Subscription types, spending limits, budgets, cost alerts, and tagging strategy for chargeback.', number: 4, file: '0004-subscription-cost-management.html' },
      { slug: 'azure-cli-powershell-portal', title: 'Azure CLI, PowerShell & Portal', subtitle: 'Provisioning and inspecting resources three ways, and knowing when to reach for each.', number: 5, file: '0005-azure-cli-powershell-portal.html' },
      { slug: 'infrastructure-as-code-arm-bicep', title: 'Infrastructure as Code with ARM & Bicep', subtitle: 'Declarative deployments, template structure, parameters, and idempotent resource provisioning.', number: 6, file: '0006-infrastructure-as-code-bicep.html' },
    ],
  },
  {
    number: 2,
    name: 'Phase 2 — Core Infrastructure',
    urlSegment: 'phase-2',
    contentDir: 'azure-solutions-architect',
    lessons: [
      { slug: 'virtual-networks-subnets', title: 'Virtual Networks & Subnets', subtitle: 'Address-space planning for hub-spoke topology, subnet delegation, and DNS resolver placement.', number: 7, file: '0007-virtual-networks-subnets.html' },
      { slug: 'network-security-groups-routing', title: 'Network Security Groups & Routing', subtitle: 'NSG vs. Azure Firewall vs. NVA as layered security decisions, and UDR design for forced tunnelling.', number: 8, file: '0008-network-security-routing.html' },
      { slug: 'vnet-peering-hybrid-connectivity', title: 'VNet Peering & Hybrid Connectivity', subtitle: 'When ExpressRoute beats VPN, transitive routing limits of peering, and Virtual WAN as an alternative to hand-rolled hub-spoke.', number: 9, file: '0009-vnet-peering-hybrid-connectivity.html' },
      { slug: 'load-balancing-traffic-management', title: 'Load Balancing & Traffic Management', subtitle: 'L4 vs. L7, global vs. regional, WAF integration, and choosing between Load Balancer, App Gateway, Front Door, and Traffic Manager.', number: 10, file: '0010-load-balancing-traffic-management.html' },
      { slug: 'virtual-machines-scale-sets', title: 'Virtual Machines & Scale Sets', subtitle: 'Availability set vs. zone vs. VMSS as an SLA architecture choice, spot instances, and custom image pipelines.', number: 11, file: '0011-virtual-machines-scale-sets.html' },
      { slug: 'storage-accounts-deep-dive', title: 'Storage Accounts Deep Dive', subtitle: 'Redundancy tier trade-offs, lifecycle policies for compliance, and storage firewall/private endpoint decisions.', number: 12, file: '0012-storage-accounts-deep-dive.html' },
      { slug: 'disk-storage-performance', title: 'Disk Storage & Performance', subtitle: 'Disk tier selection for workload classes, IOPS/throughput ceilings, and customer-managed key encryption.', number: 13, file: '0013-disk-storage-performance.html' },
    ],
  },
  {
    number: 3,
    name: 'Phase 3 — Application Architecture',
    urlSegment: 'phase-3',
    contentDir: 'azure-solutions-architect',
    lessons: [
      { slug: 'app-service-deployment-slots', title: 'App Service Deployment Slots', subtitle: 'Plan tier selection, deployment slot swap strategies, and App Service Environments for regulated workloads.', number: 14, file: '0014-app-service-deployment-slots.html' },
      { slug: 'azure-functions-serverless', title: 'Azure Functions & Serverless', subtitle: 'Triggers, bindings, Durable Functions, consumption vs. premium plans, and cold-start mitigation.', number: 15, file: '0015-azure-functions-serverless.html' },
      { slug: 'containers-acr-aci', title: 'Containers: Azure Container Registry & Container Instances', subtitle: 'Container instances for quick workloads, Azure Container Registry, and image lifecycle.', number: 16, file: '0016-containers-aci-acr.html' },
      { slug: 'azure-kubernetes-service-aks', title: 'Azure Kubernetes Service (AKS)', subtitle: 'Cluster architecture, node pools, networking models (kubenet vs. Azure CNI), and scaling.', number: 17, file: '0017-azure-kubernetes-service.html' },
      { slug: 'api-management-gateway', title: 'API Management & Gateway', subtitle: 'APIM policies, rate limiting, versioning, and backend abstraction for microservices.', number: 18, file: '0018-api-management-gateway.html' },
      { slug: 'choosing-compute-decision-framework', title: 'Choosing Compute: Decision Framework', subtitle: 'A decision tree across VMs, App Service, Functions, ACI, and AKS based on workload requirements.', number: 19, file: '0019-choosing-compute-decision-framework.html' },
    ],
  },
  {
    number: 4,
    name: 'Phase 4 — Data & Integration',
    urlSegment: 'phase-4',
    contentDir: 'azure-solutions-architect',
    lessons: [
      { slug: 'azure-sql-managed-instances', title: 'Azure SQL & Managed Instances', subtitle: 'DTU vs. vCore, elastic pools, geo-replication, and hybrid migration paths.', number: 20, file: '0020-azure-sql-managed-instances.html' },
      { slug: 'cosmos-db-global-distribution', title: 'Cosmos DB & Global Distribution', subtitle: 'Partition keys, consistency levels, multi-region writes, and request-unit capacity planning.', number: 21, file: '0021-cosmos-db-global-distribution.html' },
      { slug: 'data-storage-selection-framework', title: 'Data Storage Selection Framework', subtitle: 'Choosing between SQL, Cosmos DB, Table Storage, PostgreSQL, and MySQL based on access patterns.', number: 22, file: '0022-data-storage-selection-framework.html' },
      { slug: 'service-bus-queue-messaging', title: 'Service Bus & Queue-Based Messaging', subtitle: 'Queues vs. topics, sessions, dead-lettering, and reliable message delivery patterns.', number: 23, file: '0023-service-bus-queues.html' },
      { slug: 'event-grid-event-hubs', title: 'Event Grid & Event Hubs', subtitle: 'Event-driven architecture, pub/sub vs. streaming, and choosing the right eventing service.', number: 24, file: '0024-event-grid-event-hubs.html' },
      { slug: 'azure-data-factory-integration', title: 'Azure Data Factory & Integration', subtitle: 'ETL/ELT pipelines, linked services, data flows, and hybrid data integration.', number: 25, file: '0025-data-factory-integration.html' },
      { slug: 'azure-cache-for-redis', title: 'Azure Cache for Redis', subtitle: 'Cache-aside and write-through patterns, clustering, and geo-replication for cache.', number: 26, file: '0026-caching-redis.html' },
    ],
  },
  {
    number: 5,
    name: 'Phase 5 — Security & Governance',
    urlSegment: 'phase-5',
    contentDir: 'azure-solutions-architect',
    lessons: [
      { slug: 'azure-policy-governance-at-scale', title: 'Azure Policy & Governance at Scale', subtitle: 'Policy definitions, initiatives, compliance dashboards, and remediation tasks.', number: 27, file: '0027-azure-policy-governance.html' },
      { slug: 'management-groups-landing-zones', title: 'Management Groups & Enterprise Landing Zones', subtitle: 'Enterprise-scale architecture, landing zone accelerators, and subscription vending.', number: 28, file: '0028-management-groups-landing-zones.html' },
      { slug: 'key-vault-secrets-management', title: 'Azure Key Vault & Secrets Management', subtitle: 'Keys, secrets, certificates, access policies vs. RBAC, and HSM-backed keys.', number: 29, file: '0029-key-vault-secrets.html' },
      { slug: 'network-security-firewall-waf-ddos', title: 'Network Security: Firewall, WAF & DDoS', subtitle: 'Azure Firewall vs. NVA vs. NSG-only decisions, DDoS pricing tiers, and NSG flow logs into a SIEM.', number: 30, file: '0030-network-security-firewall-waf-ddos.html' },
      { slug: 'private-endpoints-service-endpoints', title: 'Private Endpoints & Service Endpoints', subtitle: 'Securing PaaS services with private connectivity, DNS integration, and zero-trust networking.', number: 31, file: '0031-private-endpoints-service-endpoints.html' },
      { slug: 'identity-protection-conditional-access', title: 'Identity Protection & Conditional Access', subtitle: 'PIM design, risk-based Conditional Access policy architecture, and CA for workload identities.', number: 32, file: '0032-identity-protection-conditional-access.html' },
      { slug: 'microsoft-defender-for-cloud', title: 'Microsoft Defender for Cloud', subtitle: 'Secure score, regulatory compliance, workload protection plans, and security recommendations.', number: 33, file: '0033-defender-for-cloud.html' },
    ],
  },
  {
    number: 6,
    name: 'Phase 6 — Reliability & Operations',
    urlSegment: 'phase-6',
    contentDir: 'azure-solutions-architect',
    lessons: [
      { slug: 'high-availability-design', title: 'High Availability Design', subtitle: 'Availability zones, multi-region active-active vs. active-passive, and SLA composition math.', number: 34, file: '0034-high-availability-design.html' },
      { slug: 'azure-backup-recovery', title: 'Azure Backup & Recovery', subtitle: 'Cross-region restore as an RTO/RPO lever, backup policy design, and immutable vaults against ransomware.', number: 35, file: '0035-backup-recovery.html' },
      { slug: 'disaster-recovery-site-recovery', title: 'Disaster Recovery & Azure Site Recovery', subtitle: 'Replication policies, failover/failback, RTO/RPO planning, and DR drill automation.', number: 36, file: '0036-disaster-recovery-site-recovery.html' },
      { slug: 'azure-monitor-log-analytics', title: 'Azure Monitor & Log Analytics', subtitle: 'Log Analytics workspace topology, KQL at architect depth, and alert action group design for incident routing.', number: 37, file: '0037-azure-monitor-log-analytics.html' },
      { slug: 'application-insights-distributed-tracing', title: 'Application Insights & Distributed Tracing', subtitle: 'APM instrumentation, dependency maps, live metrics, and end-to-end transaction diagnostics.', number: 38, file: '0038-app-insights-distributed-tracing.html' },
      { slug: 'autoscaling-performance-optimization', title: 'Autoscaling & Performance Optimization', subtitle: 'Metric-based vs. schedule-based scaling, scale-in policies, and performance anti-patterns.', number: 39, file: '0039-autoscaling-performance.html' },
      { slug: 'infrastructure-automation-devops', title: 'Infrastructure Automation & DevOps', subtitle: 'CI/CD with Azure DevOps/GitHub Actions, Terraform at scale, and GitOps for AKS.', number: 40, file: '0040-infrastructure-automation-devops.html' },
    ],
  },
  {
    number: 7,
    name: 'Phase 7 — Advanced Patterns',
    urlSegment: 'phase-7',
    contentDir: 'azure-solutions-architect',
    lessons: [
      { slug: 'microservices-architecture', title: 'Microservices Architecture', subtitle: 'Service decomposition, CQRS, Saga pattern, and sidecar/ambassador patterns on AKS.', number: 41, file: '0041-microservices-architecture.html' },
      { slug: 'hybrid-multicloud-azure-arc', title: 'Hybrid & Multi-Cloud with Azure Arc', subtitle: 'Arc-enabled servers and Kubernetes, unified governance, and extending the Azure management plane.', number: 42, file: '0042-hybrid-multicloud-arc.html' },
      { slug: 'migration-strategies', title: 'Migration Strategies', subtitle: "The 5 R's (rehost, refactor, rearchitect, rebuild, replace), assessment tools, and migration waves.", number: 43, file: '0043-migration-strategies.html' },
      { slug: 'well-architected-framework-review', title: 'Well-Architected Framework Review', subtitle: 'Applying the five pillars — reliability, security, cost, operational excellence, performance — to real designs.', number: 44, file: '0044-well-architected-framework-review.html' },
      { slug: 'multi-tenant-saas-architecture', title: 'Multi-Tenant SaaS Architecture', subtitle: 'Tenant isolation models, data partitioning, per-tenant scaling, and shared-nothing vs. shared-everything.', number: 45, file: '0045-multi-tenant-saas-architecture.html' },
    ],
  },
  {
    number: 8,
    name: 'Phase 8 — Exam Prep & Capstone Projects',
    urlSegment: 'phase-8',
    contentDir: 'azure-solutions-architect',
    lessons: [
      { slug: 'az305-exam-strategy', title: 'AZ-305 Exam Strategy', subtitle: 'Exam format, question types, time management, and targeted review of the four scored domains.', number: 46, file: '0046-az305-exam-strategy.html' },
      { slug: 'case-study-identity-governance', title: 'Case Study: Identity & Governance for a Multi-BU Enterprise', subtitle: 'Practice scenario — design identity, RBAC, and governance for a multi-business-unit enterprise.', number: 47, file: '0047-case-study-identity-governance.html' },
      { slug: 'case-study-data-platform', title: 'Case Study: Global E-Commerce Data Platform', subtitle: 'Practice scenario — design a globally distributed e-commerce data layer with HA and compliance.', number: 48, file: '0048-case-study-data-platform.html' },
      { slug: 'case-study-infrastructure-networking', title: 'Case Study: Infrastructure & Networking', subtitle: 'Practice scenario — design a hub-spoke network with hybrid connectivity and zero-trust segmentation.', number: 49, file: '0049-case-study-infrastructure-networking.html' },
      { slug: 'capstone-end-to-end-architecture', title: 'Capstone: End-to-End Architecture', subtitle: 'Design a complete production system — a multi-region SaaS app — applying all pillars, documented as an ADR.', number: 50, file: '0050-capstone-end-to-end-architecture.html' },
    ],
  },
];

// ── Flat lesson index for cross-phase navigation ───────────────────────────

type FlatLesson = LessonMeta & { urlSegment: string };

const ALL_AZURE_ARCHITECT_LESSONS: FlatLesson[] = AZURE_ARCHITECT_PHASES.flatMap((phase) =>
  phase.lessons.map((l) => ({ ...l, urlSegment: phase.urlSegment }))
);

// ── Nav link rewriting ─────────────────────────────────────────────────────

const COURSE_BASE = '/tutorials/azure-solutions-architect';

function buildNavLinkMap(): Record<string, string> {
  const map: Record<string, string> = {};
  AZURE_ARCHITECT_PHASES.forEach((phase) => {
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
// Source format: <div class="lesson-wrap"><header class="lesson-header
// fade-in"> (dropped — site renders its own header) <nav class="toc"> (In
// This Lesson jump-list, dropped — the site has its own right-hand TOC)
// <section id="..." class="fade-in"> sections, a #quiz section, a
// .lesson-summary, and a trailing <nav class="lesson-nav"> (dropped). Each
// lesson also ends with a per-lesson inline <script> calling
// AzureLessons.Diagrams.init() (a method that doesn't actually exist on the
// public API) — but diagrams.js auto-runs its *own* full init() the moment
// it loads (readyState check at the bottom of the file), so that inline
// script is dead weight and safe to drop entirely.

function parseAzureArchitectLesson(rawHtml: string): { bodyHtml: string } {
  const wrapStart = rawHtml.indexOf('<div class="lesson-wrap">');
  const wrapEnd = rawHtml.lastIndexOf('</div>');
  let body =
    wrapStart !== -1
      ? rawHtml.slice(wrapStart + '<div class="lesson-wrap">'.length)
      : rawHtml;

  // Cut off everything from the closing </div> of lesson-wrap onward (nav +
  // scripts). We locate it by finding the trailing <script src="../assets
  // marker and cutting there instead of relying on brace-matching </div>s.
  const scriptTagIndex = body.indexOf('<script src="../assets');
  if (scriptTagIndex !== -1) body = body.slice(0, scriptTagIndex);

  // Drop the built-in header (site renders its own from AZURE_ARCHITECT_PHASES).
  body = body.replace(/<header class="lesson-header[^"]*">[\s\S]*?<\/header>\s*/, '');

  // Drop the embedded "In This Lesson" TOC (the site has its own right-hand TOC).
  body = body.replace(/<nav class="toc[^"]*">[\s\S]*?<\/nav>\s*/, '');

  // Drop the trailing built-in nav and closing wrap </div>.
  body = body.replace(/<nav class="lesson-nav[^"]*">[\s\S]*?<\/nav>\s*/, '');
  body = body.replace(/<\/div>\s*$/, '');

  body = replaceNavLinks(body).trim();

  return { bodyHtml: body };
}

// ── Public API ─────────────────────────────────────────────────────────────

export function getAzureArchitectLessonData(phaseUrlSegment: string, slug: string): AzureArchitectLessonData {
  const allIndex = ALL_AZURE_ARCHITECT_LESSONS.findIndex(
    (l) => l.urlSegment === phaseUrlSegment && l.slug === slug
  );
  if (allIndex === -1) throw new Error(`Azure Architect lesson not found: ${phaseUrlSegment}/${slug}`);

  const meta = ALL_AZURE_ARCHITECT_LESSONS[allIndex];
  const phase = AZURE_ARCHITECT_PHASES.find((p) => p.urlSegment === phaseUrlSegment)!;

  const contentPath = path.join(process.cwd(), 'src', 'content', 'azure-solutions-architect', meta.file);
  const rawHtml = fs.readFileSync(contentPath, 'utf-8');
  const { bodyHtml: parsedBodyHtml } = parseAzureArchitectLesson(rawHtml);
  const { bodyHtml, headings } = extractHeadingsAndInjectIds(parsedBodyHtml);

  const prevMeta = allIndex > 0 ? ALL_AZURE_ARCHITECT_LESSONS[allIndex - 1] : null;
  const nextMeta = allIndex < ALL_AZURE_ARCHITECT_LESSONS.length - 1 ? ALL_AZURE_ARCHITECT_LESSONS[allIndex + 1] : null;

  return {
    ...meta,
    phaseNumber: phase.number,
    phaseName: phase.name,
    bodyHtml,
    script: AZURE_ARCHITECT_DIAGRAMS_JS,
    headings,
    prev: prevMeta ? { slug: prevMeta.slug, title: prevMeta.title, urlSegment: prevMeta.urlSegment } : null,
    next: nextMeta ? { slug: nextMeta.slug, title: nextMeta.title, urlSegment: nextMeta.urlSegment } : null,
  };
}
