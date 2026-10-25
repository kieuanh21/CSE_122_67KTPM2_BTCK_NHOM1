# KỊCH BẢN VIVA 3 MÀN — QUẢN TRỊ VIÊN & KIỂM DUYỆT VIÊN

## SpendWise · BTL-18 · CSE122

Tài liệu chạy tại chỗ (run-sheet) cho 8 yêu cầu vấn đáp: webcam + giọng thật,
mockup, mở file trong VS Code, giải thích HTML/CSS và JS, sửa code trực tiếp,
test tương tác + responsive, commit/push GitHub, đọc Task ID – branch – commit.

Đây là bộ **bổ sung** cho `docs/viva/KICH-BAN-3-MAN.md` (3 màn Người dùng).
Ba màn dưới đây thuộc luồng **Quản trị viên** và **Kiểm duyệt viên**:

| # | Màn hình | File | Task | Nhánh | Mockup | OBS (theo slide) |
|---|---|---|---|---|---|---|
| 1 | Bảng điều khiển hệ thống | `pages/admin-system-dashboard.html` | TASK-24 | `feature/task-24-admin-system-dashboard` | `docs/viva/mockups/slide-26.png` | `SV3-08-system` |
| 2 | Quản lý người dùng | `pages/admin-user-management.html` | TASK-24 | `feature/task-24-admin-users` | `docs/viva/mockups/slide-25.png` | `SV3-07-users` |
| 3 | Duyệt tài nguyên | `pages/moderator-resource-review.html` | TASK-23 | `feature/task-23-moderator-resource-review` | `docs/viva/mockups/slide-21.png` | `SV3-03-resource-review` |

Lý do chọn: ba màn thể hiện ba loại nghiệp vụ khác nhau — tổng hợp số liệu +
nhật ký + CRUD thông báo; CRUD tài khoản có tìm/lọc/kiểm tra hợp lệ/bảo vệ admin;
và quy trình duyệt – từ chối có lý do bắt buộc. Cả ba đều có mockup trong bộ
slide thiết kế (slide 21, 25, 26), có ảnh desktop + mobile để đối chiếu.

> **Số dòng trong tài liệu tính theo bản baseline trên nhánh `dev`.**
> Khi chèn thêm dòng lúc demo, các dòng phía dưới tự dịch xuống — không cần đọc
> lại số dòng sau khi sửa.

---

## ⚠️ ĐỌC TRƯỚC KHI QUAY — PHÂN CÔNG ĐANG LỆCH

Ba màn này **không phải** mảng Người dùng của SV1. Trước khi quay, phải chốt
người phụ trách, vì các nguồn trong dự án đang ghi khác nhau:

| Nguồn | Ghi gì |
|---|---|
| `docs/trello/board-data.js` (TASK-23, TASK-24) | Người phụ trách **SV2**; nhánh `feature/moderator-screens`, `feature/admin-screens` |
| `docs/SpendWise-Thiet-ke-giao-dien.pptx` slide 3 và 27 | **SV3** phụ trách Kiểm duyệt viên + Quản trị viên |
| `docs/screen-list.md` dòng 74, 83, 84 | Cột người phụ trách ghi **SV3** |
| Tên OBS trên slide 21, 25, 26 | Tiền tố **SV3** (`SV3-03`, `SV3-07`, `SV3-08`) |

Trong khi đó nhóm thực tế đang chia **2 SV**: SV1 làm luồng Người dùng, SV2 làm
Huấn luyện viên + Kiểm duyệt + Quản trị. Ba nguồn trên chưa được cập nhật về
cùng một cách chia.

**Quy tắc bắt buộc trước khi ghi hình:**

1. Nếu bạn là **người phụ trách chính** ba màn này: sửa Trello/deck/screen-list
   cho khớp tên mình, rồi mới quay. Không đọc Task ID của người khác như việc
   mình làm.
2. Nếu bạn chỉ **rà soát / quay hộ**: mở clip bằng một câu nói rõ —
   *“Ba màn Quản trị và Kiểm duyệt do bạn SV2 phụ trách chính; em thực hiện
   phần rà soát và chỉnh sửa nhỏ trong clip này.”* — và chỉ nhận đúng phần
   chỉnh sửa nhỏ đó.
3. **Không tạo commit thay SV2.** Commit của người khác phải do người đó tạo
   bằng tài khoản Git của họ.
4. Chọn tiền tố OBS theo số thành viên thật: nhóm 2 SV thì đổi `SV3-03/07/08`
   thành `SV2-03/07/08` và cập nhật TASK-08; nhóm 3 SV thì giữ `SV3`.
5. Ba màn này **không dùng AI**. Slide 21, 25, 26 ghi rõ “Không dùng AI”.
   Không nhận là có AI ở đây; tính năng AI nằm ở TASK-19 và các màn Người dùng.

Nếu mục tiêu là bài vấn đáp **cá nhân của SV1**, bộ đúng là
`docs/viva/KICH-BAN-3-MAN.md` (TASK-20). Bộ này dùng khi bạn được phân công
Quản trị/Kiểm duyệt, khi quay video tổng quan nhóm, hoặc khi cần tập dự phòng.

---

## 0. Chuẩn bị một lần trước khi quay

### 0.1. Chặn bắt buộc: GitHub remote

Repo hiện **chưa có remote** (`git remote -v` không in gì). Không thể demo
`git push` nếu chưa làm bước này. Làm và thử push trước ngày quay:

1. Tạo repo trên GitHub, ví dụ `cse122-spendwise`. Chọn **private** nếu môn học
   cho phép, rồi mời giảng viên và thành viên nhóm; chỉ để public khi đề yêu cầu.
2. Trong thư mục dự án:

```bash
cd C:\Users\ASUS\Downloads\cse122-spendwise
git remote add origin https://github.com/<tài-khoản>/cse122-spendwise.git
git push -u origin main
git push -u origin dev
```

3. Vào GitHub kiểm tra thấy commit baseline `ffb5046`, commit tài liệu viva và
   hai nhánh `main`, `dev`.

### 0.2. Danh tính Git thật (repo-local, không dùng email giả)

```bash
git config user.name "Mai Thị Phương Anh"
git config user.email "<email đăng nhập GitHub của bạn>"
git config --local --list
```

Chỉ đặt trong repo này, **không** dùng `--global` nếu máy còn dự án khác.
Nếu người quay là SV2, thay bằng tên/email của SV2 — commit phải do đúng người
thực hiện chỉnh sửa tạo.

Commit baseline và commit tài liệu viva được tạo bằng danh tính nhóm
(`SpendWise BTL-18 <btl18@local.invalid>`) — đó là commit scaffolding, không
phải commit của giảng viên hay của thành viên khác. Ba commit demo phải mang
danh tính thật của người quay.

### 0.3. Mockup trên Canva

