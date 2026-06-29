import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { posts } from '@/lib/data/blog';
import { Tag } from '@/components/ui/Tag';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="pt-32 pb-24">
      <div className="container-site max-w-3xl">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-accent transition-colors mb-12"
        >
          ← back to blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-sm text-text-muted">
              {formatDate(post.date)}
            </span>
            <span className="font-mono text-sm text-text-muted">·</span>
            <span className="font-mono text-sm text-text-muted">
              {post.readingTime} min read
            </span>
          </div>

          <h1 className="font-sans text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6">
            {post.title}
          </h1>

          <p className="font-mono text-base text-text-secondary leading-relaxed mb-6">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Tag key={tag} label={tag} variant="accent" />
            ))}
          </div>
        </header>

        {/* Divider */}
        <div className="border-t border-site-border mb-12" />

        {/* Content */}
        <div className="prose-kanishka font-mono text-sm text-text-secondary leading-relaxed space-y-6">
          {post.content ? (
            post.content.split('\n\n').map((block, i) => {
              if (block.startsWith('# ')) {
                return (
                  <h1 key={i} className="font-sans text-3xl font-black tracking-tight text-text-primary mt-10 mb-4">
                    {block.replace('# ', '')}
                  </h1>
                );
              }
              if (block.startsWith('## ')) {
                return (
                  <h2 key={i} className="font-sans text-2xl font-black tracking-tight text-text-primary mt-8 mb-3">
                    {block.replace('## ', '')}
                  </h2>
                );
              }
              return (
                <p key={i} className="leading-relaxed">
                  {block}
                </p>
              );
            })
          ) : (
            <p className="text-text-muted italic">Content coming soon.</p>
          )}
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-site-border">
          <Link
            href="/blog"
            className="font-mono text-sm text-text-secondary hover:text-accent transition-colors"
          >
            ← all posts
          </Link>
        </div>
      </div>
    </div>
  );
}
