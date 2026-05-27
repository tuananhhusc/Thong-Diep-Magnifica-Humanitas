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
    <article className="w-full lg:max-w-3xl" role="main" aria-label="Nội dung bài viết">
      <MarkdownRenderer content={content} />
    </article>
  );
}