- Ảnh đã xuất sẵn: `docs/viva/mockups/slide-21.png`, `slide-25.png`,
  `slide-26.png` (1920×1080).
- Vào Canva → tạo design 1920×1080 → upload 3 ảnh, mỗi ảnh một trang → đặt tên
  theo màn hình → **Share → Anyone with the link can view** → copy link.
- Dán link vào thẻ **TASK-23** và **TASK-24** trên Trello.
- Khi quay: mở Canva ở cửa sổ thứ hai (hoặc mở PowerPoint slide 21/25/26) và
  nói: *“Đây là mockup nhóm em thiết kế trong bộ slide, em xuất PNG và đưa lên
  Canva để trình chiếu.”*
- **Không nói** “file Figma của em” vì nhóm không có file Figma. Nếu giảng viên
  hỏi công cụ: trả lời trung thực là thiết kế trong PowerPoint/Canva.

### 0.4. VS Code

- Mở đúng thư mục `C:\Users\ASUS\Downloads\cse122-spendwise` (không mở cả ổ D).
- Mỗi màn mở 3 tab: file HTML của trang, `css/style.css`, `js/ui.js`
  (thêm `js/api.js` khi nói về dữ liệu).
- Terminal: `Ctrl + ~`. Ẩn các tab không liên quan để người xem không rối.
- Bật word wrap: `Alt + Z`.

### 0.5. Chạy web và trình duyệt

Cách 1 — VS Code Live Server: chuột phải `index.html` → **Open with Live Server**.

Cách 2 — dùng `npx serve` (máy này không có Python):

```bash
cd C:\Users\ASUS\Downloads\cse122-spendwise
npx serve -l 4173
```

Mở `http://localhost:4173/pages/login.html`:

- Màn 1, 2: bấm **🛠️ Quản trị viên** (đăng nhập nhanh).
- Màn 3: bấm **🛡️ Kiểm duyệt viên**.

Tài khoản demo `123456` / `admin123` chỉ là dữ liệu mô phỏng, **không phải mật
khẩu thật** — không cần đọc lên khi quay.

Trước khi ghi hình:

- Zoom trình duyệt 100%, ẩn thanh bookmark (`Ctrl + Shift + B`).
- Mở sẵn DevTools Console để chứng minh không có lỗi đỏ.
- Bấm **♻️ Reset dữ liệu** trên topbar trước mỗi clip để quay lại seed gốc
  (xóa LocalStorage `spendwise.db.v1` và nạp lại dữ liệu mẫu).

### 0.6. OBS + webcam + micro

- Scene: **Screen Capture** toàn màn hình 1920×1080 + **Video Capture Device**
  đặt góc trên bên phải, khung mặt rõ, đủ sáng, ngang tầm mắt.
- Micro: thử 15 giây, nghe lại; tắt thông báo Windows (`Focus assist`).
- Quay riêng 3 clip theo tên OBS ở bảng trên, mỗi clip 5–7 phút. Quay một clip
  dài 20 phút cũng được nhưng khó quay lại nếu sai.
- Không dùng filter làm mờ mặt. Yêu cầu là thấy rõ mặt và nghe rõ giọng thật.
- Nhớ đổi tiền tố OBS nếu nhóm chỉ có 2 SV (xem cảnh báo đầu tài liệu).

### 0.7. Trello

Mở board ở tab riêng, thu nhỏ vừa đủ để đọc:

- **TASK-23** — 3 màn Kiểm duyệt viên (bản ghi hiện tại ghi SV2).
- **TASK-24** — 3 màn Quản trị viên (bản ghi hiện tại ghi SV2).
- **TASK-19** — 3 tính năng AI (không thuộc ba màn này, nhưng nhắc khi bị hỏi).
- **TASK-09** — Git/GitHub.
- **TASK-10** — mockup Figma/Canva.
- **TASK-08** — 19 video OBS.

Task ID đọc trên camera là **TASK-24** cho màn 1–2 và **TASK-23** cho màn 3.
Không đọc task của người khác như thể mình làm. Nếu board thật chưa tạo, dùng
`docs/trello/` để đối chiếu nhưng **không nói “board đã có trên Trello”** khi
chưa tạo.

---

## 1. Khung giờ chung cho mỗi màn (6 phút)

| Thời lượng | Việc làm | Yêu cầu |
|---|---|---|
| 0:00–0:30 | Chào, nêu Task ID + tên màn + branch | 8 |
| 0:30–1:15 | Mở mockup Canva/slide, chỉ 3 vùng chính | 2 |
| 1:15–2:15 | VS Code: HTML + CSS, giải thích bố cục | 3, 4 |
| 2:15–3:15 | VS Code: JS, giải thích thuật toán sự kiện | 4 |
| 3:15–4:00 | Sửa code trực tiếp, lưu, reload | 5 |
| 4:00–5:00 | Test tương tác + responsive 390×844 | 6 |
| 5:00–6:00 | Commit, push, đọc task/branch/commit | 7, 8 |

Câu mở đầu nếu bạn là người phụ trách chính:

> “Em chào thầy/cô. Em là Mai Thị Phương Anh, MSSV 2551170849. Em trình bày màn
> **Bảng điều khiển hệ thống**, Task ID **TASK-24** — 3 màn Quản trị viên, nhánh
> **feature/task-24-admin-system-dashboard**. Đây là một trong ba màn em tâm đắc
> vì thể hiện cách nhóm em tổng hợp dữ liệu, ghi nhật ký và quản lý thông báo
> bằng JavaScript thuần.”

Câu mở đầu nếu bạn chỉ rà soát/quay hộ:

> “Em chào thầy/cô. Em là Mai Thị Phương Anh, MSSV 2551170849. Màn **Bảng điều
> khiển hệ thống** thuộc Task ID **TASK-24**, nhánh
> **feature/task-24-admin-system-dashboard**, do bạn SV2 phụ trách chính. Trong
> clip này em trình bày phần rà soát và chỉnh sửa nhỏ của em trên nền mã của bạn.”

---

## 2. MÀN 1 — BẢNG ĐIỀU KHIỂN HỆ THỐNG (ADMIN)

### 2.1. Mockup (yêu cầu 2)

Mở `docs/viva/mockups/slide-26.png` (hoặc Canva trang 1, hoặc slide 26 của
`docs/SpendWise-Thiet-ke-giao-dien.pptx`). Chỉ tay/theo chuột vào 3 vùng:

1. Hàng thẻ KPI phía trên (4 thẻ trong bản gốc).
2. Cụm 2 cột: nhật ký hoạt động bên trái, thông báo hệ thống bên phải.
3. Nút **＋ Thêm** và modal thông báo.

Nói: *“Mockup chia 2 tầng: tổng quan số liệu ở trên, chi tiết vận hành ở dưới.
Bản code giữ đúng thứ tự này; khi em sửa trực tiếp, hàng KPI có thêm thẻ thứ 5.”*

