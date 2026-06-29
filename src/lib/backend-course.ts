import fs from 'fs';
import path from 'path';

export type LessonMeta = {
  slug: string;
  title: string;
  subtitle: string;
  number: number;
  file: string;
};

export type LessonData = LessonMeta & {
  lessonCss: string;
  bodyHtml: string;
  script: string;
  prev: LessonMeta | null;
  next: LessonMeta | null;
};

export const PHASE_1_LESSONS: LessonMeta[] = [
  { slug: 'how-the-web-works',      title: 'How the Web Works',            subtitle: 'Everything that happens before your server receives a request.',       number: 1, file: '0001-how-the-web-works.html' },
  { slug: 'http-deep-dive',         title: 'HTTP Deep Dive',               subtitle: 'The language your server speaks — request and response anatomy.',      number: 2, file: '0002-http-deep-dive.html' },
  { slug: 'what-is-nodejs',         title: 'What is Node.js?',             subtitle: 'A runtime, not a language — V8 + libuv explained.',                   number: 3, file: '0003-what-is-nodejs.html' },
  { slug: 'node-core-modules',      title: 'Node.js Core Modules',         subtitle: 'Built-in superpowers: fs, path, http, events, stream.',                number: 4, file: '0004-node-core-modules.html' },
  { slug: 'npm-and-packages',       title: 'npm & Package Management',     subtitle: 'SemVer, lock files, and the dependency graph.',                        number: 5, file: '0005-npm-and-packages.html' },
  { slug: 'modern-js-for-backend',  title: 'Modern JavaScript for Backend', subtitle: 'async/await, destructuring, modules — the patterns you use daily.', number: 6, file: '0006-modern-js-for-backend.html' },
  { slug: 'event-loop',             title: 'The Event Loop In Depth',      subtitle: 'Single thread, non-blocking I/O — the mental model that changes everything.', number: 7, file: '0007-event-loop.html' },
];

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'backend-phase1');

const NAV_LINK_MAP: Record<string, string> = {
  '0000-roadmap.html':              '/tutorials/backend-engineering-with-nodejs',
  '0001-how-the-web-works.html':    '/tutorials/backend-engineering-with-nodejs/phase-1/how-the-web-works',
  '0002-http-deep-dive.html':       '/tutorials/backend-engineering-with-nodejs/phase-1/http-deep-dive',
  '0003-what-is-nodejs.html':       '/tutorials/backend-engineering-with-nodejs/phase-1/what-is-nodejs',
  '0004-node-core-modules.html':    '/tutorials/backend-engineering-with-nodejs/phase-1/node-core-modules',
  '0005-npm-and-packages.html':     '/tutorials/backend-engineering-with-nodejs/phase-1/npm-and-packages',
  '0006-modern-js-for-backend.html':'/tutorials/backend-engineering-with-nodejs/phase-1/modern-js-for-backend',
  '0007-event-loop.html':           '/tutorials/backend-engineering-with-nodejs/phase-1/event-loop',
};

function replaceNavLinks(html: string): string {
  let result = html;
  for (const [file, route] of Object.entries(NAV_LINK_MAP)) {
    result = result.split(`href="${file}"`).join(`href="${route}"`);
  }
  return result;
}

function parseLesson(rawHtml: string): { lessonCss: string; bodyHtml: string; script: string } {
  // Extract all <style> blocks — first is common CSS, second (if any) is lesson-specific
  const styleMatches = [...rawHtml.matchAll(/<style>([\s\S]*?)<\/style>/g)];
  const lessonCss = styleMatches.length > 1 ? styleMatches[1][1].trim() : '';

  // Extract body content: from <body> up to the first <script> tag
  const bodyStart = rawHtml.indexOf('<body>');
  const scriptStart = rawHtml.indexOf('<script>', bodyStart);
  let bodyHtml = bodyStart !== -1 && scriptStart !== -1
    ? rawHtml.slice(bodyStart + '<body>'.length, scriptStart).trim()
    : '';

  // Handle files where <body> tag is immediately followed by <div>
  if (bodyHtml.startsWith('<div')) {
    // fine as-is
  }

  // Replace HTML navigation links with Next.js routes
  bodyHtml = replaceNavLinks(bodyHtml);

  // Extract script content
  const scriptEnd = rawHtml.indexOf('</script>', scriptStart);
  const script = scriptStart !== -1 && scriptEnd !== -1
    ? rawHtml.slice(scriptStart + '<script>'.length, scriptEnd).trim()
    : '';

  return { lessonCss, bodyHtml, script };
}

export function getLessonData(slug: string): LessonData {
  const index = PHASE_1_LESSONS.findIndex((l) => l.slug === slug);
  if (index === -1) throw new Error(`Lesson not found: ${slug}`);

  const meta = PHASE_1_LESSONS[index];
  const rawHtml = fs.readFileSync(path.join(CONTENT_DIR, meta.file), 'utf-8');
  const { lessonCss, bodyHtml, script } = parseLesson(rawHtml);

  return {
    ...meta,
    lessonCss,
    bodyHtml,
    script,
    prev: index > 0 ? PHASE_1_LESSONS[index - 1] : null,
    next: index < PHASE_1_LESSONS.length - 1 ? PHASE_1_LESSONS[index + 1] : null,
  };
}
