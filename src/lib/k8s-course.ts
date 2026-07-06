import fs from 'fs';
import path from 'path';
import type { LessonMeta, PhaseMeta } from '@/lib/backend-course';
import { extractHeadingsAndInjectIds, type LessonHeading } from '@/lib/lesson-toc';
import { K8S_QUIZ_JS } from '@/lib/k8s-quiz-script';

export type { LessonMeta as K8sLessonMeta, PhaseMeta as K8sPhaseMeta };

export type K8sLessonData = LessonMeta & {
  phaseNumber: number;
  phaseName: string;
  bodyHtml: string;
  script: string;
  headings: LessonHeading[];
  prev: { slug: string; title: string; urlSegment: string } | null;
  next: { slug: string; title: string; urlSegment: string } | null;
};

// ── Phase definitions ──────────────────────────────────────────────────────
// The source CURRICULUM.md plans 100 lessons across 14 chapters, but the
// actual generated set has a real gap: Chapter 11 (Deep Internals) was never
// generated at its planned position, and only lesson 1 of Chapter 12 (Helm/
// Kustomize) exists (numbers 63-71 don't exist as files at all). Generation
// picked back up at 72 with Chapter 13, then covered Chapter 11's topics
// plus several bonus lessons not in the curriculum doc at all (82-100) in a
// different order. Phases below reflect the *actual* 91 files that exist,
// not the original curriculum's numbering.

