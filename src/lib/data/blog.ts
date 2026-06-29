export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readingTime: number;
  tags: string[];
  featured: boolean;
};

export const posts: Post[] = [
  {
    slug: 'why-i-stopped-using-orms',
    title: "Why I Stopped Using ORMs in Production",
    excerpt:
      "After three years of fighting N+1 queries, opaque migration failures, and ORM-specific gotchas, I went back to raw SQL. Here's what changed — and what I learned about the abstraction trap.",
    date: "2024-11-18",
    readingTime: 9,
    tags: ["backend", "postgresql", "go", "performance"],
    featured: true,
    content: `
# Why I Stopped Using ORMs in Production

This is a placeholder. Replace with your actual content.

## The Problem

ORMs promise to abstract away database complexity. In practice, they add a new layer of complexity on top of an already-complex system.

## What I Found

After profiling a Go service that was inexplicably slow, I found the ORM was generating 47 queries for a request that needed 2.

## The Solution

Raw SQL with sqlx. It's more verbose but the queries are yours — you understand them, you can optimize them, and they don't surprise you at 3am.

## When ORMs Make Sense

For rapid prototyping, Django-style admin panels, and simple CRUD apps, ORMs are fine. Production systems with complex queries? Think twice.
    `.trim(),
  },
  {
    slug: 'kubernetes-at-3am-postmortem',
    title: "Kubernetes at 3am: A Post-Mortem",
    excerpt:
      "A single ConfigMap change cascaded into 6 hours of incident response, two rollbacks, and one very long retrospective. Here's the full story — including what we changed so it can't happen again.",
    date: "2024-10-08",
    readingTime: 14,
    tags: ["devops", "kubernetes", "incident-response", "reliability"],
    featured: false,
    content: `
# Kubernetes at 3am: A Post-Mortem

This is a placeholder. Replace with your actual content.

## Timeline

- 02:47 — PagerDuty fires. Latency P99 spikes to 45 seconds.
- 03:01 — First engineer online. Pods look healthy. Confusion sets in.
- 03:24 — ConfigMap change identified as root cause.
- 05:12 — Full rollback complete. Service stable.
- 08:30 — Retrospective begins.

## Root Cause

A ConfigMap update changed a connection pool size from 50 to 5. The change looked innocuous in review. Under load, the reduced pool caused a cascade of timeouts.

## What We Changed

1. ConfigMap changes now require a load test in staging
2. Connection pool size is now an alarm threshold in Grafana
3. Rollback runbooks are now part of every deploy
    `.trim(),
  },
  {
    slug: 'building-redis-clone-in-go-part-1',
    title: "Building a Redis Clone in Go: Part 1",
    excerpt:
      "The best way to understand a system is to build it yourself. In this series, we implement a Redis-compatible server from scratch — starting with the RESP protocol and in-memory data structures.",
    date: "2024-09-15",
    readingTime: 18,
    tags: ["go", "redis", "systems", "databases"],
    featured: false,
    content: `
# Building a Redis Clone in Go: Part 1

This is a placeholder. Replace with your actual content.

## What We're Building

A Redis-compatible server in Go. By the end of this series, it'll handle GET, SET, EXPIRE, LPUSH, and LPOP with full RESP protocol compliance.

## The RESP Protocol

Redis Serialization Protocol (RESP) is surprisingly simple. Commands arrive as arrays of bulk strings. Responses are one of: simple strings, errors, integers, bulk strings, or arrays.

## Part 1: Parsing RESP

We'll build a RESP parser that can decode incoming commands and encode responses. This is the foundation everything else sits on.
    `.trim(),
  },
  {
    slug: 'hidden-costs-of-microservices',
    title: "The Hidden Costs of Microservices",
    excerpt:
      "Microservices solve distribution problems you might not have yet, while introducing operational complexity you definitely weren't ready for. A pragmatic look at when to split and when to stay monolithic.",
    date: "2024-08-22",
    readingTime: 11,
    tags: ["architecture", "backend", "distributed-systems"],
    featured: false,
    content: `
# The Hidden Costs of Microservices

This is a placeholder. Replace with your actual content.

## The Promise

Independent deployability, technology diversity, fault isolation, and team autonomy. These are real benefits — for the right scale and team.

## The Reality

Distributed transactions, network latency, service discovery, observability sprawl, and the dreaded "which service owns this?" question.

## My Rule of Thumb

Start with a well-structured monolith. Extract services when you have real evidence that a boundary needs to be independent — not when you think it might someday.
    `.trim(),
  },
  {
    slug: 'go-vs-python-for-backend-services',
    title: "Go vs Python for Backend Services: A Pragmatist's View",
    excerpt:
      "I've run both in production at scale. The answer isn't one-size-fits-all, but after writing hundreds of thousands of lines in each, I have opinions. Strong ones.",
    date: "2024-07-30",
    readingTime: 10,
    tags: ["go", "python", "backend", "engineering"],
    featured: false,
    content: `
# Go vs Python for Backend Services

This is a placeholder. Replace with your actual content.

## Where Go Wins

- Latency-sensitive services
- High-concurrency workloads
- Services that need a small binary/container
- Teams that want to avoid runtime surprises

## Where Python Wins

- ML/data processing pipelines
- Rapid prototyping
- Teams with strong Python expertise
- Scripts, CLI tools, one-offs

## My Default

Go for new services. Python when the ecosystem matters (ML especially). Never rewrite for ideology alone.
    `.trim(),
  },
  {
    slug: 'understanding-kubernetes-scheduling',
    title: "Understanding Kubernetes Scheduling",
    excerpt:
      "Your pods don't just appear on nodes by magic. The Kubernetes scheduler runs a complex scoring algorithm on every pending pod. Understanding it helps you avoid surprising node pressure and mysterious OOMKills.",
    date: "2024-07-01",
    readingTime: 13,
    tags: ["kubernetes", "devops", "infrastructure"],
    featured: false,
    content: `
# Understanding Kubernetes Scheduling

This is a placeholder. Replace with your actual content.

## How the Scheduler Works

The Kubernetes scheduler uses a two-phase approach: filtering (which nodes can run this pod?) and scoring (which node is the best fit?).

## Filtering

Node must: have enough CPU/memory, satisfy node selectors, satisfy affinity rules, have required taints tolerated.

## Scoring

Nodes are ranked by: resource availability, pod spread, image locality, and custom plugin scores.

## Practical Implications

Understanding scoring helps you use PodDisruptionBudgets, pod topology spread, and resource requests/limits effectively.
    `.trim(),
  },
];
