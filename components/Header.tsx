"use client";

import { useEffect, useState, useCallback } from "react";
import { BookOpen, Menu } from "lucide-react";

/**
 * Header Component — Magnifica Humanitas
 * 
 * Features:
 * - Minimalist design with parchment background
 * - Auto-hide on scroll down, show on scroll up
 * - Reading progress bar (Cardinal Red gradient) at the top
 * - Mobile TOC toggle button
 */

interface HeaderProps {
  onToggleMobileToc: () => void;
}
import ThemeToggle from "@/components/ThemeToggle";
import TextSizeControl from "@/components/TextSizeControl";

export default function Header({ onToggleMobileToc }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Calculate reading progress
    const scrollProgress = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0;
    setProgress(Math.min(scrollProgress, 100));

    // Add background blur when scrolled
    setIsScrolled(currentScrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Calculate remaining reading time (assuming 45 mins total)
  const remainingTime = Math.max(1, Math.ceil(45 * (1 - progress / 100)));

  return (
    <>
      {/* Reading Progress Bar */}
      <div
        className="reading-progress"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Tiến trình đọc bài viết"
      />

      {/* Header */}
      <header
        className={`
          header-container fixed top-0 left-0 right-0 z-50 header-visible
          ${isScrolled ? "header-scrolled" : "bg-transparent"}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand */}
            <a
              href="#"
              className="flex items-center gap-2.5 no-underline group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <BookOpen
                size={22}
                className="text-cardinal transition-colors group-hover:text-cardinal-light"
                strokeWidth={1.5}
              />
              <span
                className="text-lg tracking-wide text-ink transition-colors group-hover:text-cardinal hidden sm:inline"
                style={{ fontFamily: "var(--font-merriweather)" }}
              >
                Magnifica Humanitas
              </span>
            </a>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Dynamic Reading Time (hidden on very small screens) */}
              <span 
                className="hidden md:inline-block text-xs font-medium text-charcoal-light mr-2"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Còn ~{remainingTime} phút
              </span>

              {/* Theme & Text Size */}
              <div className="flex items-center gap-1.5 sm:gap-2 mr-1 sm:mr-2">
                <TextSizeControl />
                <ThemeToggle />
              </div>

              {/* Mobile TOC Toggle */}
              <button
                onClick={onToggleMobileToc}
                className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg
                           text-charcoal-light hover:text-cardinal hover:bg-parchment-dark
                           transition-all duration-200 cursor-pointer border-none bg-transparent"
                style={{ fontFamily: "var(--font-inter)" }}
                aria-label="Mở mục lục"
              >
                <Menu size={20} strokeWidth={1.5} />
                <span className="text-sm font-medium hidden sm:inline">Mục lục</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
