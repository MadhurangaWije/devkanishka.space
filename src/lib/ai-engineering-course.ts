import fs from 'fs';
import path from 'path';
import type { LessonMeta, PhaseMeta } from '@/lib/backend-course';
import { extractHeadingsAndInjectIds, type LessonHeading } from '@/lib/lesson-toc';
import { LESSON_QUIZ_JS } from '@/lib/lesson-quiz-script';
import { AI_ENGINEERING_DIAGRAMS_JS } from '@/lib/ai-engineering-diagrams-script';

export type { LessonMeta as AiEngineeringLessonMeta, PhaseMeta as AiEngineeringPhaseMeta };

export type AiEngineeringLessonData = LessonMeta & {
  phaseNumber: number;
  phaseName: string;
  bodyHtml: string;
  script: string;
  headings: LessonHeading[];
  prev: { slug: string; title: string; urlSegment: string } | null;
  next: { slug: string; title: string; urlSegment: string } | null;
};

// ── Phase definitions ──────────────────────────────────────────────────────

export const AI_ENGINEERING_PHASES: PhaseMeta[] = [
  {
    number: 1,
    name: 'Module 1 — Foundations & LLMs',
    urlSegment: 'module-1',
    contentDir: 'ai-engineering',
    lessons: [
      { slug: 'ai-engineering-landscape', title: 'The AI Engineering Landscape', subtitle: 'What AI engineers do vs. ML engineers, the modern AI stack, and how LLMs fit into software systems.', number: 1, file: '0001-ai-engineering-landscape.html' },
      { slug: 'how-llms-work', title: 'How LLMs Actually Work', subtitle: 'Tokens, transformer architecture, inference mechanics, context windows, and sampling parameters demystified.', number: 2, file: '0002-how-llms-work.html' },
      { slug: 'calling-llm-apis', title: 'Calling LLM APIs', subtitle: 'Making real API calls to OpenAI and Anthropic — streaming, error handling, and conversation management.', number: 3, file: '0003-calling-llm-apis.html' },
      { slug: 'choosing-comparing-models', title: 'Choosing & Comparing Models', subtitle: 'Navigate the model landscape — capabilities, benchmarks, cost/latency tradeoffs, open vs. closed source.', number: 4, file: '0004-choosing-comparing-models.html' },
    ],
  },
  {
    number: 2,
    name: 'Module 2 — Prompt Engineering',
    urlSegment: 'module-2',
    contentDir: 'ai-engineering',
    lessons: [
      { slug: 'prompt-engineering-fundamentals', title: 'Prompt Engineering Fundamentals', subtitle: 'Core techniques for getting reliable, high-quality outputs from language models.', number: 5, file: '0005-prompt-engineering-fundamentals.html' },
      { slug: 'advanced-prompting-techniques', title: 'Advanced Prompting Techniques', subtitle: 'Power techniques — few-shot examples, chain-of-thought reasoning, and structured JSON output.', number: 6, file: '0006-advanced-prompting-techniques.html' },
      { slug: 'function-calling-tool-use', title: 'Function Calling & Tool Use', subtitle: 'Let LLMs call functions — structured tool definitions, execution, and response integration.', number: 7, file: '0007-function-calling-tool-use.html' },
      { slug: 'prompt-management-evaluation', title: 'Prompt Management & Evaluation', subtitle: 'Treat prompts as code — version, test, evaluate, and iterate systematically.', number: 8, file: '0008-prompt-management-evaluation.html' },
    ],
  },
  {
    number: 3,
    name: 'Module 3 — RAG Pipeline',
    urlSegment: 'module-3',
    contentDir: 'ai-engineering',
    lessons: [
      { slug: 'embeddings-deep-dive', title: 'Embeddings Deep Dive', subtitle: 'What embeddings are, how they encode meaning, and how to use them for semantic similarity.', number: 9, file: '0009-embeddings-deep-dive.html' },
      { slug: 'vector-databases', title: 'Vector Databases', subtitle: 'How vector databases work under the hood, indexing strategies, and hands-on with real vector DBs.', number: 10, file: '0010-vector-databases.html' },
      { slug: 'chunking-strategies', title: 'Chunking Strategies', subtitle: 'How you split documents dramatically affects retrieval quality — compare strategies empirically.', number: 11, file: '0011-chunking-strategies.html' },
      { slug: 'building-rag-pipeline', title: 'Building a RAG Pipeline', subtitle: 'End-to-end RAG: load documents, chunk, embed, store, retrieve, and generate grounded answers.', number: 12, file: '0012-building-rag-pipeline.html' },
      { slug: 'advanced-rag', title: 'Advanced RAG', subtitle: 'Beyond naive RAG — hybrid search, reranking, query transformation, and multi-step retrieval.', number: 13, file: '0013-advanced-rag.html' },
      { slug: 'rag-evaluation-debugging', title: 'RAG Evaluation & Debugging', subtitle: 'Systematically measure and debug RAG pipelines — retrieval quality, generation faithfulness, failure modes.', number: 14, file: '0014-rag-evaluation-debugging.html' },
    ],
  },
  {
    number: 4,
    name: 'Module 4 — AI Agents & Tools',
    urlSegment: 'module-4',
    contentDir: 'ai-engineering',
    lessons: [
      { slug: 'agent-architecture', title: 'Agent Architecture', subtitle: 'How AI agents work — the ReAct loop, planning strategies, and memory types.', number: 15, file: '0015-agent-architecture.html' },
      { slug: 'tool-using-agents', title: 'Tool-Using Agents', subtitle: 'Build agents that select and execute tools, handle errors, and recover gracefully.', number: 16, file: '0016-tool-using-agents.html' },
      { slug: 'multi-agent-systems', title: 'Multi-Agent Systems', subtitle: 'Multiple agents collaborating — delegation, communication patterns, and orchestration.', number: 17, file: '0017-multi-agent-systems.html' },
      { slug: 'agent-memory-state', title: 'Agent Memory & State', subtitle: 'Give agents persistent memory — remember past conversations, learn from experience, manage state.', number: 18, file: '0018-agent-memory-state.html' },
      { slug: 'mcp-model-context-protocol', title: 'MCP (Model Context Protocol)', subtitle: 'Build and connect MCP servers — the emerging standard for giving LLMs access to tools and data.', number: 19, file: '0019-mcp-model-context-protocol.html' },
    ],
  },
  {
    number: 5,
    name: 'Module 5 — Production & Safety',
    urlSegment: 'module-5',
    contentDir: 'ai-engineering',
    lessons: [
      { slug: 'ai-safety-fundamentals', title: 'AI Safety Fundamentals', subtitle: 'Understand and defend against prompt injection, jailbreaks, and other LLM attack vectors.', number: 20, file: '0020-ai-safety-fundamentals.html' },
      { slug: 'guardrails-content-moderation', title: 'Guardrails & Content Moderation', subtitle: 'Build input/output safety layers — moderation, filtering, and constitutional AI patterns.', number: 21, file: '0021-guardrails-content-moderation.html' },
      { slug: 'cost-latency-scaling', title: 'Cost, Latency & Scaling', subtitle: 'Ship AI features that are fast and affordable — caching, batching, routing, and cost control.', number: 22, file: '0022-cost-latency-scaling.html' },
      { slug: 'monitoring-observability', title: 'Monitoring & Observability', subtitle: 'Monitor AI systems in production — trace LLM calls, detect drift, and evaluate continuously.', number: 23, file: '0023-monitoring-observability.html' },
    ],
  },
];

