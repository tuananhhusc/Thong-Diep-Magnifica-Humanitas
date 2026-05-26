# Magnifica Humanitas — Nền Tảng Trải Nghiệm Đọc Học Thuật Cao Cấp

**Magnifica Humanitas** là một dự án web được thiết kế đặc biệt cho mục đích đọc tài liệu dài (long-read), học thuật và nghiên cứu chuyên sâu. Giao diện được lấy cảm hứng từ phong cách học thuật cao cấp và mỹ thuật Vatican cổ điển (Tông màu đỏ Cardinal, vàng Vatican Gold, nền giấy da Parchment), tối ưu hóa tuyệt đối về mặt hiển thị văn bản tiếng Việt và trải nghiệm đọc trong thời gian dài.

Nội dung cốt lõi của trang web là bài phân tích chuyên sâu về thông điệp mang tính tiên tri cùng tên của Đức Giáo Hoàng Lêô XIV về đạo đức Trí tuệ Nhân tạo (AI Ethics), Chủ nghĩa Nhân bản Kitô giáo, và tương lai của nhân loại trong kỷ nguyên số.

---

## 🌟 Tính Năng Nổi Bật

### 1. Trải Nghiệm Đọc & Cá Nhân Hóa (Reading UX)
*   **Hệ thống Chuyển đổi Giao diện (Theme Switcher):** Hỗ trợ 3 chế độ đọc thích ứng cao thông qua thư viện `next-themes`, ngăn chặn tình trạng chớp màn hình (FOUC):
    *   *Giấy da (Parchment):* Tông màu kem cổ điển, mặc định, dịu mắt.
    *   *Sepia (Cổ điển):* Nền ngả nâu gỗ và chữ nâu trầm ấm.
    *   *Tối (Dark Mode):* Nền đen mun `#121212` và chữ xám sáng, lý tưởng cho việc đọc vào ban đêm.
*   **Trình điều chỉnh cỡ chữ (Font Resizer):** Cho phép người đọc tăng/giảm cỡ chữ nền (scale base font size) trực tiếp qua 3 mức độ: Tiêu chuẩn, Lớn (`+`), và Rất Lớn (`++`). Cài đặt này được lưu tự động trong `localStorage` cho các lần truy cập tiếp theo.
*   **Thanh công cụ cố định (Sticky Header):** Luôn hiển thị ở đầu trang khi cuộn xuống để người đọc dễ dàng thay đổi cấu hình hiển thị mọi lúc. Đi kèm thanh tiến trình đọc (Reading Progress Bar) và chỉ số thời gian đọc còn lại thời gian thực (ví dụ: *Còn ~15 phút*).

### 2. Tiện Ích Học Thuật Chuyên Sâu
*   **Chú thích tương tác (Interactive Footnote Tooltips):** 
    *   Mã nguồn tự động phân tích các ký tự số mũ superscript học thuật (ví dụ: `¹`, `²`, `³`...) trong văn bản Markdown.
    *   Khi người dùng di chuột (hover trên PC) hoặc chạm (click trên Mobile) vào số chú thích, một khung hội thoại (Popover) mang phong cách kính mờ (glassmorphism), viền Vatican Gold sẽ hiện lên tại chỗ để giải nghĩa chi tiết nguồn trích dẫn.
    *   Hỗ trợ đóng tooltip tự động khi nhấn ra ngoài vùng hiển thị (click-outside).
*   **Bộ tạo trích dẫn học thuật (Citation Generator):** Nút **"Trích dẫn tài liệu này"** nằm tại phần đầu bài viết mở ra một Modal cung cấp sẵn cấu trúc trích dẫn tài liệu chuẩn APA, MLA, và Chicago kèm tính năng một click để chép vào khay nhớ tạm (Copy to Clipboard).
*   **Bố cục tối ưu in ấn (Print Layout):** Tích hợp CSS `@media print` chuyên biệt. Khi người dùng nhấn `Ctrl + P` để in hoặc lưu thành file PDF:
    *   Ẩn toàn bộ Header, Footer, Thanh điều hướng (TOC), và các nút tương tác.
    *   Chiều rộng bài viết tự động lấp đầy 100% trang giấy A4.
    *   Bảng màu chuyển hoàn toàn về nền trắng chữ đen độ tương phản cao để tiết kiệm mực và đọc bản cứng dễ dàng.

### 3. Thiết Kế & Điều Hướng
*   **Bố cục Grid hai cột:**
    *   *Desktop (≥1024px):* Cột trái chiếm 280px làm Mục lục (Table of Contents) cố định, cột phải hiển thị nội dung đọc.
    *   *Mobile/Tablet:* Nội dung hiển thị một cột đầy đủ. Mục lục được ẩn đi và truy cập nhanh thông qua một Drawer trượt từ cạnh trái sang (kèm hiệu ứng làm mờ nền tối).
*   **Mục lục thông minh:** Tự động bắt vị trí cuộn trang để đánh dấu nổi bật (active) mục tương ứng người dùng đang đọc thông qua API `IntersectionObserver`.

---

