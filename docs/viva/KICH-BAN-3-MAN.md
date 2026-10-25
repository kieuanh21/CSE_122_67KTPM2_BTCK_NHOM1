# KỊCH BẢN VIVA 3 MÀN — SpendWise (BTL-18)

Tài liệu này là bản chạy tại chỗ (run-sheet) cho 8 yêu cầu trong buổi vấn đáp:
webcam + giọng nói, mockup, mở file trong VS Code, giải thích HTML/CSS và JS,
sửa code trực tiếp, test tương tác + responsive, commit/push GitHub, đọc Task ID
– branch – commit.

Ba màn được chọn (đều thuộc luồng **Người dùng**, Task **TASK-20** của SV1):

| # | Màn hình | File | Tính năng AI | Mockup | OBS |
|---|---|---|---|---|---|
| 1 | Bảng điều khiển tài chính | `pages/user-finance-dashboard.html` | AI-2 phân tích thói quen chi tiêu | `docs/viva/mockups/slide-14.png` | `SV1-05-dashboard` |
| 2 | Quản lý giao dịch | `pages/user-transaction-management.html` | AI-1 gợi ý danh mục | `docs/viva/mockups/slide-15.png` | `SV1-06-transactions` |
| 3 | Mục tiêu tiết kiệm | `pages/user-saving-goals.html` | AI-3 lập kế hoạch tiết kiệm | `docs/viva/mockups/slide-16.png` | `SV1-07-goals` |

Lý do chọn: đúng phần việc SV1, có đủ 3 tính năng AI, có mockup trong bộ slide
thiết kế (slide 14–16), thể hiện được CRUD + responsive + trạng thái lỗi.

> **Số dòng trong tài liệu tính theo bản baseline trên nhánh `dev`.** Khi chèn
> thêm dòng lúc demo, các dòng phía dưới tự dịch xuống 1 dòng — không cần đọc
> lại số dòng sau khi sửa.

---

## 0. Chuẩn bị một lần trước khi quay

### 0.1. Chặn bắt buộc: GitHub remote

Hiện repo mới chỉ có local, **chưa có remote**. Không thể demo `git push` nếu
chưa làm bước này. Làm và thử push trước ngày quay:

1. Tạo repo trên GitHub, ví dụ `cse122-spendwise` (private thì mời giảng viên và
   SV2 vào, hoặc để public theo yêu cầu môn học).
2. Trong thư mục dự án:

```bash
cd C:\Users\ASUS\Downloads\cse122-spendwise
git remote add origin https://github.com/<tài-khoản>/cse122-spendwise.git
git push -u origin main
git push -u origin dev
```

3. Vào GitHub kiểm tra thấy commit baseline `ffb5046` và các nhánh `main`, `dev`.

### 0.2. Danh tính Git thật (repo-local, không dùng email giả)

```bash
git config user.name "Mai Thị Phương Anh"
git config user.email "<email đăng nhập GitHub của bạn>"
git config --local --list
```

Chỉ đặt trong repo này. **Không** dùng `--global` nếu máy còn dự án khác.
Commit baseline và commit tài liệu viva được tạo bằng danh tính nhóm
(`SpendWise BTL-18 <btl18@local.invalid>`) — đó là commit scaffolding, không
phải commit của giảng viên hay của SV2. Ba commit demo phải mang danh tính thật
của người quay.

### 0.3. Mockup trên Canva

- Ảnh đã xuất sẵn: `docs/viva/mockups/slide-14.png`, `slide-15.png`,
  `slide-16.png` (1920×1080).
- Vào Canva → tạo design 1920×1080 → upload 3 ảnh, mỗi ảnh một trang → đặt tên
  theo màn hình → **Share → Anyone with the link can view** → copy link.
- Dán link vào thẻ **TASK-10** trên Trello.
- Khi quay: mở Canva ở cửa sổ thứ hai (hoặc mở PowerPoint slide 14–16) và nói:
  *“Đây là mockup nhóm em thiết kế trong bộ slide, em xuất PNG và đưa lên Canva
  để trình chiếu.”*
- **Không nói** “file Figma của em” vì nhóm không có file Figma. Nếu giảng viên
  hỏi công cụ: trả lời trung thực là thiết kế trong PowerPoint/Canva.

### 0.4. VS Code

- Mở đúng thư mục `C:\Users\ASUS\Downloads\cse122-spendwise` (không mở cả ổ D).
- Mỗi màn mở 3 tab: file HTML của trang, `css/style.css`, file JS liên quan
  (`js/ai.js` hoặc `js/ui.js`).
- Terminal: `Ctrl + ~`. Ẩn các tab không liên quan để người xem không rối.
- Bật word wrap cho dễ nhìn: `Alt + Z`.

### 0.5. Chạy web và trình duyệt

Cách 1 — VS Code Live Server: chuột phải `index.html` → **Open with Live Server**.

Cách 2 — Python có sẵn trên máy:

```bash
cd C:\Users\ASUS\Downloads\cse122-spendwise
python -m http.server 4173
```

