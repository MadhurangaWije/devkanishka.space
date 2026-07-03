import fs from 'fs';
import path from 'path';
import type { LessonMeta, PhaseMeta } from '@/lib/backend-course';
import { extractHeadingsAndInjectIds, type LessonHeading } from '@/lib/lesson-toc';

export type { LessonMeta as SDLessonMeta, PhaseMeta as SDPhaseMeta };

export type SDLessonData = LessonMeta & {
  phaseNumber: number;
  phaseName: string;
  lessonCss: string;
  bodyHtml: string;
  script: string;
  headings: LessonHeading[];
  prev: { slug: string; title: string; urlSegment: string } | null;
  next: { slug: string; title: string; urlSegment: string } | null;
};

// ── Phase definitions ──────────────────────────────────────────────────────
// 15 chapters, each ending with a scored quiz and an interview-question set
// pulled straight from the source material. The final chapter also carries
// the course glossary as a bonus reference "lesson".

export const SD_PHASES: PhaseMeta[] = [
  {
    number: 1,
    name: 'Phase 1 — Thinking in Systems',
    urlSegment: 'phase-1',
    contentDir: 'system-design-core',
    lessons: [
      { slug: 'what-is-system-design', title: 'What Is System Design? (The Big Picture)', subtitle: 'Where system design starts — the shift from writing correct code to reasoning about how a whole system behaves under real-world pressure.', number: 1, file: '0001-what-is-system-design.html' },
      { slug: 'functional-vs-non-functional-requirements', title: 'Functional vs Non-Functional Requirements', subtitle: 'Every system has two kinds of requirements — what it must do, and how well it must do it. Confusing the two is where bad designs begin.', number: 2, file: '0002-functional-vs-non-functional-requirements.html' },
      { slug: 'back-of-envelope-estimation', title: 'Back-of-Envelope Estimation', subtitle: 'Rough math you can do on a whiteboard — estimating scale, storage, and traffic well enough to make real architectural decisions.', number: 3, file: '0003-back-of-envelope-estimation.html' },
      { slug: 'tradeoffs', title: "Trade-offs: The Architect's Core Skill", subtitle: "There is no perfect design, only the right trade-off for your constraints. The architect's core skill is naming that trade-off explicitly.", number: 4, file: '0004-tradeoffs.html' },
      { slug: 'chapter-1-quiz', title: 'Chapter 1 Quiz: Thinking in Systems', subtitle: 'An 8-question scored quiz covering requirements, estimation, and trade-offs — with a full explanation on every answer.', number: 5, file: 'ch01-quiz.html' },
      { slug: 'chapter-1-interview', title: 'Chapter 1 Interview Questions: Thinking in Systems', subtitle: "Five real interview questions on approaching a design from scratch, with model answers and what interviewers actually listen for.", number: 6, file: 'ch01-interview.html' },
    ],
  },
  {
    number: 2,
    name: 'Phase 2 — How the Internet Works',
    urlSegment: 'phase-2',
    contentDir: 'system-design-core',
    lessons: [
      { slug: 'dns-the-internets-phone-book', title: "DNS: The Internet's Phone Book", subtitle: "How a name like example.com becomes an IP address — the lookup chain every request makes before it goes anywhere.", number: 7, file: '0005-dns-the-internets-phone-book.html' },
      { slug: 'http-https-the-language-of-the-web', title: 'HTTP/HTTPS: The Language of the Web', subtitle: 'The request/response protocol underneath every API call and page load — methods, status codes, headers, and what TLS actually adds.', number: 8, file: '0006-http-https-the-language-of-the-web.html' },
      { slug: 'tcp-vs-udp-choosing-your-transport', title: 'TCP vs UDP: Choosing Your Transport', subtitle: 'Reliable and ordered, or fast and lossy — the transport-layer choice that shapes everything built on top of it.', number: 9, file: '0007-tcp-vs-udp-choosing-your-transport.html' },
      { slug: 'how-a-web-request-travels', title: 'How a Web Request Travels (End-to-End)', subtitle: 'Following a single request from DNS lookup to TCP handshake to the response landing back in the browser.', number: 10, file: '0008-how-a-web-request-travels.html' },
      { slug: 'chapter-2-quiz', title: 'Chapter 2 Quiz: How the Internet Works', subtitle: 'A scored quiz on DNS, HTTP/HTTPS, and transport protocols — with explanations for every question.', number: 11, file: 'ch02-quiz.html' },
      { slug: 'chapter-2-interview', title: 'Chapter 2 Interview Questions: How the Internet Works', subtitle: 'Practice explaining what happens under the hood of a web request — the questions that test whether you actually understand the stack.', number: 12, file: 'ch02-interview.html' },
    ],
  },
  {
    number: 3,
    name: 'Phase 3 — Web Architecture Patterns',
    urlSegment: 'phase-3',
    contentDir: 'system-design-core',
    lessons: [
      { slug: 'single-server-architecture', title: 'Single Server Architecture', subtitle: 'Where every system starts — one machine running everything. Understand it fully before you reach for anything more complex.', number: 13, file: '0009-single-server-architecture.html' },
      { slug: 'separating-app-and-database', title: 'Separating Application & Database Tiers', subtitle: 'The first real architectural decision — splitting the application tier from the data tier, and why it matters sooner than you\'d think.', number: 14, file: '0010-separating-app-and-database.html' },
      { slug: 'stateless-vs-stateful', title: 'Stateless vs Stateful Architecture', subtitle: 'Whether a server remembers anything about the client between requests — and why statelessness is what makes horizontal scaling possible.', number: 15, file: '0011-stateless-vs-stateful.html' },
      { slug: 'horizontal-vs-vertical-scaling', title: 'Horizontal vs Vertical Scaling', subtitle: 'Bigger machines versus more machines — the two levers for handling growth, and why one runs out of headroom much faster than the other.', number: 16, file: '0012-horizontal-vs-vertical-scaling.html' },
      { slug: 'chapter-3-quiz', title: 'Chapter 3 Quiz: Web Architecture Patterns', subtitle: 'A scored quiz on tiers, state, and scaling direction — with explanations for every question.', number: 17, file: 'ch03-quiz.html' },
      { slug: 'chapter-3-interview', title: 'Chapter 3 Interview Questions: Web Architecture Patterns', subtitle: 'Practice questions on evolving an architecture as load grows, with model answers and interviewer expectations.', number: 18, file: 'ch03-interview.html' },
    ],
  },
  {
    number: 4,
    name: 'Phase 4 — Databases & Storage',
    urlSegment: 'phase-4',
    contentDir: 'system-design-core',
    lessons: [
      { slug: 'sql-databases', title: 'SQL Databases: When Structure Matters', subtitle: 'Relational databases, ACID guarantees, and schemas — the right tool when structure and consistency matter more than flexibility.', number: 19, file: '0013-sql-databases.html' },
      { slug: 'nosql-databases', title: 'NoSQL Databases: Flexibility at Scale', subtitle: 'Document, key-value, wide-column, and graph stores — trading rigid schemas for flexibility and horizontal scale.', number: 20, file: '0014-nosql-databases.html' },
      { slug: 'database-indexing', title: 'Database Indexing: Making Queries Fast', subtitle: 'Why some queries are instant and others crawl — how indexes turn a full table scan into a direct lookup.', number: 21, file: '0015-database-indexing.html' },
      { slug: 'replication', title: 'Replication: Keeping Data Safe', subtitle: 'Copying data across machines for durability and read scale — and the consistency questions that come with it.', number: 22, file: '0016-replication.html' },
      { slug: 'sharding', title: 'Sharding: Splitting Data Across Machines', subtitle: 'Splitting a dataset across machines when a single database can no longer hold it all — and the coordination problems that creates.', number: 23, file: '0017-sharding.html' },
      { slug: 'choosing-the-right-database', title: 'Choosing the Right Database', subtitle: "There's no universally \"best\" database — only the one that fits your access patterns, consistency needs, and scale.", number: 24, file: '0018-choosing-the-right-database.html' },
      { slug: 'chapter-4-quiz', title: 'Chapter 4 Quiz: Databases & Storage', subtitle: 'A scored quiz on SQL vs NoSQL, indexing, replication, and sharding — with explanations for every question.', number: 25, file: 'ch04-quiz.html' },
      { slug: 'chapter-4-interview', title: 'Chapter 4 Interview Questions: Databases & Storage', subtitle: 'Practice questions on choosing and scaling a data layer, with model answers and interviewer expectations.', number: 26, file: 'ch04-interview.html' },
    ],
  },
  {
    number: 5,
    name: 'Phase 5 — Caching',
    urlSegment: 'phase-5',
    contentDir: 'system-design-core',
    lessons: [
      { slug: 'why-cache-the-memory-hierarchy', title: 'Why Cache? The Memory Hierarchy', subtitle: 'From CPU registers to disk, every layer of computing trades speed for capacity — caching is applying that hierarchy to your own system.', number: 27, file: '0019-why-cache-the-memory-hierarchy.html' },
      { slug: 'caching-strategies', title: 'Caching Strategies (Write-Through, Write-Behind, Cache-Aside)', subtitle: 'Write-through, write-behind, and cache-aside — the different contracts between your cache and your source of truth.', number: 28, file: '0020-caching-strategies.html' },
      { slug: 'cache-invalidation', title: 'Cache Invalidation: The Hard Problem', subtitle: 'Famously one of the two hard problems in computer science — knowing when cached data is no longer true.', number: 29, file: '0021-cache-invalidation.html' },
      { slug: 'cdns-caching-at-the-edge', title: 'CDNs: Caching at the Edge', subtitle: 'Pushing static content physically closer to users — how a CDN turns a 200ms round trip into 20ms.', number: 30, file: '0022-cdns-caching-at-the-edge.html' },
      { slug: 'chapter-5-quiz', title: 'Chapter 5 Quiz: Caching', subtitle: 'A scored quiz on caching strategies, invalidation, and CDNs — with explanations for every question.', number: 31, file: 'ch05-quiz.html' },
      { slug: 'chapter-5-interview', title: 'Chapter 5 Interview Questions: Caching', subtitle: 'Practice questions on designing a caching layer, with model answers and interviewer expectations.', number: 32, file: 'ch05-interview.html' },
    ],
  },
  {
    number: 6,
    name: 'Phase 6 — Load Balancing & Reverse Proxies',
    urlSegment: 'phase-6',
    contentDir: 'system-design-core',
    lessons: [
      { slug: 'what-is-a-load-balancer', title: 'What Is a Load Balancer? (Layer 4 vs Layer 7)', subtitle: 'Distributing traffic across servers so no single machine gets overwhelmed — and the Layer 4 vs Layer 7 distinction that shapes how it\'s done.', number: 33, file: '0023-what-is-a-load-balancer.html' },
      { slug: 'load-balancing-algorithms', title: 'Load Balancing Algorithms', subtitle: 'Round robin, least connections, weighted, and consistent hashing — how a load balancer actually decides where each request goes.', number: 34, file: '0024-load-balancing-algorithms.html' },
      { slug: 'reverse-proxies', title: 'Reverse Proxies: The Gatekeeper', subtitle: 'The gatekeeper in front of your services — handling TLS termination, routing, and shielding your backend from direct exposure.', number: 35, file: '0025-reverse-proxies.html' },
      { slug: 'health-checks-and-failover', title: 'Health Checks & Failover', subtitle: 'How a system detects a dying server and reroutes around it before users ever notice.', number: 36, file: '0026-health-checks-and-failover.html' },
      { slug: 'chapter-6-quiz', title: 'Chapter 6 Quiz: Load Balancing & Reverse Proxies', subtitle: 'A scored quiz on load balancing algorithms, proxies, and failover — with explanations for every question.', number: 37, file: 'ch06-quiz.html' },
      { slug: 'chapter-6-interview', title: 'Chapter 6 Interview Questions: Load Balancing & Reverse Proxies', subtitle: 'Practice questions on distributing traffic and handling failure, with model answers and interviewer expectations.', number: 38, file: 'ch06-interview.html' },
    ],
  },
  {
    number: 7,
    name: 'Phase 7 — Scalability Patterns',
    urlSegment: 'phase-7',
    contentDir: 'system-design-core',
    lessons: [
      { slug: 'the-scalability-cube', title: 'The Scalability Cube (X, Y, Z Axis Scaling)', subtitle: "Scaling isn't one-dimensional — the X, Y, and Z axes of the scale cube describe three fundamentally different ways to grow a system.", number: 39, file: '0027-the-scalability-cube.html' },
      { slug: 'database-scaling-patterns', title: 'Database Scaling Patterns in Practice', subtitle: 'Read replicas, connection pooling, and partitioning in practice — applying the scaling toolbox specifically to your data layer.', number: 40, file: '0028-database-scaling-patterns.html' },
      { slug: 'stateless-services-and-session-management', title: 'Stateless Services & Session Management', subtitle: 'Keeping services stateless while still tracking logged-in users — sticky sessions, shared session stores, and tokens.', number: 41, file: '0029-stateless-services-and-session-management.html' },
      { slug: 'rate-limiting-and-throttling', title: 'Rate Limiting & Throttling', subtitle: 'Protecting a system from being overwhelmed — by its users, its clients, or itself — with limits enforced at the edge.', number: 42, file: '0030-rate-limiting-and-throttling.html' },
      { slug: 'chapter-7-quiz', title: 'Chapter 7 Quiz: Scalability Patterns', subtitle: 'A scored quiz on the scale cube, database scaling, and rate limiting — with explanations for every question.', number: 43, file: 'ch07-quiz.html' },
      { slug: 'chapter-7-interview', title: 'Chapter 7 Interview Questions: Scalability Patterns', subtitle: 'Practice questions on scaling a system 10x or 100x, with model answers and interviewer expectations.', number: 44, file: 'ch07-interview.html' },
    ],
  },
  {
    number: 8,
    name: 'Phase 8 — Asynchronous Processing',
    urlSegment: 'phase-8',
    contentDir: 'system-design-core',
    lessons: [
      { slug: 'synchronous-vs-asynchronous', title: 'Synchronous vs Asynchronous: When to Decouple', subtitle: 'When a caller should wait for a response, and when decoupling the request from the work is the better design.', number: 45, file: '0031-synchronous-vs-asynchronous.html' },
      { slug: 'message-queues', title: 'Message Queues: The Post Office Pattern', subtitle: 'The post-office pattern — producers drop messages off, consumers pick them up whenever they\'re ready, and traffic spikes get absorbed in between.', number: 46, file: '0032-message-queues.html' },
      { slug: 'event-driven-architecture', title: 'Event-Driven Architecture', subtitle: 'Designing systems around things that happened rather than requests to be served — and the coupling that disappears as a result.', number: 47, file: '0033-event-driven-architecture.html' },
      { slug: 'task-queues-background-workers', title: 'Task Queues & Background Workers', subtitle: "Offloading slow work out of the request/response cycle so users aren't stuck waiting on it.", number: 48, file: '0034-task-queues-background-workers.html' },
      { slug: 'chapter-8-quiz', title: 'Chapter 8 Quiz: Asynchronous Processing', subtitle: 'A scored quiz on queues, events, and background workers — with explanations for every question.', number: 49, file: 'ch08-quiz.html' },
      { slug: 'chapter-8-interview', title: 'Chapter 8 Interview Questions: Asynchronous Processing', subtitle: 'Practice questions on decoupling systems with queues and events, with model answers and interviewer expectations.', number: 50, file: 'ch08-interview.html' },
    ],
  },
  {
    number: 9,
    name: 'Phase 9 — Consistency & Distributed Consensus',
    urlSegment: 'phase-9',
    contentDir: 'system-design-core',
    lessons: [
      { slug: 'cap-theorem', title: 'CAP Theorem: The Fundamental Trade-off', subtitle: "Consistency, availability, partition tolerance — \"pick two\" isn't quite right, but understanding why the theorem exists changes how you design distributed systems.", number: 51, file: '0035-cap-theorem.html' },
      { slug: 'consistency-models', title: 'Consistency Models (Strong, Eventual, Causal)', subtitle: 'Strong, eventual, and causal consistency — the spectrum of guarantees a distributed system can offer, and what each one costs.', number: 52, file: '0036-consistency-models.html' },
      { slug: 'distributed-transactions-saga-pattern', title: 'Distributed Transactions & Saga Pattern', subtitle: "There's no clean two-phase commit across microservices in practice — the Saga pattern is how you get transaction-like behavior without it.", number: 53, file: '0037-distributed-transactions-saga-pattern.html' },
      { slug: 'consensus-algorithms-raft', title: 'Consensus Algorithms (Raft Simplified)', subtitle: "How a cluster of machines agrees on a single truth even when some of them fail — Raft's leader election and log replication, simplified.", number: 54, file: '0038-consensus-algorithms-raft.html' },
      { slug: 'conflict-resolution-strategies', title: 'Conflict Resolution Strategies', subtitle: 'When two writes to the same data disagree, something has to decide who wins — last-write-wins, vector clocks, and CRDTs.', number: 55, file: '0039-conflict-resolution-strategies.html' },
      { slug: 'chapter-9-quiz', title: 'Chapter 9 Quiz: Consistency & Distributed Consensus', subtitle: 'A scored quiz on CAP, consistency models, and consensus — with explanations for every question.', number: 56, file: 'ch09-quiz.html' },
      { slug: 'chapter-9-interview', title: 'Chapter 9 Interview Questions: Consistency & Distributed Consensus', subtitle: 'Practice questions on the CAP theorem and distributed data, with model answers and interviewer expectations.', number: 57, file: 'ch09-interview.html' },
    ],
  },
  {
    number: 10,
    name: 'Phase 10 — Microservices & Service Architecture',
    urlSegment: 'phase-10',
    contentDir: 'system-design-core',
    lessons: [
      { slug: 'monolith-vs-microservices', title: 'Monolith vs Microservices: The Real Trade-offs', subtitle: 'The trade-off interviewers actually care about — deployment simplicity versus independent scaling, and when each one is the right call.', number: 58, file: '0040-monolith-vs-microservices.html' },
      { slug: 'domain-driven-design-service-boundaries', title: 'Domain-Driven Design & Service Boundaries', subtitle: 'Where to cut a system into services — using bounded contexts and domain boundaries instead of arbitrary technical splits.', number: 59, file: '0041-domain-driven-design-service-boundaries.html' },
      { slug: 'inter-service-communication', title: 'Inter-Service Communication (Sync vs Async)', subtitle: 'How services actually talk to each other — synchronous calls, async messaging, and the failure modes each one introduces.', number: 60, file: '0042-inter-service-communication.html' },
      { slug: 'service-discovery-service-mesh', title: 'Service Discovery & Service Mesh', subtitle: 'In a world where services scale up and down constantly, how does anything find anything else? Service discovery and the mesh layer that automates it.', number: 61, file: '0043-service-discovery-service-mesh.html' },
      { slug: 'strangler-fig-pattern', title: 'The Strangler Fig Pattern', subtitle: "Migrating a monolith to microservices without a risky big-bang rewrite — growing the new system around the old one until it's fully replaced.", number: 62, file: '0044-strangler-fig-pattern.html' },
      { slug: 'chapter-10-quiz', title: 'Chapter 10 Quiz: Microservices & Service Architecture', subtitle: 'A scored quiz on service boundaries, communication, and migration patterns — with explanations for every question.', number: 63, file: 'ch10-quiz.html' },
      { slug: 'chapter-10-interview', title: 'Chapter 10 Interview Questions: Microservices & Service Architecture', subtitle: 'Practice questions on decomposing a monolith, with model answers and interviewer expectations.', number: 64, file: 'ch10-interview.html' },
    ],
  },
  {
    number: 11,
    name: 'Phase 11 — API Design',
    urlSegment: 'phase-11',
    contentDir: 'system-design-core',
    lessons: [
      { slug: 'rest-api-design-principles', title: 'REST API Design Principles', subtitle: "Resources, verbs, and status codes — the conventions that make an API predictable to anyone who's used another REST API before.", number: 65, file: '0045-rest-api-design-principles.html' },
      { slug: 'graphql-when-rest-isnt-enough', title: "GraphQL: When REST Isn't Enough", subtitle: 'Letting clients ask for exactly the data they need in a single request — and the trade-offs that come with that flexibility.', number: 66, file: '0046-graphql-when-rest-isnt-enough.html' },
      { slug: 'grpc-and-protocol-buffers', title: 'gRPC & Protocol Buffers', subtitle: 'Binary, strongly-typed, and fast — why internal service-to-service calls increasingly skip REST entirely.', number: 67, file: '0047-grpc-and-protocol-buffers.html' },
      { slug: 'api-versioning-backward-compatibility', title: 'API Versioning & Backward Compatibility', subtitle: 'APIs have to change without breaking every client that depends on them — the strategies for evolving a contract safely.', number: 68, file: '0048-api-versioning-backward-compatibility.html' },
      { slug: 'chapter-11-quiz', title: 'Chapter 11 Quiz: API Design', subtitle: 'A scored quiz on REST, GraphQL, gRPC, and versioning — with explanations for every question.', number: 69, file: 'ch11-quiz.html' },
      { slug: 'chapter-11-interview', title: 'Chapter 11 Interview Questions: API Design', subtitle: 'Practice questions on designing and evolving APIs, with model answers and interviewer expectations.', number: 70, file: 'ch11-interview.html' },
    ],
  },
  {
    number: 12,
    name: 'Phase 12 — Observability & Reliability',
    urlSegment: 'phase-12',
    contentDir: 'system-design-core',
    lessons: [
      { slug: 'monitoring-metrics-logs-traces', title: 'Monitoring: Metrics, Logs, Traces', subtitle: 'The three pillars of observability — what each one tells you, and why you need all three to actually understand a production system.', number: 71, file: '0049-monitoring-metrics-logs-traces.html' },
      { slug: 'slos-slis-error-budgets', title: 'SLOs, SLIs, and Error Budgets', subtitle: "Turning \"the system should be reliable\" into a number you can measure, alert on, and make trade-off decisions against.", number: 72, file: '0050-slos-slis-error-budgets.html' },
      { slug: 'distributed-tracing', title: 'Distributed Tracing', subtitle: 'Following a single request as it fans out across a dozen services — how tracing rebuilds the full picture from scattered spans.', number: 73, file: '0051-distributed-tracing.html' },
      { slug: 'circuit-breakers-graceful-degradation', title: 'Circuit Breakers & Graceful Degradation', subtitle: 'Stopping one failing dependency from taking down everything upstream of it — fail fast, then fail gracefully.', number: 74, file: '0052-circuit-breakers-graceful-degradation.html' },
      { slug: 'chaos-engineering', title: 'Chaos Engineering Principles', subtitle: 'Deliberately breaking things in production to find out if your reliability assumptions actually hold.', number: 75, file: '0053-chaos-engineering.html' },
      { slug: 'chapter-12-quiz', title: 'Chapter 12 Quiz: Observability & Reliability', subtitle: 'A scored quiz on monitoring, SLOs, tracing, and resilience patterns — with explanations for every question.', number: 76, file: 'ch12-quiz.html' },
      { slug: 'chapter-12-interview', title: 'Chapter 12 Interview Questions: Observability & Reliability', subtitle: 'Practice questions on keeping a system observable and resilient, with model answers and interviewer expectations.', number: 77, file: 'ch12-interview.html' },
    ],
  },
  {
    number: 13,
    name: 'Phase 13 — Security Architecture',
    urlSegment: 'phase-13',
    contentDir: 'system-design-core',
    lessons: [
      { slug: 'authentication-authorization', title: 'Authentication & Authorization (OAuth2, JWT)', subtitle: "Who you are versus what you're allowed to do — and the OAuth2/JWT machinery most modern systems build on top of.", number: 78, file: '0054-authentication-authorization.html' },
      { slug: 'network-security', title: 'Network Security (TLS, Firewalls, VPCs)', subtitle: 'Securing the network layer itself — encrypting traffic in transit and controlling exactly what can talk to what.', number: 79, file: '0055-network-security.html' },
      { slug: 'data-security', title: 'Data Security (Encryption at Rest & in Transit)', subtitle: 'Protecting data everywhere it exists — on disk, in the database, and on the wire — not just at the perimeter.', number: 80, file: '0056-data-security.html' },
      { slug: 'common-attack-vectors', title: 'Common Attack Vectors & Defenses', subtitle: 'The attacks that show up again and again in real systems, and the defenses that actually stop them.', number: 81, file: '0057-common-attack-vectors.html' },
      { slug: 'chapter-13-quiz', title: 'Chapter 13 Quiz: Security Architecture', subtitle: 'A scored quiz on auth, network security, and common attack vectors — with explanations for every question.', number: 82, file: 'ch13-quiz.html' },
      { slug: 'chapter-13-interview', title: 'Chapter 13 Interview Questions: Security Architecture', subtitle: 'Practice questions on securing a system end-to-end, with model answers and interviewer expectations.', number: 83, file: 'ch13-interview.html' },
    ],
  },
  {
    number: 14,
    name: 'Phase 14 — Data Pipelines & Stream Processing',
    urlSegment: 'phase-14',
    contentDir: 'system-design-core',
    lessons: [
      { slug: 'batch-vs-stream-processing', title: 'Batch vs Stream Processing', subtitle: 'Processing data on a schedule versus processing it as it arrives — and why most real systems eventually need both.', number: 84, file: '0058-batch-vs-stream-processing.html' },
      { slug: 'event-sourcing-cqrs', title: 'Event Sourcing & CQRS', subtitle: 'Storing every change as an immutable event instead of overwriting state — and separating how you write data from how you read it.', number: 85, file: '0059-event-sourcing-cqrs.html' },
      { slug: 'data-lakes-warehouses', title: 'Data Lakes & Warehouses', subtitle: 'Where analytical data actually lives at scale — raw and flexible in a lake, structured and query-optimized in a warehouse.', number: 86, file: '0060-data-lakes-warehouses.html' },
      { slug: 'real-time-analytics-architecture', title: 'Real-Time Analytics Architecture', subtitle: 'Turning a firehose of events into dashboards and alerts that update in seconds, not overnight.', number: 87, file: '0061-real-time-analytics-architecture.html' },
      { slug: 'chapter-14-quiz', title: 'Chapter 14 Quiz: Data Pipelines & Stream Processing', subtitle: 'A scored quiz on batch vs stream, event sourcing, and data warehousing — with explanations for every question.', number: 88, file: 'ch14-quiz.html' },
      { slug: 'chapter-14-interview', title: 'Chapter 14 Interview Questions: Data Pipelines & Stream Processing', subtitle: 'Practice questions on moving and processing data at scale, with model answers and interviewer expectations.', number: 89, file: 'ch14-interview.html' },
    ],
  },
  {
    number: 15,
    name: 'Phase 15 — Putting It All Together',
    urlSegment: 'phase-15',
    contentDir: 'system-design-core',
    lessons: [
      { slug: 'design-url-shortener', title: 'Design a URL Shortener (End-to-End)', subtitle: 'The classic first system design interview problem — deceptively simple, and a great forcing function for practicing the whole toolkit.', number: 90, file: '0062-design-url-shortener.html' },
      { slug: 'design-chat-system', title: 'Design a Chat System (End-to-End)', subtitle: 'Real-time delivery, message ordering, and presence — a design problem that stresses consistency and latency trade-offs at once.', number: 91, file: '0063-design-chat-system.html' },
      { slug: 'design-news-feed', title: 'Design a News Feed (End-to-End)', subtitle: 'Fan-out on write versus fan-out on read — the core decision behind every feed that has to serve millions of users.', number: 92, file: '0064-design-news-feed.html' },
      { slug: 'presenting-system-design', title: 'How to Present a System Design', subtitle: 'The design in your head is only half the job — how to walk an interviewer or a team through it clearly, under time pressure.', number: 93, file: '0065-presenting-system-design.html' },
      { slug: 'chapter-15-quiz', title: 'Chapter 15 Quiz: Putting It All Together', subtitle: 'A scored quiz on the three capstone designs and how to present them — with explanations for every question.', number: 94, file: 'ch15-quiz.html' },
      { slug: 'chapter-15-interview', title: 'Chapter 15 Interview Questions: Putting It All Together', subtitle: 'Practice full end-to-end design questions, with model answers and interviewer expectations.', number: 95, file: 'ch15-interview.html' },
      { slug: 'system-design-glossary', title: 'System Design Glossary', subtitle: 'A searchable reference of every term used across all 15 chapters — jump straight to a definition instead of re-reading a lesson.', number: 96, file: 'glossary.html' },
    ],
  },
];

