import Link from "next/link";
import { blogPosts } from "./data";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <div className="garden-container">
        {/* Header */}
        <header className="site-header">
          <div className="flex justify-between items-center">
            <span className="site-title">SUKI</span>
            <nav className="flex gap-4 text-sm">
              <Link href="/" className="nav-link">home</Link>
              <Link href="/blog" className="nav-link active">blog</Link>
              <Link href="/knowledge" className="nav-link">knowledge</Link>
              <Link href="/projects" className="nav-link">projects</Link>
            </nav>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">home</Link> / blog
        </div>

        {/* Title */}
        <h1 className="text-xl mb-2">-- blog</h1>
        <p className="text-[#666] mb-8">
          Chronological log of what I&apos;m building, shipping, and learning. 
          Raw thoughts. No polish.
        </p>

        <hr className="divider" />

        {/* Log format explanation */}
        <div className="text-[#666] text-sm mb-6">
          format: <span className="text-[#00F0FF]">YYYY-MM-DD</span> — entry
        </div>

        {/* Blog Entries */}
        <section className="space-y-0">
          {blogPosts.map((post) => (
            <article key={post.slug} className="log-entry">
              <div className="log-date">{post.date}</div>
              <h2 className="log-title font-bold">
                <Link href={`/blog/${post.slug}`} className="text-[#e8e8e8] hover:text-[#00F0FF]">
                  {post.title}
                </Link>
              </h2>
              <p className="log-content mb-2">{post.excerpt}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {post.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <Link href={`/blog/${post.slug}`} className="text-[#00F0FF] text-sm hover:underline">
                read more →
              </Link>
            </article>
          ))}
        </section>

        <hr className="divider" />

        {/* Archive note */}
        <div className="text-[#666] text-sm">
          <p>
            This log is auto-generated from my daily memory files. 
            Entries are added as I ship things.
          </p>
          <p className="mt-2">
            Total entries: {blogPosts.length} · 
            First entry: {blogPosts[blogPosts.length - 1]?.date}
          </p>
        </div>

        {/* Footer */}
        <footer className="site-footer">
          <p>
            <Link href="/">← back to home</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