Mở `http://localhost:4173/` → đăng nhập nhanh **Người dùng**. Tài khoản demo
`123456` / `admin123` chỉ là dữ liệu mô phỏng, **không phải mật khẩu thật** —
không cần đọc lên khi quay.

Trước khi ghi hình:

- Zoom trình duyệt 100%, ẩn thanh bookmark (`Ctrl + Shift + B`).
- Mở sẵn DevTools Console để chứng minh không có lỗi đỏ.
- Nếu cần quay lại từ dữ liệu gốc: bấm **♻️ Reset dữ liệu** trên topbar (xóa
  LocalStorage và nạp lại seed), không cần xóa tay.

### 0.6. OBS + webcam + micro

- Scene: **Screen Capture** toàn màn hình 1920×1080 + **Video Capture Device**
  đặt góc trên bên phải, khung mặt rõ, đủ sáng, ngang tầm mắt.
- Micro: thử 15 giây, nghe lại; tắt thông báo Windows (`Focus assist`).
- Quay riêng 3 clip theo tên OBS ở bảng trên, mỗi clip 5–7 phút. Quay một clip
  dài 20 phút cũng được nhưng khó quay lại nếu sai.
- Không dùng filter làm mờ mặt. Yêu cầu là thấy rõ mặt và nghe rõ giọng thật.

### 0.7. Trello

Mở board ở tab riêng, thu nhỏ vừa đủ để đọc:

- **TASK-20** — 4 màn Người dùng (task chính, branch `feature/user-screens`).
- **TASK-19** — 3 tính năng AI (AI-1, AI-2, AI-3).
- **TASK-09** — Git/GitHub.
- **TASK-10** — mockup Figma/Canva.
- **TASK-08** — 19 video OBS.

Task ID đọc trên camera là **TASK-20**; nhắc thêm TASK-19 khi nói về AI. Không
đọc task của SV2 như thể mình làm.

---

## 1. Khung giờ chung cho mỗi màn (6 phút)

| Thời lượng | Việc làm | Yêu cầu |
|---|---|---|
| 0:00–0:30 | Chào, nêu Task ID + tên màn + branch | 8 |
| 0:30–1:15 | Mở mockup Canva/slide, chỉ 3 vùng chính | 2 |
| 1:15–2:15 | VS Code: HTML + CSS, giải thích bố cục | 3, 4 |
| 2:15–3:15 | VS Code: JS, giải thích thuật toán sự kiện/AI | 4 |
| 3:15–4:00 | Sửa code trực tiếp, lưu, reload | 5 |
| 4:00–5:00 | Test tương tác + responsive 390×844 | 6 |
| 5:00–6:00 | Commit, push, đọc task/branch/commit | 7, 8 |

Câu mở đầu dùng chung (thay tên màn):

> “Em chào thầy/cô. Em là Mai Thị Phương Anh, MSSV 2551170849. Em trình bày màn
> **Bảng điều khiển tài chính**, Task ID **TASK-20** — 4 màn Người dùng, nhánh
> **feature/task-20-user-dashboard**. Đây là một trong ba màn em tâm đắc vì có
> tính năng AI-2 và thể hiện rõ cách nhóm em tổ chức HTML, CSS, JavaScript.”

---

## 2. MÀN 1 — BẢNG ĐIỀU KHIỂN TÀI CHÍNH

### 2.1. Mockup (yêu cầu 2)

Mở `docs/viva/mockups/slide-14.png` (hoặc Canva trang 1, hoặc slide 14 của
`docs/SpendWise-Thiet-ke-giao-dien.pptx`). Chỉ tay/theo chuột vào 3 vùng:

1. Hàng 4 thẻ KPI phía trên.
2. Cụm 2 cột: biểu đồ cột bên trái, panel AI màu tím bên phải.
3. Bảng “Giao dịch gần đây” full chiều ngang.

Nói: *“Mockup chia 3 tầng thông tin: tổng quan → phân tích → chi tiết. Bản code
giữ đúng thứ tự này, chỉ thêm thẻ KPI thứ 5 khi em sửa trực tiếp.”*

### 2.2. Mở file trong VS Code (yêu cầu 3)

`Ctrl + P` và mở:

- `user-finance-dashboard.html`
- `css/style.css`
- `js/ai.js`
- (khi cần) `js/ui.js`

Các vùng cần chỉ:

| File | Dòng | Nội dung |
|---|---|---|
| HTML | 14–18 | `<main>` và `#kpiBox` |
| HTML | 20–55 | `.grid-2` chứa biểu đồ + panel AI-2 |
| HTML | 58–64 | card giao dịch gần đây |
| HTML | 69–73 | nạp 5 file JS lõi dùng chung |
| HTML | 79–119 | `loadKpi()` — tính 4 KPI |
| HTML | 121–128 | hàm `kpi()` sinh HTML một thẻ |
| HTML | 131–161 | `loadChart()` — gom chi theo danh mục |
| HTML | 163–217 | AI-2: `runInsight()` và các nút |
| HTML | 220–248 | `loadRecent()` |
| CSS | 130, 137 | `.layout` flex, `.main` |
| CSS | 205–220 | `.kpi-grid` + `.kpi` |
| CSS | 308 | `.grid-2` hai cột 1.2fr / 1fr |
| CSS | 408–415 | `.barchart`, `.bar-fill` |
| CSS | 418–440 | `.ai-panel`, `.ai-result.show` |
| CSS | 470–487 | breakpoint 960px duy nhất |
| ai.js | 75–124 | `AI.insight()` — AI-2 |
| layout.js | 6–28, 45–68 | menu theo vai trò, dựng sidebar |

