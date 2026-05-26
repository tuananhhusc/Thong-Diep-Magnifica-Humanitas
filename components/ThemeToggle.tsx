"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Book } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-[96px] h-[34px]"></div>;

  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-parchment-dark/50 border border-divider/30">
      <button
        onClick={() => setTheme("parchment")}
        className={`p-1.5 rounded-full transition-all border-none cursor-pointer ${
          theme === "parchment" ? "bg-background shadow-sm text-cardinal" : "bg-transparent text-charcoal-light hover:text-ink"
        }`}
        title="Chế độ Giấy da (Sáng)"
        aria-label="Sáng"
      >
        <Sun size={14} strokeWidth={2} />
      </button>
      <button
        onClick={() => setTheme("sepia")}
        className={`p-1.5 rounded-full transition-all border-none cursor-pointer ${
          theme === "sepia" ? "bg-background shadow-sm text-cardinal" : "bg-transparent text-charcoal-light hover:text-ink"
        }`}
        title="Chế độ Sepia (Cổ điển)"
        aria-label="Sepia"
      >
        <Book size={14} strokeWidth={2} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-full transition-all border-none cursor-pointer ${
          theme === "dark" ? "bg-background shadow-sm text-cardinal" : "bg-transparent text-charcoal-light hover:text-ink"
        }`}
        title="Chế độ Tối"
        aria-label="Tối"
      >
        <Moon size={14} strokeWidth={2} />
      </button>
    </div>
  );
}
