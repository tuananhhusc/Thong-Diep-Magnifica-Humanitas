"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

/**
 * MarkdownRenderer — Magnifica Humanitas
 * 
 * Custom renderers for react-markdown that implement:
 * - Auto-generated heading IDs for TOC anchoring
 * - Styled blockquotes with Vatican Gold border
 * - Pull quotes detection (blockquotes starting with bold text in quotes)
 * - Responsive table wrapper
 * - Footnote superscripts styling with interactive glassmorphism Tooltips
 * - Drop cap on first paragraph
 */

interface MarkdownRendererProps {
  content: string;
}

// Dictionary of footnote explanations in Vietnamese
const footnotesData: Record<string, string> = {
  "1": "Buổi họp báo giới thiệu Thông điệp Magnifica Humanitas, Vatican (25/05/2026).",
  "2": "So sánh đối chiếu bối cảnh lịch sử với Thông điệp Rerum Novarum (1891) của Đức Giáo Hoàng Lêô XIII.",
  "3": "Nhận định của Bộ Giáo lý Đức tin về việc bảo vệ phẩm giá nhân vị trước đà tiến bộ kỹ thuật số.",
  "4": "Tiến trình biện chứng của Giáo lý Xã hội Công giáo trong đối thoại với các ngành khoa học hiện đại.",
  "5": "So sánh sự chuyển dịch kinh tế từ Cách mạng Công nghiệp sang kỷ nguyên Trí tuệ Nhân tạo.",
  "6": "Số liệu thống kê và cấu trúc phân bổ các chương của Thông điệp Magnifica Humanitas.",
  "7": "Vai trò đồng thuận toàn cầu trong quản trị đạo đức AI và bảo vệ tiếng nói của các cộng đồng yếu thế.",
  "8": "Đức Giáo Hoàng Lêô XIV, Thông điệp Magnifica Humanitas, Phần mở đầu: Mô hình Babel vs Jerusalem.",
  "9": "Đức Giáo Hoàng Lêô XIV, Magnifica Humanitas, Chương 3: Phân tích hiện tượng luận về tính phi trung lập của công nghệ.",
  "10": "Sắc chỉ Dum Diversas (1452) của Đức Nicholas V và diễn trình sửa đổi giáo lý về nô lệ của Tòa Thánh.",
  "11": "Đức Giáo Hoàng Lêô XIV, Magnifica Humanitas, Chương 4: Thực hành khổ chế nhận thức (Ăn chay AI).",
  "12": "Đức Giáo Hoàng Lêô XIV, Magnifica Humanitas, Chương 5: Từ bỏ thuyết chiến tranh chính nghĩa.",
  "14": "Tuyên ngôn về chủ nghĩa nhân bản Kitô giáo trước các trào lưu hậu nhân học và siêu nhân học.",
  "15": "Báo cáo quản trị kỹ trị và sự độc quyền dữ liệu lớn của các tập đoàn xuyên quốc gia.",
  "16": "Phát biểu của Đức Hồng Y Michael Czerny về sự kế thừa học thuyết xã hội trong kỷ nguyên số.",
  "18": "Diễn trình quy nạp trong Giáo lý Xã hội kể từ thời Đức Giáo Hoàng Gioan XXIII.",
  "19": "Thánh Giáo Hoàng Gioan Phaolô II, Thông điệp Laborem Exercens (1981) về phẩm giá lao động.",
  "21": "Phê phán của Tòa Thánh đối với các hệ thống vũ khí tự trị phi nhân tính.",
  "22": "Học thuyết về 'Điểm đến phổ quát của hàng hóa' áp dụng cho tài nguyên dữ liệu và tri thức số.",
  "23": "Phân tích tác động của thuật toán lọc thông tin đối với giao tiếp xã hội và nền dân chủ.",
  "24": "Nguy cơ từ chiến tranh nhận thức và thao túng hành vi chính trị thông qua AI.",
  "25": "Đức Giáo Hoàng Lêô XIV, Magnifica Humanitas, Chương 3: Phê phán Chủ nghĩa Siêu nhân và Hậu nhân.",
  "27": "Đối thoại triết học giữa học thuyết Aquinas và nhân học Kitô giáo hiện đại về sự mỏng manh của con người.",
  "30": "Phân tích lịch sử sự lên án muộn màng của Giáo hội đối với chế độ chiếm hữu nô lệ.",
  "34": "Nghiên cứu kỹ thuật về tốc độ chuỗi tiêu diệt (kill chains) của AI và tính bất khả của jus in bello.",
  "38": "Diễn trình căng thẳng ngoại giao giữa Tòa Thánh và các chính sách quân sự đơn phương.",
  "40": "Tuyên bố của Đức Lêô XIV về sự kết thúc của học thuyết tự vệ phòng ngừa bằng vũ lực.",
  "43": "Kêu gọi thành lập Liên minh Giáo dục toàn cầu nhằm bảo vệ năng lực suy ngẫm của giới trẻ."
};