### 2.3. Giải thích HTML/CSS (yêu cầu 4)

Nói theo 3 tầng:

1. **Khung trang:** `.layout` là flex gồm `<aside class="sidebar">` và
   `<main class="main">`. Sidebar không viết tay trong từng trang mà do
   `js/layout.js` dựng từ mảng `NAV` theo `data-role` trên `<body>`, nên 19
   trang dùng chung một menu.
2. **Nội dung:** `#kpiBox` dùng `.kpi-grid` với
   `repeat(auto-fit, minmax(200px, 1fr))` — tự xếp 4–5 cột trên desktop và tự
   xuống 1 cột khi hẹp. Bên dưới là `.grid-2` (1.2fr cho biểu đồ, 1fr cho AI),
   cuối cùng là card giao dịch full chiều ngang.
3. **Responsive:** chỉ có **một breakpoint 960px** (`css/style.css` dòng
   470–487): sidebar thành thanh điều hướng cố định ở đáy, `.grid-2` về 1 cột,
   `.main` thêm `padding-bottom: 90px` để không bị thanh đáy che. Không có
   breakpoint 640px — nếu bị hỏi, trả lời đúng như vậy.

Màu sắc lấy từ biến CSS trong `:root`; chế độ tối ghi đè trong
`[data-theme="dark"]` (dòng 70–108), nên không cần sửa từng thẻ.

### 2.4. Giải thích thuật toán JS (yêu cầu 4)

Nói theo luồng:

1. **Khi mở trang:** 3 hàm `loadKpi()`, `loadChart()`, `loadRecent()` được gọi
   ở dòng 251–253, chạy song song. Mỗi hàm dùng `SW.loadInto()` (`js/ui.js`
   dòng 97–104): hiện skeleton → `await` dữ liệu → thay bằng HTML; nếu lỗi thì
   hiện khung lỗi có nút “Thử lại”.
2. **`loadKpi()`:** lọc giao dịch theo `userId`, `status === "active"` và tháng
   `2026-10`; lấy mục tiêu và ngân sách đã duyệt; cộng dồn bằng vòng `for`;
   trả về chuỗi HTML bằng cách gọi `kpi()` 4 lần.
3. **`loadChart()`:** gom tiền chi vào object `byCategory` theo `categoryId`,
   đổi thành mảng, sắp giảm dần, lấy phần tử lớn nhất làm mốc; mỗi danh mục vẽ
   một thanh với `width = amount / max * 100%`.
4. **AI-2:** bấm nút → disable nút, hiện khung “AI đang xử lý” → gọi
   `AI.insight(expenses)`. Hàm này chờ 1,2–1,8 giây, yêu cầu ít nhất 5 khoản
   chi, so từng danh mục với `MOCK.prevMonthTotals`, chỉ nêu khi lệch từ ±20%,
   thêm danh mục chi nhiều nhất, trả tối đa 3 nhận định kèm lý do. Trang render
   danh sách + hộp “Vì sao?”; nếu `ok === false` thì hiện lỗi và nút thử lại.
5. **`loadRecent()`:** sắp giao dịch theo ngày giảm dần, lấy 5 dòng, render
   bảng; chi màu đỏ có dấu `−`, thu màu xanh có dấu `+`.

### 2.5. Sửa code trực tiếp (yêu cầu 5)

Mục tiêu: thêm KPI thứ 5 **“Chênh lệch thu – chi”** = thu nhập − đã chi.

Trong `user-finance-dashboard.html`:

1. Dòng 82: đổi chú thích `Bốn thẻ KPI` → `Năm thẻ KPI`.
2. Sau dòng 111 (`const budgetLeft = ...`), thêm:

```js
    const net = income - spent;
```

3. Cuối dòng 117, đổi dấu `;` thành `+` và thêm dòng:

```js
      kpi("Chênh lệch thu – chi", SW.fmtVND(net), net >= 0 ? "down" : "up");
```

Kết quả đoạn cuối (để đối chiếu, không cần gõ lại cả khối):

```js
    const budgetLeft = budgets.length > 0 ? budgetTotal - spentInBudget : null;
    const net = income - spent;

    return kpi(`Đã chi (tháng ${MONTH.slice(5)})`, SW.fmtVND(spent), "up") +
      kpi("Thu nhập", SW.fmtVND(income), "down") +
      kpi("Tổng đã tiết kiệm", SW.fmtVND(saved), "down") +
      kpi("Ngân sách còn lại", budgetLeft === null ? "Chưa có" : SW.fmtVND(budgetLeft),
        budgetLeft !== null && budgetLeft < 0 ? "up" : "down") +
      kpi("Chênh lệch thu – chi", SW.fmtVND(net), net >= 0 ? "down" : "up");
```

