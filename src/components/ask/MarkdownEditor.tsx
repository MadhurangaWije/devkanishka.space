'use client';

import { useRef, useState } from 'react';
import { renderSimpleMarkdown } from '@/lib/simple-markdown';

type ToolbarAction = {
  label: string;
  title: string;
  apply: (selected: string) => { insert: string; cursorOffset?: number };
};

const TOOLBAR: ToolbarAction[] = [
  { label: '[B]', title: 'Bold', apply: (s) => ({ insert: `**${s || 'bold text'}**` }) },
  { label: '[i]', title: 'Italic', apply: (s) => ({ insert: `*${s || 'italic text'}*` }) },
  { label: '[`]', title: 'Inline code', apply: (s) => ({ insert: `\`${s || 'code'}\`` }) },
  {
    label: '[{ }]',
    title: 'Code block',
    apply: (s) => ({ insert: `\`\`\`\n${s || 'your code here'}\n\`\`\`` }),
  },
  { label: '[-]', title: 'List item', apply: (s) => ({ insert: `\n- ${s || 'list item'}` }) },
];

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function MarkdownEditor({ value, onChange, placeholder }: Props) {
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const runAction = (action: ToolbarAction) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);
    const { insert } = action.apply(selected);

    const nextValue = value.slice(0, start) + insert + value.slice(end);
    onChange(nextValue);

    requestAnimationFrame(() => {
      textarea.focus();
      const cursor = start + insert.length;
      textarea.setSelectionRange(cursor, cursor);
    });
  };

  const tabCls = (active: boolean) =>
    `font-mono text-xs px-3 py-1.5 relative transition-colors ${
      active ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
    }`;

  return (
    <div className="border border-site-border rounded overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-site-border bg-surface px-2 py-1.5">
        <div className="flex items-center gap-1">
          {TOOLBAR.map((action) => (
            <button
              key={action.title}
              type="button"
              title={action.title}
              onClick={() => runAction(action)}
              disabled={tab === 'preview'}
              className="font-mono text-xs px-2 py-1 rounded text-text-secondary hover:text-accent hover:bg-accent/10 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              {action.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-0.5">
          <button type="button" className={tabCls(tab === 'write')} onClick={() => setTab('write')}>
            write
            {tab === 'write' && <span className="absolute -bottom-[7px] left-0 right-0 h-px bg-accent" />}
          </button>
          <button
            type="button"
            className={tabCls(tab === 'preview')}
            onClick={() => setTab('preview')}
          >
            preview
            {tab === 'preview' && <span className="absolute -bottom-[7px] left-0 right-0 h-px bg-accent" />}
          </button>
        </div>
      </div>

      {/* Body */}
      {tab === 'write' ? (
        <textarea
          ref={textareaRef}
          required
          rows={9}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-surface px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none resize-none"
        />
      ) : (
        <div
          className="min-h-[13.5rem] px-4 py-3 font-mono text-sm text-text-secondary bg-surface [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:text-text-primary [&_strong]:font-semibold [&_em]:italic [&_code]:bg-surface-elevated [&_code]:text-accent [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_pre]:bg-surface-elevated [&_pre]:border [&_pre]:border-site-border [&_pre]:rounded [&_pre]:p-3 [&_pre]:overflow-x-auto [&_pre]:mb-3 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_li]:mb-1 [&_a]:text-accent [&_a]:underline"
          dangerouslySetInnerHTML={{
            __html: value.trim()
              ? renderSimpleMarkdown(value)
              : '<p class="text-text-muted">Nothing to preview yet.</p>',
          }}
        />
      )}
    </div>
  );
}
