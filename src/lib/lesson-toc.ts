export type LessonHeading = { id: string; text: string };

const ENTITY_MAP: Record<string, string> = {
  '&amp;': '&',
  '&#39;': "'",
  '&apos;': "'",
  '&quot;': '"',
  '&lt;': '<',
  '&gt;': '>',
  '&nbsp;': ' ',
};

function decodeEntities(text: string): string {
  return text.replace(/&amp;|&#39;|&apos;|&quot;|&lt;|&gt;|&nbsp;/g, (m) => ENTITY_MAP[m]);
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}

/**
 * Finds every top-level `<h2>` in a parsed lesson body, injects a unique
 * `id` into each so it can be deep-linked/scrolled to, and returns the
 * heading list (in document order) for rendering an in-page TOC.
 */
export function extractHeadingsAndInjectIds(bodyHtml: string): {
  bodyHtml: string;
  headings: LessonHeading[];
} {
  const headings: LessonHeading[] = [];
  let index = 0;

  const result = bodyHtml.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (full, attrs: string, inner: string) => {
    const text = decodeEntities(stripTags(inner)).replace(/\s+/g, ' ').trim();
    if (!text) return full;
    index += 1;
    const id = `toc-h-${index}`;
    headings.push({ id, text });
    return `<h2 id="${id}"${attrs}>${inner}</h2>`;
  });

  return { bodyHtml: result, headings };
}