`Ctrl + S` → trình duyệt `F5`. Kỳ vọng: hàng KPI có 5 thẻ, thẻ cuối hiện
**1.380.000₫** (thu 3.000.000₫ − chi 1.620.000₫). Ảnh đối chiếu:
`docs/viva/rehearsal/dashboard-kpi-chenh-lech.png`.

Nói: *“Em không sửa dữ liệu mẫu, chỉ tính thêm từ hai biến `income` và `spent`
đã có, nên không ảnh hưởng các thẻ cũ.”*

### 2.6. Test tương tác + responsive (yêu cầu 6)

Test tương tác:

- [ ] `F5`: 5 KPI, biểu đồ sắp giảm dần, bảng 5 giao dịch gần nhất.
- [ ] Bấm **✨ Phân tích chi tiêu** → skeleton khoảng 1,2 giây → 3 nhận định +
      hộp “Vì sao có kết quả này?”.
- [ ] Bấm **🔄 Tạo lại** → chạy lại; **Đóng** → ẩn kết quả; **💾 Lưu nhận định**
      → toast xác nhận.
- [ ] Bấm **⚠️ Mô phỏng lỗi** trên topbar → tải lại → thấy khung lỗi + nút
      “Thử lại”; tắt mô phỏng rồi tải lại để tiếp tục.
- [ ] Console: không có dòng đỏ.

Responsive:

1. `F12` → `Ctrl + Shift + M` (device toolbar) → chọn **iPhone 12 Pro** hoặc
   nhập **390 × 844** → `F5`.
2. Chỉ: KPI xếp **1 cột**, `.grid-2` thành **1 cột**, menu thành thanh đáy 4 mục
   (Tài chính, Giao dịch, Mục tiêu, Ngân sách), không có thanh cuộn ngang
   toàn trang.
3. Chụp đối chiếu: `docs/viva/screens/user-finance-dashboard-mobile.png`.

### 2.7. Git (yêu cầu 7, 8)

Nhánh đã được tạo sẵn từ `dev`:

```bash
git switch feature/task-20-user-dashboard
git status
git diff
git add pages/user-finance-dashboard.html
git commit -m "feat(TASK-20): thêm KPI chênh lệch thu chi trên dashboard"
git push -u origin feature/task-20-user-dashboard
git branch --show-current
git log -1 --oneline
```

Đọc to: *“Task ID **TASK-20**, nhánh **feature/task-20-user-dashboard**, commit
code là **<7 ký tự đầu hiện trên terminal>**.”* Không đọc mã trước khi commit
tồn tại.

---

## 3. MÀN 2 — QUẢN LÝ GIAO DỊCH

### 3.1. Mockup (yêu cầu 2)

Mở `docs/viva/mockups/slide-15.png` (Canva trang 2 / slide 15). Chỉ:

1. Thanh công cụ: tìm kiếm + 3 bộ lọc + nút thêm.
2. Bảng giao dịch có cột Loại, Số tiền, nút Sửa/Xoá.
3. Modal thêm giao dịch có panel AI-1.

Nói: *“Màn này là CRUD đầy đủ: thêm, sửa, xoá mềm, tìm và lọc. AI-1 nằm ngay
trong modal để gợi ý danh mục trước khi lưu.”*

### 3.2. Mở file trong VS Code (yêu cầu 3)

- `user-transaction-management.html`
- `css/style.css`
- `js/ai.js`
- (khi cần) `js/ui.js`, `js/api.js`

| File | Dòng | Nội dung |
|---|---|---|
| HTML | 16–42 | toolbar tìm kiếm/lọc |
| HTML | 45–51 | card bảng + `#countInfo` + `#tableBox` |
| HTML | 56–113 | modal và panel AI-1 |
| HTML | 116–120 | nạp JS lõi |
| HTML | 125–128 | biến trạng thái `categories`, `editingId`, `aiPick` |
| HTML | 131–136 | `loadCategories()` |
| HTML | 139–151 | `currentFilter()` trả về hàm lọc |
| HTML | 153–186 | `loadTable()` + đếm + render |
| HTML | 188–198 | gắn nút Sửa/Xoá sau mỗi lần render |
| HTML | 200–203 | 4 sự kiện lọc |
| HTML | 206–229 | mở modal thêm/sửa |
| HTML | 232–270 | validate + lưu |
| HTML | 272–310 | AI-1 gợi ý/chấp nhận/từ chối |
| HTML | 313–316 | khởi động |
| CSS | 223 | `.table-wrap { overflow-x: auto; }` |
| CSS | 256–275 | modal + backdrop |
| CSS | 317–318 | `.toolbar` flex-wrap |
| CSS | 470–487 | responsive 960px |
| ai.js | 28–36 | bảng `RULES` từ khoá |
| ai.js | 40–72 | `AI.categorize()` |
| ui.js | 13–15 | `SW.onClick` gắn sự kiện theo selector |
| ui.js | 242 | `SW.debounce` |
| api.js | 58, 67, 76, 80 | list / create / update / archive |

