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
    id: 'hyperqueue',
    title: 'HyperQueue',
    tagline: 'Distributed task queue that handles 1M+ jobs/day without breaking a sweat.',
    description:
      'A horizontally-scalable distributed task queue built in Go, designed to replace a brittle Celery setup that was causing frequent outages. Features priority queues, dead-letter handling, observability, and zero-downtime deployments.',
    challenge:
      'The existing Celery-based queue was losing ~0.3% of jobs under peak load, had no visibility into in-flight tasks, and required 20-minute restarts to deploy. At scale, 0.3% became thousands of lost jobs per day.',
    solution:
      'Re-architected around a Redis Streams backbone with a custom Go worker pool. Built a lightweight control plane for job scheduling, implemented at-least-once delivery with idempotency keys, and added Prometheus metrics + Grafana dashboards for full visibility.',
    outcome:
      'Zero job loss since deployment. Deploy time went from 20 minutes to 30 seconds. P99 job processing latency dropped from 4.2s to 380ms. Now handling 1.2M jobs/day across 3 regions.',
    tags: ['Go', 'Redis', 'Kubernetes', 'Prometheus', 'gRPC'],
    year: '2024',
    status: 'live',
    links: {
      github: 'https://github.com/kanishka',
      caseStudy: true,
    },
  },
  {
    id: 'mlops-pipeline',
    title: 'MLOps Pipeline Orchestrator',
    tagline: 'Kubernetes-native ML training orchestration with auto-scaling GPU clusters.',
    description:
      'An internal platform for managing ML experiment runs, model training jobs, and deployment pipelines. Built to replace a collection of Bash scripts and Google Sheets that the ML team was using to track experiments.',
    challenge:
      'The ML team was spending 40% of their time on infrastructure — spinning up GPU instances manually, tracking experiments in spreadsheets, and manually promoting models to production. Reproducibility was near-zero.',
    solution:
      'Built a Kubernetes operator in Go that manages the full ML lifecycle. Integrates with MLflow for experiment tracking, Argo Workflows for DAG-based pipelines, and a custom model registry with automatic A/B traffic splitting.',
    outcome:
      'Infrastructure overhead cut from 40% to under 5% of ML engineer time. Training job launch time dropped from 45 minutes to 3 minutes. Full experiment reproducibility via Git SHA pinning. 12 models now in production.',
    tags: ['Go', 'Kubernetes', 'Python', 'MLflow', 'Argo'],
    year: '2024',
    status: 'live',
    links: {
      caseStudy: true,
    },
  },
  {
    id: 'realtime-analytics',
    title: 'StreamLens',
    tagline: 'Real-time analytics dashboard processing 50K events/second with sub-second latency.',
    description:
      'A full-stack analytics platform for monitoring user behavior and business KPIs in real-time. The backend processes a high-velocity event stream; the frontend gives product teams live visibility without requiring a data engineering degree.',
    challenge:
      'The product team was running analytics queries on a PostgreSQL replica that was 4+ hours behind. By the time they saw a metric spike, the damage was done. They needed data in seconds, not hours.',
    solution:
      'Designed a streaming pipeline: Kafka for ingestion → Flink for transformation → ClickHouse for storage. Built a Next.js frontend with Server-Sent Events for live updates, and a query builder UI so non-technical users can explore data without SQL.',
    outcome:
      'Data latency reduced from 4 hours to under 3 seconds. ClickHouse handles 50K events/second with P99 query times under 200ms. Product team now self-sufficient on data exploration — zero engineering requests for standard reports.',
    tags: ['Next.js', 'ClickHouse', 'Kafka', 'Flink', 'TypeScript'],
    year: '2023',
    status: 'live',
    links: {
      github: 'https://github.com/kanishka',
      live: 'https://streamlens.dev',
      caseStudy: true,
    },
  },
];