const superscripts = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const normalDigits = "0123456789";

function toNormalDigits(superStr: string): string {
  return [...superStr]
    .map((char) => {
      const idx = superscripts.indexOf(char);
      return idx !== -1 ? normalDigits[idx] : char;
    })
    .join("");
}

// Interactive Footnote Tooltip component
function FootnoteTooltip({ num, children }: { num: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const tooltipRef = useRef<HTMLSpanElement | null>(null);

  const explanation = footnotesData[num] || `Chú thích số ${num}.`;

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        tooltipRef.current && !tooltipRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <span className="relative inline-block select-none">
      <button
        ref={triggerRef}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="inline-flex items-center justify-center font-bold text-xs text-cardinal hover:text-cardinal-light bg-transparent border-none cursor-pointer p-0.5 outline-none -top-1 relative animate-pulse"
        aria-describedby={`fn-desc-${num}`}
      >
        {children}
      </button>

      {isOpen && (
        <span
          ref={tooltipRef}
          id={`fn-desc-${num}`}
          className="fixed sm:absolute z-50 bottom-4 sm:bottom-full left-4 sm:left-1/2 right-4 sm:right-auto sm:-translate-x-1/2 mb-0 sm:mb-2 w-auto sm:w-64 p-3.5 rounded-lg border border-divider bg-parchment shadow-lg text-xs font-normal leading-relaxed text-charcoal animate-fade-in block"
          style={{
            fontFamily: "var(--font-inter)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",
          }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* Vatican Gold Accent Line */}
          <span className="absolute top-0 left-0 right-0 h-0.5 bg-vatican-gold rounded-t-lg" />
          
          <span className="block font-semibold text-cardinal mb-1">
            Chú thích {num}
          </span>
          <span className="block text-ink opacity-90">
            {explanation}
          </span>
        </span>
      )}
    </span>
  );
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Pre-process content: find all superscripts and wrap them in markdown link syntax
  const processedContent = useMemo(() => {
    return content.replace(/([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (match) => {
      const digits = toNormalDigits(match);
      return `[${match}](#fn-${digits})`;
    });
  }, [content]);

  const components: Components = {
    // Headings: add IDs for anchor linking
    h2: ({ children }) => {
      const text = extractText(children);
      const id = generateId(text);
      return (
        <h2 id={id} className="group">
          {children}
        </h2>
      );
    },

    h3: ({ children }) => {
      const text = extractText(children);
      const id = generateId(text);
      return (
        <h3 id={id} className="group">
          {children}
        </h3>
      );
    },

    // Paragraphs: render normally, drop cap is handled via CSS
    p: ({ children }) => {
      return <p>{children}</p>;
    },

    // Blockquotes: detect pull quotes vs regular blockquotes
    blockquote: ({ children }) => {
      const text = extractText(children);
      
      // Pull quotes: start with bold quoted text (pattern: > **"...")
      const isPullQuote =
        text.startsWith('"') || text.startsWith('\u201C') || text.startsWith('"');

      if (isPullQuote) {
        return (
          <div className="pull-quote" role="figure" aria-label="Trích dẫn nổi bật">
            {children}
          </div>
        );
      }

      return <blockquote>{children}</blockquote>;
    },

    // Tables: wrap in responsive container
    table: ({ children }) => {
      return (
        <div className="table-wrapper" role="region" aria-label="Bảng dữ liệu" tabIndex={0}>
          <table>{children}</table>
        </div>
      );
    },

    // Links: override to handle interactive footnotes vs normal links
    a: ({ href, children }) => {
      if (href?.startsWith("#fn-")) {
        const num = href.replace("#fn-", "");
        return <FootnoteTooltip num={num}>{children}</FootnoteTooltip>;
      }

      const isExternal = href?.startsWith("http");
      return (
        <a
          href={href}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },

    // Lists
    ul: ({ children }) => (
      <ul className="space-y-2 list-disc pl-6">{children}</ul>
    ),

    li: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),

    // Strong text with subtle color treatment
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),

    // Emphasis/italic
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),

    // Horizontal rules as ornamental dividers
    hr: () => (
      <div className="ornament-divider my-10">
        <span className="text-vatican-gold text-base">✦</span>
      </div>
    ),
  };

  return (
    <div className="prose-article">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}

/**
 * Extract plain text from React children (handles nested elements)
 */
function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (React.isValidElement(children) && (children.props as Record<string, unknown>)?.children) {
    return extractText((children.props as Record<string, unknown>).children as React.ReactNode);
  }
  return "";
}

/**
 * Generate URL-friendly ID from heading text
 */
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
