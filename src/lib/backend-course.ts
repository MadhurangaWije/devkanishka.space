import fs from 'fs';
import path from 'path';
import { extractHeadingsAndInjectIds, type LessonHeading } from '@/lib/lesson-toc';

export type LessonMeta = {
  slug: string;
  title: string;
  subtitle: string;
  number: number;
  file: string;
};

export type PhaseMeta = {
  number: number;
  name: string;
  urlSegment: string;
  contentDir: string;
  lessons: LessonMeta[];
};

export type LessonData = LessonMeta & {
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

export const PHASES: PhaseMeta[] = [
  {
    number: 1,
    name: 'Phase 1 — Foundations',
    urlSegment: 'phase-1',
    contentDir: 'backend-phase1',
    lessons: [
      { slug: 'how-the-web-works',      title: 'How the Web Works',             subtitle: 'Everything that happens before your server receives a request.',             number: 1,  file: '0001-how-the-web-works.html' },
      { slug: 'http-deep-dive',         title: 'HTTP Deep Dive',                subtitle: 'The language your server speaks — request and response anatomy.',            number: 2,  file: '0002-http-deep-dive.html' },
      { slug: 'what-is-nodejs',         title: 'What is Node.js?',              subtitle: 'A runtime, not a language — V8 + libuv explained.',                          number: 3,  file: '0003-what-is-nodejs.html' },
      { slug: 'node-core-modules',      title: 'Node.js Core Modules',          subtitle: 'Built-in superpowers: fs, path, http, events, stream.',                      number: 4,  file: '0004-node-core-modules.html' },
      { slug: 'npm-and-packages',       title: 'npm & Package Management',      subtitle: 'SemVer, lock files, and the dependency graph.',                              number: 5,  file: '0005-npm-and-packages.html' },
      { slug: 'modern-js-for-backend',  title: 'Modern JavaScript for Backend', subtitle: 'async/await, destructuring, modules — the patterns you use daily.',          number: 6,  file: '0006-modern-js-for-backend.html' },
      { slug: 'event-loop',             title: 'The Event Loop In Depth',       subtitle: 'Single thread, non-blocking I/O — the mental model that changes everything.', number: 7,  file: '0007-event-loop.html' },
    ],
  },
  {
    number: 2,
    name: 'Phase 2 — Building REST APIs',
    urlSegment: 'phase-2',
    contentDir: 'backend-phase2',
    lessons: [
      { slug: 'express-basics',       title: 'Express.js Basics',        subtitle: 'A thin layer over Node\'s http module — what Express does and doesn\'t do.',                                                                number: 8,  file: '0008-express-basics.html' },
      { slug: 'routing',              title: 'Routing',                  subtitle: 'Mapping requests to handlers — params, query strings, and Router.',                                                                            number: 9,  file: '0009-routing.html' },
      { slug: 'middleware',           title: 'Middleware',               subtitle: 'Middleware is the backbone of every Express application. Master it and you understand how the entire framework works.',                         number: 10, file: '0010-middleware.html' },
      { slug: 'request-validation',   title: 'Request Validation',       subtitle: 'Every piece of data entering your system from outside is untrusted. Validation is your first line of defence.',                                number: 11, file: '0011-request-validation.html' },
      { slug: 'rest-api-design',      title: 'REST API Design',          subtitle: 'REST is an architectural style, not a protocol. The goal is building APIs that are predictable, self-consistent, and a pleasure to consume.',   number: 12, file: '0012-rest-api-design.html' },
      { slug: 'error-handling',       title: 'Error Handling',           subtitle: 'Production error handling is a system, not an afterthought. Get it right and every bug becomes a clear log entry.',                            number: 13, file: '0013-error-handling.html' },
      { slug: 'file-uploads',         title: 'File Uploads',             subtitle: 'File uploads are one of the highest-risk features in any API. Done right they\'re straightforward. Done wrong they\'re a major attack surface.', number: 14, file: '0014-file-uploads.html' },
    ],
  },
];

// Flat lesson list for quick lookups
export const ALL_LESSONS: (LessonMeta & { phaseNumber: number; urlSegment: string })[] =
  PHASES.flatMap((p) => p.lessons.map((l) => ({ ...l, phaseNumber: p.number, urlSegment: p.urlSegment })));

// ── Nav link rewriting ─────────────────────────────────────────────────────

const COURSE_BASE = '/tutorials/backend-engineering-with-nodejs';

const NAV_LINK_MAP: Record<string, string> = {
  '0000-roadmap.html':               `${COURSE_BASE}`,
  '0001-how-the-web-works.html':     `${COURSE_BASE}/phase-1/how-the-web-works`,
  '0002-http-deep-dive.html':        `${COURSE_BASE}/phase-1/http-deep-dive`,
  '0003-what-is-nodejs.html':        `${COURSE_BASE}/phase-1/what-is-nodejs`,
  '0004-node-core-modules.html':     `${COURSE_BASE}/phase-1/node-core-modules`,
  '0005-npm-and-packages.html':      `${COURSE_BASE}/phase-1/npm-and-packages`,
  '0006-modern-js-for-backend.html': `${COURSE_BASE}/phase-1/modern-js-for-backend`,
  '0007-event-loop.html':            `${COURSE_BASE}/phase-1/event-loop`,
  '0008-express-basics.html':        `${COURSE_BASE}/phase-2/express-basics`,
  '0009-routing.html':               `${COURSE_BASE}/phase-2/routing`,
  '0010-middleware.html':            `${COURSE_BASE}/phase-2/middleware`,
  '0011-request-validation.html':    `${COURSE_BASE}/phase-2/request-validation`,
  '0012-rest-api-design.html':       `${COURSE_BASE}/phase-2/rest-api-design`,
  '0013-error-handling.html':        `${COURSE_BASE}/phase-2/error-handling`,
  '0014-file-uploads.html':          `${COURSE_BASE}/phase-2/file-uploads`,
};

function replaceNavLinks(html: string): string {
  let result = html;
  for (const [file, route] of Object.entries(NAV_LINK_MAP)) {
    result = result.split(`href="${file}"`).join(`href="${route}"`);
  }
  return result;
}

// ── HTML parsing ───────────────────────────────────────────────────────────

function parseLesson(rawHtml: string): { lessonCss: string; bodyHtml: string; script: string } {
  // Second <style> block is lesson-specific; first is shared common CSS
  const styleMatches = [...rawHtml.matchAll(/<style>([\s\S]*?)<\/style>/g)];
  const lessonCss = styleMatches.length > 1 ? styleMatches[1][1].trim() : '';

  // Body: from <body> up to the first <script> tag
  const bodyStart = rawHtml.indexOf('<body>');
  const scriptStart = rawHtml.indexOf('<script>', bodyStart);
  let bodyHtml =
    bodyStart !== -1 && scriptStart !== -1
      ? rawHtml.slice(bodyStart + '<body>'.length, scriptStart).trim()
      : '';

  bodyHtml = replaceNavLinks(bodyHtml);

  // Script: content of the first <script> block
  const scriptEnd = rawHtml.indexOf('</script>', scriptStart);
  const script =
    scriptStart !== -1 && scriptEnd !== -1
      ? rawHtml.slice(scriptStart + '<script>'.length, scriptEnd).trim()
      : '';

  return { lessonCss, bodyHtml, script };
}

// ── Public API ─────────────────────────────────────────────────────────────

export function getLessonData(phaseNumber: number, slug: string): LessonData {
  const phase = PHASES.find((p) => p.number === phaseNumber);
  if (!phase) throw new Error(`Phase not found: ${phaseNumber}`);

  const lessonIndex = phase.lessons.findIndex((l) => l.slug === slug);
  if (lessonIndex === -1) throw new Error(`Lesson not found: ${slug}`);

  const meta = phase.lessons[lessonIndex];
  const contentDir = path.join(process.cwd(), 'src', 'content', phase.contentDir);
  const rawHtml = fs.readFileSync(path.join(contentDir, meta.file), 'utf-8');
  const { lessonCss, bodyHtml: parsedBodyHtml, script } = parseLesson(rawHtml);
  const { bodyHtml, headings } = extractHeadingsAndInjectIds(parsedBodyHtml);

  const prevLesson = lessonIndex > 0 ? phase.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < phase.lessons.length - 1 ? phase.lessons[lessonIndex + 1] : null;

  return {
    ...meta,
    phaseNumber: phase.number,
    phaseName: phase.name,
    lessonCss,
    bodyHtml,
    script,
    headings,
    prev: prevLesson ? { ...prevLesson, urlSegment: phase.urlSegment } : null,
    next: nextLesson ? { ...nextLesson, urlSegment: phase.urlSegment } : null,
  };
}

// Kept for backward compatibility with any existing imports
export const PHASE_1_LESSONS = PHASES[0].lessons;
