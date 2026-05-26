"use client";

import { Calendar, Clock, BookOpen, Feather } from "lucide-react";
import { ArticleMetadata } from "@/lib/content";
import CitationGenerator from "@/components/CitationGenerator";

/**
 * Hero Section — Magnifica Humanitas
 * 
 * Features:
 * - Large, centered title with Playfair Display
 * - Subtitle and metadata (date, author, reading time)
 * - Ornamental Vatican Gold dividers
 * - Fade-in animations on load
 */

interface HeroProps {
  metadata: ArticleMetadata;
}

export default function Hero({ metadata }: HeroProps) {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 px-4 overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #8B0000 0.5px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Top ornament */}
        <div className="animate-fade-in flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-vatican-gold" />
          <Feather size={18} className="text-vatican-gold" strokeWidth={1.5} />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-vatican-gold" />
        </div>

        {/* Document type label */}
        <p
          className="animate-fade-in text-sm tracking-[0.2em] uppercase text-vatican-gold font-medium mb-6"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Báo Cáo Nghiên Cứu
        </p>

        {/* Main title */}
        <h1
          className="animate-fade-in-delay-1 text-4xl sm:text-5xl md:text-6xl font-bold text-ink leading-tight mb-6"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          {metadata.title}
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-in-delay-2 text-lg sm:text-xl text-charcoal-light leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ fontFamily: "var(--font-source-serif)" }}
        >
          {metadata.subtitle}
        </p>

        {/* Divider */}
        <div className="ornament-divider animate-fade-in-delay-2">
          <span className="text-vatican-gold text-lg">✦</span>
        </div>

        {/* Metadata */}
        <div
          className="animate-fade-in-delay-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-charcoal-light mb-6"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <div className="flex items-center gap-1.5">
            <Calendar size={15} className="text-cardinal" strokeWidth={1.5} />
            <time dateTime={metadata.dateISO}>{metadata.date}</time>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen size={15} className="text-cardinal" strokeWidth={1.5} />
            <span>{metadata.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={15} className="text-cardinal" strokeWidth={1.5} />
            <span>{metadata.readingTime}</span>
          </div>
        </div>

        {/* Citation Generator */}
        <div className="animate-fade-in-delay-3">
          <CitationGenerator metadata={metadata} />
        </div>
      </div>
    </section>
  );
}