// ── Flat lesson index for cross-phase navigation ───────────────────────────

type FlatLesson = LessonMeta & { urlSegment: string };

const ALL_AI_ENGINEERING_LESSONS: FlatLesson[] = AI_ENGINEERING_PHASES.flatMap((phase) =>
  phase.lessons.map((l) => ({ ...l, urlSegment: phase.urlSegment }))
);

// ── Nav link rewriting ─────────────────────────────────────────────────────

const COURSE_BASE = '/tutorials/ai-engineering';

function buildNavLinkMap(): Record<string, string> {
  const map: Record<string, string> = {
    '0000-overview.html': COURSE_BASE,
  };
  AI_ENGINEERING_PHASES.forEach((phase) => {
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
// Source format: <article class="lesson-content"><header class="lesson-header">
// (dropped — site renders its own header chrome) followed by <h2> sections,
// .concept-box/.callout/.key-points/.project-box, a .comparison-table, a
// <div class="diagram-container" id="..."> populated at runtime by inline
// <script> calls into Diagrams.*, and a trailing <nav class="nav-links">.

function parseAiEngineeringLesson(rawHtml: string): { bodyHtml: string; script: string } {
  const articleStart = rawHtml.indexOf('<article class="lesson-content">');
  const articleEnd = rawHtml.lastIndexOf('</article>');
  let body =
    articleStart !== -1 && articleEnd !== -1
      ? rawHtml.slice(articleStart + '<article class="lesson-content">'.length, articleEnd)
      : rawHtml;

  // Drop the built-in header (site renders its own from AI_ENGINEERING_PHASES).
  body = body.replace(/<header class="lesson-header">[\s\S]*?<\/header>\s*/, '');

  // Drop the trailing built-in nav.
  body = body.replace(/<nav class="nav-links">[\s\S]*?<\/nav>\s*/, '');

  body = replaceNavLinks(body).trim();

  // Inline <script> blocks after </article> (the Diagrams.create*(...) calls).
  const scriptRegex = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
  const inlineScripts: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = scriptRegex.exec(rawHtml)) !== null) {
    const content = match[1].trim();
    if (content) inlineScripts.push(content);
  }

  const script = AI_ENGINEERING_DIAGRAMS_JS + '\n\n' + inlineScripts.join('\n\n') + '\n\n' + LESSON_QUIZ_JS;

  return { bodyHtml: body, script };
}

// ── Public API ─────────────────────────────────────────────────────────────

export function getAiEngineeringLessonData(phaseUrlSegment: string, slug: string): AiEngineeringLessonData {
  const allIndex = ALL_AI_ENGINEERING_LESSONS.findIndex(
    (l) => l.urlSegment === phaseUrlSegment && l.slug === slug
  );
  if (allIndex === -1) throw new Error(`AI Engineering lesson not found: ${phaseUrlSegment}/${slug}`);

  const meta = ALL_AI_ENGINEERING_LESSONS[allIndex];
  const phase = AI_ENGINEERING_PHASES.find((p) => p.urlSegment === phaseUrlSegment)!;

  const contentPath = path.join(process.cwd(), 'src', 'content', 'ai-engineering', meta.file);
  const rawHtml = fs.readFileSync(contentPath, 'utf-8');
  const { bodyHtml: parsedBodyHtml, script } = parseAiEngineeringLesson(rawHtml);
  const { bodyHtml, headings } = extractHeadingsAndInjectIds(parsedBodyHtml);

  const prevMeta = allIndex > 0 ? ALL_AI_ENGINEERING_LESSONS[allIndex - 1] : null;
  const nextMeta = allIndex < ALL_AI_ENGINEERING_LESSONS.length - 1 ? ALL_AI_ENGINEERING_LESSONS[allIndex + 1] : null;

  return {
    ...meta,
    phaseNumber: phase.number,
    phaseName: phase.name,
    bodyHtml,
    script,
    headings,
    prev: prevMeta ? { slug: prevMeta.slug, title: prevMeta.title, urlSegment: prevMeta.urlSegment } : null,
    next: nextMeta ? { slug: nextMeta.slug, title: nextMeta.title, urlSegment: nextMeta.urlSegment } : null,
  };
}
