import type { Metadata } from "next";
import { Lora, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * Root Layout — Magnifica Humanitas
 * Sets up Google Fonts (Playfair Display, Lora, Inter) via next/font/google
 * and configures SEO metadata for the academic long-read page.
 */

export const metadata: Metadata = {
  title: "Magnifica Humanitas — Phân Tích Thông Điệp Đức Giáo Hoàng Lêô XIV",
  description:
    "Báo cáo nghiên cứu chuyên sâu về Thông điệp Magnifica Humanitas của Đức Giáo Hoàng Lêô XIV: Đạo đức Trí tuệ Nhân tạo, Chủ nghĩa Nhân bản Kitô giáo, và tương lai nhân loại trong kỷ nguyên số.",
  keywords: [
    "Magnifica Humanitas",
    "Pope Leo XIV",
    "Đức Giáo Hoàng Lêô XIV",
    "AI Ethics",
    "Catholic Social Teaching",
    "Trí tuệ Nhân tạo",
    "Đạo đức công nghệ",
    "Nhân học Kitô giáo",
  ],
  openGraph: {
    title: "Thông điệp Magnifica Humanitas — Phân Tích Chuyên Sâu",
    description:
      "Báo cáo nghiên cứu toàn diện về Thông điệp đầu tiên của Đức Giáo Hoàng Lêô XIV về đạo đức AI và bảo vệ phẩm giá con người.",
    type: "article",
    locale: "vi_VN",
    url: "https://magnifica-humanitas.edu.vn",
    siteName: "Magnifica Humanitas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thông điệp Magnifica Humanitas — Phân Tích Chuyên Sâu",
    description:
      "Báo cáo nghiên cứu toàn diện về Thông điệp đầu tiên của Đức Giáo Hoàng Lêô XIV về đạo đức AI và bảo vệ phẩm giá con người.",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className={`h-full antialiased ${lora.variable} ${playfair.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="parchment"
          enableSystem={false}
          themes={["parchment", "sepia", "dark"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