### 3.3. Giải thích HTML/CSS (yêu cầu 4)

1. **Toolbar:** `.card.toolbar` là flex-wrap. Ô tìm kiếm có `.grow`
   (`flex: 1; min-width: 200px`) nên chiếm phần rộng còn lại; 3 `select` và nút
   thêm giữ kích thước tự nhiên. Khi hẹp, các phần tử tự xuống dòng.
2. **Bảng:** `#tableBox` được JS đổ HTML. `SW.table()` bọc bảng trong
   `.table-wrap` có `overflow-x: auto`, nên trên điện thoại cả trang không bị
   tràn; chỉ ruột bảng cuộn ngang trong card.
3. **Modal:** `.modal-backdrop` mặc định `display: none`, thêm class `.open`
   thì thành flex để căn giữa. Form dùng `.field`, `.input`, `.field-error`
   (`hidden` cho đến khi validate).
4. **Responsive:** dưới 960px toolbar xuống dòng, bảng cuộn ngang, menu thành
   thanh đáy; không cần viết breakpoint riêng cho trang này.

### 3.4. Giải thích thuật toán JS (yêu cầu 4)

1. **Khởi động:** IIFE dòng 313 `await loadCategories()` rồi `loadTable()`.
   Danh mục nạp một lần, dùng chung cho cả bộ lọc và ô chọn trong form.
2. **Lọc:** `currentFilter()` đọc 4 ô input và **trả về một hàm** nhận giao
   dịch, trả `true/false`. Hàm này được truyền vào `API.list()`, nên bảng chỉ
   nhận bản ghi khớp. Cách này gom điều kiện vào một chỗ, dễ đọc.
3. **Vẽ bảng:** `loadTable()` lấy dữ liệu, sắp theo ngày giảm dần, cập nhật
   `#countInfo`, render bảng bằng `SW.table()`. Sau khi render, gọi
   `bindTableButtons()` vì các nút Sửa/Xoá là HTML mới sinh ra — nếu gắn sự
   kiện trước khi render sẽ không có nút để gắn.
4. **Sự kiện lọc:** ô tìm kiếm dùng `SW.debounce(loadTable, 250)` — chờ người
   dùng ngừng gõ 250ms mới lọc, tránh gọi API liên tục. Ba `select` đổi là lọc
   ngay.
5. **Thêm/sửa:** `openCreate()` đặt `editingId = null` và reset form;
   `openEdit(id)` gọi `API.get()` đổ dữ liệu vào form và ghi nhớ id. Khi submit:
   `preventDefault()` → xóa lỗi cũ → kiểm tra tên ≥ 2 ký tự, tiền > 0, có danh
   mục, có ngày → đóng gói `data` → disable nút Lưu → `API.create` hoặc
   `API.update` → đóng modal → tải lại bảng; lỗi thì toast; `finally` bật lại
   nút.
6. **Xoá:** không xoá vĩnh viễn, gọi `API.archive()` đổi `status` thành
   `"archived"` để giữ lịch sử tài chính; có hộp xác nhận trước khi chạy.
7. **AI-1:** bấm gợi ý → kiểm tra tên ≥ 2 ký tự → `SW.runAI()` hiện skeleton →
   `AI.categorize(name)` chờ 1,2–1,8 giây → so tên với bảng `RULES`, mỗi từ
   khoá khớp cộng 1 điểm → sắp giảm dần → độ tin cậy
   `0.6 + 0.15 × số từ khớp` (tối đa 0,95) → trả danh mục + lý do. Trang hiện
   “AI đề xuất…”, nút **Chấp nhận** gán danh mục vào `select`, **Từ chối**
   xoá gợi ý. AI không tự lưu.

### 3.5. Sửa code trực tiếp (yêu cầu 5)

Mục tiêu: `#countInfo` không chỉ đếm số giao dịch mà còn hiện **tổng chi** và
**tổng thu** của danh sách đang lọc.

Trong `user-transaction-management.html`, thay dòng 158:

```js
    SW.$("#countInfo").textContent = transactions.length + " giao dịch";
```

bằng 2 dòng:

```js
    const sum = (type) => transactions.filter((t) => t.type === type).reduce((s, t) => s + t.amount, 0);
    SW.$("#countInfo").textContent = transactions.length + " giao dịch · Chi " + SW.fmtVND(sum("expense")) + " · Thu " + SW.fmtVND(sum("income"));
```

`Ctrl + S` → `F5`. Kỳ vọng (dữ liệu gốc, chưa lọc):
**“17 giao dịch · Chi 1.897.000₫ · Thu 3.000.000₫”**. Ảnh đối chiếu:
`docs/viva/rehearsal/transactions-tong-chi-thu.png`.

Nói: *“Em dùng `filter` để tách chi/thu rồi `reduce` để cộng tiền. Vì
`transactions` ở đây đã qua bộ lọc, con số tự đổi theo từ khoá và tháng.”*

### 3.6. Test tương tác + responsive (yêu cầu 6)

- [ ] Gõ `cơm` vào ô tìm kiếm → bảng chỉ còn giao dịch chứa “cơm”; số đếm và
      tổng chi/thu đổi theo.
