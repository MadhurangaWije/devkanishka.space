import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { renderSimpleMarkdown } from '@/lib/simple-markdown';

export const runtime = 'nodejs';

const MAX_FILES = 3;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const BLOCKED_EXTENSIONS = ['exe', 'bat', 'cmd', 'sh', 'msi', 'dll'];

// Sent via Gmail's own SMTP, authenticated as this account, so mail is
// genuinely "from" it rather than a spoofed/branded domain address.
const OWNER_EMAIL = '123kanishka@gmail.com';

function escapeHtml(input: string): string {
  return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function POST(request: NextRequest) {
  const appPassword = process.env.GMAIL_APP_PASSWORD;

  if (!appPassword) {
    console.error('Ask Me: GMAIL_APP_PASSWORD not configured');
    return NextResponse.json(
      { success: false, error: "This isn't set up yet — email me directly at hi@devkanishka.space." },
      { status: 500 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid submission.' }, { status: 400 });
  }

  // Honeypot — bots that fill every field get a fake success, no email sent.
  const honeypot = formData.get('company');
  if (typeof honeypot === 'string' && honeypot.trim()) {
    return NextResponse.json({ success: true });
  }

  const name = (formData.get('name') as string | null)?.trim() || '';
  const email = (formData.get('email') as string | null)?.trim() || '';
  const context = (formData.get('context') as string | null)?.trim() || '';
  const question = (formData.get('question') as string | null)?.trim() || '';

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ success: false, error: 'Enter a valid email address.' }, { status: 400 });
  }
  if (!question) {
    return NextResponse.json({ success: false, error: "Your question can't be empty." }, { status: 400 });
  }

  const attachments = formData.getAll('attachments').filter((f): f is File => f instanceof File && f.size > 0);

  if (attachments.length > MAX_FILES) {
    return NextResponse.json(
      { success: false, error: `You can attach up to ${MAX_FILES} files.` },
      { status: 400 }
    );
  }

  const blocked = attachments.find((f) =>
    BLOCKED_EXTENSIONS.includes(f.name.split('.').pop()?.toLowerCase() ?? '')
  );
  if (blocked) {
    return NextResponse.json(
      { success: false, error: `"${blocked.name}" isn't a supported attachment type.` },
      { status: 400 }
    );
  }

  const totalBytes = attachments.reduce((sum, f) => sum + f.size, 0);
  if (totalBytes > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      { success: false, error: 'Attachments are too large — keep the total under 4MB.' },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: OWNER_EMAIL, pass: appPassword },
  });

  const questionHtml = renderSimpleMarkdown(question);

  const mailAttachments = await Promise.all(
    attachments.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
    }))
  );
  const attachmentNote = mailAttachments.length ? `${mailAttachments.length} attachment(s) included.` : '';

  const detailRows = [
    `<p><strong>From:</strong> ${escapeHtml(name || 'Not provided')} (${escapeHtml(email)})</p>`,
    context ? `<p><strong>Context:</strong> ${escapeHtml(context)}</p>` : '',
  ]
    .filter(Boolean)
    .join('\n');

  try {
    // Notify the owner — replying to this email goes straight to the asker.
    await transporter.sendMail({
      from: `Ask Me <${OWNER_EMAIL}>`,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `New question from ${name || email} — Ask Me`,
      html: `${detailRows}\n<hr />\n${questionHtml}${attachmentNote ? `\n<p>${attachmentNote}</p>` : ''}`,
      text: `From: ${name || 'Not provided'} (${email})\n${
        context ? `Context: ${context}\n` : ''
      }\n${question}${attachmentNote ? `\n\n${attachmentNote}` : ''}`,
      attachments: mailAttachments,
    });

    // Confirmation copy for the asker — replying to this reaches the owner directly.
    await transporter.sendMail({
      from: `Kanishka <${OWNER_EMAIL}>`,
      to: email,
      subject: "Got your question — I'll get back to you soon",
      html: `
        <p>Thanks for reaching out — here's a copy of what you sent:</p>
        <hr />
        ${questionHtml}
        <hr />
        <p>I'll reply here directly based on my availability, usually within a few days.</p>
      `,
      text: `Thanks for reaching out — here's a copy of what you sent:\n\n${question}\n\nI'll reply here directly based on my availability, usually within a few days.`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Ask Me: failed to send email', err);
    return NextResponse.json(
      {
        success: false,
        error: "Couldn't deliver your message — try again, or email me directly at hi@devkanishka.space.",
      },
      { status: 502 }
    );
  }
}
