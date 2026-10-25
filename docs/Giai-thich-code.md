# Giải thích code SpendWise (để hiểu và trả lời vấn đáp)

Tài liệu này giải thích theo cách đơn giản: mỗi phần làm gì, nằm ở đâu, và vì sao làm như vậy.

---

## 1. Cách chạy

1. Mở `index.html` bằng trình duyệt, hoặc chạy server tĩnh:
   ```bash
   npx serve .
   ```
2. Bấm **Đăng nhập**, dùng tài khoản demo:
   - Người dùng: `minh@student.edu.vn` / `123456`
   - Hoặc bấm nút **đăng nhập nhanh** theo vai trò.
3. Dữ liệu lưu trong LocalStorage của trình duyệt. Nút **♻️ Reset dữ liệu** đưa về dữ liệu mẫu.

---

## 2. Cấu trúc: 7 file lõi + 19 trang

```text
cse122-spendwise/
├── index.html                 trang chủ
├── pages/                     18 trang còn lại
├── css/style.css              giao diện dùng chung (487 dòng)
├── js/theme.js                đổi giao diện sáng/tối (42 dòng)
├── js/data.js                 dữ liệu mẫu (101 dòng)
├── js/api.js                  đọc/ghi LocalStorage (97 dòng)
├── js/ai.js                   3 tính năng AI mô phỏng (161 dòng)
├── js/ui.js                   hàm giao diện dùng chung (271 dòng)
├── js/layout.js               sidebar + topbar (119 dòng)
├── docs/trello/               board Trello + phân công 2 SV
└── docs/Giai-thich-code.md    tài liệu này
```

Mỗi trang nghiệp vụ chỉ còn 3 phần:

```html
<link rel="stylesheet" href="../css/style.css">

<!-- Bộ lõi dùng chung -->
<script src="../js/data.js"></script>
<script src="../js/api.js"></script>
<script src="../js/ai.js"></script>
<script src="../js/ui.js"></script>
<script src="../js/layout.js"></script>

<!-- Chỉ phần riêng của trang -->
<script> ... </script>
```

**Vì sao tách như vậy?** Trước đây 19 trang chép lại cùng một khối CSS/JS ~600 dòng, tổng 17.000 dòng. Sau khi tách và rút gọn, cả dự án còn khoảng 4.420 dòng: 1.363 dòng lõi (CSS, JS, trang chủ) và 3.057 dòng cho 18 trang nghiệp vụ. Sửa màu hay sửa API chỉ cần sửa một chỗ.

Các trang dùng chung lớp tiện ích trong `style.css` như `.row`, `.row-between`, `.actions`, `.toolbar`, `.grid-cards`, `.card-head`, `.text-small`, `.mt-3`… thay cho inline style. Nhờ vậy HTML ngắn hơn, cùng một bố cục chỉ viết một lần, và khi vấn đáp chỉ cần nhớ: **bố cục nằm trong class, dữ liệu nằm trong template literal**.

Các hàm dùng chung trong `ui.js` (gọi qua `window.SW`):

| Hàm | Việc nó làm |
|---|---|
| `SW.$` / `SW.$$` | Chọn một / nhiều phần tử trong trang |
| `SW.fmtVND` / `SW.fmtDate` | Định dạng tiền Việt Nam và ngày |
| `SW.escapeHtml` | Chặn chèn mã khi đưa dữ liệu vào HTML |
| `SW.toast` | Hiện thông báo ngắn ở góc màn hình |
| `SW.currentUser` | Đọc người đang đăng nhập từ `sessionStorage` |
| `SW.currentUserId` | Lấy đúng id theo vai trò, có giá trị dự phòng |
| `SW.login` | Lưu phiên đăng nhập `{id, name, role}` |
| `SW.loadInto` | Tự vẽ skeleton → tải dữ liệu → vẽ HTML (hoặc khung lỗi) |
| `SW.skeleton` | Sinh các khung xương chờ tải, ví dụ `SW.skeleton(3, 44)` |
| `SW.table` | Ghép phần đầu và các dòng thành bảng dữ liệu hoàn chỉnh |
| `SW.onClick` | Gắn click cho mọi nút khớp selector, handler nhận nút vừa bấm |
| `SW.runAI` | Bật "AI đang xử lý", tự hiện lỗi và trả `null` khi AI thất bại |
| `SW.runAction` | Chạy thao tác API, báo toast rồi tải lại danh sách |
| `SW.confirmAndRun` | Hỏi xác nhận, đồng ý mới chạy `runAction` |
| `SW.empty` / `SW.errorBox` | Tạo khối "chưa có dữ liệu" / khung lỗi kèm nút **Thử lại** |
| `SW.badge` / `SW.statusBadge` | Tạo nhãn màu, nhãn trạng thái dùng chung |
| `SW.clearErrors` / `SW.markInvalid` | Xoá / hiện lỗi của một form |
| `SW.openModal` / `SW.closeModal` | Mở / đóng hộp thoại |
| `SW.confirmDialog` | Hộp xác nhận, trả về `true/false` |
| `SW.debounce` | Gộp nhiều lần bấm/gõ liên tiếp thành một lần chạy |