## 🛠️ Công Nghệ Sử Dụng

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router, tối ưu hóa SEO và tải trang tĩnh).
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Hệ thống Theme Token cấu hình trực tiếp qua CSS Variables).
*   **Icons:** [Lucide React](https://lucide.dev/) (Bộ icon vector tối giản, sắc nét).
*   **Quản lý giao diện:** [Next Themes](https://github.com/pacocoursey/next-themes) (Tránh flash trang và đồng bộ hóa chế độ hệ thống).
*   **Bộ phân tích văn bản:** [React Markdown](https://github.com/remarkjs/react-markdown) & [Remark GFM](https://github.com/remarkjs/remark-gfm) (Render bảng biểu, trích dẫn, liên kết, danh sách từ tệp Markdown nguồn sang HTML ngữ nghĩa).

---

## 📂 Cấu Trúc Thư Mục Dự Án

```
├── app/
│   ├── globals.css         # Hệ thống Design Tokens của Tailwind v4 & Định nghĩa biến CSS các theme
│   ├── layout.tsx          # Cấu hình Google Fonts (Playfair, Lora, Inter), SEO Metadata & ThemeProvider
│   └── page.tsx            # Trang chủ chính, bố cục lưới hai cột & Desktop TOC
├── components/
│   ├── ArticleBody.tsx     # Bọc phần nội dung đọc
│   ├── CitationGenerator.tsx # Modal tạo trích dẫn APA/MLA/Chicago
│   ├── Footer.tsx          # Chân trang phong cách tối giản học thuật
│   ├── Header.tsx          # Thanh công cụ cố định chứa nút cỡ chữ, theme switcher & tiến trình đọc
│   ├── Hero.tsx            # Phần đầu trang hiển thị tiêu đề chính, mô tả và nút trích dẫn
│   ├── MarkdownRenderer.tsx# Trình biên dịch Markdown với logic Footnote Tooltip
│   ├── ScrollToTop.tsx     # Nút nổi cuộn nhanh về đầu trang
│   ├── TableOfContents.tsx # Mục lục di động (Slide-out drawer) & Hàm tách đề mục
│   ├── TextSizeControl.tsx # Nút chu kỳ thay đổi kích thước phông chữ
│   ├── ThemeProvider.tsx   # Provider quản lý class theme của next-themes
│   └── ThemeToggle.tsx     # Nút đổi theme Giấy da / Sepia / Dark Mode
├── lib/
│   └── content.ts          # Lưu trữ Metadata bài viết và toàn bộ nội dung Markdown (gần 42.000 từ)
├── public/                 # Các tệp tĩnh (favicon, hình ảnh)
├── package.json            # Quản lý thư viện phụ thuộc và script chạy lệnh
└── tsconfig.json           # Cấu hình TypeScript cho dự án
```

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

### Yêu cầu hệ thống
*   Đã cài đặt **Node.js** (Phiên bản gợi ý: v18.0.0 trở lên).

### Bước 1: Tải dependencies
Di chuyển vào thư mục dự án và chạy lệnh sau để tải các gói thư viện cần thiết:
```bash
npm install
```

### Bước 2: Chạy ở chế độ Phát triển (Development)
Khởi động máy chủ phát triển cục bộ:
```bash
npm run dev
```
Sau đó mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000).

### Bước 3: Biên dịch sản xuất (Production Build)
Để biên dịch và tối ưu hóa trang tĩnh phục vụ việc deploy chạy chính thức:
```bash
npm run build
```

Sau khi build xong, bạn có thể chạy thử bản build chính thức bằng lệnh:
```bash
npm run start
```

---

## 🎨 Cấu Hình Theme và Tùy Biến Thẩm Mỹ

Màu sắc của toàn bộ hệ thống được định nghĩa qua các biến CSS tùy biến trong tệp [app/globals.css](file:///d:/Magnifica%20Humanitas/app/globals.css). Để chỉnh sửa màu nền, màu viền hoặc màu chữ cho từng theme, bạn chỉ cần thay đổi giá trị của các biến tương ứng dưới đây:

```css
:root, .parchment {
  --background: #FDFBF7;
  --foreground: #0f1419;
  --theme-cardinal: #8B0000;
  --theme-vatican-gold: #C5A059;
  --theme-divider: #D4CFC3;
  --theme-blockquote-bg: #FAF7F0;
  --theme-table-header: #F3EDE0;
  --theme-table-border: #E5DFD0;
  --theme-text-muted: #374151;
  --theme-header-scrolled-bg: rgba(253, 251, 247, 0.94);
  --theme-blockquote-bg-gradient: linear-gradient(135deg, #FAF7F0, #F5F0E6);
  --theme-blockquote-text: #273444;
  --theme-table-header-gradient: linear-gradient(135deg, #F3EDE0, #EDE6D6);
  --theme-toc-drawer-bg: #FDFBF7;
  --theme-link-hover-bg: #FAF7F0;
}
```

Tương tự, các khối lớp `.sepia` và `.dark` chứa các định nghĩa tương ứng giúp giao diện đổi màu mượt mà, tự nhiên và đồng bộ.
