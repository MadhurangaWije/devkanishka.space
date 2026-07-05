'use client';

import { useRef, useState, DragEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { MarkdownEditor } from '@/components/ask/MarkdownEditor';

type FormState = 'idle' | 'sending' | 'sent' | 'error';

const MAX_FILES = 3;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // stay comfortably under Vercel's ~4.5MB body limit
const BLOCKED_EXTENSIONS = ['exe', 'bat', 'cmd', 'sh', 'msi', 'dll'];

const inputCls =
  'w-full bg-surface border border-site-border rounded px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/60 transition-colors';

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export function AskForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [context, setContext] = useState('');
  const [question, setQuestion] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (incoming: FileList | File[]) => {
    const incomingArr = Array.from(incoming);
    const combined = [...files, ...incomingArr];

    if (combined.length > MAX_FILES) {
      setErrorMsg(`You can attach up to ${MAX_FILES} files.`);
      return;
    }

    const blocked = incomingArr.find((f) =>
      BLOCKED_EXTENSIONS.includes(f.name.split('.').pop()?.toLowerCase() ?? '')
    );
    if (blocked) {
      setErrorMsg(`"${blocked.name}" isn't a supported attachment type.`);
      return;
    }

    const totalBytes = combined.reduce((sum, f) => sum + f.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      setErrorMsg(`Attachments must total under ${formatBytes(MAX_TOTAL_BYTES)}.`);
      return;
    }

    setErrorMsg('');
    setFiles(combined);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setErrorMsg('');
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      setErrorMsg('Your question can\'t be empty.');
      return;
    }

    setState('sending');
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.set('name', name);
      formData.set('email', email);
      formData.set('context', context);
      formData.set('question', question);
      files.forEach((file) => formData.append('attachments', file));

      const res = await fetch('/api/ask', { method: 'POST', body: formData });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Something went wrong sending your message.');
      }

      setState('sent');
    } catch (err) {
      setState('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Try again, or email me directly at hi@devkanishka.space.'
      );
    }
  };

  if (state === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-64 text-center"
      >
        <div className="font-mono text-accent text-4xl mb-4">✓</div>
        <p className="font-sans text-xl font-black tracking-tight">Got it — thanks for asking.</p>
        <p className="font-mono text-sm text-text-secondary mt-2 max-w-xs">
          Check your inbox — I&apos;ve sent a copy of your question. I&apos;ll reply from there
          directly based on my availability.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from real visitors, catches simple bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        onChange={() => {}}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label block mb-2">Name (optional)</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className="label block mb-2">Email</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="label block mb-2">What are you working through? (optional)</label>
        <input
          type="text"
          placeholder="e.g. ML & DL Mastery — Lesson 12, or a project you're building"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className={inputCls}
        />
      </div>

      <div>
        <label className="label block mb-2">Your question</label>
        <MarkdownEditor
          value={question}
          onChange={setQuestion}
          placeholder="What are you stuck on? Feel free to paste code, error messages, or just think out loud."
        />
      </div>

      <div>
        <label className="label block mb-2">Attachments (optional)</label>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border border-dashed rounded px-4 py-5 text-center cursor-pointer transition-colors ${
            dragActive ? 'border-accent bg-accent/5' : 'border-site-border hover:border-text-secondary'
          }`}
        >
          <p className="font-mono text-xs text-text-secondary">
            Drop files here, or <span className="text-accent">browse</span>
          </p>
          <p className="font-mono text-xs text-text-muted mt-1">
            Up to {MAX_FILES} files, {formatBytes(MAX_TOTAL_BYTES)} total
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) addFiles(e.target.files);
              e.target.value = '';
            }}
          />
        </div>

        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((file, i) => (
              <li
                key={`${file.name}-${i}`}
                className="flex items-center justify-between gap-3 bg-surface border border-site-border rounded px-3 py-2"
              >
                <span className="font-mono text-xs text-text-secondary truncate">{file.name}</span>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-xs text-text-muted">{formatBytes(file.size)}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="font-mono text-xs text-text-muted hover:text-accent transition-colors"
                    aria-label={`Remove ${file.name}`}
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {errorMsg && (
        <p className="font-mono text-xs text-red-400">{errorMsg}</p>
      )}

      <p className="font-mono text-xs text-text-muted leading-relaxed">
        Your email is only used so I can reply and keep the conversation going — it&apos;s never
        shared or used for anything else.
      </p>

      <Button type="submit" variant="terminal" disabled={state === 'sending'}>
        {state === 'sending' ? 'sending...' : './ask-question'}
      </Button>
    </form>
  );
}
