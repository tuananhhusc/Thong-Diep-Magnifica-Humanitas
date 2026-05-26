"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TableOfContents, { parseTocItems } from "@/components/TableOfContents";
import ArticleBody from "@/components/ArticleBody";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { articleMetadata, articleContent } from "@/lib/content";

/**
 * Main Page — Magnifica Humanitas
 * 
 * Assembles all components into the full long-read layout:
 * - Header with reading progress bar
 * - Hero section with title & metadata
 * - Two-column layout: TOC sidebar (25%) + Article body (75%)
 * - Footer
 * - ScrollToTop floating button
 * 
 * Responsive behavior:
 * - Desktop (≥1024px): Side-by-side TOC + Article
 * - Mobile/Tablet: Single column + drawer TOC
 */

export default function HomePage() {
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  // Parse headings from content for TOC
  const tocItems = parseTocItems(articleContent);

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header with auto-hide + reading progress */}
      <Header onToggleMobileToc={() => setIsMobileTocOpen(true)} />

      {/* Table of Contents (includes mobile drawer) */}
      <TableOfContents
        items={tocItems}
        isMobileOpen={isMobileTocOpen}
        onCloseMobile={() => setIsMobileTocOpen(false)}
      />

      {/* Hero Section */}
      <Hero metadata={articleMetadata} />

      {/* Main Content: Two-column layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-12">
          {/* Left column: Desktop TOC (sticky) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 pb-8">
              <nav aria-label="Mục lục bài viết">
                <div className="flex items-center gap-2 mb-5 px-1">
                  <svg
                    className="text-cardinal"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  <h2
                    className="text-sm font-semibold uppercase tracking-[0.15em] text-charcoal m-0 p-0 border-none"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Mục Lục
                  </h2>
                </div>
                <DesktopTocList items={tocItems} />
              </nav>
            </div>
          </aside>

          {/* Right column: Article body */}
          <main className="min-w-0">
            <ArticleBody content={articleContent} />
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
}

/**
 * Desktop TOC List — inline component with Intersection Observer
 * for active section highlighting on desktop sidebar.
 */
function DesktopTocList({ items }: { items: ReturnType<typeof parseTocItems> }) {
  const [activeId, setActiveId] = useState<string>("");

  // Intersection Observer to track active section
  useState(() => {
    if (typeof window === "undefined") return;

    // Delayed setup to ensure DOM is ready
    const timer = setTimeout(() => {
      const headingElements = items
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];

      if (headingElements.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries.filter((e) => e.isIntersecting);
          if (visibleEntries.length > 0) {
            setActiveId(visibleEntries[0].target.id);
          }
        },
        {
          rootMargin: "-100px 0px -60% 0px",
          threshold: 0,
        }
      );

      headingElements.forEach((el) => observer.observe(el));
    }, 500);

    return () => clearTimeout(timer);
  });

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  return (
    <ul className="space-y-0.5 list-none p-0 m-0">
      {items.map((item) => (
        <li key={item.id} className="m-0 p-0">
          <a
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={`
              toc-link
              ${item.level === 3 ? "pl-6 text-[0.8125rem]" : ""}
              ${activeId === item.id ? "toc-link-active" : ""}
            `}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
