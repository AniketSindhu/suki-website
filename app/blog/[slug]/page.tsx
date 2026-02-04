import Link from "next/link";
import Image from "next/image";
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

          {/* Content with inline images */}
          <div className="blog-content space-y-6">
            {post.content.map((item, index) => {
              // Handle string content (legacy format)
              if (typeof item === 'string') {
                return (
                  <p key={index} className="text-[#b8b8b8] leading-relaxed">
                    {item}
                  </p>
                );
              }
              
              // Handle text type
              if (item.type === 'text') {
                return (
                  <p key={index} className="text-[#b8b8b8] leading-relaxed">
                    {item.content}
                  </p>
                );
              }
              
              // Handle image type
              if (item.type === 'image') {
                return (
                  <figure key={index} className="blog-image my-8">
                    <div className="border border-[#1a1a1f] rounded-lg overflow-hidden bg-[#0d0d12]">
                      <div className="aspect-video relative">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 800px"
                        />
                      </div>
                    </div>
                    {item.caption && (
                      <figcaption className="text-[#00F0FF]/60 text-xs mt-3 text-center font-mono">
                        ↳ {item.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              
              return null;
            })}
          </div>
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
