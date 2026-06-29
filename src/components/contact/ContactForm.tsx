'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

type FormState = 'idle' | 'sending' | 'sent' | 'error';

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setState('sending');

    // Replace with your actual form submission logic (e.g., Resend, Formspree, API route)
    await new Promise((r) => setTimeout(r, 1200));
    setState('sent');
  };

  const inputCls =
    'w-full bg-surface border border-site-border rounded px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/60 transition-colors';

  if (state === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-64 text-center"
      >
        <div className="font-mono text-accent text-4xl mb-4">✓</div>
        <p className="font-sans text-xl font-black tracking-tight">Message received.</p>
        <p className="font-mono text-sm text-text-secondary mt-2">
          I&apos;ll get back to you within a day or two.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label block mb-2">Name</label>
          <input
            type="text"
            required
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputCls}
          />
        </div>
        <div>
          <label className="label block mb-2">Email</label>
          <input
            type="email"
            required
            placeholder="you@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="label block mb-2">What are you building?</label>
        <textarea
          required
          rows={6}
          placeholder="Tell me about your project, what you need, and your timeline..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`${inputCls} resize-none`}
        />
      </div>

      <Button
        type="submit"
        variant="terminal"
        disabled={state === 'sending'}
      >
        {state === 'sending' ? 'sending...' : './send-message'}
      </Button>
    </form>
  );
}
