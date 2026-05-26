"use client";

import { useState } from "react";
import { Quote, X, Copy, Check } from "lucide-react";
import { ArticleMetadata } from "@/lib/content";

export default function CitationGenerator({ metadata }: { metadata: ArticleMetadata }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const url = typeof window !== "undefined" ? window.location.href : "https://magnifica-humanitas.edu.vn";
  const year = new Date(metadata.dateISO).getFullYear();

  const citations = {
    APA: `${metadata.author}. (${year}). ${metadata.title}: ${metadata.subtitle}. Truy xuất từ ${url}`,
    MLA: `${metadata.author}. "${metadata.title}: ${metadata.subtitle}." ${year}. Web. ${new Date().toLocaleDateString("vi-VN")}. <${url}>.`,
    Chicago: `${metadata.author}. "${metadata.title}: ${metadata.subtitle}." ${year}. ${url}.`,
  };

  const handleCopy = (format: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(format);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 mt-6 mx-auto rounded-full bg-parchment-dark border border-vatican-gold/30 text-charcoal-light hover:text-cardinal hover:border-cardinal transition-all cursor-pointer"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <Quote size={16} strokeWidth={1.5} />
        <span className="text-sm font-medium">Trích dẫn tài liệu này</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-background rounded-xl shadow-2xl max-w-lg w-full p-6 border border-divider animate-fade-in relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-charcoal-light hover:text-cardinal bg-transparent border-none cursor-pointer"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold text-ink mb-4" style={{ fontFamily: "var(--font-merriweather)" }}>
              Trích dẫn tài liệu
            </h3>
            
            <div className="space-y-4">
              {Object.entries(citations).map(([format, text]) => (
                <div key={format} className="p-3 bg-blockquote-bg rounded-lg border border-divider">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-cardinal">{format}</span>
                    <button
                      onClick={() => handleCopy(format, text)}
                      className="flex items-center gap-1 text-xs text-charcoal-light hover:text-ink cursor-pointer bg-transparent border-none"
                    >
                      {copied === format ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                      {copied === format ? "Đã chép" : "Sao chép"}
                    </button>
                  </div>
                  <p className="text-sm text-charcoal leading-relaxed font-serif">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
