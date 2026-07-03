export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  outcome: string;
  tags: string[];
  year: string;
  status: 'live' | 'archived' | 'wip';
  links: {
    github?: string;
    live?: string;
    caseStudy?: boolean;
  };
};

export const projects: Project[] = [
  {
    id: 'process-analytics-platform',
    title: 'Industrial Process Analytics Platform',
    tagline:
      'A polyglot microservices platform that schedules, executes, and monitors real-time analytics across industrial process equipment — now queryable by AI agents in plain language.',
    description:
      'A distributed, polyglot analytics platform built by a larger engineering team, running scheduled and on-demand analytics routines against live industrial process data — coordinating job scheduling, business configuration, and time-series/asset data across a set of Go and Python microservices connected by gRPC. I was part of the team as a backend and DevOps engineer, working on the scheduling and execution engine, the shared service framework routine services build on, the observability and deployment stack, and — most recently — the backend for an AI agent layer that lets engineers ask questions about live plant data in natural language.',
    challenge:
      'Domain teams needed dozens of process-specific analytics routines (things like chemical dosing optimization and separation-process monitoring) running reliably on a schedule across many process units, each with its own dependencies, retry semantics, and execution history — without every new routine or internal tool reinventing scheduling, authentication, deployment, and observability from scratch.',
    solution:
      "Working alongside a larger engineering team on the backend and DevOps side, I contributed to a set of Go services — a scheduler that generates time-windowed execution records and resolves cross-routine dependencies, a configuration service for routine/schedule/template metadata, and a worker pool that dispatches jobs — communicating over gRPC with shared protobuf contracts and NATS JetStream as the messaging backbone, with dead-letter handling for failed executions. Time-series and asset data is served by a Python service backed by PostgreSQL/TimescaleDB continuous aggregates. Every routine service shares a common gRPC framework (auth modes, structured logging, correlation IDs, service registration), so new analytics routines plug straight into scheduling and observability without bespoke setup. I set up the AKS deployment stack via Terraform and Helm, with Linkerd for service-mesh mTLS and Prometheus/Loki/Grafana for metrics, logs, and dashboards. More recently, I built the backend for an MCP (Model Context Protocol) server that exposes the platform's timeseries, asset, and routine-configuration data as tools an AI agent can call — with role-scoped access enforced at the protocol level — behind an orchestrator, an LLM gateway, and a streaming chat interface. I also built the backend for a self-service internal developer portal: a single sign-on gateway sitting in front of every internal tool, with a manifest-driven CI/CD pipeline that generates Kubernetes manifests and registers new tools automatically, so tool owners never write authentication code.",
    outcome:
      'Analytics routines now run on a dependency-aware schedule with full execution history and automatic retry/dead-letter handling instead of ad hoc scripts and manual tracking. New routines and internal tools plug into shared scheduling, auth, logging, and deployment infrastructure instead of rebuilding it each time. Engineers can query live plant data conversationally through the AI agent layer instead of writing ad hoc queries, and every internal tool now sits behind a single company login instead of its own bespoke auth.',
    tags: ['Go', 'Python', 'gRPC', 'Kubernetes', 'Terraform', 'NATS JetStream', 'TimescaleDB', 'LLM Agents (MCP)'],
    year: '2025–Present',
    status: 'live',
    links: {
      caseStudy: true,
    },
  },
  {
    id: 'serverless-data-hub',
    title: 'Serverless Data Hub Platform',
    tagline:
      'A fully serverless AWS data platform for a world-leading airline — 500+ Lambdas and hundreds of distributed Glue jobs processing millions of records a day.',
    description:
      'A fully serverless data platform running entirely on AWS, built by a larger engineering team to ingest, process, and distribute operational data at airline scale. The platform is organized into four layers — ingestion, aggregation, consumption, and distribution — with no servers to provision or manage anywhere in the stack. It runs 500+ Lambda functions and hundreds of AWS Glue jobs doing distributed processing, backed by millions of database transactions and a heavy event-driven message flow through managed Kafka and SQS. I worked on this as a backend and DevOps engineer.',
    challenge:
      'A world-leading airline needed to reliably ingest and process enormous, continuous volumes of operational data every day, then make it available to dozens of downstream consumers in near real time — without owning any servers, and without a single monolithic pipeline becoming the bottleneck or the blast radius for failures.',
    solution:
      'As part of a larger engineering team, I worked on the backend and DevOps side of a platform split into four layers with clear responsibilities. Ingestion Lambdas take data in from source systems and land it on event streams. An aggregation layer of hundreds of AWS Glue jobs runs distributed ETL, joining and reshaping data at scale. A consumption layer exposes that data for querying and analysis through Athena and OpenSearch. A distribution layer of Lambdas pushes processed data back out to downstream consumers on an event-driven basis. MSK (managed Kafka) and SQS tie the layers together asynchronously, so ingestion, processing, and distribution scale and fail independently instead of as one coupled pipeline. RDS holds transactional and reference data alongside the event-driven flow. Python and Node.js are the primary languages across the Lambda and Glue codebase. The entire platform is monitored through CloudWatch alarms and dashboards covering every layer, so failures and slowdowns anywhere in the pipeline surface immediately.',
    outcome:
      'The platform processes millions of records a day at airline-operating scale, entirely on serverless infrastructure — no servers to patch, scale, or keep running. The layered, event-driven design lets ingestion, aggregation, consumption, and distribution scale and evolve independently, with comprehensive CloudWatch monitoring giving full visibility across all 500+ Lambdas and hundreds of Glue jobs in production.',
    tags: ['AWS Lambda', 'AWS Glue', 'MSK (Kafka)', 'SQS', 'RDS', 'Athena', 'OpenSearch', 'Python', 'Node.js'],
    year: '2022–Present',
    status: 'live',
    links: {
      caseStudy: true,
    },
  },
  {
    id: 'internal-developer-portal',
    title: 'Internal Developer Portal',
    tagline:
      'A cloud-native, low-code internal developer platform that lets engineering teams design, deploy, and own their services without wrestling with the underlying infrastructure.',
    description:
      'A self-service internal developer platform (IDP), built by a larger engineering team to sit on top of Kubernetes and give engineering teams a low-code way to design, ship, and operate their own services — a service catalog, environment and release management, and CI/CD, all in one place, instead of every team hand-rolling its own path to production. I was part of the team, focused on backend and DevOps implementation.',
    challenge:
      'As the number of teams and microservices grew, every team was solving the same problems from scratch — provisioning environments, wiring up CI/CD, tracking who owned what, and rolling back a bad release under pressure — with no shared view of the architecture. Teams needed a self-service way to ship and operate their services without waiting on a central platform team for every environment or pipeline change, and without losing governance over what was running where.',
    solution:
      'As part of a larger engineering team, I worked on the backend and DevOps side of a platform centered on a service catalog that tracks every microservice, its owning team, and its dependencies, backed by a blueprint-style visualization of the overall architecture so teams and architects can see how services connect at a glance. Environment and cluster dashboards give visibility across multiple Kubernetes clusters and clouds, while a release management module handles scheduling, keeps full release history, and supports fast rollback when something goes wrong. CI/CD and GitOps-based deployment are built in rather than bolted on, and a low-code layer of composable building blocks lets teams assemble their own deployment and environment workflows without writing infrastructure code by hand. Git-backed version control keeps source of truth portable, avoiding platform lock-in.',
    outcome:
      'Teams can onboard a new service and get it through environments to production without opening a ticket with a central platform team, while ownership, dependencies, and release history stay visible across the whole organization. Rollbacks that used to be a scramble became a routine, low-risk action, and infrastructure complexity is abstracted behind low-code workflows so teams spend their time on their own service logic instead of platform plumbing.',
    tags: ['Kubernetes', 'Multi-cloud', 'CI/CD', 'GitOps', 'Low-Code', 'Microservices', 'Developer Experience'],
    year: '2021–Present',
    status: 'live',
    links: {
      caseStudy: true,
    },
  },
  {
    id: 'gitops-cicd-pipeline',
    title: 'GitOps CI/CD Pipeline for Kubernetes',
    tagline:
      'A fully automated, end-to-end GitOps pipeline that takes a microservices platform from commit to running on Kubernetes — with testing, security, and quality gates built into every step.',
    description:
      'An end-to-end, fully automated GitOps pipeline for deploying a microservices platform to Kubernetes, built solely by me on Azure DevOps Pipelines for CI and Argo CD for CD. The pipeline itself was the point: every commit runs through a full set of testing, security, and code-quality guardrails before anything ever reaches a cluster.',
    challenge:
      'The team needed a repeatable, hands-off way to get microservices from a commit to running safely on Kubernetes, without deployments depending on someone manually running kubectl or a one-off script. Automating deployment alone wasn’t enough — the pipeline itself needed to be the guardrail, catching bad code, vulnerable dependencies, and misconfigured manifests before they ever reached a cluster.',
    solution:
      'I designed and built this pipeline independently, end to end. Every commit triggers an Azure DevOps pipeline that runs unit tests, static code analysis with code-quality gates, dependency/software-composition-analysis scanning, container image vulnerability scanning, and secrets scanning — a failure at any of these stages blocks the pipeline before an image is even built. Once those guardrails pass, the pipeline builds and tags the container image, pushes it to the registry, and bumps the corresponding Helm chart/manifest version in a separate GitOps config repository — the pipeline never touches the cluster directly. Argo CD watches that config repository and continuously reconciles the cluster to match it, with auto-sync and self-healing so any manual drift on the cluster gets corrected back to the declared state automatically. Environment promotion (dev → staging → production) flows through the same Git-based process, with a manual approval gate in front of production syncs, and rolling back a bad release is just a Git revert away since Argo CD redeploys whatever the repository says. Pipeline and sync-health status are wired into notifications so failures are visible the moment they happen.',
    outcome:
      'Every microservice ships through the same fully automated path — no direct kubectl access, no manual deployment steps, and no way to skip the pipeline’s own guardrails. Bad code, vulnerable dependencies, and vulnerable images get caught before they reach a cluster, the cluster stays continuously reconciled to Git instead of silently drifting, and rolling back a bad release is as simple as reverting a commit.',
    tags: ['Azure DevOps', 'ArgoCD', 'GitOps', 'Kubernetes', 'AKS', 'CI/CD', 'DevSecOps'],
    year: '2023',
    status: 'live',
    links: {
      caseStudy: true,
    },
  },
  {
    id: 'azure-landing-zone-security',
    title: 'Azure Cloud Security Hardening',
    tagline:
      'End-to-end security hardening of an Azure environment — management group hierarchy, policy-driven guardrails, and least-privilege RBAC built to Azure Landing Zone architecture.',
    description:
      'A ground-up security and governance hardening of an Azure cloud environment, designed and implemented solely by me following Azure Landing Zone architecture — covering management group structure, policy-driven guardrails, and RBAC across every subscription.',
    challenge:
      'The Azure environment had grown without a consistent governance structure — subscriptions, access, and policy were handled ad hoc, with no enforced hierarchy, no consistent guardrails across subscriptions, and no clear least-privilege access model. It needed a security and governance foundation that could scale as more subscriptions and teams were added, instead of every new subscription reinventing its own access and compliance rules.',
    solution:
      'I designed and implemented this independently, following Azure Landing Zone architecture. I built a management group hierarchy mirroring the organization (platform, landing zones, sandbox, decommissioned) so every subscription inherits policy and access controls from its position in the hierarchy instead of being configured individually. I authored and assigned Azure Policy definitions and initiatives at each management group level — enforcing guardrails such as mandatory resource tagging, region restrictions, encryption requirements, and denying public network exposure by default — with policy inherited downward and overridden only where a workload had a documented exception. I designed a least-privilege RBAC model built on custom role definitions scoped to management groups and subscriptions rather than broad built-in roles, and moved privileged access behind time-bound, approval-based elevation instead of standing admin rights. I also enabled centralized security posture monitoring (Microsoft Defender for Cloud) and centralized logging across the hierarchy, so compliance drift and security findings surface in one place instead of per subscription.',
    outcome:
      'Every subscription now inherits the same policy and access guardrails by default instead of needing individual configuration. Security and compliance posture is visible centrally instead of per subscription, and privileged access is time-bound and audited instead of standing. New subscriptions onboard into the governance model automatically, simply by virtue of where they land in the management group hierarchy.',
    tags: ['Azure', 'Azure Policy', 'RBAC', 'Landing Zone', 'Management Groups', 'Cloud Security'],
    year: '2023',
    status: 'live',
    links: {
      caseStudy: true,
    },
  },
  {
    id: 'kubernetes-security-hardening',
    title: 'Kubernetes Security Hardening',
    tagline:
      'Took an AKS platform with effectively zero security controls and hardened it end to end — cluster, network, service mesh, workload, and observability layers included.',
    description:
      'A full security hardening of an existing AKS platform, carried out solely by me. The platform had been deployed to get something running, with no meaningful security posture in place — I hardened it across every layer of the stack without disrupting the workloads already running on it.',
    challenge:
      'The platform had essentially zero security controls: no network segmentation between services, no pod-level restrictions, workloads running as root with full Linux capabilities, no admission controls, no encryption of traffic between services, and no audit visibility into what was happening on the cluster. It needed to be hardened across every layer without breaking anything already running on it.',
    solution:
      'I hardened this independently, layer by layer. At the cluster/infrastructure level, I restricted API server access, tightened Azure AD-integrated cluster authentication, and locked down node-level configuration. At the network level, I introduced Kubernetes NetworkPolicies to enforce default-deny pod-to-pod traffic, explicitly allowing only the connections each service actually needs. At the service-mesh level, I rolled out Linkerd to give every service a cryptographically verified identity and mTLS-encrypted traffic by default, so pod-to-pod communication is authenticated and encrypted instead of relying on network trust alone. At the workload level, I enforced Pod Security Standards (restricted profile) and hardened securityContexts — non-root users, read-only root filesystems, dropped Linux capabilities, no privilege escalation — along with CPU/memory limits so no single workload could exhaust node resources. At the RBAC level, I replaced broad default service-account permissions with least-privilege, per-workload service accounts and disabled automatic service-account token mounting where it wasn’t needed. At the secrets layer, I moved secrets out of plain Kubernetes Secret objects and into a proper secrets store (Azure Key Vault, mounted via the CSI driver) instead of leaving credentials sitting in etcd unencrypted. At the admission-control layer, I introduced policy-as-code guardrails to block privileged containers, unpinned image tags, and other risky configurations before they could be deployed at all. At the image layer, I added vulnerability scanning and restricted deployments to trusted, scanned images from a private registry. At the observability layer, I enabled Kubernetes audit logging and wired it into centralized monitoring so cluster activity became visible and alertable instead of a black box.',
    outcome:
      'The platform went from effectively no security controls to defense-in-depth across the cluster, network, service-mesh, workload, RBAC, secrets, admission-control, and observability layers — with mTLS covering all service-to-service traffic and policy-as-code guardrails preventing insecure configurations from being deployed in the first place, all without disrupting the workloads already running on the cluster.',
    tags: ['Kubernetes', 'AKS', 'Linkerd', 'mTLS', 'Network Policies', 'Pod Security', 'RBAC'],
    year: '2024',
    status: 'live',
    links: {
      caseStudy: true,
    },
  },
];