Sáu hàm `SW.skeleton`, `SW.table`, `SW.onClick`, `SW.runAI`, `SW.runAction`, `SW.confirmAndRun` ra đời để xoá những đoạn lặp đi lặp lại ở 13 trang: khung xương chờ tải, khung `<table>`, vòng `querySelectorAll` gắn click, chuỗi "hiện đang xử lý → kiểm tra kết quả → hiện lỗi", chuỗi "gọi API → toast → tải lại". Nhờ vậy mỗi trang chỉ còn mô tả **việc của mình**, không chép lại cách làm giao diện. Phần còn dài ở mỗi trang chủ yếu là **HTML của form** và **quy tắc nghiệp vụ** (ví dụ ngân sách không vượt thu nhập, mục tiêu phải có hạn) — cố ý giữ rõ ràng để dễ đọc và dễ trả lời khi vấn đáp.

`layout.js` chỉ còn hai việc: dựng **sidebar** theo vai trò và **topbar** (tiêu đề, nút đổi giao diện, mô phỏng lỗi, reset, tên người đăng nhập). `ui.js` gắn một bộ lắng nghe click toàn cục: nút có `data-close` tự đóng modal gần nhất, bấm nền tối hoặc phím `Esc` cũng đóng. Nhờ vậy mỗi trang không phải tự viết lại đoạn đóng modal.

**Cách viết một trang (4 bước):**

1. Tải dữ liệu và vẽ HTML (thường dùng `SW.loadInto`).
2. Gắn sự kiện cho các nút vừa vẽ (một hàm `bind...Buttons`).
3. Xử lý form thêm/sửa và kiểm tra hợp lệ.
4. Gọi hàm khởi động ở cuối script.

Cách viết này lặp lại giống nhau ở cả 18 trang, nên chỉ cần hiểu một trang là đọc được các trang còn lại.

**Chế độ sáng/tối:** `theme.js` nạp trong `<head>`, đọc khoá `spendwise.theme` từ LocalStorage rồi gắn `data-theme="dark"` lên thẻ `<html>` trước khi trang hiện ra. `style.css` có một khối `html[data-theme="dark"]` chỉ đổi biến màu, nên cả 19 trang tự đổi theo mà không phải sửa từng trang. Mọi nút có thuộc tính `data-theme-toggle` đều được `theme.js` bắt sự kiện click, kể cả nút do `layout.js` thêm vào topbar sau đó.

---

## 3. Luồng dữ liệu

```text
data.js (dữ liệu mẫu)
   ↓ lần chạy đầu
LocalStorage  (khoá spendwise.db.v1)
   ↓
api.js  (đọc/ghi có độ trễ 0,4–0,9 giây)
   ↓
script riêng của từng trang
   ↓
HTML được cập nhật (bảng, thẻ, biểu đồ, toast…)
```

- `data.js` chỉ là dữ liệu khởi tạo, không chứa xử lý.
- `api.js` che giấu chuyện dữ liệu nằm ở đâu; trang chỉ gọi `API.list`, `API.create`, `API.update`, `API.archive`.
- Mọi thao tác trả về Promise, nhờ vậy trình diễn được trạng thái **Đang tải** và **Lỗi**.
- **Xoá** không xoá cứng: `API.archive` đổi `status` thành `archived` để giữ lịch sử.

