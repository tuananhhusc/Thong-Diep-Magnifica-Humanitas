"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowUp } from "lucide-react";

/**
 * ScrollToTop — Magnifica Humanitas
 * 
 * Floating button that appears after scrolling down 500px.
 * Scrolls smoothly back to the top of the page.
 */

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    setIsVisible(window.scrollY > 500);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-top-btn ${isVisible ? "visible" : ""}`}
      aria-label="Cuộn lên đầu trang"
      title="Về đầu trang"
    >
      <ArrowUp size={20} strokeWidth={2} />
    </button>
  );
}
