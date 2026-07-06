const ENTITY_MAP: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&nbsp;': ' ',
};

function decodeEntities(text: string): string {
  return text.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&apos;|&nbsp;/g, (m) => ENTITY_MAP[m]);
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
}

/** HTML fragment → plain text, preserving paragraph breaks at block boundaries. */
function htmlToText(html: string): string {
  return decodeEntities(
    html
      .replace(/<\/(p|li|h[1-6]|pre|blockquote|tr|figcaption)>/gi, '\n\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/[ \t]+/g, ' ')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/** Greedily groups paragraphs into ~300-500 word chunks without splitting a paragraph. */
function groupParagraphs(paragraphs: string[], targetWords = 400, maxWords = 550): string[] {
  const chunks: string[] = [];
  let current: string[] = [];
  let currentWords = 0;

  for (const para of paragraphs) {
    const words = wordCount(para);
    if (currentWords > 0 && currentWords + words > maxWords) {
      chunks.push(current.join('\n\n'));
      current = [];
      currentWords = 0;
    }
    current.push(para);
    currentWords += words;
    if (currentWords >= targetWords) {
      chunks.push(current.join('\n\n'));
      current = [];
      currentWords = 0;
    }
  }
  if (current.length) chunks.push(current.join('\n\n'));
  return chunks;
}

export type LessonChunk = {
  heading: string | null;
  content: string;
  chunkIndex: number;
};

/**
 * Splits an already-parsed lesson bodyHtml (the same fragment each course's
 * getXLessonData() renders — head/nav/script already stripped) into
 * heading-scoped, ~300-500 word chunks ready for embedding. Only <h2>
 * boundaries split chunks; <h3>/<h4> stay inline as part of the surrounding
 * section's text.
 */
export function chunkLessonHtml(bodyHtml: string): LessonChunk[] {
  const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  const sections: { heading: string | null; html: string }[] = [];
  let lastIndex = 0;
  let currentHeading: string | null = null;
  let match: RegExpExecArray | null;

  while ((match = h2Regex.exec(bodyHtml)) !== null) {
    const sectionHtml = bodyHtml.slice(lastIndex, match.index);
    if (sectionHtml.trim()) sections.push({ heading: currentHeading, html: sectionHtml });
    currentHeading = stripTags(match[1]) || null;
    lastIndex = h2Regex.lastIndex;
  }
  const tail = bodyHtml.slice(lastIndex);
  if (tail.trim()) sections.push({ heading: currentHeading, html: tail });

  const chunks: LessonChunk[] = [];
  for (const section of sections) {
    const text = htmlToText(section.html);
    if (!text) continue;

    const paragraphs = text
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (paragraphs.length === 0) continue;

    for (const piece of groupParagraphs(paragraphs)) {
      if (wordCount(piece) < 15) continue; // skip trivial fragments (stray labels, etc.)
      chunks.push({ heading: section.heading, content: piece, chunkIndex: chunks.length });
    }
  }
  return chunks;
}
