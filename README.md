# SpendWise — Quản lý ngân sách & thói quen chi tiêu

Nguyên mẫu Web Frontend cho **BTL-18 · CSE122 (Phát triển ứng dụng web cơ bản)**.
4 vai trò, 19 màn hình, 3 tính năng AI mô phỏng — viết bằng HTML/CSS/JavaScript thuần, không cần cài đặt gì.

## Chạy thử

Cách 1: mở trực tiếp `index.html` bằng trình duyệt (double-click).

Cách 2: dùng server tĩnh nếu muốn

```bash
npx serve .
```

Truy cập `http://localhost:3000` → Đăng nhập → chọn vai trò.

**Tài khoản demo:** mật khẩu chung `123456`, ví dụ `minh@student.edu.vn` (người dùng).
Trang đăng nhập cũng có các nút **Đăng nhập nhanh** cho từng vai trò.

## Cấu trúc

```text
cse122-spendwise/
├── index.html                    # Trang chủ (giới thiệu + chọn vai trò)
├── css/
│   └── style.css                 # Design system dùng chung (token, nút, thẻ, modal…)
├── js/
│   ├── theme.js                  # Đổi giao diện sáng/tối, lưu lựa chọn vào LocalStorage
│   ├── data.js                   # Dữ liệu mẫu (users, categories, transactions…)
│   ├── api.js                    # API giả lập: trễ 400–900ms, LocalStorage, archive
│   ├── ai.js                     # 3 tính năng AI theo quy tắc + trạng thái thất bại
│   ├── ui.js                     # Hàm dùng chung: định dạng, bảng, skeleton, toast, modal, AI
│   └── layout.js                 # Dựng sidebar + topbar theo vai trò
├── pages/                        # 18 màn hình (đúng tên tệp theo đề)
└── docs/
    ├── Giai-thich-code.md        # Giải thích code + 12 câu hỏi vấn đáp
    └── SpendWise-Thiet-ke-giao-dien.pptx
```

Mỗi trang nghiệp vụ chỉ còn 2 phần:

1. `<link rel="stylesheet" href="../css/style.css">` — dùng chung design system.
2. Script nạp lõi theo đúng thứ tự `data.js → api.js → ai.js → ui.js → layout.js`, rồi tới
   `<script>` riêng của trang (ví dụ: `login.html` chỉ lo kiểm tra form và chuyển vai trò).

`ui.js` chứa các hàm dùng chung như `SW.$`, `SW.toast`, `SW.openModal`, `SW.loadInto`,
`SW.table`, `SW.skeleton`, `SW.onClick`, `SW.runAI`, `SW.runAction`, `SW.confirmAndRun`;
`layout.js` chỉ lo dựng menu và thanh trên cùng. Các trang đều theo cùng 4 bước:
**tải dữ liệu → vẽ HTML → gắn sự kiện → khởi động**, nên rất dễ đọc và dễ giải thích.
Skeleton chờ tải do `SW.loadInto` tự vẽ, nên HTML của trang không cần giữ các khung xương
tĩnh. Bố cục lặp lại được gom thành lớp tiện ích trong `style.css` (`.row`, `.toolbar`,
`.actions`, `.grid-cards`, `.text-small`…), nên HTML/JS của trang không cần inline style.

Riêng `js/theme.js` nạp trong `<head>` để áp giao diện sáng/tối trước khi trang hiện ra.
`index.html` là trang tĩnh; `403.html` và `404.html` chỉ cần CSS và `theme.js`, không cần JavaScript nghiệp vụ.

> Muốn đổi giao diện toàn hệ thống: sửa `css/style.css`. Muốn đổi dữ liệu mẫu: sửa
> `js/data.js`. Muốn đổi quy tắc API/AI: sửa `js/api.js` hoặc `js/ai.js`.

## Danh sách màn hình

19 màn hình = 1 trang chủ + 18 trang trong `pages/`.