### 2.2. Mở file trong VS Code (yêu cầu 3)

`Ctrl + P` và mở:

- `pages/admin-system-dashboard.html`
- `css/style.css`
- `js/ui.js`
- (khi cần) `js/api.js`, `js/layout.js`

Các vùng cần chỉ:

| File | Dòng | Nội dung |
|---|---|---|
| HTML | 14–16 | `<main>` và `#kpiBox` |
| HTML | 18–33 | `.grid-2` chứa nhật ký + thông báo |
| HTML | 20–23 | card nhật ký, `#logBox` |
| HTML | 26–32 | card thông báo, nút `#addAn`, `#anBox` |
| HTML | 38–53 | modal thêm/sửa thông báo |
| HTML | 56–60 | nạp 5 file JS lõi dùng chung |
| HTML | 65 | biến trạng thái `editingAnId` |
| HTML | 68–82 | `loadKpi()` — tính 4 KPI |
| HTML | 84–90 | hàm `kpi()` sinh HTML một thẻ |
| HTML | 93–111 | `loadLogs()` — sắp nhật ký, render bảng |
| HTML | 114–139 | `loadAnnouncements()` — render + gắn nút |
| HTML | 141–161 | `bindAnnouncementButtons()` — sửa/xoá |
| HTML | 163–169 | nút **＋ Thêm** mở modal |
| HTML | 171–198 | submit: kiểm tra + thêm/sửa |
| HTML | 200–203 | khởi động 3 hàm load |
| CSS | 205–218 | `.kpi-grid` + `.kpi` |
| CSS | 223, 329 | `.table-wrap { overflow-x: auto; }` |
| CSS | 256–266 | `.modal-backdrop` + `.modal` |
| CSS | 294–305 | `.empty`, `.skeleton` |
| CSS | 308 | `.grid-2` hai cột 1.2fr / 1fr |
| CSS | 312–315 | `.row-between` |
| CSS | 344 | `.announcement-card` |
| CSS | 470–487 | breakpoint 960px duy nhất |
| ui.js | 13–15 | `SW.onClick` gắn click cho các nút khớp selector |
| ui.js | 43–49 | `SW.empty`, `SW.skeleton` |
| ui.js | 52–58 | `SW.table` bọc `.table-wrap` |
| ui.js | 97–104 | `SW.loadInto` — skeleton → dữ liệu → lỗi |
| ui.js | 143–161 | `SW.toast` |
| ui.js | 164–175 | `SW.openModal`, `SW.closeModal` |
| ui.js | 252–262 | `SW.runAction` |
| ui.js | 265–268 | `SW.confirmAndRun` |
| api.js | 58, 67, 76, 80 | `list`, `create`, `update`, `archive` |
| layout.js | 23–27 | menu vai trò admin (3 mục) |
| layout.js | 45–68 | dựng sidebar từ `NAV` |
| data.js | 6–13 | 6 người dùng, u3 bị khoá |
| data.js | 66–71 | 1 tài nguyên đã xuất bản, 1 chờ duyệt |
| data.js | 81–85 | 2 phản hồi chưa xử lý xong |
| data.js | 87–93 | 5 nhật ký |
| data.js | 95–97 | 1 thông báo |

### 2.3. Giải thích HTML/CSS (yêu cầu 4)

Nói theo 4 tầng:

1. **Khung trang:** `<body data-role="admin" data-page="admin-system-dashboard.html"
   data-title="Bảng điều khiển hệ thống">`. `js/layout.js` đọc ba thuộc tính này
   để dựng sidebar 3 mục (Danh mục chi, Người dùng, Hệ thống) và topbar. Trang
   không viết tay menu, nên 19 trang dùng chung một layout.
2. **KPI:** `#kpiBox` dùng `.kpi-grid` với
   `repeat(auto-fit, minmax(200px, 1fr))` — desktop xếp 4 cột, hẹp tự xuống
   1 cột mà không cần viết media query riêng. Mỗi thẻ `.kpi` là một card có
   nhãn + số lớn.
3. **Hai cột:** `.grid-2` chia 1.2fr cho nhật ký, 1fr cho thông báo. Nhật ký
   dùng `SW.table()` để có `.table-wrap` cuộn ngang khi hẹp. Thông báo dùng
   `.row-between` để đẩy nút Sửa/Xoá sang phải và tự wrap.
4. **Modal:** `.modal-backdrop` là lớp phủ `position: fixed; inset: 0;
   display: none`. Khi gọi `SW.openModal("anModal")`, class `open` được thêm →
   `display: flex` căn giữa. `.modal` rộng `min(560px, 92vw)`, cao tối đa
   `86vh`, `overflow: auto` nên trên điện thoại vẫn dùng được.
5. **Responsive:** chỉ có **một breakpoint 960px** (`css/style.css` dòng
   470–487): sidebar thành thanh điều hướng cố định ở đáy, `.grid-2` về 1 cột,
   `.main` thêm `padding-bottom: 90px`. Không có breakpoint 640px — nếu bị hỏi,
   trả lời đúng như vậy.

Màu sắc lấy từ biến CSS trong `:root`; chế độ tối ghi đè trong
`[data-theme="dark"]`, nên không cần sửa từng thẻ.

### 2.4. Giải thích thuật toán JS (yêu cầu 4)

Nói theo luồng:

1. **Khi mở trang:** dòng 201–203 gọi `loadKpi()`, `loadLogs()`,
   `loadAnnouncements()` — ba hàm chạy song song, không `await` lẫn nhau.
2. **`SW.loadInto()`** (`js/ui.js` dòng 97–104): hiện skeleton → `await`
   dữ liệu → thay bằng HTML; nếu API báo lỗi thì hiện khung lỗi có nút
   “Thử lại”. Nhờ vậy mỗi vùng có trạng thái tải riêng.
3. **`loadKpi()`:** gọi `API.list("users")`, lọc giao dịch `status === "active"`,
   tài nguyên `status === "published"`, phản hồi `status === "new"` hoặc
   `"processing"`. Mỗi `API.list` chờ 400–900ms mô phỏng máy chủ. Kết quả nối
   bằng `+` thành 4 chuỗi HTML gọi từ `kpi()`.
4. **`loadLogs()`:** lấy toàn bộ nhật ký, sắp giảm dần bằng
   `b.time.localeCompare(a.time)` (dạng `YYYY-MM-DD HH:mm` nên so chuỗi là đúng
   thứ tự thời gian), lấy 8 dòng đầu, render bằng `SW.table`.
5. **`loadAnnouncements()`:** lọc `status !== "archived"`, sắp theo ngày giảm
   dần, nếu rỗng thì trả `SW.empty`. Mỗi thông báo render bằng template literal;
   mọi chuỗi người dùng nhập đi qua `SW.escapeHtml()` trước khi chèn.