---

## 4. Ba tính năng AI (js/ai.js)

| Mã | Tên | Cách hoạt động | Khi thất bại |
|---|---|---|---|
| AI-1 | Gợi ý danh mục | So khớp từ khoá trong tên giao dịch với bảng `RULES` | Tên dưới 3 ký tự hoặc không khớp từ khoá |
| AI-2 | Phân tích pattern | So tổng chi từng danh mục với `prevMonthTotals` | Ít hơn 5 giao dịch chi tiêu |
| AI-3 | Goal Coach | Chia số tiền còn thiếu cho số tuần còn lại | Mỗi tuần cần gửi vượt khả năng |

Điểm chung:
- Không gọi mạng, không dùng AI thật — chỉ là quy tắc, để chạy được offline.
- Luôn trả `{ ok, result, reason }`: có kết quả, có **lý do**, có **độ tin cậy**.
- Người dùng quyết định: chấp nhận, sửa, từ chối hoặc tạo lại.
- Nút **⚠️ Mô phỏng lỗi** trên topbar bật cờ trong `sessionStorage`; mọi API/AI sẽ trả lỗi để demo trạng thái lỗi và nút **Thử lại**.

---

## 5. Phân quyền và phiên đăng nhập

- Mỗi trang khai báo vai trò ngay trên `<body>`:
  ```html
  <body data-role="user" data-page="user-budgets.html" data-title="Ngân sách tháng">
  ```
- `js/layout.js` đọc `data-role` để dựng đúng menu và topbar.
- Đăng nhập lưu `{ id, name, role }` vào `sessionStorage` (khoá `spendwise.user`).
- Dữ liệu của người dùng được lọc theo `userId`, nên mỗi tài khoản chỉ thấy dữ liệu của mình.
- Đây là **phân quyền phía trình duyệt để mô phỏng**, không phải bảo mật thật. Nếu làm backend thật, phải kiểm tra quyền ở server.

---

## 6. Mỗi trang làm gì

| Tệp | Vai trò | Chức năng chính | AI |
|---|---|---|---|
| `index.html` | Chung | Giới thiệu, chọn vai trò | — |
| `login.html` | Chung | Đăng nhập, chặn tài khoản khoá | — |
| `register.html` | Chung | Tạo tài khoản, kiểm tra từng trường | — |
| `forgot-password.html` | Chung | Gửi liên kết đặt lại (mô phỏng) | — |
| `403.html`, `404.html` | Chung | Trang lỗi quyền truy cập / không tìm thấy | — |
| `user-finance-dashboard.html` | Người dùng | KPI, chi theo danh mục, giao dịch gần đây | AI-2 |
| `user-transaction-management.html` | Người dùng | Tìm/lọc, thêm–sửa–lưu trữ giao dịch | AI-1 |
| `user-saving-goals.html` | Người dùng | Thêm/sửa mục tiêu, hoàn thành, huỷ | AI-3 |
| `user-budgets.html` | Người dùng | Hạn mức theo danh mục, tiến độ, ghi chú coach | — |
| `coach-client-list.html` | Huấn luyện viên | Danh sách học viên và tín hiệu cần chú ý | — |
| `coach-budget-review.html` | Huấn luyện viên | Duyệt / yêu cầu sửa ngân sách | — |
| `coach-resource-management.html` | Huấn luyện viên | Tạo/sửa tài nguyên, gửi kiểm duyệt | — |
| `moderator-resource-review.html` | Kiểm duyệt viên | Duyệt / từ chối tài nguyên kèm lý do | — |
| `moderator-ai-template-management.html` | Kiểm duyệt viên | Quản lý mẫu AI, chạy thử | AI-1 |
| `moderator-feedback-center.html` | Kiểm duyệt viên | Xử lý phản hồi | — |
| `admin-expense-category-management.html` | Quản trị viên | Danh mục: thêm/sửa/lưu trữ/khôi phục | — |
| `admin-user-management.html` | Quản trị viên | Tài khoản: tạo/sửa/khoá/mở | — |
| `admin-system-dashboard.html` | Quản trị viên | KPI, nhật ký, gửi thông báo | — |

