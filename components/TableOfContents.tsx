"use client";

import { useEffect, useState, useCallback } from "react";
import { List, ChevronRight, X } from "lucide-react";

/**
 * Table of Contents — Magnifica Humanitas
 * 
 * Features:
 * - Automatically parses headings from markdown content
 * - Sticky sidebar on desktop (left column)
 * - Active section highlighting via Intersection Observer
 * - Smooth scroll on click
 * - Mobile: slide-in drawer with overlay
 */

export interface TocItem {
  id: string;
  text: string;
  level: number; // 2 for ##, 3 for ###
}

interface TableOfContentsProps {
  items: TocItem[];
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function TableOfContents({
  items,
  isMobileOpen,
  onCloseMobile,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  // Lock body scroll when mobile TOC drawer is open to improve UX
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Intersection Observer to track active section
  useEffect(() => {
    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible entry
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
    return () => observer.disconnect();
  }, [items]);

  const handleClick = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveId(id);
        onCloseMobile();
      }
    },
    [onCloseMobile]
  );

  return (
    <>
      {/* Mobile: Drawer overlay */}
      <div
        className={`toc-drawer-overlay lg:hidden ${isMobileOpen ? "open" : ""}`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      {/* Mobile: Drawer panel */}
      <div
        className={`toc-drawer lg:hidden ${isMobileOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mục lục di động"
      >
        <div className="p-6">
          {/* Close button */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <List size={18} className="text-cardinal" strokeWidth={1.5} />
              <span
                className="text-sm font-semibold uppercase tracking-[0.15em] text-charcoal"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Mục Lục
              </span>
            </div>
            <button
              onClick={onCloseMobile}
              className="p-2 rounded-lg hover:bg-parchment-dark transition-colors cursor-pointer border-none bg-transparent text-charcoal-light"
              aria-label="Đóng mục lục"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* TOC Items (mobile) */}
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
                  <span className="flex items-start gap-1.5">
                    {activeId === item.id && (
                      <ChevronRight
                        size={14}
                        className="mt-0.5 flex-shrink-0 text-cardinal"
                        strokeWidth={2}
                      />
                    )}
                    <span>{item.text}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

/**
 * Utility: Parse headings from markdown content to generate TOC items.
 * Extracts ## and ### headings and creates URL-friendly IDs.
 */
export function parseTocItems(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const items: TocItem[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      items.push({ id, text, level });
    }
  }

  return items;
}
