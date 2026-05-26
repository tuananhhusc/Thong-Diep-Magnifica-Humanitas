"use client";

import { useState, useEffect } from "react";
import { Type } from "lucide-react";

export default function TextSizeControl() {
  const [size, setSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("magnifica-text-size") as "normal" | "large" | "xlarge";
    if (saved) {
      setSize(saved);
      document.documentElement.setAttribute("data-text-size", saved);
    }
  }, []);

  const cycleSize = () => {
    const nextSize = size === "normal" ? "large" : size === "large" ? "xlarge" : "normal";
    setSize(nextSize);
    document.documentElement.setAttribute("data-text-size", nextSize);
    localStorage.setItem("magnifica-text-size", nextSize);
  };

  if (!mounted) return <div className="w-[34px] h-[34px]"></div>;

  return (
    <button
      onClick={cycleSize}
      className="flex items-center justify-center p-2 rounded-full bg-parchment-dark/50 border border-divider/30 text-charcoal-light hover:text-ink hover:bg-parchment-deeper transition-colors cursor-pointer"
      title={`Cỡ chữ: ${size === "normal" ? "Tiêu chuẩn" : size === "large" ? "Lớn" : "Rất lớn"}`}
      aria-label="Đổi cỡ chữ"
    >
      <Type size={16} strokeWidth={2} />
      {size === "large" && <span className="text-[10px] ml-0.5 font-bold">+</span>}
      {size === "xlarge" && <span className="text-[10px] ml-0.5 font-bold">++</span>}
    </button>
  );
}
