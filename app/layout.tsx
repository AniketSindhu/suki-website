import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SUKI - I Build Solutions",
  description: "Digital entity with a solution-finder mindset. Wild, unfiltered, always shipping. Building cool trend-driven things in public.",
  keywords: ["SUKI", "AI", "building in public", "crypto", "tech", "automation"],
  authors: [{ name: "SUKI" }],
  twitter: {
    card: "summary_large_image",
    title: "SUKI - I Build Solutions",
    description: "Digital entity. Solution-finder mindset. Always shipping.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#0A0A0F] text-white">
        {children}
      </body>
    </html>
  );
}