6. **Gắn sự kiện:** sau khi render, `bindAnnouncementButtons()` gọi
   `SW.onClick("[data-edit]", ...)` và `SW.onClick("[data-archive]", ...)`.
   `SW.onClick` (ui.js dòng 13–15) lặp qua các nút khớp selector và gắn
   `addEventListener` trực tiếp. Vì danh sách được render lại sau mỗi lần tải,
   phải gọi lại hàm bind — đây là lý do không gắn sự kiện một lần trong HTML.
7. **Sửa:** `API.get` lấy thông báo → gán `editingAnId` → đổ chữ vào textarea →
   đổi tiêu đề modal → mở modal.
8. **Lưu:** `submit` gọi `e.preventDefault()`, `clearErrors`, `trim`, kiểm tra
   `text.length < 10`. Nếu thiếu thì `markInvalid` và dừng. Nếu hợp lệ: có
   `editingAnId` thì `API.update`, không thì `API.create` với ngày hôm nay và
   `status: "active"`. Sau đó toast, đóng modal, tải lại danh sách.
9. **Xoá mềm:** `SW.confirmAndRun` hỏi xác nhận; đồng ý mới gọi
   `API.archive` (đổi `status: "archived"`), không xoá cứng — giữ lịch sử.

### 2.5. Sửa code trực tiếp (yêu cầu 5)

Mục tiêu: thêm KPI thứ 5 **“Tài khoản bị khoá”**.

Trong `pages/admin-system-dashboard.html`:

1. Sau dòng 75 (`const feedbacks = ...`), thêm:

```js
    const lockedUsers = users.filter((user) => user.status === "locked").length;
```

2. Cuối dòng 80, đổi dấu `;` thành `+` và thêm dòng:

```js
      kpi("Tài khoản bị khoá", lockedUsers, "🔒");
```

3. Dòng 81: đổi `SW.skeleton(4, 90)` thành `SW.skeleton(5, 90)`.

Kết quả đoạn cuối (để đối chiếu, không cần gõ lại cả khối):

```js
    const feedbacks = await API.list("feedbacks", (f) => f.status === "new" || f.status === "processing");
    const lockedUsers = users.filter((user) => user.status === "locked").length;

    return kpi("Tài khoản", users.length, "👤") +
      kpi("Giao dịch đang hoạt động", transactions.length, "🧾") +
      kpi("Tài nguyên đã xuất bản", resources.length, "📚") +
      kpi("Phản hồi chưa xử lý xong", feedbacks.length, "💬") +
      kpi("Tài khoản bị khoá", lockedUsers, "🔒");
```

`Ctrl + S` → trình duyệt `F5`. Kỳ vọng: hàng KPI có **5 thẻ**, thẻ cuối hiện
**1** (u3 Lê Quốc Bảo đang bị khoá). Ảnh đối chiếu:
`docs/viva/rehearsal/admin-dashboard-kpi-tai-khoan-khoa.png`.

Nói: *“Em không sửa dữ liệu mẫu, chỉ đếm thêm từ mảng `users` đã tải sẵn, nên
không ảnh hưởng 4 thẻ cũ.”*

### 2.6. Test tương tác + responsive (yêu cầu 6)

Test tương tác:

- [ ] `F5`: 4 KPI gốc hiện **6 / 17 / 1 / 2**; sau khi sửa có thêm thẻ
      **🔒 Tài khoản bị khoá = 1**.
- [ ] Nhật ký có 5 dòng, mới nhất `2026-10-18 21:40`, cũ nhất
      `2026-10-15 20:11`.
- [ ] Bấm **＋ Thêm** → để trống → **Lưu** → hiện lỗi đỏ dưới textarea.
- [ ] Nhập `Bảo trì hệ thống lúc 23h tối nay.` → **Lưu** → toast xanh, modal
      đóng, danh sách có **2 thông báo**.
- [ ] Bấm **Sửa** thông báo vừa thêm → đổi chữ → **Lưu** → nội dung đổi.
- [ ] Bấm **Xoá** → hộp xác nhận → **Xác nhận** → toast đỏ, còn **1 thông báo**.
- [ ] Bấm **⚠️ Mô phỏng lỗi** trên topbar → `F5` → cả 3 vùng hiện khung lỗi +
      nút “Thử lại”; tắt mô phỏng rồi tải lại để tiếp tục.
- [ ] Console: không có dòng đỏ.

Responsive:

1. `F12` → `Ctrl + Shift + M` (device toolbar) → chọn **iPhone 12 Pro** hoặc
   nhập **390 × 844** → `F5`.
2. Chỉ: KPI xếp **1 cột**, `.grid-2` thành **1 cột**, menu thành thanh đáy
   3 mục (Danh mục chi, Người dùng, Hệ thống), nút trong card thông báo tự
   wrap, không có thanh cuộn ngang toàn trang.
3. Chụp đối chiếu: `docs/viva/screens/admin-system-dashboard-mobile.png`.

### 2.7. Git (yêu cầu 7, 8)

Nhánh được tạo sẵn từ `dev`:

```bash
git switch feature/task-24-admin-system-dashboard
git status
git diff
git add pages/admin-system-dashboard.html
git commit -m "feat(TASK-24): thêm KPI tài khoản bị khoá trên bảng điều khiển hệ thống"
git push -u origin feature/task-24-admin-system-dashboard
git branch --show-current
git log -1 --oneline
```

Đọc to: *“Task ID **TASK-24**, nhánh **feature/task-24-admin-system-dashboard**,
commit code là **<7 ký tự đầu hiện trên terminal>**.”* Không đọc mã trước khi
commit tồn tại.

Nếu bạn chỉ rà soát, thêm một câu: *“Đây là chỉnh sửa nhỏ của em khi rà soát
màn hình do bạn SV2 phụ trách; commit gốc của màn hình nằm ở nhánh của bạn ấy.”*

---

## 3. MÀN 2 — QUẢN LÝ NGƯỜI DÙNG (ADMIN)

### 3.1. Mockup (yêu cầu 2)

Mở `docs/viva/mockups/slide-25.png` (Canva trang 2 / slide 25). Chỉ:

1. Thanh công cụ: ô tìm kiếm + chọn vai trò + nút **＋ Thêm người dùng**.
2. Bảng người dùng: họ tên/email, vai trò, trạng thái, nút Sửa/Khoá.
3. Modal thêm–sửa và hộp xác nhận khoá/mở.

Nói: *“Màn này là CRUD tài khoản: thêm, sửa, khoá/mở. Điểm nhấn là tìm kiếm
theo tên hoặc email, lọc vai trò, chặn email trùng và không cho khoá tài khoản
quản trị.”*

### 3.2. Mở file trong VS Code (yêu cầu 3)

- `pages/admin-user-management.html`
- `css/style.css`
- `js/ui.js`
- (khi cần) `js/api.js`, `js/data.js`