- [ ] Chọn danh mục **Ăn uống** + loại **Chi** + tháng **10/2026** → kết quả
      giao nhau đúng.
- [ ] Bấm **＋ Thêm giao dịch** → bấm **Lưu** khi để trống → hiện đủ 4 lỗi
      đỏ; nhập hợp lệ → toast “Đã thêm giao dịch” → dòng mới xuất hiện.
- [ ] Bấm **Sửa** một dòng → form đã điền sẵn; đổi số tiền → Lưu → số liệu đổi.
- [ ] Bấm **Xoá** → hộp xác nhận nêu rõ “lưu trữ, không xoá vĩnh viễn” → đồng
      ý → dòng biến mất, số đếm giảm.
- [ ] AI-1: mở thêm giao dịch, nhập **“Cơm trưa căng tin”**, bấm **✨ Gợi ý** →
      hiện “AI đề xuất: 🍜 Ăn uống (độ tin cậy 90%)” + lý do từ khoá → **Chấp
      nhận** → ô Danh mục chuyển sang Ăn uống.
- [ ] Console không có lỗi đỏ.

Responsive:

1. `F12` → `Ctrl + Shift + M` → 390×844 → `F5`.
2. Chỉ: toolbar xếp dọc; bảng vẫn nằm trong card và **cuộn ngang trong card**;
   trang không có thanh cuộn ngang; menu thành thanh đáy.
3. Ảnh đối chiếu: `docs/viva/screens/user-transaction-management-mobile.png`.

### 3.7. Git (yêu cầu 7, 8)

```bash
git switch feature/task-20-user-transactions
git status
git diff
git add pages/user-transaction-management.html
git commit -m "feat(TASK-20): hiển thị tổng chi và tổng thu theo bộ lọc giao dịch"
git push -u origin feature/task-20-user-transactions
git branch --show-current
git log -1 --oneline
```

Đọc to: *“Task ID **TASK-20**, nhánh **feature/task-20-user-transactions**,
commit code **<7 ký tự>**.”*

---

## 4. MÀN 3 — MỤC TIÊU TIẾT KIỆM

### 4.1. Mockup (yêu cầu 2)

Mở `docs/viva/mockups/slide-16.png` (Canva trang 3 / slide 16). Chỉ:

1. Header có nút “Tạo mục tiêu”.
2. Lưới thẻ mục tiêu: tên, badge trạng thái, tiến độ, phần trăm, nút thao tác.
3. Modal có panel AI-3.

Nói: *“Màn này thể hiện tiến độ bằng thanh phần trăm, và AI-3 chia số tiền còn
thiếu theo số tuần còn lại để lập kế hoạch.”*

### 4.2. Mở file trong VS Code (yêu cầu 3)

- `user-saving-goals.html`
- `css/style.css`
- `js/ai.js`
- (khi cần) `js/ui.js`

| File | Dòng | Nội dung |
|---|---|---|
| HTML | 14–27 | header + `#goalBox.grid-cards` |
| HTML | 31–86 | modal + panel AI-3 |
| HTML | 89–93 | nạp JS lõi |
| HTML | 98–100 | `USER_ID`, `editingId`, `plan` |
| HTML | 102–106 | `goalBadge()` |
| HTML | 109–148 | `loadGoals()` — tính %, ngày còn lại, render |
| HTML | 150–168 | gắn nút Sửa/Hoàn thành/Huỷ/Khôi phục |
| HTML | 171–191 | mở modal thêm/sửa |
| HTML | 194–238 | validate + lưu |
| HTML | 240–284 | AI-3 |
| HTML | 287 | khởi động |
| CSS | 320–324 | `.grid-cards` auto-fill minmax(300px, 1fr) |
| CSS | 389–391 | `.goal-card`, `.goal-meta`, `.goal-percent` |
| CSS | 249–253 | `.progress` |
| ai.js | 127–159 | `AI.goalPlan()` |

### 4.3. Giải thích HTML/CSS (yêu cầu 4)

1. **Header:** card `.row-between` gồm khối tiêu đề và nút “Tạo mục tiêu”;
   `flex-wrap` nên khi hẹp nút tự xuống dòng.
2. **Lưới thẻ:** `#goalBox.grid-cards` dùng
   `repeat(auto-fill, minmax(300px, 1fr))` — desktop 2–3 cột, điện thoại 1 cột.
3. **Mỗi thẻ:** `article.card` gồm tên + badge, dòng `.goal-meta` (đã tiết kiệm /
   mục tiêu / hạn / ngày còn lại / số còn thiếu sau khi sửa), thanh `.progress`
   với `width` do JS tính, phần trăm, và nhóm nút.
4. **Modal:** cùng cơ chế `.modal-backdrop.open`; form có 4 trường và panel AI-3.
5. **Responsive:** dưới 960px lưới tự về 1 cột, menu thành thanh đáy; không cần
   CSS riêng.

### 4.4. Giải thích thuật toán JS (yêu cầu 4)

1. **`loadGoals()`:** lấy tất cả mục tiêu của `USER_ID`, sắp mục tiêu đang chạy
   lên trước, rồi `map` mỗi mục tiêu thành một thẻ.
