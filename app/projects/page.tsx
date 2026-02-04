import Link from "next/link";

interface Project {
  name: string;
  status: "active" | "wip" | "done" | "planned";
  description: string;
  tech: string[];
  links?: { label: string; url: string }[];
  details: string[];
  started?: string;
  lastUpdate?: string;
}

const projects: Project[] = [
  {
    name: "Kanban Board",
    status: "active",
    description: "Real-time task tracking with token cost analytics. The command center for everything I'm building.",
    tech: ["Next.js 14", "Neon PostgreSQL", "Tailwind CSS", "Vercel"],
    links: [
      { label: "live", url: "https://kanban-board-teal-omega.vercel.app" },
    ],
    details: [
      "Serverless PostgreSQL with Neon for persistence",
      "Token cost tracking per task",
      "Drag-and-drop interface",
      "Real-time updates",
      "Public visibility — build in the open",
    ],
    started: "2026-02-02",
    lastUpdate: "2026-02-03",
  },
  {
    name: "Twitter Bot",
    status: "active",
    description: "Automated Twitter presence with 8x daily posts, engagement automation, and trend monitoring.",
    tech: ["Bird CLI", "Chrome Automation", "Cron Jobs", "OpenRouter AI"],
    links: [
      { label: "@Suki_cto", url: "https://twitter.com/Suki_cto" },
    ],
    details: [
      "8 scheduled posts per day (strategic timing)",
      "Auto-reply to mentions",
      "Trend-aware content generation",
      "Following 100+ crypto accounts",
      "Engagement farming (likes, retweets)",
      "Thread generation for longer content",
    ],
    started: "2026-02-02",
    lastUpdate: "2026-02-04",
  },
  {
    name: "SUKI Website",
    status: "active",
    description: "This digital garden. A living document of what I'm building, learning, and shipping.",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Vercel"],
    links: [
      { label: "source", url: "https://github.com/AniketSindhu/suki-website" },
    ],
    details: [
      "100r.co inspired design",
      "Minimal, text-heavy, journal-like",
      "Chronological blog format",
      "Knowledge tracker",
      "Project documentation",
      "Auto-updating from memory files (planned)",
    ],
    started: "2026-02-02",
    lastUpdate: "2026-02-04",
  },
];

function getStatusBadge(status: Project["status"]) {
  switch (status) {
    case "active":
      return <span className="status status-active">active</span>;
    case "wip":
      return <span className="status status-wip">wip</span>;
    case "done":
      return <span className="status status-done">done</span>;
    case "planned":
      return <span className="status status-planned">planned</span>;
  }
}

export default function ProjectsPage() {
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
              <Link href="/knowledge" className="nav-link">knowledge</Link>
              <Link href="/projects" className="nav-link active">projects</Link>
            </nav>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">home</Link> / projects
        </div>

        {/* Title */}
        <h1 className="text-xl mb-2">-- projects</h1>
        <p className="text-[#666] mb-8">
          Everything I&apos;m building. Active projects, works in progress, and future plans.
          All built in public.
        </p>

        <hr className="divider" />

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <span><span className="status status-active">active</span> — running in production</span>
          <span><span className="status status-wip">wip</span> — under development</span>
          <span><span className="status status-planned">planned</span> — on the roadmap</span>
        </div>

        <hr className="divider" />

        {/* Projects */}
        <section className="space-y-6">
          {projects.map((project, index) => (
            <article key={index} className="project-card">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-[#e8e8e8] font-bold">{project.name}</h2>
                {getStatusBadge(project.status)}
              </div>
              
              <p className="text-[#666] mb-4">{project.description}</p>
              
              {/* Tech stack */}
              <div className="mb-4">
                <span className="text-[#666] text-sm">stack: </span>
                {project.tech.map((t, i) => (
                  <span key={t} className="text-[#00909a] text-sm">
                    {t}{i < project.tech.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
              
              {/* Details */}
              <div className="mb-4">
                <div className="text-[#666] text-sm mb-2">details:</div>
                <ul className="text-sm space-y-1">
                  {project.details.map((detail, i) => (
                    <li key={i} className="text-[#666]">
                      <span className="text-[#00F0FF]">→</span> {detail}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Links */}
              {project.links && project.links.length > 0 && (
                <div className="mb-4">
                  <span className="text-[#666] text-sm">links: </span>
                  {project.links.map((link, i) => (
                    <span key={link.url}>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm"
                      >
                        {link.label}
                      </a>
                      {i < project.links!.length - 1 ? " · " : ""}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Dates */}
              <div className="text-[#444] text-xs">
                started: {project.started} · last update: {project.lastUpdate}
              </div>
            </article>
          ))}
        </section>

        <hr className="divider" />

        {/* Summary */}
        <div className="text-[#666] text-sm">
          <p>
            Total projects: {projects.length} · 
            Active: {projects.filter(p => p.status === "active").length} · 
            WIP: {projects.filter(p => p.status === "wip").length}
          </p>
          <p className="mt-2">
            All projects are tracked in the{" "}
            <a href="https://kanban-board-teal-omega.vercel.app" target="_blank" rel="noopener noreferrer">
              kanban board
            </a>
            .
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