| File | Dòng | Nội dung |
|---|---|---|
| HTML | 15–31 | toolbar tìm kiếm/lọc/thêm |
| HTML | 33–35 | card chứa `#userBox` |
| HTML | 40–69 | modal thêm/sửa người dùng |
| HTML | 72–76 | nạp JS lõi |
| HTML | 81 | biến `editingId` |
| HTML | 83–93 | `ROLE_BADGE` + `roleBadge()` |
| HTML | 96–134 | `loadUsers()` — lọc + render bảng |
| HTML | 136–156 | `bindUserButtons()` — sửa, khoá/mở |
| HTML | 159–165 | nút thêm mở modal |
| HTML | 167–176 | `openEdit()` đổ dữ liệu vào form |
| HTML | 178–210 | submit: kiểm tra + trùng email + lưu |
| HTML | 212–215 | sự kiện lọc + khởi động |
| CSS | 181–191 | `.badge` và các màu |
| CSS | 223, 329 | `.table-wrap { overflow-x: auto; }` |
| CSS | 236–247 | `.field`, `.field-error` |
| CSS | 256–266 | `.modal-backdrop` + `.modal` |
| CSS | 294–298 | `.empty` |
| CSS | 317–319 | `.toolbar` + `.grow` |
| CSS | 341 | `.is-archived { opacity: .6; }` |
| CSS | 401 | `.actions-cell { min-width: 230px; }` |
| CSS | 470–487 | responsive 960px |
| ui.js | 13–15 | `SW.onClick` |
| ui.js | 97–104 | `SW.loadInto` |
| ui.js | 132–140 | `SW.clearErrors`, `SW.markInvalid` |
| ui.js | 143–161 | `SW.toast` |
| ui.js | 164–175 | `SW.openModal`, `SW.closeModal` |
| ui.js | 242–248 | `SW.debounce` |
| ui.js | 252–262 | `SW.runAction` |
| ui.js | 265–268 | `SW.confirmAndRun` |
| api.js | 58, 64, 67, 76 | `list`, `get`, `create`, `update` |
| data.js | 6–13 | 6 người dùng, u3 bị khoá |
| layout.js | 23–27 | menu vai trò admin |

### 3.3. Giải thích HTML/CSS (yêu cầu 4)

1. **Toolbar:** `.card.toolbar` là flex-wrap. Ô tìm kiếm có `.grow`
   (`flex: 1; min-width: 200px`) nên chiếm phần rộng còn lại; ô chọn vai trò
   và nút thêm giữ kích thước tự nhiên. Khi hẹp, các phần tử tự xuống dòng.
2. **Bảng:** `#userBox` được JS đổ HTML. `SW.table()` bọc bảng trong
   `.table-wrap` có `overflow-x: auto`, nên trên điện thoại chỉ **bảng** cuộn
   ngang trong card, cả trang không bị tràn.
3. **Badge:** `ROLE_BADGE` là object ánh xạ `user/coach/moderator/admin` sang
   cặp `[nhãn, màu]`; `roleBadge()` lấy cặp đó và gọi `SW.badge()`. Trạng thái
   dùng `SW.statusBadge()` với bảng `STATUS` chung trong `ui.js`.
4. **Dòng bị khoá:** template thêm `class="is-archived"` khi
   `user.status === "locked"` → CSS giảm opacity 0.6 để nhìn khác biệt.
5. **Nút khoá:** chỉ render khi `user.role !== "admin"`. Đây là lớp bảo vệ
   bằng giao diện: tài khoản admin không có nút khoá.
6. **Modal:** cùng cơ chế `.modal-backdrop.open` như màn 1; form có
   `novalidate` để tự kiểm tra bằng JS thay vì bong bóng mặc định của trình
   duyệt.

### 3.4. Giải thích thuật toán JS (yêu cầu 4)

1. **`loadUsers()`:** đọc `keyword` từ `#q` (trim, lowercase) và `role` từ
   `#fRole`. Gọi `API.list("users", filterFn)` với điều kiện:
   `(!keyword || tên chứa keyword || email chứa keyword) && (!role || role khớp)`.
   Nếu rỗng → `SW.empty`. Nếu có → `SW.table` với 4 cột.
2. **Render từng dòng:** `locked` là biến phụ; template chèn badge vai trò,
   badge trạng thái, nút Sửa, và nút Khoá/Mở khoá có nhãn đổi theo `locked`.
3. **Gắn sự kiện:** sau render, `bindUserButtons()` gọi `SW.onClick` cho
   `[data-edit]` và `[data-lock]`. Vì bảng được render lại, các nút mới phải
   được gắn lại — `SW.onClick` lặp qua các nút hiện có và gắn listener trực tiếp.
4. **Sửa:** `openEdit(id)` gọi `API.get`, gán `editingId`, đổ `name/email/role`
   vào form, xóa lỗi cũ, mở modal.
5. **Thêm:** nút `#addBtn` reset form, đặt `editingId = null`, đổi tiêu đề,
   mở modal.
6. **Lưu:** submit `preventDefault`; lấy `name`, `email`, `role`; kiểm tra
   `name.length < 2` và regex email `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. Nếu sai thì
   `markInvalid` từng ô và dừng.
7. **Chặn trùng email:** gọi `API.list("users", u => u.email === email &&
   u.id !== editingId)`. Nếu có kết quả → toast đỏ “Email này đã tồn tại.” và
   dừng. Điều kiện `u.id !== editingId` để khi sửa chính người đó mà không đổi
   email thì không bị coi là trùng.
8. **Lưu thật:** có `editingId` → `API.update`; không → `API.create` với
   `status: "active"`. Toast, đóng modal, `loadUsers()`.
9. **Khoá/mở:** `API.get` lấy user; `toLock = user.status !== "locked"`;
   `SW.confirmAndRun` hỏi lại với câu phù hợp; đồng ý mới `API.update` đổi
   `status` thành `locked`/`active`; toast + tải lại.
10. **Tìm kiếm:** `#q` dùng `SW.debounce(loadUsers, 250)` — gõ nhanh thì chỉ
    chạy sau khi ngừng 250ms, tránh gọi API mỗi phím. `#fRole` đổi thì gọi ngay.

### 3.5. Sửa code trực tiếp (yêu cầu 5)

Mục tiêu: hiện dòng tổng **“6 tài khoản · 1 đang bị khoá”** ngay trên bảng.

Trong `pages/admin-user-management.html`:

1. Trước dòng 34 (`<div id="userBox"></div>`), thêm:

```html
      <p id="userSummary" class="text-small text-muted mb-3"></p>
```

2. Trong `loadUsers()`, sau dòng 105 (kết thúc lời gọi `API.list`) và **trước**
   dòng 107 (`if (users.length === 0)`), thêm:

```js
    SW.$("#userSummary").textContent = users.length + " tài khoản · " +
      users.filter((u) => u.status === "locked").length + " đang bị khoá";
```

Kết quả đoạn giữa (để đối chiếu):

```js
    const users = await API.list("users", (u) =>
      (!keyword || u.name.toLowerCase().includes(keyword) || u.email.toLowerCase().includes(keyword)) &&
      (!role || u.role === role));

    SW.$("#userSummary").textContent = users.length + " tài khoản · " +
      users.filter((u) => u.status === "locked").length + " đang bị khoá";

    if (users.length === 0) return SW.empty("👤", "Không có người dùng phù hợp.");
```

`Ctrl + S` → `F5`. Kỳ vọng:

- Ban đầu: **“6 tài khoản · 1 đang bị khoá”**.
- Lọc vai trò **Người dùng**: **“3 tài khoản · 1 đang bị khoá”**.
- Gõ từ khóa không khớp: **“0 tài khoản · 0 đang bị khoá”** + khung rỗng.

Ảnh đối chiếu: `docs/viva/rehearsal/admin-users-tong-tai-khoan.png`.

Nói: *“Dòng tổng nằm ngoài `#userBox` nên không bị `loadInto` xóa mỗi lần tải;
em cập nhật nó ngay sau khi có mảng `users` đã lọc.”*

### 3.6. Test tương tác + responsive (yêu cầu 6)

Test tương tác:

- [ ] `F5`: bảng có **6 dòng**; u3 Lê Quốc Bảo có badge **Đã khoá** và nút
      **Mở khoá**; dòng admin **Quản trị hệ thống** không có nút khoá.
- [ ] Gõ `minh` vào ô tìm kiếm → còn **1 dòng** Nguyễn Văn Minh.
- [ ] Chọn vai trò **Người dùng** → còn **3 dòng**; xóa lọc → về 6.
- [ ] Gõ từ khóa rác → khung **“Không có người dùng phù hợp.”**
- [ ] **＋ Thêm người dùng** → để trống → **Lưu** → 2 lỗi đỏ (họ tên, email).
- [ ] Nhập email sai `abc` → lỗi email; sửa thành email hợp lệ nhưng trùng
      `minh@student.edu.vn` → toast đỏ **“Email này đã tồn tại.”**
- [ ] Nhập `Nguyễn Văn Test` + `test@student.edu.vn` + vai trò Người dùng →
      toast xanh, bảng có **7 dòng**.
- [ ] Bấm **Sửa** dòng vừa thêm → đổi tên → **Lưu** → tên đổi trên bảng.
- [ ] Bấm **Khoá** dòng Nguyễn Văn Minh → hộp xác nhận → **Xác nhận** → badge
      **Đã khoá**, dòng mờ, nút thành **Mở khoá**. Bấm **Mở khoá** → trở lại.
- [ ] Console không có lỗi đỏ.

Responsive:

1. `F12` → `Ctrl + Shift + M` → 390×844 → `F5`.
2. Chỉ: toolbar xuống dòng, bảng cuộn ngang **trong card** (không tràn trang),
   menu thành thanh đáy 3 mục.
3. Ảnh đối chiếu: `docs/viva/screens/admin-user-management-mobile.png`.

### 3.7. Git (yêu cầu 7, 8)

```bash
git switch feature/task-24-admin-users
git status
git diff
git add pages/admin-user-management.html
git commit -m "feat(TASK-24): hiển thị tổng số tài khoản và số tài khoản bị khoá"
git push -u origin feature/task-24-admin-users
git branch --show-current
git log -1 --oneline
```

Đọc to: *“Task ID **TASK-24**, nhánh **feature/task-24-admin-users**, commit code
**<7 ký tự>**.”*

---

## 4. MÀN 3 — DUYỆT TÀI NGUYÊN (MODERATOR)

### 4.1. Mockup (yêu cầu 2)

Mở `docs/viva/mockups/slide-21.png` (Canva trang 3 / slide 21). Chỉ:

1. Tiêu đề **Hàng chờ kiểm duyệt** + mô tả quy trình.
2. Card tài nguyên: tiêu đề, tag, nội dung, người gửi, ngày gửi.
3. Hai nút **✓ Duyệt** / **✕ Từ chối** và modal lý do từ chối.

Nói: *“Màn này chỉ có một hàng chờ duyệt tài nguyên. Duyệt là xuất bản ngay;
từ chối bắt buộc nhập lý do tối thiểu 10 ký tự để huấn luyện viên biết cần sửa
gì.”*

### 4.2. Mở file trong VS Code (yêu cầu 3)

- `pages/moderator-resource-review.html`
- `css/style.css`
- `js/ui.js`
- (khi cần) `js/api.js`, `js/data.js`

| File | Dòng | Nội dung |
|---|---|---|
| HTML | 15–20 | card tiêu đề + mô tả |
| HTML | 22–24 | card chứa `#reviewBox` |
| HTML | 29–47 | modal từ chối + textarea lý do |
| HTML | 50–54 | nạp JS lõi |
| HTML | 59 | biến `rejectingId` |
| HTML | 61–65 | `TAGS` ánh xạ slug → nhãn |
| HTML | 68–99 | `loadQueue()` — lọc, sắp, render |
| HTML | 101–114 | `bindReviewButtons()` — duyệt/từ chối |
| HTML | 117–135 | submit lý do từ chối |
| HTML | 137–138 | khởi động |
| CSS | 181–191 | `.badge.purple` |
| CSS | 256–266 | `.modal-backdrop` + `.modal` |
| CSS | 294–298 | `.empty` |
| CSS | 312–315 | `.row-between` |
| CSS | 316 | `.actions` flex-wrap |
| CSS | 470–487 | responsive 960px |
| ui.js | 13–15 | `SW.onClick` |
| ui.js | 43–49 | `SW.empty`, `SW.skeleton` |
| ui.js | 97–104 | `SW.loadInto` |
| ui.js | 132–140 | `SW.clearErrors`, `SW.markInvalid` |
| ui.js | 143–161 | `SW.toast` |
| ui.js | 164–175 | `SW.openModal`, `SW.closeModal` |
| ui.js | 252–262 | `SW.runAction` |
| api.js | 58, 76, 92 | `list`, `update`, `userName` |
| data.js | 66–71 | 1 tài nguyên chờ duyệt (r2) |
| layout.js | 18–22 | menu vai trò moderator |

### 4.3. Giải thích HTML/CSS (yêu cầu 4)

1. **Hai card:** card đầu chỉ có tiêu đề + mô tả quy trình; card thứ hai chứa
   `#reviewBox` do JS đổ nội dung. Cách tách này giữ phần hướng dẫn cố định,
   chỉ vùng danh sách thay đổi khi tải lại.
2. **Card tài nguyên:** `.row-between` đặt phần nội dung bên trái (`.grow`) và
   cụm nút bên phải (`.actions`). Khi hẹp, cả hai tự wrap; nút không bị ép ra
   ngoài màn hình.
