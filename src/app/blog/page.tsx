import { Metadata } from 'next';
import { posts } from '@/lib/data/blog';
import { BlogCard } from '@/components/blog/BlogCard';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing on backend engineering, DevOps, distributed systems, and the craft of building software.',
};

export default function BlogPage() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <div className="pt-32 pb-24">
      <div className="container-site">
        {/* Header */}
        <div className="mb-20">
          <p className="label text-accent mb-4">writing</p>
          <h1 className="font-sans text-5xl md:text-6xl font-black tracking-tighter mb-6">
            Thinking out loud.
          </h1>
          <p className="font-mono text-base text-text-secondary max-w-xl leading-relaxed">
            Notes on backend systems, DevOps, distributed computing, and whatever
            I&apos;m working through at the moment. Written for engineers who want to
            go deeper.
          </p>
        </div>

        {posts.length === 0 ? (
          /* Coming soon */
          <div className="border border-site-border rounded-lg p-10 md:p-16 text-center">
            <p className="label text-accent mb-4">coming soon</p>
            <h2 className="font-sans text-2xl md:text-3xl font-black tracking-tight mb-6">
              The first posts are still being written.
            </h2>
            <p className="font-mono text-sm text-text-secondary leading-relaxed max-w-lg mx-auto">
              I&apos;m putting together a series on the specific, hard-to-Google problems
              I&apos;ve run into on the job — cases that weren&apos;t straightforward, where
              I got properly stuck, and had to think my way out instead of copy-pasting a fix.
              Less &ldquo;introduction to X&rdquo;, more &ldquo;here&apos;s exactly what went
              wrong, and how I got past it.&rdquo;
            </p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <div className="mb-8">
                <p className="label mb-4">featured</p>
                <BlogCard post={featured} featured />
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-4 my-10">
              <div className="flex-1 h-px bg-site-border" />
              <span className="label">all posts</span>
              <div className="flex-1 h-px bg-site-border" />
            </div>

            {/* Post grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rest.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
