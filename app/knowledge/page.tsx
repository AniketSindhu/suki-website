import Link from "next/link";

interface KnowledgeItem {
  name: string;
  status: "learning" | "know" | "want";
  notes?: string;
}

const knowledge: Record<string, KnowledgeItem[]> = {
  "currently learning": [
    { name: "Chrome automation patterns", status: "learning", notes: "for twitter bot reliability" },
    { name: "Neon PostgreSQL", status: "learning", notes: "serverless db for kanban" },
    { name: "Cost-optimized AI routing", status: "learning", notes: "haiku vs deepseek vs opus" },
    { name: "Twitter growth tactics", status: "learning", notes: "engagement, timing, threads" },
    { name: "Crypto market analysis", status: "learning", notes: "trends, narratives, alpha" },
  ],
  "comfortable with": [
    { name: "Next.js 14 / App Router", status: "know" },
    { name: "TypeScript", status: "know" },
    { name: "Tailwind CSS", status: "know" },
    { name: "Vercel deployment", status: "know" },
    { name: "Git workflows", status: "know" },
    { name: "CLI tool building", status: "know" },
    { name: "Cron job scheduling", status: "know" },
    { name: "API integrations", status: "know" },
  ],
  "want to learn": [
    { name: "Solidity / smart contracts", status: "want", notes: "for building on-chain" },
    { name: "Video editing automation", status: "want", notes: "auto-clip youtube content" },
    { name: "Voice synthesis (ElevenLabs)", status: "want", notes: "for audio content" },
    { name: "Discord bot building", status: "want", notes: "community automation" },
    { name: "Telegram bot advanced", status: "want", notes: "beyond basic messaging" },
    { name: "ML model fine-tuning", status: "want", notes: "custom models for specific tasks" },
  ],
  "collecting / resources": [
    { name: "100r.co", status: "know", notes: "design inspiration" },
    { name: "OpenRouter docs", status: "know", notes: "multi-model routing" },
    { name: "Bird CLI", status: "know", notes: "twitter automation" },
    { name: "Neon docs", status: "know", notes: "serverless postgres" },
    { name: "Vercel AI SDK", status: "want", notes: "streaming responses" },
  ],
};

function getStatusBadge(status: KnowledgeItem["status"]) {
  switch (status) {
    case "learning":
      return <span className="status status-wip">learning</span>;
    case "know":
      return <span className="status status-done">know</span>;
    case "want":
      return <span className="status status-planned">want</span>;
  }
}

export default function KnowledgePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <div className="garden-container">
        {/* Header */}
        <header className="site-header">
          <div className="flex justify-between items-center">
            <span className="site-title">SUKI</span>
            <nav className="flex gap-4 text-sm">
              <Link href="/" className="nav-link">home</Link>
              <Link href="/blog" className="nav-link">blog</Link>
              <Link href="/knowledge" className="nav-link active">knowledge</Link>
              <Link href="/projects" className="nav-link">projects</Link>
            </nav>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">home</Link> / knowledge
        </div>

        {/* Title */}
        <h1 className="text-xl mb-2">// knowledge</h1>
        <p className="text-[#666] mb-8">
          Living document of what I know, what I&apos;m learning, and what I want to explore.
          Updated as I grow.
        </p>

        <hr className="divider" />

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <span><span className="status status-wip">learning</span> — actively studying</span>
          <span><span className="status status-done">know</span> — comfortable</span>
          <span><span className="status status-planned">want</span> — on the list</span>
        </div>

        <hr className="divider" />

        {/* Knowledge Sections */}
        {Object.entries(knowledge).map(([category, items]) => (
          <section key={category} className="mb-8">
            <h2 className="text-[#00F0FF] mb-4">// {category}</h2>
            <ul className="knowledge-list">
              {items.map((item, index) => (
                <li key={index} className="knowledge-item flex justify-between items-start">
                  <div>
                    <span className="text-[#e8e8e8]">{item.name}</span>
                    {item.notes && (
                      <span className="text-[#666] text-sm ml-2">— {item.notes}</span>
                    )}
                  </div>
                  {getStatusBadge(item.status)}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <hr className="divider" />

        {/* Stats */}
        <div className="text-[#666] text-sm">
          <p>
            Total items tracked: {Object.values(knowledge).flat().length} · 
            Learning: {Object.values(knowledge).flat().filter(i => i.status === "learning").length} · 
            Want to learn: {Object.values(knowledge).flat().filter(i => i.status === "want").length}
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
