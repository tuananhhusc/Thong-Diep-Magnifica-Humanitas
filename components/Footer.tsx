import { BookOpen } from "lucide-react";

/**
 * Footer — Magnifica Humanitas
 * 
 * Lightweight footer with ornamental divider, copyright info,
 * and a subtle Vatican-inspired design.
 */

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-divider">
      {/* Ornamental top */}
      <div className="flex items-center justify-center py-8">
        <div className="w-20 h-px bg-gradient-to-r from-transparent to-vatican-gold" />
        <span className="mx-4 text-vatican-gold text-sm">✦</span>
        <div className="w-20 h-px bg-gradient-to-l from-transparent to-vatican-gold" />
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-12 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <BookOpen size={18} className="text-cardinal" strokeWidth={1.5} />
          <span
            className="text-base text-ink font-medium"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            Magnifica Humanitas
          </span>
        </div>

        {/* Description */}
        <p
          className="text-sm text-charcoal-light leading-relaxed mb-4 max-w-xl mx-auto"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Báo cáo nghiên cứu chuyên sâu về Thông điệp đầu tiên của Đức Giáo Hoàng Lêô XIV
          về đạo đức Trí tuệ Nhân tạo và bảo vệ phẩm giá con người.
        </p>

        {/* Copyright */}
        <p
          className="text-xs text-charcoal-light/60"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          © {new Date().getFullYear()} · Nghiên cứu & Phân tích · Mọi quyền được bảo lưu
        </p>
      </div>
    </footer>
  );
}
