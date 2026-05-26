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

const footnotesData: Record<string, string> = {
  "1": "Tường thuật buổi công bố công bố thông điệp đầu tiên của Đức ..., truy cập vào tháng 5 26, 2026, http://www.vietcatholic.net/News/Html/301990.htm",
  "2": "BẢN DỊCH TOÀN VĂN: THÔNG ĐIỆP MAGNIFICA HUMANITAS CỦA ĐỨC THÁNH CHA LÊÔ XIV VỀ VIỆC BẢO VỆ CON NGƯỜI TRONG THỜI ĐẠI TRÍ TUỆ NHÂN TẠO - Ephata Catholic Media, truy cập vào tháng 5 26, 2026, https://www.ephatacatholic.com/ban-dich-toan-van-thong-diep-magnifica-humanitas-cua-duc-thanh-cha-leo-xiv-ve-viec-bao-ve-con-nguoi-trong-thoi-dai-tri-tue-nhan-tao/",
  "3": "A Complete Guide to Pope Leo's First Encyclical: Magnifica Humanitas - Ascension Press, truy cập vào tháng 5 26, 2026, https://ascensionpress.com/blogs/articles/a-complete-guide-to-pope-leo-s-encyclical-magnificent-humanitas",
  "4": "Pope Leo XIV’s Encyclical Magnifica Humanitas: A Summary in English, truy cập vào tháng 5 26, 2026, https://zenit.org/2026/05/24/pope-leo-xivs-encyclical-magnifica-humanitas-a-summary-in-english/",
  "5": "Pope Leo Unveils Encyclical Magnifica Humanitas: AI Has ‘Even Greater Consequences’ Than Industrial Revolution, truy cập vào tháng 5 26, 2026, https://www.eurasiareview.com/26052026-pope-leo-unveils-encyclical-magnifica-humanitas-ai-has-even-greater-consequences-than-industrial-revolution/",
  "6": "A.I., human dignity and peace: What you need to know about Pope Leo’s first encyclical, truy cập vào tháng 5 26, 2026, https://www.americamagazine.org/podcasts/2026/05/25/a-i-human-dignity-and-peace-what-you-need-to-know-about-pope-leos-first-encyclical/",
  "7": "\"Magnifica Humanitas\" Pope Leo's Encyclical for the digital age - Caritas Internationalis, truy cập vào tháng 5 26, 2026, https://www.caritas.org/article/humanity-is-magnificent-pope-leos-encyclical-for-the-digital-age/",
  "8": "Anthropic co-founder Chris Olah's remarks on Pope Leo XIV's ..., truy cập vào tháng 5 26, 2026, https://www.anthropic.com/news/chris-olah-pope-leo-encyclical",
  "9": "5 Key Paragraphs from Pope Leo XIV's Magnifica Humanitas - Ascension Press, truy cập vào tháng 5 26, 2026, https://ascensionpress.com/blogs/articles/five-paragraphs-of-magnifica-humanitas",
  "10": "Pope Leo XIV makes historic apology for Vatican's role in legitimizing slavery, truy cập vào tháng 5 26, 2026, https://www.castanet.net/news/World/616097/Pope-Leo-XIV-makes-historic-apology-for-Vatican-s-role-in-legitimizing-slavery",
  "11": "Pope Leo XIV urges ‘fast from AI’ in first encyclical, truy cập vào tháng 5 26, 2026, https://brusselssignal.eu/2026/05/pope-leo-xiv-urges-fast-from-ai-in-first-encyclical/",
  "12": "Pope calls for robust regulation of AI in manifesto that ponders the future of humanity, truy cập vào tháng 5 26, 2026, https://www.pbs.org/newshour/world/pope-calls-for-robust-regulation-of-ai-in-manifesto-that-ponders-the-future-of-humanity",
  "13": "Magnifica Humanitas - Dicastery for Promoting Integral Human Development, truy cập vào tháng 5 26, 2026, https://www.humandevelopment.va/en/magnifica-humanitas.html",
  "14": "Encyclical Letter of His Holiness Leo XIV Magnifica Humanitas (15 May 2026), truy cập vào tháng 5 26, 2026, https://www.vatican.va/content/leo-xiv/en/encyclicals/documents/20260515-magnifica-humanitas.html",
  "15": "Pope Leo takes aim at big tech in sweeping encyclical on AI - NPR, truy cập vào tháng 5 26, 2026, https://www.npr.org/2026/05/25/nx-s1-5828375/pope-leo-to-weigh-in-on-the-perils-and-promises-of-artificial-intelligence",
  "16": "\"Magnifica Humanitas\", thông điệp đầu tiên của Đức Thánh Cha Lêô XIV sẽ được công bố ngày 25/5/2026 - GIÁO XỨ CẦN XÂY, truy cập vào tháng 5 26, 2026, http://gxucanxay.blogspot.com/2026/05/magnifica-humanitas-thong-iep-au-tien.html",
  "17": "Full Text of Magnifica Humanitas: Read Pope Leo XIV’s first encyclical, truy cập vào tháng 5 26, 2026, https://www.catholicworldreport.com/2026/05/25/full-text-of-magnifica-humanitas-read-pope-leo-xivs-first-encyclical/",
  "18": "Connecting the Dots From 'Rerum Novarum' to 'Magnifica Humanitas' - National Catholic Register, truy cập vào tháng 5 26, 2026, https://www.ncregister.com/news/connecting-the-dots-from-rerum-novarum-to-magnifica-humanitas",
  "19": "The 3 most important themes in 'Magnifica Humanitas', truy cập vào tháng 5 26, 2026, https://www.ncronline.org/opinion/ncr-voices/3-most-important-themes-magnifica-humanitas",
  "20": "Rebuilding Brick by Brick: Leo XIV's 'Magnifica Humanitas' - Word on Fire, truy cập vào tháng 5 26, 2026, https://www.wordonfire.org/articles/rebuilding-brick-by-brick-leo-xivs-magnifica-humanitas/",
  "21": "Magnifica Humanitas explained: What is Pope Leo's first encyclical? - CAFOD, truy cập vào tháng 5 26, 2026, https://cafod.org.uk/pray/magnifica-humanitas-explained",
  "22": "Another Pope Leo warned about modernization — in 1891, truy cập vào tháng 5 26, 2026, https://www.washingtonpost.com/religion/2026/05/25/comparing-pope-leo-ai-encyclical-magnifica-humanita-with-1891-document/",
  "23": "10 quotes from Pope Leo's first encyclical you should know for the era of AI, truy cập vào tháng 5 26, 2026, https://www.detroitcatholic.com/news/10-quotes-from-pope-leos-first-encyclical-you-should-know-for-the-era-of-ai",
  "24": "Pope Leo XIV Urges AI Disarmament to Prevent Human Dominance, truy cập vào tháng 5 26, 2026, https://www.chosun.com/english/world-en/2026/05/25/ZA6RNAAEFFFZ5NRDE7TJNNOWSU/",
  "25": "ENCYCLICAL - “Magnifica humanitas” and the risk of the digital age becoming “colonial in another form”, truy cập vào tháng 5 26, 2026, https://www.fides.org/en/news/77724-ENCYCLICAL_Magnifica_humanitas_and_the_risk_of_the_digital_age_becoming_colonial_in_another_form",
  "26": "Magnifica Humanitas: Pope invokes justice to combat 'anti-human vision' in AI - Interaksyon, truy cập vào tháng 5 26, 2026, https://interaksyon.philstar.com/trends-spotlights/2026/05/26/314006/magnifica-humanitas-pope-invokes-justice-to-combat-anti-human-vision-in-ai/",
  "27": "Pope Leo’s ‘Magnifica humanitas’: AI must serve humanity not concentrate power, truy cập vào tháng 5 26, 2026, https://www.detroitcatholic.com/news/pope-leos-magnifica-humanitas-ai-must-serve-humanity-not-concentrate-power",
  "28": "Pope Leo Makes Historic Apology for Vatican's Role in Legitimizing Slavery - Jakarta Globe, truy cập vào tháng 5 26, 2026, https://jakartaglobe.id/news/pope-leo-makes-historic-apology-for-vaticans-role-in-legitimizing-slavery",
  "29": "Pope issues historic apology for Vatican's role in legitimising slavery, truy cập vào tháng 5 26, 2026, https://www.indiatoday.in/world/story/pope-leo-historic-apology-for-vaticanrole-in-legitimising-slavery-2916925-2026-05-25",
  "30": "Pope Leo XIV makes historic apology for Vatican's role in legitimizing slavery | PBS News, truy cập vào tháng 5 26, 2026, https://www.pbs.org/newshour/world/pope-leo-xiv-makes-historic-apology-for-vaticans-role-in-legitimizing-slavery",
  "31": "Pope Leo XIV makes historic apology for Vatican's role in legitimizing slavery, truy cập vào tháng 5 26, 2026, https://apnews.com/article/pope-apologizes-slavery-role-holy-see-vatican-78df993c5604eb098b19f255b89b3155",
  "32": "Pope Leo apologizes for Church's historic role in slavery - The Jerusalem Post, truy cập vào tháng 5 26, 2026, https://www.jpost.com/christianworld/article-897259",
  "33": "Pope Leo XIV makes historic apology for Vatican's role in legitimizing slavery - East Idaho News, truy cập vào tháng 5 26, 2026, https://www.eastidahonews.com/2026/05/pope-leo-xiv-makes-historic-apology-for-vaticans-role-in-legitimizing-slavery/",
  "34": "Pope Leo denounces ‘culture of power’ driving rise of AI, truy cập vào tháng 5 26, 2026, https://www.theguardian.com/world/2026/may/25/pope-leo-encyclical-ai-artificial-intelligence-slavery",
  "35": "‘Magnifica Humanitas’: Pope Leo Invokes Justice to Combat ‘Anti-Human Vision’ in AI, truy cập vào tháng 5 26, 2026, https://www.ncregister.com/cna/pope-leo-ai-magnifica-humanitas?amp",
  "36": "Pope Leo XIV tells Vatican press conference AI must be ‘disarmed’ for humanity’s sake, truy cập vào tháng 5 26, 2026, https://catholictimescolumbus.org/us-world/pope-leo-xiv-tells-vatican-press-conference-ai-must-be-disarmed-for-humanitys-sake/",
  "37": "Pope Leo calls to 'disarm' AI in major document, warns of technologic threats to humanity, truy cập vào tháng 5 26, 2026, https://www.ncronline.org/vatican/pope-leo-calls-disarm-ai-major-document-warns-technologic-threats-humanity",
  "38": "Pope Leo calls for \"disarming\" of AI in technology-focused encyclical, truy cập vào tháng 5 26, 2026, https://www.cbsnews.com/news/pope-leo-ai-encyclical-artificial-intelligence/",
  "39": "Pope Leo urges significant regulation to disarm AI, truy cập vào tháng 5 26, 2026, https://www.washingtonexaminer.com/news/world/4581180/pope-leo-artificial-intelligence-regulation-encyclical/",
  "40": "Pope Leo takes big shot at Trump over Iran war; calls for ‘disarming’ of AI, truy cập vào tháng 5 26, 2026, https://timesofindia.indiatimes.com/world/rest-of-world/pope-leo-takes-big-shot-at-trump-over-iran-war-calls-for-disarming-of-ai/articleshow/131307500.cms",
  "41": "ENCYCLICAL LETTER - MAGNIFICA HUMANITAS : r/Catholicism - Reddit, truy cập vào tháng 5 26, 2026, https://www.reddit.com/r/Catholicism/comments/1tn4bis/encyclical_letter_magnifica_humanitas/",
  "42": "Pope Leo calls for strict AI regulation, warns technology 'reshaping war and humanity', truy cập vào tháng 5 26, 2026, https://indianexpress.com/article/world/pope-leo-xiv-magnifica-humanitas-ai-regulation-manifesto-just-war-theory-10707091/",
  "43": "When to Say ‘No’ to AI in the Classroom and at Home: A Key Warning of ‘Magnifica Humanitas’, truy cập vào tháng 5 26, 2026, https://www.ncregister.com/cna/when-to-say-no-to-ai-in-the-classroom-and-at-home-a-key-warning-of-magnifica-humanitas",
  "44": "Magnifica Humanitas: Pope invokes justice to combat 'anti-human vision' in AI, truy cập vào tháng 5 26, 2026, https://ewtnvatican.com/articles/magnifica-humanitas-pope-invokes-justice-to-combat-anti-human-vision-in-ai"
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