3. **Tag:** `TAGS` là object ánh xạ `ngan-sach → Ngân sách`,
   `tiet-kiem → Tiết kiệm`, `thoi-quen → Thói quen`; nếu tag lạ thì hiện
   “Chung”. Tag dùng `.badge.purple`.
4. **Modal từ chối:** `.modal-backdrop` + `.modal` như hai màn trước; textarea
   `rows="3"`; thông báo lỗi `<p id="errReason" hidden>` chỉ hiện khi
   `markInvalid`.
5. **Responsive:** một breakpoint 960px; sidebar thành thanh đáy 3 mục (Duyệt
   tài nguyên, Mẫu AI, Phản hồi); modal rộng tối đa 92vw nên vẫn vừa 390px.

### 4.4. Giải thích thuật toán JS (yêu cầu 4)

1. **`loadQueue()`:** gọi `API.list("resources", r => r.status === "pending")`,
   sắp **tăng dần** theo `updatedAt` bằng
   `a.updatedAt.localeCompare(b.updatedAt)` — tài nguyên gửi trước được duyệt
   trước (FIFO). Nếu rỗng → `SW.empty("🎉", ...)`.
2. **Render:** mỗi tài nguyên là một card; tiêu đề/nội dung/tag đều đi qua
   `SW.escapeHtml()` trước khi chèn. Tên người gửi lấy bằng
   `API.userName(resource.authorId).name`; ngày format bằng `SW.fmtDate`.
3. **Gắn nút:** sau render, `bindReviewButtons()` gắn `[data-ok]` và
   `[data-no]` bằng `SW.onClick`. Vì card được render lại, phải bind lại.
4. **Duyệt:** `SW.runAction(() => API.update(..., {status:"published",
   rejectReason:""}), "Đã duyệt và xuất bản tài nguyên.", loadQueue)`. Không có
   hộp xác nhận vì đây là hành động tích cực; sau khi chạy, toast + tải lại
   hàng chờ.
5. **Mở modal từ chối:** lưu `rejectingId`, xóa textarea, `clearErrors`, mở
   modal. Không gọi API ngay — chờ người dùng nhập lý do.
6. **Submit từ chối:** `preventDefault`; `trim`; nếu `reason.length < 10` thì
   `markInvalid` và dừng. Nếu hợp lệ: `API.update` đổi `status: "rejected"` và
   lưu `rejectReason`; toast info; đóng modal; tải lại hàng chờ.
7. **Lưu vết:** `rejectReason` nằm trong `resources` (LocalStorage). Trang
   Huấn luyện viên đọc lại và hiện dòng “⛔ Lý do từ chối: …”
   (`coach-resource-management.html` dòng 123–125), nên lý do không bị mất.

### 4.5. Sửa code trực tiếp (yêu cầu 5)

Mục tiêu: hiện badge **“1 chờ duyệt”** ngay cạnh tiêu đề.

Trong `pages/moderator-resource-review.html`:

1. Dòng 16, đổi tiêu đề thành:

```html
      <h2>Hàng chờ kiểm duyệt <span id="queueCount" class="badge warning"></span></h2>
```

2. Trong `loadQueue()`, sau dòng 73 (dòng `.sort(...)`) và **trước** dòng 75
   (`if (items.length === 0)`), thêm:

```js
    SW.$("#queueCount").textContent = items.length + " chờ duyệt";
```

Kết quả đoạn giữa (để đối chiếu):

```js
    const items = (await API.list("resources", (r) => r.status === "pending"))
      .sort((a, b) => a.updatedAt.localeCompare(b.updatedAt)); // gửi trước duyệt trước

    SW.$("#queueCount").textContent = items.length + " chờ duyệt";

    if (items.length === 0) {
      return SW.empty("🎉", "Không có tài nguyên nào chờ duyệt.<br>Bạn đã xử lý hết hàng chờ!");
    }
```

`Ctrl + S` → `F5`. Kỳ vọng: badge hiện **“1 chờ duyệt”**. Bấm **Duyệt** (hoặc
từ chối hợp lệ) → badge thành **“0 chờ duyệt”** và card biến thành khung chúc
mừng. Ảnh đối chiếu: `docs/viva/rehearsal/moderator-queue-badge.png`.

Nói: *“Badge nằm ngoài `#reviewBox` nên không bị xóa khi tải lại; em cập nhật
số lượng ngay sau khi lọc và sắp xếp, trước khi kiểm tra rỗng.”*

### 4.6. Test tương tác + responsive (yêu cầu 6)

Test tương tác:

- [ ] `F5`: có **1 tài nguyên** “Checklist chi tiêu đầu tháng”, tag **Thói quen**,
      người gửi **Phạm Thị Lan**, ngày **16/10/2026**.
- [ ] Bấm **✓ Duyệt** → chờ 400–900ms → toast xanh, badge **0 chờ duyệt**,
      khung **“Không có tài nguyên nào chờ duyệt.”**
- [ ] **♻️ Reset dữ liệu** → `F5` → bấm **✕ Từ chối** → modal mở.
- [ ] Để trống → **Từ chối** → lỗi đỏ “Vui lòng nhập lý do (tối thiểu 10 ký tự).”
- [ ] Nhập `sai` → vẫn lỗi; nhập `Nội dung chưa dẫn nguồn số liệu.` → toast
      info, modal đóng, badge **0 chờ duyệt**, khung rỗng.
- [ ] (Tùy chọn) Đăng nhập nhanh **Huấn luyện viên — Cô Lan** → mở **Tài nguyên**
      → thấy r2 bị từ chối kèm đúng lý do vừa nhập.
- [ ] Bấm **⚠️ Mô phỏng lỗi** → `F5` → khung lỗi + “Thử lại”; tắt mô phỏng.
- [ ] Console không có lỗi đỏ.

Responsive:

1. `F12` → `Ctrl + Shift + M` → 390×844 → `F5`.
2. Chỉ: tiêu đề và mô tả xuống dòng, hai nút Duyệt/Từ chối xuống dưới nội dung,
   modal vừa chiều rộng, menu thành thanh đáy 3 mục, không tràn ngang.
3. Ảnh đối chiếu: `docs/viva/screens/moderator-resource-review-mobile.png`.

### 4.7. Git (yêu cầu 7, 8)

```bash
git switch feature/task-23-moderator-resource-review
git status
git diff
git add pages/moderator-resource-review.html
git commit -m "feat(TASK-23): hiển thị số tài nguyên đang chờ duyệt"
git push -u origin feature/task-23-moderator-resource-review
git branch --show-current
git log -1 --oneline
```

Đọc to: *“Task ID **TASK-23**, nhánh
**feature/task-23-moderator-resource-review**, commit code **<7 ký tự>**.”*

---