export const K8S_PHASES: PhaseMeta[] = [
  {
    number: 1,
    name: 'Chapter 1 — Foundations & Architecture',
    urlSegment: 'chapter-1',
    contentDir: 'kubernetes-mastery',
    lessons: [
      { slug: 'kubernetes-architecture-overview', title: 'Kubernetes Architecture Overview', subtitle: 'Orchestration vs. automation, the declarative model, and control loops — why Kubernetes exists at all.', number: 1, file: '0001-kubernetes-architecture-overview.html' },
      { slug: 'control-plane-deep-dive', title: 'Control Plane Deep-Dive', subtitle: 'API server, etcd, scheduler, controller-manager, and cloud-controller-manager — what each one actually does.', number: 2, file: '0002-control-plane-deep-dive.html' },
      { slug: 'worker-node-internals', title: 'Worker Node Internals', subtitle: 'kubelet, kube-proxy, the container runtime (CRI), and the Pod sandbox lifecycle.', number: 3, file: '0003-worker-node-internals.html' },
      { slug: 'kubernetes-api-model', title: 'The Kubernetes API Model', subtitle: 'Resources, GVK/GVR, API groups, and the object metadata/spec/status convention.', number: 4, file: '0004-kubernetes-api-model.html' },
      { slug: 'kubectl-fluency', title: 'kubectl Fluency', subtitle: 'Imperative vs. declarative, contexts, output formats, dry-run, diff, and apply vs. create.', number: 5, file: '0005-kubectl-fluency.html' },
    ],
  },
  {
    number: 2,
    name: 'Chapter 2 — Core Workloads',
    urlSegment: 'chapter-2',
    contentDir: 'kubernetes-mastery',
    lessons: [
      { slug: 'pods-from-first-principles', title: 'Pods from First Principles', subtitle: 'Multi-container patterns — sidecar, init, ambassador — and the full Pod lifecycle and phases.', number: 6, file: '0006-pods-from-first-principles.html' },
      { slug: 'replicasets-label-selection', title: 'ReplicaSets & the Label Selection Contract', subtitle: 'Ownership, scaling, and orphan/adopt semantics behind every ReplicaSet.', number: 7, file: '0007-replicasets-label-selection.html' },
      { slug: 'deployments', title: 'Deployments', subtitle: 'Rolling updates, rollbacks, revision history, and the maxSurge/maxUnavailable math.', number: 8, file: '0008-deployments.html' },
      { slug: 'statefulsets', title: 'StatefulSets', subtitle: 'Stable identity, ordered startup/teardown, headless Services, and volumeClaimTemplates.', number: 9, file: '0009-statefulsets.html' },
      { slug: 'daemonsets', title: 'DaemonSets', subtitle: 'Per-node workloads, tolerations for control-plane nodes, and update strategies.', number: 10, file: '0010-daemonsets.html' },
      { slug: 'jobs-cronjobs', title: 'Jobs & CronJobs', subtitle: 'Completions, parallelism, backoffLimit, activeDeadlineSeconds, and concurrencyPolicy.', number: 11, file: '0011-jobs-cronjobs.html' },
      { slug: 'pod-disruption-budgets', title: 'Pod Disruption Budgets', subtitle: 'Voluntary vs. involuntary disruptions, and minAvailable vs. maxUnavailable.', number: 12, file: '0012-pod-disruption-budgets.html' },
    ],
  },
  {
    number: 3,
    name: 'Chapter 3 — Configuration & Secrets',
    urlSegment: 'chapter-3',
    contentDir: 'kubernetes-mastery',
    lessons: [
      { slug: 'configmaps', title: 'ConfigMaps', subtitle: 'Creation methods, mounting as files vs. env vars, and immutable ConfigMaps.', number: 13, file: '0013-configmaps.html' },
      { slug: 'secrets', title: 'Secrets', subtitle: 'Types — Opaque, TLS, docker-registry — encoding vs. encryption, and tmpfs mounts.', number: 14, file: '0014-secrets.html' },
      { slug: 'env-vars-downward-api', title: 'Environment Variables & the Downward API', subtitle: 'fieldRef, resourceFieldRef, and dependent environment variables.', number: 15, file: '0015-env-vars-downward-api.html' },
      { slug: 'encryption-at-rest', title: 'Encryption at Rest', subtitle: 'EncryptionConfiguration and envelope encryption with KMS providers.', number: 16, file: '0016-encryption-at-rest.html' },
      { slug: 'external-secrets-management', title: 'External Secrets Management', subtitle: 'External Secrets Operator and HashiCorp Vault integration patterns.', number: 17, file: '0017-external-secrets-management.html' },
      { slug: 'configuration-best-practices', title: 'Configuration Best Practices', subtitle: '12-factor alignment, hot-reload patterns, and config hash annotations for rollouts.', number: 18, file: '0018-configuration-best-practices.html' },
    ],
  },
  {
    number: 4,
    name: 'Chapter 4 — Networking',
    urlSegment: 'chapter-4',
    contentDir: 'kubernetes-mastery',
    lessons: [
      { slug: 'kubernetes-network-model', title: 'The Kubernetes Network Model', subtitle: 'Pod IP uniqueness, the flat network assumption, and why there\'s no NAT requirement.', number: 19, file: '0019-kubernetes-network-model.html' },
      { slug: 'services-in-depth', title: 'Services in Depth', subtitle: 'ClusterIP, NodePort, LoadBalancer, ExternalName, session affinity, and topology-aware hints.', number: 20, file: '0020-services-in-depth.html' },
      { slug: 'dns-service-discovery', title: 'DNS & Service Discovery', subtitle: 'CoreDNS architecture, A/AAAA/SRV records, and headless Service resolution.', number: 21, file: '0021-dns-service-discovery.html' },
      { slug: 'ingress-controllers', title: 'Ingress & Ingress Controllers', subtitle: 'Rules, TLS termination, path types, and NGINX vs. Envoy-based controllers.', number: 22, file: '0022-ingress-controllers.html' },
      { slug: 'gateway-api', title: 'Gateway API — The Future of Ingress', subtitle: 'GatewayClass, Gateway, HTTPRoute, and traffic splitting beyond Ingress.', number: 23, file: '0023-gateway-api.html' },
      { slug: 'network-policies', title: 'NetworkPolicies', subtitle: 'Default-deny, ingress/egress rules, namespace selectors, CIDR blocks, and policy ordering.', number: 24, file: '0024-network-policies.html' },
      { slug: 'cni-fundamentals', title: 'CNI Fundamentals', subtitle: 'Plugin lifecycle and the Calico vs. Cilium vs. Flannel trade-offs, plus the eBPF dataplane.', number: 25, file: '0025-cni-fundamentals.html' },
    ],
  },
  {
    number: 5,
    name: 'Chapter 5 — Storage',
    urlSegment: 'chapter-5',
    contentDir: 'kubernetes-mastery',
    lessons: [
      { slug: 'volume-primitives', title: 'Volume Primitives', subtitle: 'emptyDir, hostPath, projected volumes, and ephemeral volumes.', number: 26, file: '0026-volume-primitives.html' },
      { slug: 'persistent-volumes', title: 'PersistentVolumes & PersistentVolumeClaims', subtitle: 'Lifecycle, access modes, reclaim policies, and capacity.', number: 27, file: '0027-persistent-volumes.html' },
      { slug: 'storageclasses-dynamic-provisioning', title: 'StorageClasses & Dynamic Provisioning', subtitle: 'Provisioners, parameters, and volumeBindingMode — Immediate vs. WaitForFirstConsumer.', number: 28, file: '0028-storageclasses-dynamic-provisioning.html' },
      { slug: 'csi', title: 'CSI — Container Storage Interface', subtitle: 'Architecture, node/controller plugins, snapshots, and cloning.', number: 29, file: '0029-csi.html' },
    ],
  },
  {
    number: 6,
    name: 'Chapter 6 — Scheduling & Resource Management',
    urlSegment: 'chapter-6',
    contentDir: 'kubernetes-mastery',
    lessons: [
      { slug: 'resource-requests-limits', title: 'Resource Requests & Limits', subtitle: 'CPU vs. memory semantics, OOMKill, CPU throttling, and LimitRanges.', number: 30, file: '0030-resource-requests-limits.html' },
      { slug: 'qos-classes', title: 'Quality of Service Classes', subtitle: 'Guaranteed, Burstable, and BestEffort — and the eviction order behind them.', number: 31, file: '0031-qos-classes.html' },
      { slug: 'resource-quotas', title: 'ResourceQuotas', subtitle: 'Per-namespace quotas, priority-class scoping, and cross-namespace fairness.', number: 32, file: '0032-resource-quotas.html' },
      { slug: 'taints-tolerations', title: 'Taints & Tolerations', subtitle: 'NoSchedule, PreferNoSchedule, NoExecute, and taint-based evictions.', number: 33, file: '0033-taints-tolerations.html' },
      { slug: 'node-affinity', title: 'Node Affinity & Anti-Affinity', subtitle: 'requiredDuringScheduling, preferredDuringScheduling, and the weight math behind them.', number: 34, file: '0034-node-affinity.html' },
      { slug: 'pod-affinity-anti-affinity', title: 'Pod Affinity & Anti-Affinity', subtitle: 'Topology keys, scalability implications, and soft vs. hard rules.', number: 35, file: '0035-pod-affinity-anti-affinity.html' },
      { slug: 'topology-spread-constraints', title: 'Topology Spread Constraints', subtitle: 'maxSkew, whenUnsatisfiable, and topologyKey patterns for high availability.', number: 36, file: '0036-topology-spread-constraints.html' },
    ],
  },
  {
    number: 7,
    name: 'Chapter 7 — Security: RBAC & Identity',
    urlSegment: 'chapter-7',
    contentDir: 'kubernetes-mastery',
    lessons: [
      { slug: 'authentication-methods', title: 'Authentication Methods', subtitle: 'X.509 client certs, OIDC, ServiceAccount tokens, and bootstrap tokens.', number: 37, file: '0037-authentication-methods.html' },
      { slug: 'service-accounts', title: 'ServiceAccounts', subtitle: 'Bound tokens (v1.22+), projected volumes, and disabling auto-mount.', number: 38, file: '0038-service-accounts.html' },
      { slug: 'rbac-fundamentals', title: 'RBAC Fundamentals', subtitle: 'Roles, ClusterRoles, RoleBindings, ClusterRoleBindings, and the verb matrix.', number: 39, file: '0039-rbac-fundamentals.html' },
      { slug: 'rbac-patterns', title: 'RBAC Patterns', subtitle: 'Least-privilege design, aggregated ClusterRoles, and escalation prevention.', number: 40, file: '0040-rbac-patterns.html' },
      { slug: 'pod-security-standards', title: 'Pod Security Standards', subtitle: 'Privileged/Baseline/Restricted, the PodSecurity admission controller, and namespace labels.', number: 41, file: '0041-pod-security-standards.html' },
    ],
  },
  {
    number: 8,
    name: 'Chapter 8 — Security: Advanced',
    urlSegment: 'chapter-8',
    contentDir: 'kubernetes-mastery',
    lessons: [
      { slug: 'admission-controllers', title: 'Admission Controllers', subtitle: 'Mutating vs. validating, and built-in controllers like LimitRanger and ResourceQuota.', number: 42, file: '0042-admission-controllers.html' },
      { slug: 'dynamic-admission-webhooks', title: 'Dynamic Admission Webhooks', subtitle: 'MutatingWebhookConfiguration, ValidatingWebhookConfiguration, and failure policies.', number: 43, file: '0043-admission-webhooks.html' },
      { slug: 'opa-gatekeeper-kyverno', title: 'OPA/Gatekeeper & Kyverno', subtitle: 'Constraint templates, policy-as-code, and audit vs. enforcement modes.', number: 44, file: '0044-gatekeeper-kyverno.html' },
      { slug: 'supply-chain-security', title: 'Supply Chain Security', subtitle: 'Image signing with cosign/Sigstore, admission enforcement of signatures, and SBOMs.', number: 45, file: '0045-supply-chain-security.html' },
      { slug: 'runtime-security', title: 'Runtime Security', subtitle: 'Seccomp profiles, AppArmor, SELinux, and Falco for anomaly detection.', number: 46, file: '0046-runtime-security.html' },
      { slug: 'container-sandboxing', title: 'Container Sandboxing', subtitle: 'gVisor (runsc), Kata Containers, and choosing a RuntimeClass.', number: 47, file: '0047-container-sandboxing.html' },
      { slug: 'network-level-security', title: 'Network-Level Security', subtitle: 'mTLS with a service mesh, SPIFFE/SPIRE identity, and egress controls.', number: 48, file: '0048-network-level-security.html' },
    ],
  },
  {
    number: 9,
    name: 'Chapter 9 — Observability & Debugging',
    urlSegment: 'chapter-9',
    contentDir: 'kubernetes-mastery',
    lessons: [
      { slug: 'health-probes', title: 'Health Probes', subtitle: 'Liveness vs. readiness vs. startup, probe types, and tuning thresholds.', number: 49, file: '0049-health-probes.html' },
      { slug: 'logging-architecture', title: 'Logging Architecture', subtitle: 'Node-level logging, sidecar patterns, and cluster-level pipelines (Fluentd/Fluent Bit → Loki/ES).', number: 50, file: '0050-logging-architecture.html' },
      { slug: 'metrics-pipeline', title: 'Metrics Pipeline', subtitle: 'metrics-server, the Prometheus stack, and building Grafana dashboards.', number: 51, file: '0051-metrics-pipeline.html' },
      { slug: 'distributed-tracing', title: 'Distributed Tracing', subtitle: 'OpenTelemetry, trace propagation, and Jaeger/Tempo integration.', number: 52, file: '0052-distributed-tracing.html' },
      { slug: 'kubectl-debug-techniques', title: 'kubectl Debug Techniques', subtitle: 'Ephemeral containers, kubectl debug node, port-forward, exec, and logs --previous.', number: 53, file: '0053-kubectl-debug-techniques.html' },
      { slug: 'troubleshooting-patterns', title: 'Troubleshooting Patterns', subtitle: 'CrashLoopBackOff, ImagePullBackOff, Pending Pods, DNS failures, and eviction diagnosis.', number: 54, file: '0054-troubleshooting-patterns.html' },
    ],
  },
  {
    number: 10,
    name: 'Chapter 10 — Advanced Patterns',
    urlSegment: 'chapter-10',
    contentDir: 'kubernetes-mastery',
    lessons: [
      { slug: 'crds-and-extensions', title: 'Custom Resource Definitions', subtitle: 'Schema validation, versions, conversion webhooks, and the status subresource.', number: 55, file: '0055-crds-and-extensions.html' },
      { slug: 'operator-pattern', title: 'Operator Pattern', subtitle: 'The reconciliation loop, level-triggered vs. edge-triggered, and idempotency.', number: 56, file: '0056-operator-pattern.html' },
      { slug: 'building-an-operator', title: 'Building an Operator', subtitle: 'controller-runtime/Kubebuilder scaffolding, the Reconcile signature, and owner references.', number: 57, file: '0057-building-an-operator.html' },
      { slug: 'admission-webhooks-practice', title: 'Admission Webhooks in Practice', subtitle: 'Writing a mutating webhook that injects a sidecar.', number: 58, file: '0058-admission-webhooks-practice.html' },
      { slug: 'api-aggregation', title: 'API Aggregation', subtitle: 'The aggregation layer, APIService, and building an extension API server.', number: 59, file: '0059-api-aggregation.html' },
      { slug: 'finalizers-garbage-collection', title: 'Finalizers & Garbage Collection', subtitle: 'ownerReferences, foreground/background/orphan deletion, and finalizer patterns.', number: 60, file: '0060-finalizers-garbage-collection.html' },
      { slug: 'leader-election', title: 'Leader Election & HA Controllers', subtitle: 'Lease-based election and running multi-replica controller deployments.', number: 61, file: '0061-leader-election.html' },
    ],
  },
  {
    number: 11,
    name: 'Chapter 11 — GitOps & Manifest Management',
    urlSegment: 'chapter-11',
    contentDir: 'kubernetes-mastery',
    lessons: [
      { slug: 'manifest-repository-patterns', title: 'Manifest Repository Patterns', subtitle: 'Monorepo vs. polyrepo, directory conventions, and app-of-apps — from small teams to enterprise scale.', number: 62, file: '0062-manifest-repository-patterns.html' },
    ],
  },
  {
    number: 12,
    name: 'Chapter 12 — Service Mesh, Autoscaling & Cloud-Native Tooling',
    urlSegment: 'chapter-12',
    contentDir: 'kubernetes-mastery',
    lessons: [
      { slug: 'istio-in-depth', title: 'Istio in Depth', subtitle: 'VirtualService, DestinationRule, mTLS, AuthorizationPolicy, and telemetry.', number: 72, file: '0072-istio-in-depth.html' },
      { slug: 'linkerd-mesh-comparison', title: 'Linkerd & Service Mesh Comparison', subtitle: 'The micro-proxy model, automatic mTLS, and when to choose Linkerd over Istio.', number: 73, file: '0073-linkerd-mesh-comparison.html' },
      { slug: 'keda-event-driven-scaling', title: 'KEDA — Event-Driven Autoscaling', subtitle: 'ScaledObjects and scalers — Kafka, SQS, cron, HTTP, and Prometheus.', number: 74, file: '0074-keda-event-driven-scaling.html' },
      { slug: 'vpa-cluster-autoscaler-karpenter', title: 'VPA, Cluster Autoscaler & Karpenter', subtitle: 'Right-sizing, node provisioning, and spot-instance strategy.', number: 75, file: '0075-vpa-cluster-autoscaler-karpenter.html' },
      { slug: 'cert-manager', title: 'cert-manager — TLS Automation', subtitle: 'ClusterIssuer, ACME/Let\'s Encrypt, DNS-01, wildcard certs, and rotation.', number: 76, file: '0076-cert-manager.html' },
      { slug: 'external-dns', title: 'External DNS', subtitle: 'Providers, sync policies, and Ingress/Service integration for automated DNS.', number: 77, file: '0077-external-dns.html' },
      { slug: 'velero', title: 'Velero', subtitle: 'Backup schedules, namespaced backup, DR scenarios, and cluster migration.', number: 78, file: '0078-velero.html' },
      { slug: 'rook-longhorn', title: 'Rook & Longhorn', subtitle: 'Cloud-agnostic storage — when to self-host, and how the architecture operates.', number: 79, file: '0079-rook-longhorn.html' },
      { slug: 'harbor', title: 'Harbor', subtitle: 'Private registry scanning, replication, proxy cache, and cosign signing integration.', number: 80, file: '0080-harbor.html' },
      { slug: 'crossplane', title: 'Crossplane', subtitle: 'Infrastructure as Kubernetes resources — Compositions, XRDs, and cloud provisioning.', number: 81, file: '0081-crossplane.html' },
    ],
  },
  {
    number: 13,
    name: 'Chapter 13 — Deep Internals',
    urlSegment: 'chapter-13',
    contentDir: 'kubernetes-mastery',
    lessons: [
      { slug: 'api-server-lifecycle', title: 'API Server Request Lifecycle', subtitle: 'Authentication → authorization → admission → validation → etcd write → response.', number: 82, file: '0082-api-server-lifecycle.html' },
      { slug: 'etcd-internals', title: 'etcd Internals', subtitle: 'Raft consensus, watch semantics, compaction, defragmentation, and key layout.', number: 83, file: '0083-etcd-internals.html' },
      { slug: 'scheduler-framework', title: 'Scheduler Framework', subtitle: 'Plugins — Filter, Score, Reserve, Bind — and the scheduling framework\'s extension points.', number: 84, file: '0084-scheduler-framework.html' },
      { slug: 'controller-manager', title: 'Controller Manager', subtitle: 'Shared informers, work queues, exponential backoff, and resyncs.', number: 85, file: '0085-controller-manager.html' },
      { slug: 'kubelet-deep-dive', title: 'Kubelet Deep Dive', subtitle: 'Pod admission, cgroup management, PLEG, and the eviction manager.', number: 86, file: '0086-kubelet-deep-dive.html' },
      { slug: 'kube-proxy-modes', title: 'kube-proxy Modes', subtitle: 'iptables vs. IPVS vs. nftables — how Services actually route traffic at the node.', number: 87, file: '0087-kube-proxy-modes.html' },
      { slug: 'production-cluster-setup', title: 'Production Cluster Setup', subtitle: 'Bootstrapping a real cluster the way you\'d actually run it in production.', number: 88, file: '0088-production-cluster-setup.html' },
    ],
  },
  {
    number: 14,
    name: 'Chapter 14 — Production Operations at Scale',
    urlSegment: 'chapter-14',
    contentDir: 'kubernetes-mastery',
    lessons: [
      { slug: 'cluster-upgrades', title: 'Cluster Upgrades', subtitle: 'The kubeadm upgrade workflow — control plane vs. worker sequencing and skew policy.', number: 89, file: '0089-cluster-upgrades.html' },
      { slug: 'incident-response', title: 'Incident Response', subtitle: 'Runbooks, cluster break-glass procedures, and node draining/cordon/uncordon.', number: 90, file: '0090-incident-response.html' },
      { slug: 'cost-optimization', title: 'Cost Optimization', subtitle: 'Right-sizing, cluster autoscaler, Karpenter, spot/preemptible nodes, and bin-packing.', number: 91, file: '0091-cost-optimization.html' },
      { slug: 'multi-tenancy', title: 'Multi-tenancy', subtitle: 'Namespace isolation, virtual clusters (vcluster), hierarchical namespaces, and cost allocation.', number: 92, file: '0092-multi-tenancy.html' },
      { slug: 'gitops-argocd', title: 'GitOps & ArgoCD', subtitle: 'Flux vs. ArgoCD, source-of-truth patterns, drift detection, and progressive delivery.', number: 93, file: '0093-gitops-argocd.html' },
      { slug: 'service-mesh-production', title: 'Service Mesh in Production', subtitle: 'Running a mesh at scale — upgrade strategy, failure modes, and operational overhead.', number: 94, file: '0094-service-mesh-production.html' },
      { slug: 'production-observability-stack', title: 'Production Observability Stack', subtitle: 'Assembling metrics, logs, and traces into one coherent operational picture.', number: 95, file: '0095-observability-stack.html' },
      { slug: 'security-hardening', title: 'Security Hardening', subtitle: 'A production hardening pass across the cluster — defaults you should never ship without.', number: 96, file: '0096-security-hardening.html' },
      { slug: 'disaster-recovery', title: 'Disaster Recovery', subtitle: 'etcd backup/restore, single-member vs. cluster restore, and full DR drills.', number: 97, file: '0097-disaster-recovery.html' },
      { slug: 'capacity-planning', title: 'Capacity Planning', subtitle: 'Forecasting growth and sizing a cluster before you\'re paged for it.', number: 98, file: '0098-capacity-planning.html' },
      { slug: 'platform-engineering', title: 'Platform Engineering', subtitle: 'The platform-team model, tenant onboarding, self-service, and developer experience.', number: 99, file: '0099-platform-engineering.html' },
      { slug: 'course-conclusion', title: 'Course Conclusion', subtitle: 'Where to go next — certification paths, and staying current as Kubernetes evolves.', number: 100, file: '0100-course-conclusion.html' },
    ],
  },
];

