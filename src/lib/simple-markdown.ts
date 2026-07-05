// Minimal, dependency-free markdown renderer for the Ask Me editor preview.
// Escapes all input first, then layers on a small set of markdown rules --
// safe by construction since raw HTML from the user is never passed through.

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderInline(text: string): string {
  let out = escapeHtml(text);

  // links: [label](https://... | mailto:...)
  out = out.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)/g,
    (_match, label: string, href: string) =>
      `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`
  );

  // inline code: `code`
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');

  // bold: **text**
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // italic: *text*
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  return out;
}

// Private-use-area sentinel wrapping each extracted code block's index.
// Using a character that never appears in normal text (rather than a plain
// word like "BLOCK0") guarantees it can't collide with something a person
// typed, and a final global replace pass means a code block still renders
// correctly even if it isn't cleanly isolated on its own line.
const SENTINEL = '';
const sentinelFor = (index: number) => SENTINEL + String(index) + SENTINEL;
const SENTINEL_LINE_RE = new RegExp(`^${SENTINEL}(\\d+)${SENTINEL}$`);
const SENTINEL_GLOBAL_RE = new RegExp(`${SENTINEL}(\\d+)${SENTINEL}`, 'g');

export function renderSimpleMarkdown(source: string): string {
  if (!source.trim()) return '';

  // Pull out fenced code blocks first so their contents skip inline formatting.
  const blocks: string[] = [];
  const withSentinels = source.replace(
    /```(\w*)\n?([\s\S]*?)```/g,
    (_match, lang: string, code: string) => {
      const cls = lang ? ` class="language-${lang}"` : '';
      blocks.push(`<pre><code${cls}>${escapeHtml(code.replace(/\n$/, ''))}</code></pre>`);
      return sentinelFor(blocks.length - 1);
    }
  );

  const lines = withSentinels.split('\n');
  const html: string[] = [];
  let listOpen = false;
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  };

  const closeList = () => {
    if (listOpen) {
      html.push('</ul>');
      listOpen = false;
    }
  };

  for (const line of lines) {
    const blockMatch = line.trim().match(SENTINEL_LINE_RE);
    if (blockMatch) {
      flushParagraph();
      closeList();
      html.push(blocks[Number(blockMatch[1])]);
      continue;
    }

    const listMatch = line.match(/^[-*]\s+(.*)$/);
    if (listMatch) {
      flushParagraph();
      if (!listOpen) {
        html.push('<ul>');
        listOpen = true;
      }
      html.push(`<li>${renderInline(listMatch[1])}</li>`);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      closeList();
      continue;
    }

    closeList();
    paragraph.push(line.trim());
  }

  flushParagraph();
  closeList();

  // Fallback: a code block that ended up mid-line (not isolated on its own
  // line) still gets its sentinel substituted here, instead of leaking as text.
  return html.join('\n').replace(SENTINEL_GLOBAL_RE, (_match, index: string) => blocks[Number(index)]);
}