// ── Flat lesson index for cross-phase navigation ───────────────────────────

type FlatLesson = LessonMeta & { urlSegment: string };

const ALL_SD_LESSONS: FlatLesson[] = SD_PHASES.flatMap((phase) =>
  phase.lessons.map((l) => ({ ...l, urlSegment: phase.urlSegment }))
);

// ── Nav link rewriting ──────────────────────────────────────────────────────
// Source lessons link to each other and to the overview via bare filenames
// (e.g. href="0002-...html") — rewrite those into real site routes.

const COURSE_BASE = '/tutorials/system-design-beyond-the-prompt';

function buildNavLinkMap(): Record<string, string> {
  const map: Record<string, string> = {
    '0000-overview.html': COURSE_BASE,
  };
  SD_PHASES.forEach((phase) => {
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

// ── HTML parsing ─────────────────────────────────────────────────────────────

function parseLesson(rawHtml: string): { lessonCss: string; bodyHtml: string; script: string } {
  // At most one lesson-local <style> block (quiz/interview pages carry their
  // own widget styles; regular lessons have none — the shared look comes from
  // an externally-linked stylesheet in the source, which we don't use here).
  const styleMatch = rawHtml.match(/<style>([\s\S]*?)<\/style>/);
  const lessonCss = styleMatch ? styleMatch[1].trim() : '';

  // Body: from <body> up to the first bare <script> tag (there are no
  // external <script src="..."> tags in this source, so a plain slice is safe).
  const bodyStart = rawHtml.indexOf('<body>');
  const scriptStart = rawHtml.indexOf('<script>', bodyStart);
  let bodyHtml =
    bodyStart !== -1 && scriptStart !== -1
      ? rawHtml.slice(bodyStart + '<body>'.length, scriptStart).trim()
      : '';

  bodyHtml = replaceNavLinks(bodyHtml);

  const scriptEnd = rawHtml.indexOf('</script>', scriptStart);
  const script =
    scriptStart !== -1 && scriptEnd !== -1
      ? rawHtml.slice(scriptStart + '<script>'.length, scriptEnd).trim()
      : '';

  return { lessonCss, bodyHtml, script };
}

// ── Public API ───────────────────────────────────────────────────────────────

export function getSDLessonData(phaseUrlSegment: string, slug: string): SDLessonData {
  const allIndex = ALL_SD_LESSONS.findIndex(
    (l) => l.urlSegment === phaseUrlSegment && l.slug === slug
  );
  if (allIndex === -1) throw new Error(`System design lesson not found: ${phaseUrlSegment}/${slug}`);

  const meta = ALL_SD_LESSONS[allIndex];
  const phase = SD_PHASES.find((p) => p.urlSegment === phaseUrlSegment)!;

  const contentPath = path.join(process.cwd(), 'src', 'content', 'system-design-core', meta.file);
  const rawHtml = fs.readFileSync(contentPath, 'utf-8');
  const { lessonCss, bodyHtml: parsedBodyHtml, script } = parseLesson(rawHtml);
  const { bodyHtml, headings } = extractHeadingsAndInjectIds(parsedBodyHtml);

  const prevMeta = allIndex > 0 ? ALL_SD_LESSONS[allIndex - 1] : null;
  const nextMeta = allIndex < ALL_SD_LESSONS.length - 1 ? ALL_SD_LESSONS[allIndex + 1] : null;

  return {
    ...meta,
    phaseNumber: phase.number,
    phaseName: phase.name,
    lessonCss,
    bodyHtml,
    script,
    headings,
    prev: prevMeta
      ? { slug: prevMeta.slug, title: prevMeta.title, urlSegment: prevMeta.urlSegment }
      : null,
    next: nextMeta
      ? { slug: nextMeta.slug, title: nextMeta.title, urlSegment: nextMeta.urlSegment }
      : null,
  };
}
