'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Tech = {
  name: string;
  years: string;
  note: string;
  related: string[];
};

const STACK: Record<string, Tech[]> = {
  BACKEND: [
    { name: 'Go', years: '4y', note: 'Primary language for services and CLIs', related: ['gRPC', 'Kubernetes', 'Redis'] },
    { name: 'Python', years: '6y', note: 'ML pipelines, scripts, rapid prototyping', related: ['PyTorch', 'FastAPI', 'Airflow'] },
    { name: 'Node.js', years: '5y', note: 'APIs, real-time services, tooling', related: ['TypeScript', 'Next.js'] },
    { name: 'Rust', years: '1y', note: 'Performance-critical parsers and tools', related: ['Go'] },
    { name: 'gRPC', years: '3y', note: 'Service-to-service communication', related: ['Go', 'Kubernetes'] },
  ],
  DEVOPS: [
    { name: 'Kubernetes', years: '4y', note: 'Production orchestration, wrote 2 operators', related: ['Go', 'Docker', 'Terraform'] },
    { name: 'Docker', years: '5y', note: 'Containerization, multi-stage builds', related: ['Kubernetes'] },
    { name: 'Terraform', years: '3y', note: 'Infrastructure as code across AWS and GCP', related: ['AWS', 'GCP'] },
    { name: 'AWS', years: '4y', note: 'EKS, RDS, SQS, Lambda, CloudFront', related: ['Terraform', 'Kubernetes'] },
    { name: 'GCP', years: '2y', note: 'GKE, BigQuery, Cloud Run', related: ['Terraform'] },
  ],
  DATABASES: [
    { name: 'PostgreSQL', years: '6y', note: 'Primary RDBMS — complex queries, partitioning', related: ['Go', 'Python'] },
    { name: 'Redis', years: '5y', note: 'Caching, pub/sub, task queues', related: ['Go', 'Kubernetes'] },
    { name: 'ClickHouse', years: '2y', note: 'Analytics at scale, 50K events/sec', related: ['Kafka', 'Python'] },
    { name: 'MongoDB', years: '3y', note: 'Document storage for flexible schemas', related: ['Node.js'] },
    { name: 'Kafka', years: '3y', note: 'Streaming pipelines, event sourcing', related: ['ClickHouse', 'Flink'] },
  ],
  'ML / AI': [
    { name: 'PyTorch', years: '3y', note: 'Model training, fine-tuning, research', related: ['Python', 'CUDA'] },
    { name: 'HuggingFace', years: '2y', note: 'Transformers, tokenizers, inference', related: ['PyTorch'] },
    { name: 'LangChain', years: '1y', note: 'LLM orchestration, RAG pipelines', related: ['Python', 'HuggingFace'] },
    { name: 'MLflow', years: '2y', note: 'Experiment tracking and model registry', related: ['Python', 'Kubernetes'] },
  ],
  FRONTEND: [
    { name: 'Next.js', years: '3y', note: 'Full-stack React apps, App Router', related: ['React', 'TypeScript'] },
    { name: 'React', years: '4y', note: 'Component architecture, custom hooks', related: ['Next.js', 'TypeScript'] },
    { name: 'TypeScript', years: '4y', note: 'Strict mode, advanced types, generics', related: ['React', 'Node.js'] },
    { name: 'Tailwind', years: '3y', note: 'Utility-first CSS, design systems', related: ['React'] },
  ],
};

export function TechConstellation() {
  const [hovered, setHovered] = useState<Tech | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const isRelated = (name: string) =>
    hovered?.related.includes(name) || hovered?.name === name;

  return (
    <section className="section-pad border-t border-site-border">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="label text-accent mb-3">tech stack</p>
          <h2 className="font-sans text-4xl md:text-5xl font-black tracking-tighter">
            What I build with.
          </h2>
          <p className="font-mono text-sm text-text-secondary mt-4 max-w-md">
            Hover a technology to see related tools. Everything here has been in production.
          </p>
        </motion.div>

        {/* Tooltip */}
        <div className="h-12 mb-8">
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4"
            >
              <div className="accent-line" />
              <p className="font-mono text-sm text-text-secondary">
                <span className="text-accent font-medium">{hovered.name}</span>
                {' '}·{' '}
                {hovered.years} ·{' '}
                {hovered.note}
              </p>
            </motion.div>
          )}
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {Object.entries(STACK).map(([category, techs], catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: catIdx * 0.08 }}
              className="grid grid-cols-[80px_1fr] md:grid-cols-[110px_1fr] items-start gap-4"
            >
              <span
                className={`label pt-1.5 transition-colors ${
                  activeCategory === category ? 'text-accent' : 'text-text-muted'
                }`}
              >
                {category}
              </span>

              <div className="flex flex-wrap gap-2">
                {techs.map((tech) => {
                  const related = isRelated(tech.name);
                  const dimmed = hovered && !related;

                  return (
                    <motion.button
                      key={tech.name}
                      onMouseEnter={() => {
                        setHovered(tech);
                        setActiveCategory(category);
                      }}
                      onMouseLeave={() => {
                        setHovered(null);
                        setActiveCategory(null);
                      }}
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.15 }}
                      className={`font-mono text-sm px-3 py-1.5 rounded border transition-all duration-200 ${
                        related
                          ? 'border-accent/60 text-accent bg-accent/10'
                          : dimmed
                          ? 'border-site-border/30 text-text-muted opacity-40'
                          : 'border-site-border text-text-secondary hover:border-text-muted hover:text-text-primary'
                      }`}
                    >
                      {tech.name}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
