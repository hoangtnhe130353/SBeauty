# PC1 Group — Corporate Report Website (Demo)

## Mô tả dự án
Website demo trang chủ (landing page) dành cho **Công ty Cổ phần Tập đoàn PC1** (mã CK: PC1 – HOSE). Tập trung vào nội dung **báo cáo kế hoạch doanh nghiệp**, trình bày thông tin đẹp, có tính thuyết trình cao cho cổ đông, nhà đầu tư và nội bộ.

---

## Tính năng đã triển khai

### UI / Giao diện
- ✅ Header fixed, scroll detection, highlight nav link theo section đang xem
- ✅ Hero section với animated particles, KPI strip count-up, 2 CTA button
- ✅ Responsive hoàn toàn (desktop / tablet / mobile ≥ 320px)
- ✅ AOS scroll animation toàn trang
- ✅ Back-to-top button
- ✅ Toast notification
- ✅ Hamburger menu (mobile)
- ✅ Dark / light theme cho từng section

### Nội dung
- ✅ **Hero** – headline, mô tả, 4 KPI nổi bật
- ✅ **Giới thiệu PC1** – lịch sử, tầm nhìn, sứ mệnh, mini timeline cột mốc
- ✅ **Chỉ số 2024** – 6 KPI cards + 2 biểu đồ (Bar chart doanh thu/lợi nhuận, Donut chart cơ cấu doanh thu)
- ✅ **6 Mảng kinh doanh** – icon card, mô tả, highlight năm 2024
- ✅ **Dấu ấn 2024** – 6 highlight cards (flip animation)
- ✅ **Kế hoạch & Chiến lược** – progress bar kế hoạch vs. thực hiện, 5 trụ cột chiến lược, line chart tăng trưởng 2022–2026F
- ✅ **Thư viện tài liệu** – 6 tài liệu thật, filter theo danh mục, link PDF thực tế
- ✅ **Liên hệ / IR** – thông tin công ty, form yêu cầu (demo)
- ✅ **Footer** – links nhanh, tài liệu, thông tin liên hệ, ghi chú nguồn

### Biểu đồ (Chart.js)
- ✅ Bar chart: Doanh thu & LNST 2022–2024
- ✅ Doughnut chart: Cơ cấu doanh thu 2024 theo 6 mảng
- ✅ Line chart: Lộ trình tăng trưởng 2022–2026F (dự phóng)

---

## Cấu trúc file

```
index.html          # Trang chủ (all sections)
css/
  style.css         # Toàn bộ styles, responsive
js/
  main.js           # AOS, navbar, particles, counter, filter, form, back-to-top
  charts.js         # Chart.js: Revenue, Segment, Growth charts
README.md           # Tài liệu dự án
```

---

## Công nghệ sử dụng (CDN – miễn phí)

| Thư viện | Mục đích |
|---|---|
| [Google Fonts — Inter](https://fonts.google.com/specimen/Inter) | Typography |
| [Font Awesome 6.4](https://fontawesome.com/) | Icons |
| [Chart.js 4.4](https://www.chartjs.org/) | Biểu đồ dữ liệu |
| [AOS 2.3](https://michalsnik.github.io/aos/) | Scroll animations |

**Backend:** Không cần  
**Database:** Không cần  
**Chi phí:** 0 đồng (static site)

---

## Nguồn dữ liệu

| Tài liệu | Link |
|---|---|
| Báo cáo thường niên 2024 | [FPTS PDF](https://file.fpts.com.vn/FileStore2/File/2025/04/22/20250422_PC1_250422_Annual_Report_2024.pdf) |
| Nghị quyết ĐHĐCĐ 2024 | [Fiingroup PDF](https://cmsv5.fiingroup.vn/medialib/FG/2024/2024-10/2024-10-08/20241008_PC1-241008-AGM-resolution-TL.pdf) |
| Báo cáo thường niên 2023 | [Vietstock PDF](https://static2.vietstock.vn/vietstock/2024/5/23/20240523_pc1_240523_annual_report_2023.pdf) |
| BCTC bán niên 2025 (EN) | [Vietstock PDF](https://static2.vietstock.vn/vietstock/2025/9/5/lbpicn__5__20250630_pc1_sfs_en_organized.pdf) |

---

## Chỉ số hiển thị (2024)

| Chỉ tiêu | Kế hoạch | Thực hiện |
|---|---:|---:|
| Doanh thu | 10.822 tỷ | 10.089 tỷ |
| LNST | 525 tỷ | 710 tỷ (+135%) |
| Cổ tức | 15% | 15% |
| Công suất phát điện | — | 313 MW |
| Nhà máy hoạt động | — | 10 |

---

## Tính năng chưa có / gợi ý mở rộng

- [ ] Trang chi tiết từng mảng kinh doanh (multi-page)
- [ ] CMS nhẹ (Google Sheets → JSON) để cập nhật số liệu không cần sửa code
- [ ] Bản đồ dự án tương tác (Leaflet.js)
- [ ] Dark / Light mode toggle
- [ ] Bilingual VN/EN
- [ ] PDF viewer inline (không cần thoát trang)
- [ ] Form liên hệ có backend (Formspree / EmailJS)
- [ ] Tracking download tài liệu (Google Analytics)
- [ ] Scroll storytelling / parallax nâng cao

---

## Deploy miễn phí

Có thể deploy ngay lên:
- **GitHub Pages** – push lên repo, bật Pages
- **Netlify** – drag & drop folder vào netlify.com
- **Vercel** – import repo, tự động deploy

---

## Ghi chú

> Website này là **bản demo prototype** – không phải website chính thức của PC1 Group.  
> Dữ liệu được tổng hợp từ các báo cáo công bố chính thức. Biểu đồ 2025F–2026F mang tính minh họa.  
> Website chính thức: [www.pc1group.vn](https://www.pc1group.vn)