| Vai trò | Tệp | CRUD | AI |
|---|---|---|---|
| Dùng chung | `index.html` | R | — |
| Người dùng | `user-finance-dashboard.html` | R | AI-2 Phân tích pattern |
| Người dùng | `user-transaction-management.html` | C/R/U + Archive | AI-1 Gợi ý danh mục |
| Người dùng | `user-saving-goals.html` | C/R/U/D + Hoàn thành/Huỷ | AI-3 Goal Coach |
| Người dùng | `user-budgets.html` | C/R/U + Archive | — |
| Huấn luyện viên | `coach-client-list.html` | R | — |
| Huấn luyện viên | `coach-budget-review.html` | R/U + C (coachNotes) | — |
| Huấn luyện viên | `coach-resource-management.html` | C/R/U/D | — |
| Kiểm duyệt viên | `moderator-resource-review.html` | R + U (duyệt/từ chối kèm lý do) | — |
| Kiểm duyệt viên | `moderator-ai-template-management.html` | C/R/U + Chạy thử | AI-1 (chạy thử mẫu) |
| Kiểm duyệt viên | `moderator-feedback-center.html` | C/R/U/D | — |
| Quản trị viên | `admin-expense-category-management.html` | R + Archive/Khôi phục | — |
| Quản trị viên | `admin-user-management.html` | C/R/U + Khoá/Mở | — |
| Quản trị viên | `admin-system-dashboard.html` | C/R/U/D (thông báo) + R (KPI, logs) | — |
| Dùng chung | `login.html`, `register.html`, `forgot-password.html` | C (đăng ký) | — |
| Lỗi | `403.html`, `404.html` | — | — |

## Trải nghiệm AI (đề mục 11–12)

Mỗi tính năng AI đều đi đủ luồng:
**Nhập → Kiểm tra hợp lệ → Đang xử lý (skeleton) → Kết quả → Vì sao có kết quả này? → Chấp nhận / Từ chối / Tạo lại → Lưu.**

Trạng thái thất bại được mô phỏng chủ động:

- AI-1: tên giao dịch quá ngắn hoặc không khớp từ khoá nào → "chưa chắc chắn".
- AI-2: ít hơn 5 khoản chi trong kỳ → "không đủ dữ liệu".
- AI-3: số tiền cần để dành mỗi tuần vượt khả năng → "chưa khả thi, nên kéo dài thời hạn".
- **Mô phỏng lỗi kết nối:** bấm nút `⚠️ Mô phỏng lỗi` trên topbar của bất kỳ trang nào →
  mọi API/AI trả lỗi để demo trạng thái lỗi + nút Thử lại. Bấm lần nữa để tắt.

## Dữ liệu

- Lưu trong `localStorage` (khoá `spendwise.db.v1`), nạp lần đầu từ `js/data.js`.
- Nút `♻️ Reset dữ liệu` trên topbar xoá dữ liệu local và nạp lại mẫu gốc.
- Xoá nghiệp vụ = **lưu trữ** (`status: "archived"`), không xoá cứng để giữ lịch sử.

## Giao diện sáng/tối

- Nút **🌙 Tối / ☀️ Sáng** nằm trên topbar của 13 trang vai trò, trong thẻ ở trang
  đăng nhập/đăng ký/quên mật khẩu, và ở góc phải trang 403/404.
- Lựa chọn lưu ở `localStorage` (khoá `spendwise.theme`), tải lại trang vẫn giữ nguyên.
- Chỉ đổi biến màu trong `css/style.css`; không phải sửa 19 trang.

## Tài liệu học và vấn đáp

Xem `docs/Giai-thich-code.md`: sơ đồ luồng dữ liệu, bảng chức năng từng trang,
bộ câu hỏi – trả lời và kịch bản demo 4 phút.

## Quản lý dự án với Trello

Bộ nội dung board dành cho nhóm **2 SV** nằm trong `docs/trello/`:

- `KE-HOACH-TRELLO.md` — cách tạo board, phân công SV1/SV2 và quy trình hằng ngày.
- `board-data.js` — nội dung 33 thẻ, 5 cột và 8 nhãn, mỗi thẻ có 7 trường minh chứng.
- `tao-board.js` — tạo board tự động qua API Trello (có chế độ `--dry-run`).