// ── Flat lesson index for cross-phase navigation ───────────────────────────

type FlatLesson = LessonMeta & { urlSegment: string };

const ALL_K8S_LESSONS: FlatLesson[] = K8S_PHASES.flatMap((phase) =>
  phase.lessons.map((l) => ({ ...l, urlSegment: phase.urlSegment }))
);

// ── Nav link rewriting ─────────────────────────────────────────────────────

const COURSE_BASE = '/tutorials/kubernetes-mastery';

function buildNavLinkMap(): Record<string, string> {
  const map: Record<string, string> = {};
  K8S_PHASES.forEach((phase) => {
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
// Two source templates exist across this corpus:
//  - Lessons 1-62: bare fragments — <h1>, <p class="meta">, sections with
//    <h2>/.key-insight/.production-note/.diagram/.quiz (reveal buttons via
//    plain onclick="this.nextElementSibling.style.display='block'" — no JS
//    needed), each carrying its own <head><style> (light "Georgia serif").
//  - Lessons 72-100: a fuller page shell — <nav>, a <div id="main"><div
//    class="wrap"><div class="hero"> intro block, then <section> blocks,
//    ending in a <footer> with prev/next links, then a real <script>
//    defining a global quiz(el, correct, explain) function referenced by
//    each .quiz-opt's onclick — each also has its own <head><style> (already
//    dark, GitHub-style theme).
// Both templates nest several <div>s inside nav/hero (nav-links, meta-row >
// meta-pill, ...) that a naive non-greedy </div> match can't balance
// correctly, so instead of matching tags we cut at fixed text landmarks:
// everything before the first <section> (nav+hero+wrapper opens) and
// everything from <footer> onward (footer+wrapper closes+script+html) is
// simply discarded — the site renders its own header/TOC/bottom-nav instead.

function parseK8sLesson(rawHtml: string): { bodyHtml: string } {
  const bodyStart = rawHtml.indexOf('<body>');
  const bodyEnd = rawHtml.lastIndexOf('</body>');
  let body =
    bodyStart !== -1 && bodyEnd !== -1
      ? rawHtml.slice(bodyStart + '<body>'.length, bodyEnd)
      : rawHtml;

  if (body.includes('<div class="hero">')) {
    // Newer template: keep only the <section>...</section> blocks. The
    // slice below cuts out the <div class="wrap"> that opened right after
    // <div id="main"> (before .hero) without including its matching close —
    // that close sits just before <footer>, so it must be trimmed too or
    // it leaks in as an orphaned </div> (invalid HTML → hydration mismatch).
    const firstSection = body.indexOf('<section');
    const footerStart = body.indexOf('<footer');
    if (firstSection !== -1) {
      body = footerStart !== -1 ? body.slice(firstSection, footerStart) : body.slice(firstSection);
      body = body.replace(/<\/div>\s*$/, '');
    }
  } else {
    // Older template: drop the bare <h1> title and following <p class="meta">.
    body = body.replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*/, '');
    body = body.replace(/<p class="meta">[\s\S]*?<\/p>\s*/, '');
    // Drop trailing inert <script> (comment-only in this template).
    body = body.replace(/<script(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>\s*/g, '');
  }

  body = replaceNavLinks(body).trim();

  return { bodyHtml: body };
}

// ── Public API ─────────────────────────────────────────────────────────────

export function getK8sLessonData(phaseUrlSegment: string, slug: string): K8sLessonData {
  const allIndex = ALL_K8S_LESSONS.findIndex(
    (l) => l.urlSegment === phaseUrlSegment && l.slug === slug
  );
  if (allIndex === -1) throw new Error(`Kubernetes lesson not found: ${phaseUrlSegment}/${slug}`);

  const meta = ALL_K8S_LESSONS[allIndex];
  const phase = K8S_PHASES.find((p) => p.urlSegment === phaseUrlSegment)!;

  const contentPath = path.join(process.cwd(), 'src', 'content', 'kubernetes-mastery', meta.file);
  const rawHtml = fs.readFileSync(contentPath, 'utf-8');
  const { bodyHtml: parsedBodyHtml } = parseK8sLesson(rawHtml);
  const { bodyHtml, headings } = extractHeadingsAndInjectIds(parsedBodyHtml);

  const prevMeta = allIndex > 0 ? ALL_K8S_LESSONS[allIndex - 1] : null;
  const nextMeta = allIndex < ALL_K8S_LESSONS.length - 1 ? ALL_K8S_LESSONS[allIndex + 1] : null;

  return {
    ...meta,
    phaseNumber: phase.number,
    phaseName: phase.name,
    bodyHtml,
    script: K8S_QUIZ_JS,
    headings,
    prev: prevMeta ? { slug: prevMeta.slug, title: prevMeta.title, urlSegment: prevMeta.urlSegment } : null,
    next: nextMeta ? { slug: nextMeta.slug, title: nextMeta.title, urlSegment: nextMeta.urlSegment } : null,
  };
}
