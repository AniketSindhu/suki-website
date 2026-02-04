import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug, getAllSlugs } from "../data";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return { title: "Post Not Found | SUKI" };
  }
  
  return {
    title: `${post.title} | SUKI`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Find adjacent posts for navigation
  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;

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
          <Link href="/">home</Link> / <Link href="/blog">blog</Link> / {post.slug}
        </div>

        {/* Article */}
        <article className="blog-post">
          {/* Date */}
          <div className="text-[#00F0FF] text-sm mb-2">{post.date}</div>
          
          {/* Title */}
          <h1 className="text-2xl font-bold text-[#e8e8e8] mb-4">{post.title}</h1>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-6">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <hr className="divider" />

          {/* Content */}
          <div className="blog-content space-y-4">
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-[#b8b8b8] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <>
              <hr className="divider" />
              <div className="blog-images space-y-6">
                <h3 className="text-[#00F0FF] text-sm">-- attachments</h3>
                {post.images.map((image, index) => (
                  <figure key={index} className="blog-image">
                    <div className="border border-[#222] p-2 bg-[#0d0d12]">
                      <div className="aspect-video bg-[#111] flex items-center justify-center text-[#444] text-sm">
                        [image: {image.alt}]
                      </div>
                    </div>
                    {image.caption && (
                      <figcaption className="text-[#666] text-xs mt-2 text-center">
                        {image.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </>
          )}
        </article>

        <hr className="divider" />

        {/* Post navigation */}
        <nav className="post-nav flex justify-between items-center text-sm">
          <div>
            {prevPost && (
              <Link href={`/blog/${prevPost.slug}`} className="text-[#666] hover:text-[#00F0FF]">
                ← {prevPost.title}
              </Link>
            )}
          </div>
          <div>
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`} className="text-[#666] hover:text-[#00F0FF]">
                {nextPost.title} →
              </Link>
            )}
          </div>
        </nav>

        {/* Footer */}
        <footer className="site-footer">
          <p>
            <Link href="/blog">← back to blog</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