---

## 7. Câu hỏi vấn đáp thường gặp

**1. Vì sao tách CSS/JS ra file riêng?**
Để tránh lặp code. Trước đây mỗi trang chép 600 dòng dùng chung; sửa một lỗi phải sửa 19 lần. Giờ chỉ có 7 file lõi, mỗi trang còn phần nghiệp vụ riêng.

**2. Dữ liệu lưu ở đâu?**
LocalStorage với khoá `spendwise.db.v1`. Lần đầu chạy, `api.js` chép dữ liệu mẫu từ `data.js` vào LocalStorage.

**3. Vì sao API có độ trễ?**
Để mô phỏng gọi mạng thật và trình diễn trạng thái đang tải, lỗi, thử lại — đúng yêu cầu về trạng thái giao diện.

**4. Xoá dữ liệu là xoá thật hay sao?**
Là lưu trữ: đổi `status` thành `archived`, vẫn giữ trong LocalStorage để không mất lịch sử tài chính.

**5. Đăng nhập có bảo mật không?**
Không. Đây là mô phỏng phía trình duyệt, mật khẩu demo `123456`; dữ liệu phiên nằm trong `sessionStorage`. Làm thật phải có server, hash mật khẩu và kiểm tra quyền ở server.

**6. Vì sao người dùng này không thấy dữ liệu của người khác?**
Mọi danh sách đều lọc theo `userId` của phiên đăng nhập. Ví dụ trang ngân sách chỉ lấy `b.userId === USER_ID`.

**7. AI có phải AI thật không?**
Không. Là mô phỏng bằng quy tắc: AI-1 so khớp từ khoá, AI-2 so số liệu tháng trước, AI-3 chia đều số tiền theo số tuần. Mục đích là trình diễn đủ luồng và trạng thái thất bại.

**8. Vì sao AI luôn có nút "Vì sao?" và "Từ chối"?**
Để người dùng hiểu kết quả và giữ quyền quyết định; AI không tự lưu dữ liệu.

**9. Trạng thái lỗi được demo thế nào?**
Bấm **⚠️ Mô phỏng lỗi** trên topbar. Cờ lưu trong `sessionStorage`; API/AI sẽ trả lỗi. Tải lại trang để thấy khung lỗi và nút **Thử lại**.

**10. Ứng dụng có responsive không?**
Có. Breakpoint 960px và 640px trong `css/style.css`: sidebar thu gọn, bảng chuyển cách hiển thị phù hợp màn hình nhỏ.

**11. Vì sao dùng `innerHTML` để vẽ bảng?**
Vì dữ liệu ít và cần đơn giản, dễ hiểu. Chuỗi HTML được tạo từ dữ liệu, các trường nhập người dùng được bọc bằng `escapeHtml` để tránh chèn mã.

**12. Điểm hạn chế của dự án?**
Chạy hoàn toàn phía trình duyệt: không có server, không xác thực thật, dữ liệu chỉ nằm trên máy đang dùng. Đây là nguyên mẫu frontend theo yêu cầu môn học.

---

## 8. Kịch bản demo 4 phút

1. Mở `index.html` → giới thiệu 4 vai trò.
2. Đăng nhập nhanh **Người dùng** → Dashboard: chỉ 4 KPI và AI-2.
3. Sang **Giao dịch**: thêm một khoản, dùng AI-1 gợi ý danh mục, lưu.
4. Sang **Ngân sách**: chỉ ra ngân sách "Cần chỉnh sửa" kèm ghi chú coach.
5. Đổi sang **Coach**: duyệt ngân sách.
6. Đổi sang **Moderator**: duyệt tài nguyên, xử lý phản hồi.
7. Đổi sang **Admin**: xem KPI hệ thống, khoá/mở tài khoản.
8. Bật **Mô phỏng lỗi** → tải lại → chỉ khung lỗi và nút Thử lại.
9. Kết luận: 19 màn hình, 3 AI, CRUD + lưu trữ, dữ liệu theo từng người dùng.