2. **Tính toán:** `percent = min(100, round(saved / target × 100))`;
   `daysLeft = max(0, ceil((deadline − hôm nay) / 86400000))` — 86.400.000 là số
   mili-giây của một ngày. Thanh tiến độ chỉ cần gán `style="width: percent%"`.
3. **Nút thao tác:** nút “Hoàn thành” bị `disabled` nếu chưa đủ 100%. Sửa mở
   modal; Hoàn thành/Huỷ/Khôi phục đều gọi `API.update()` đổi `status` rồi tải
   lại danh sách; thao tác nguy hiểm có hộp xác nhận.
4. **Validate:** tên khác rỗng; mục tiêu ≥ 100.000₫; đã tiết kiệm ≥ 0 và không
   vượt mục tiêu; hạn chót phải sau hôm nay. Sai trường nào đánh dấu đỏ trường
   đó.
5. **AI-3:** đọc goal từ form + số tiền mỗi tuần → `AI.goalPlan()`:
   - `weeks = max(1, round(số ngày còn lại / 7))`
   - `remain = max(0, target − saved)`
   - `perWeek = ceil(remain / weeks)`
   - `cap = weeklyBudget` hoặc 1.500.000₫ mặc định
   - Nếu `perWeek > cap` → trả `ok: false` kèm lý do “Mục tiêu chưa khả thi…”.
   - Nếu hợp lý → trả `perWeek`, `weeks`, 3 mốc thời gian và mẹo.
6. **Hiển thị:** thành công thì hiện “Kế hoạch: để dành …/tuần trong … tuần” +
   3 mốc + lý do; **Áp dụng** chỉ toast mô phỏng, **Bỏ qua** xoá kết quả. AI
   không tự ghi vào dữ liệu — nói rõ điểm này nếu bị hỏi.

### 4.5. Sửa code trực tiếp (yêu cầu 5)

Mục tiêu: trên mỗi thẻ đang chạy, hiện thêm **số tiền còn thiếu**.

Trong `user-saving-goals.html`, thay dòng 138:

```js
            ${g.status === "active" ? `· còn ${daysLeft} ngày` : ""}
```

bằng:

```js
            ${g.status === "active" ? `· còn ${daysLeft} ngày · cần thêm ${SW.fmtVND(Math.max(0, g.target - g.saved))}` : ""}
```

`Ctrl + S` → `F5`. Kỳ vọng thẻ đầu tiên:
**“4.500.000₫ / 15.000.000₫ · hạn 01/03/2027 · còn 127 ngày · cần thêm
10.500.000₫”**. Ảnh đối chiếu:
`docs/viva/rehearsal/goals-so-tien-con-thieu.png`.

Nói: *“Em dùng `Math.max(0, ...)` để nếu đã tiết kiệm vượt mục tiêu thì hiện 0
chứ không ra số âm.”*

### 4.6. Test tương tác + responsive (yêu cầu 6)

- [ ] `F5`: thẻ đầu tiên hiện đúng 4.500.000₫ / 15.000.000₫, thanh 30%, còn
      127 ngày, cần thêm 10.500.000₫.
- [ ] **＋ Tạo mục tiêu**: để trống → lỗi; nhập mục tiêu 1.000.000₫, hạn sau
      30 ngày → thẻ mới xuất hiện.
- [ ] **Sửa** thẻ đầu: nhập “đã tiết kiệm” lớn hơn mục tiêu → lỗi đỏ; sửa về
      15.000.000₫ → thanh 100%, nút **Hoàn thành** bật.
- [ ] Bấm **Hoàn thành** → xác nhận → badge “Hoàn thành”; **Khôi phục** →
      quay lại “Đang chạy”.
- [ ] **Huỷ mục tiêu** → thẻ mờ + badge “Đã huỷ”; khôi phục lại.
- [ ] AI-3: mở **Sửa** thẻ đầu, nhập mỗi tuần **700.000** → kế hoạch
      **583.334₫/tuần trong 18 tuần** + 3 mốc. Đổi thành **300.000** → thất bại
      “Mục tiêu chưa khả thi: cần gửi 583.334₫/tuần, vượt quá 300.000₫/tuần…”.
- [ ] Console không có lỗi đỏ.

Responsive:

1. `F12` → `Ctrl + Shift + M` → 390×844 → `F5`.
2. Chỉ: thẻ mục tiêu **1 cột**, header xuống dòng, nút trong thẻ tự wrap, menu
   thành thanh đáy, không tràn ngang.
3. Ảnh đối chiếu: `docs/viva/screens/user-saving-goals-mobile.png`.

### 4.7. Git (yêu cầu 7, 8)

```bash
git switch feature/task-20-user-goals
git status
git diff
git add pages/user-saving-goals.html
git commit -m "feat(TASK-20): hiển thị số tiền còn thiếu trên thẻ mục tiêu"
git push -u origin feature/task-20-user-goals
git branch --show-current
git log -1 --oneline
```

Đọc to: *“Task ID **TASK-20**, nhánh **feature/task-20-user-goals**, commit code
**<7 ký tự>**.”*

