"use client";

import MarkdownRenderer from "./MarkdownRenderer";

/**
 * ArticleBody — Magnifica Humanitas
 * 
 * Wrapper component for the main article content.
 * Applies max-width constraints for optimal reading experience
 * and houses the MarkdownRenderer.
 */

interface ArticleBodyProps {
  content: string;
}

export default function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <article className="max-w-3xl mx-auto lg:mx-0" role="main" aria-label="Nội dung bài viết">
      <MarkdownRenderer content={content} />
    </article>
  );
}
