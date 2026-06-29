export type Tutorial = {
  slug: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  parts: number;
  estimatedHours: number;
  tags: string[];
  featured: boolean;
  learningOutcomes: string[];
  prerequisites: string[];
  parts_list: { title: string; duration: number }[];
};

export const tutorials: Tutorial[] = [
  {
    slug: 'ml-and-dl-mastery',
    title: 'ML & DL Mastery',
    description:
      'A structured, from-scratch path through machine learning and deep learning — built for engineers who want to understand the math and code, not just import sklearn. Six phases covering data science foundations, classical ML, deep learning, NLP, computer vision, and MLOps.',
    difficulty: 'intermediate',
    parts: 6,
    estimatedHours: 60,
    tags: ['python', 'numpy', 'pandas', 'machine-learning', 'deep-learning', 'pytorch'],
    featured: true,
    learningOutcomes: [
      'Master NumPy and Pandas for fast numerical computing and data manipulation',
      'Implement classical ML algorithms from scratch — linear models, trees, ensembles',
      'Build and train neural networks with PyTorch from first principles',
      'Apply NLP techniques and work with large language model APIs',
      'Solve computer vision tasks with CNNs and transfer learning',
      'Package, monitor, and deploy ML models to production',
    ],
    prerequisites: [
      'Solid Python programming (functions, classes, list comprehensions)',
      'Basic high-school linear algebra (vectors, matrices) is helpful but not required',
      'No ML experience needed — we build intuition before formulas',
    ],
    parts_list: [
      { title: 'Phase 1 — Data Science Foundations', duration: 200 },
      { title: 'Phase 2 — Classical Machine Learning', duration: 600 },
      { title: 'Phase 3 — Deep Learning Fundamentals', duration: 600 },
      { title: 'Phase 4 — NLP & Large Language Models', duration: 480 },
      { title: 'Phase 5 — Computer Vision', duration: 480 },
      { title: 'Phase 6 — MLOps & Production', duration: 360 },
    ],
  },
  {
    slug: 'backend-engineering-with-nodejs',
    title: "Backend Engineering with Node.js",
    description:
      "A complete learning path from zero to production — structured, progressive, no gaps. Seven phases covering how the web works, REST APIs, databases, authentication, testing, Docker, CI/CD, and advanced system design. Built for aspiring engineers who want to understand the backend deeply, not just follow recipes.",
    difficulty: 'beginner',
    parts: 7,
    estimatedHours: 40,
    tags: ['node.js', 'javascript', 'backend', 'rest-api', 'postgresql', 'docker'],
    featured: true,
    learningOutcomes: [
      'Understand how the web works at the protocol level — HTTP, DNS, TCP/IP',
      'Build production-grade REST APIs with Express.js, validation, and proper error handling',
      'Design and query relational databases with PostgreSQL, Prisma, and Redis',
      'Implement authentication from scratch — password hashing, JWTs, OAuth 2.0',
      'Write tests, add structured logging, and configure error monitoring',
      'Containerise with Docker and deploy with CI/CD via GitHub Actions',
      'Graduate to advanced topics: WebSockets, message queues, microservices, observability',
    ],
    prerequisites: [
      'Basic JavaScript knowledge (variables, functions, arrays, objects)',
      'Comfort with the terminal / command line',
      'No backend experience required — we start from zero',
    ],
    parts_list: [
      {
        title: 'Phase 1 — Foundations',
        duration: 300,
      },
      {
        title: 'Phase 2 — Building REST APIs',
        duration: 360,
      },
      {
        title: 'Phase 3 — Data & Persistence',
        duration: 360,
      },
      {
        title: 'Phase 4 — Authentication & Security',
        duration: 360,
      },
      {
        title: 'Phase 5 — Production Readiness',
        duration: 300,
      },
      {
        title: 'Phase 6 — Infrastructure & Deployment',
        duration: 330,
      },
      {
        title: 'Phase 7 — Advanced Topics',
        duration: 390,
      },
    ],
  },
  {
    slug: 'distributed-systems-from-scratch',
    title: "Distributed Systems from Scratch",
    description:
      "Build a distributed key-value store from the ground up. We cover consensus with Raft, leader election, log replication, snapshotting, and fault tolerance — with working Go code throughout.",
    difficulty: 'advanced',
    parts: 9,
    estimatedHours: 14,
    tags: ['distributed-systems', 'go', 'raft', 'databases'],
    featured: true,
    learningOutcomes: [
      'Implement the Raft consensus algorithm from scratch',
      'Build a fault-tolerant key-value store with log replication',
      'Understand split-brain scenarios and how to prevent them',
      'Design for partial failure — the reality of distributed systems',
    ],
    prerequisites: ['Solid Go knowledge', 'Basic understanding of networking (TCP/IP)', 'Familiarity with concurrent programming'],
    parts_list: [
      { title: 'Introduction & Architecture Overview', duration: 45 },
      { title: 'Building the RPC Layer', duration: 60 },
      { title: 'Leader Election with Raft', duration: 90 },
      { title: 'Log Replication', duration: 90 },
      { title: 'Handling Network Partitions', duration: 75 },
      { title: 'Snapshotting for Log Compaction', duration: 60 },
      { title: 'The Key-Value State Machine', duration: 60 },
      { title: 'Testing Distributed Systems (Chaos Testing)', duration: 75 },
      { title: 'Production Hardening & Observability', duration: 60 },
    ],
  },
  {
    slug: 'go-for-python-developers',
    title: "Go for Python Developers",
    description:
      "A practical, no-nonsense guide to Go for engineers who already know Python. We skip the basics and focus on what's genuinely different — concurrency, interfaces, error handling, and building production-grade services.",
    difficulty: 'intermediate',
    parts: 6,
    estimatedHours: 8,
    tags: ['go', 'python', 'backend', 'concurrency'],
    featured: true,
    learningOutcomes: [
      'Translate Python idioms to idiomatic Go',
      'Understand goroutines, channels, and the Go memory model',
      'Handle errors the Go way — and why it\'s actually better',
      'Build a production-ready HTTP API in Go',
    ],
    prerequisites: ['Solid Python knowledge', 'Basic understanding of REST APIs', 'Comfort with the command line'],
    parts_list: [
      { title: 'Go from a Python Lens: Similarities and Differences', duration: 50 },
      { title: 'Types, Interfaces, and Composition vs Inheritance', duration: 70 },
      { title: 'Error Handling: Explicit is Better Than Implicit', duration: 60 },
      { title: 'Goroutines, Channels, and Concurrency Primitives', duration: 90 },
      { title: 'Building a REST API: net/http vs gin vs chi', duration: 80 },
      { title: 'Testing, Benchmarking, and Profiling in Go', duration: 70 },
    ],
  },
  {
    slug: 'building-your-first-k8s-operator',
    title: "Building Your First Kubernetes Operator",
    description:
      "Kubernetes operators are the best way to encode operational knowledge into the platform. In this tutorial, we build a real operator that manages a stateful application — covering CRDs, reconciliation loops, and controller-runtime.",
    difficulty: 'advanced',
    parts: 7,
    estimatedHours: 10,
    tags: ['kubernetes', 'go', 'devops', 'operators'],
    featured: false,
    learningOutcomes: [
      'Understand the Kubernetes operator pattern and when to use it',
      'Define Custom Resource Definitions (CRDs) with validation',
      'Implement a controller reconciliation loop',
      'Handle the full resource lifecycle: create, update, delete',
    ],
    prerequisites: ['Working knowledge of Kubernetes', 'Go programming experience', 'Familiarity with YAML and kubectl'],
    parts_list: [
      { title: 'What is an Operator? When to Build One?', duration: 40 },
      { title: 'Setting Up with operator-sdk and controller-runtime', duration: 50 },
      { title: 'Defining Your Custom Resource (CRD)', duration: 60 },
      { title: 'Implementing the Reconciliation Loop', duration: 90 },
      { title: 'Managing the Resource Lifecycle', duration: 75 },
      { title: 'Handling Events, Watches, and Status Updates', duration: 70 },
      { title: 'Testing and Deploying Your Operator', duration: 65 },
    ],
  },
  {
    slug: 'jwt-auth-in-go-from-scratch',
    title: "Implementing JWT Authentication in Go from Scratch",
    description:
      "Authentication that you understand is authentication you can debug at 2am. We implement JWT auth from scratch — signing, verification, refresh tokens, revocation, and common security pitfalls to avoid.",
    difficulty: 'intermediate',
    parts: 5,
    estimatedHours: 6,
    tags: ['go', 'security', 'authentication', 'backend'],
    featured: false,
    learningOutcomes: [
      'Understand JWT structure, signing, and verification',
      'Implement access and refresh token flows',
      'Build a token revocation strategy that actually scales',
      'Avoid the most common JWT security mistakes',
    ],
    prerequisites: ['Basic Go knowledge', 'Understanding of HTTP and REST', 'Familiarity with cryptography concepts (helpful but not required)'],
    parts_list: [
      { title: 'JWT Anatomy: Header, Payload, Signature', duration: 40 },
      { title: 'Generating and Signing Tokens with go-jwt', duration: 55 },
      { title: 'Middleware for Route Protection', duration: 50 },
      { title: 'Refresh Tokens and Rotation Strategy', duration: 65 },
      { title: 'Revocation, Security Pitfalls, and Production Checklist', duration: 60 },
    ],
  },
  {
    slug: 'docker-best-practices-production',
    title: "Docker Best Practices for Production",
    description:
      "Most Docker tutorials show you how to make things work. This one shows you how to make them work well — smaller images, better caching, non-root containers, secrets management, and container security scanning.",
    difficulty: 'beginner',
    parts: 5,
    estimatedHours: 5,
    tags: ['docker', 'devops', 'security', 'production'],
    featured: false,
    learningOutcomes: [
      'Reduce image sizes by 80%+ with multi-stage builds',
      'Optimize layer caching for faster CI builds',
      'Run containers securely with non-root users and read-only filesystems',
      'Integrate vulnerability scanning into your CI pipeline',
    ],
    prerequisites: ['Basic Docker knowledge (can write a Dockerfile)', 'Familiarity with CI/CD concepts'],
    parts_list: [
      { title: 'Multi-Stage Builds: From 1.2GB to 18MB', duration: 55 },
      { title: 'Layer Caching: Making CI 3x Faster', duration: 50 },
      { title: 'Security Hardening: Non-Root, Read-Only, No Secrets in Layers', duration: 70 },
      { title: 'Health Checks and Graceful Shutdown', duration: 45 },
      { title: 'Scanning and Signing: Trivy, Cosign, and SBOM', duration: 60 },
    ],
  },
];