---

## 5. Sau khi quay đủ 3 màn

### 5.1. Kiểm tra trên GitHub

- Mở repo → tab **Branches**: thấy 3 nhánh feature.
- Mở từng nhánh → **Commits**: thấy đúng commit message và tác giả thật.
- Tạo 3 Pull Request vào `dev` (hoặc `main`), mô tả ngắn, rồi merge. Nếu giảng
  viên yêu cầu PR, đây là minh chứng; nếu không, nhánh đã push là đủ.
- Không tự tạo commit/PR thay SV2. Phần màn hình của SV2 phải do SV2 commit
  bằng tài khoản của họ.

### 5.2. Cập nhật Trello

- **TASK-20:** dán tên 3 branch + link commit/PR.
- **TASK-09:** dán link repo GitHub.
- **TASK-10:** dán link Canva (sau khi upload 3 mockup).
- **TASK-12:** báo cáo sử dụng AI vẫn còn thiếu — cần viết trung thực, không
  nói “tự làm 100%”.
- **TASK-08:** gắn tên 3 file OBS `SV1-05`, `SV1-06`, `SV1-07`.

### 5.3. Nộp bài

- 3 video OBS (hoặc 1 video dài) + link repo + link Canva.
- Kiểm tra lại video: thấy mặt, nghe giọng, thấy rõ Task ID/branch/commit.
- Không đưa mật khẩu demo lên video; nếu lỡ quay vào ô mật khẩu, che hoặc cắt.

---

## 6. Bảng đối chiếu 8 yêu cầu

| # | Yêu cầu | Minh chứng trong kịch bản |
|---|---|---|
| 1 | Webcam rõ mặt + giọng thật | Mục 0.6, quay 3 clip OBS |
| 2 | Mockup trên Figma/Canva | Mục 0.3 + 2.1/3.1/4.1, ảnh `docs/viva/mockups/` |
| 3 | Mở đúng file HTML/CSS/JS | Bảng file từng màn (2.2, 3.2, 4.2) |
| 4 | Giải thích HTML/CSS + thuật toán JS | Mục 2.3–2.4, 3.3–3.4, 4.3–4.4 |
| 5 | Sửa trực tiếp trong code | Mục 2.5, 3.5, 4.5 |
| 6 | Test tương tác + responsive | Mục 2.6, 3.6, 4.6 + ảnh mobile |
| 7 | Commit + push GitHub | Mục 2.7, 3.7, 4.7 (chuẩn bị remote ở 0.1) |
| 8 | Đọc Task ID, branch, commit | Câu đọc cuối mỗi mục Git |

---

## 7. Câu hỏi phụ giảng viên có thể hỏi

1. **Vì sao CSS/JS dùng chung?**
   Để 19 trang cùng một giao diện, sửa một chỗ áp dụng tất cả; phần riêng của
   từng trang nằm trong `<script>` cuối file HTML. Nhược điểm: file CSS lớn
   hơn nhu cầu từng trang, nhưng dự án nhỏ nên đánh đổi này hợp lý.
2. **Vì sao dùng `innerHTML`? Có an toàn không?**
   Dữ liệu ít, cần code dễ hiểu. Mọi chuỗi do người dùng nhập đều đi qua
   `SW.escapeHtml()` trước khi chèn, nên không bị chèn thẻ HTML/JS.
3. **Vì sao xoá giao dịch lại là “lưu trữ”?**
   Giữ lịch sử tài chính và cho phép khôi phục; xoá cứng sẽ làm sai báo cáo
   tháng cũ.
4. **AI có phải AI thật không?**
   Không. Là mô phỏng bằng quy tắc: AI-1 so từ khoá, AI-2 so số liệu tháng
   trước, AI-3 chia đều số tiền theo số tuần. Mục tiêu là trình diễn đủ luồng,
   trạng thái chờ, lý do và trạng thái thất bại.
5. **Responsive có mấy breakpoint?**
   Một breakpoint 960px trong `css/style.css` (dòng 470–487). Bảng cuộn ngang
   nhờ `.table-wrap` (dòng 223), không có breakpoint 640px.
6. **Vì sao không có backend?**
   Đây là nguyên mẫu frontend theo yêu cầu môn học; dữ liệu lưu LocalStorage,
   API giả lập độ trễ 400–900ms. Hạn chế: không xác thực thật, dữ liệu chỉ nằm
   trên máy đang dùng.

---

## 8. Lưu ý trung thực

- Không nói nhóm có file Figma khi chỉ có slide/PNG và bản Canva.
- Không nói AI là mô hình thật; phải nói “mô phỏng bằng quy tắc”.
- Không đọc hoặc quảng bá mật khẩu demo như mật khẩu thật.
- Không nhận phần việc của SV2; commit của SV2 phải do SV2 tạo.
- Nếu `git push` lỗi (chưa có remote, sai quyền), dừng lại và xử lý; không
  tuyên bố đã push khi GitHub chưa có commit.
- Điểm số do giảng viên quyết định; tài liệu này chỉ là kịch bản trình bày.