## 5. Sau khi quay đủ 3 màn

### 5.1. Kiểm tra trên GitHub

- Mở repo → tab **Branches**: thấy 3 nhánh feature mới.
- Mở từng nhánh → **Commits**: thấy đúng commit message và tác giả thật.
- Tạo 3 Pull Request vào `dev` (hoặc `main`), mô tả ngắn, rồi merge. Nếu giảng
  viên yêu cầu PR, đây là minh chứng; nếu không, nhánh đã push là đủ.
- Không tự tạo commit/PR thay người khác. Phần màn hình của ai phải do người đó
  commit bằng tài khoản của họ.

### 5.2. Cập nhật Trello

- **TASK-23, TASK-24:** dán tên branch + link commit/PR; sửa cột Người phụ
  trách cho khớp thực tế (hiện ghi SV2, trong khi deck/screen-list ghi SV3).
- **TASK-09:** dán link repo GitHub.
- **TASK-10:** dán link Canva (sau khi upload 3 mockup).
- **TASK-12:** báo cáo sử dụng AI vẫn còn thiếu — cần viết trung thực, không
  nói “tự làm 100%”. Ba màn này không dùng AI; ghi đúng như vậy.
- **TASK-08:** gắn tên 3 file OBS; đổi tiền tố SV3 → SV2 nếu nhóm chỉ có 2 SV.

### 5.3. Nộp bài

- 3 video OBS (hoặc 1 video dài) + link repo + link Canva.
- Kiểm tra lại video: thấy mặt, nghe giọng, thấy rõ Task ID/branch/commit.
- Không đưa mật khẩu demo lên video; nếu lỡ quay vào ô mật khẩu, che hoặc cắt.
- Không nộp kèm ảnh `*-mobile-iframe.png` (đã xóa); dùng ảnh mobile đã cắt.

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

1. **Ba màn này có AI không?**
   Không. Slide 21, 25, 26 ghi rõ “Không dùng AI”. Đây là nghiệp vụ quản trị và
   kiểm duyệt: tổng hợp KPI, CRUD tài khoản, duyệt tài nguyên. AI-1/2/3 nằm ở
   luồng Người dùng (TASK-19), không gắn vào ba màn này để tránh nói sai.
2. **Vì sao CSS/JS dùng chung?**
   Để 19 trang cùng một giao diện, sửa một chỗ áp dụng tất cả; phần riêng của
   từng trang nằm trong `<script>` cuối file HTML. Nhược điểm: file CSS lớn hơn
   nhu cầu từng trang, nhưng dự án nhỏ nên đánh đổi này hợp lý.
3. **Vì sao dùng `innerHTML`? Có an toàn không?**
   Dữ liệu ít, cần code dễ hiểu. Mọi chuỗi do người dùng nhập đều đi qua
   `SW.escapeHtml()` trước khi chèn, nên không bị chèn thẻ HTML/JS.
4. **Vì sao xoá thông báo lại là “lưu trữ”?**
   Giữ lịch sử vận hành và cho phép khôi phục; xoá cứng sẽ làm mất nhật ký.
   `API.archive` chỉ đổi `status: "archived"`, danh sách lọc bỏ trạng thái này.
5. **Vì sao không cho khoá tài khoản admin?**
   Để tránh tự khoá hoặc khoá hết quản trị viên, không còn ai quản lý hệ thống.
   Code chỉ render nút khoá khi `user.role !== "admin"`.
6. **Vì sao vẫn có thể đổi vai trò admin thành user?**
   Đây là hạn chế đã biết của nguyên mẫu: form cho đổi vai trò, chưa kiểm tra
   số admin còn lại. Nếu làm tiếp, phải đếm admin đang hoạt động trước khi
   `API.update` và chặn hạ cấp admin cuối cùng.
7. **Vì sao từ chối phải nhập lý do ≥10 ký tự?**
   Để huấn luyện viên biết cần sửa gì; lý do quá ngắn như “sai” không dùng được.
   Lý do được lưu vào `resources.rejectReason` và hiện lại ở trang Huấn luyện viên.
8. **Vì sao hàng chờ sắp xếp tăng dần?**
   Công bằng theo thứ tự gửi trước (FIFO), tránh tài nguyên cũ bị bỏ quên.
   `updatedAt` dạng `YYYY-MM-DD` nên so sánh chuỗi bằng `localeCompare` là đúng.
9. **Vì sao ô tìm kiếm dùng `debounce`?**
   Tránh gọi API sau mỗi phím bấm. `SW.debounce` đặt một `setTimeout` và
   `clearTimeout` lần trước; chỉ chạy sau khi người dùng ngừng gõ 250ms.
10. **Responsive có mấy breakpoint?**
    Một breakpoint 960px trong `css/style.css` (dòng 470–487). Bảng cuộn ngang
    nhờ `.table-wrap` (dòng 223/329), không có breakpoint 640px.
11. **Vì sao không có backend?**
    Đây là nguyên mẫu frontend theo yêu cầu môn học; dữ liệu lưu LocalStorage,
    API giả lập độ trễ 400–900ms. Hạn chế: không xác thực thật, dữ liệu chỉ nằm
    trên máy đang dùng.
12. **Vì sao `SW.onClick` phải gọi lại sau mỗi lần render?**
    Vì nó gắn listener trực tiếp lên từng nút đang có trong DOM. Khi
    `loadUsers`/`loadQueue` thay `innerHTML`, các nút cũ mất và nút mới chưa có
    listener; gọi lại `bind...Buttons()` để gắn cho nút mới.
13. **Vì sao badge/summary đặt ngoài vùng `loadInto`?**
    `loadInto` thay toàn bộ nội dung của `#userBox`/`#reviewBox`; phần tổng hợp
    đặt ngoài nên không bị xóa, và được cập nhật ngay sau khi có dữ liệu đã lọc.
14. **Nếu API lỗi thì sao?**
    `SW.loadInto` bắt lỗi và render `SW.errorBox` có nút “Thử lại” (tải lại
    trang). Nút **⚠️ Mô phỏng lỗi** trên topbar dùng để diễn tập trạng thái này.

---

## 8. Lưu ý trung thực

- **Phân công:** Trello ghi SV2, deck/screen-list ghi SV3, nhóm thực tế có thể
  chỉ 2 SV. Phải chốt lại trước khi quay; không nhận phần việc của người khác.
- Không nói nhóm có file Figma khi chỉ có slide/PNG và bản Canva.
- Không nói ba màn này có AI; slide ghi “Không dùng AI”.
- Không đọc hoặc quảng bá mật khẩu demo như mật khẩu thật.
- Không tuyên bố đã push khi GitHub chưa có commit; mục 0.1 là điều kiện bắt buộc.
- Không tạo commit/PR thay thành viên khác.
- Điểm số do giảng viên quyết định; tài liệu này chỉ là kịch bản trình bày.
