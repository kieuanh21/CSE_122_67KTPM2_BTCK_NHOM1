# SpendWise — Bảng kiểm kê màn hình & luồng người dùng

> Tài liệu nộp duyệt theo yêu cầu mục 8 đề bài BTL-18 (CSE122).
> Quy tắc: **độ đầy đủ nghiệp vụ > số lượng giao diện.** Mỗi màn hình dưới đây = 1 video OBS khi DONE.

---

## 1. Sơ đồ vai trò & luồng tổng quát

```text
index (trang đích, chọn vai trò)
  ├─ login / register / forgot-password
  ├─ NGƯỜI DÙNG ──── Dashboard → Quản lý giao dịch (AI-1 gợi ý danh mục)
  │                        └────→ Mục tiêu tiết kiệm (AI-3 Goal Coach)
  │                        └────→ AI-2 Spending Insight (trong Dashboard)
  ├─ HUẤN LUYỆN VIÊN ─ Danh sách học viên → Duyệt ngân sách → Quản lý tài nguyên
  ├─ KIỂM DUYỆT VIÊN ─ Hàng chờ duyệt tài nguyên → Quản lý mẫu AI → Trung tâm phản hồi
  └─ QUẢN TRỊ VIÊN ─── Dashboard hệ thống → Quản lý người dùng → Quản lý danh mục chi tiêu

Trang lỗi dùng chung: 403, 404
```

## 2. Hành trình người dùng chính (theo mục 7 đề bài)

1. Người dùng đăng nhập → xem Dashboard (trạng thái dữ liệu) → thêm giao dịch → AI-1 gợi ý danh mục → Chấp nhận/Sửa/Từ chối → giao dịch lưu vào danh sách.
2. AI-2 phân tích pattern chi tiêu trên Dashboard → hiển thị insight + lý do → người dùng Lưu/Bỏ qua.
3. Người dùng tạo mục tiêu tiết kiệm → AI-3 sinh các bước tiết kiệm → Chấp nhận → mục tiêu có kế hoạch.
4. Huấn luyện viên xem danh sách học viên → mở duyệt ngân sách của 1 học viên → Duyệt / Yêu cầu chỉnh sửa (kèm ghi chú).
5. Huấn luyện viên tạo tài nguyên giáo dục → gửi duyệt (trạng thái `pending`).
6. Kiểm duyệt viên duyệt/từ chối tài nguyên + quản lý mẫu AI + xử lý phản hồi.
7. Quản trị viên quản lý tài khoản (khoá/mở, đổi vai trò), quản lý danh mục chi tiêu, xem dashboard hệ thống.

## 3. Bảng kiểm kê màn hình

Cột "AI": AI-1 = Expense Categorizer, AI-2 = Spending Pattern Insight, AI-3 = Goal Coach.
Cột "Trạng thái": các trạng thái giao diện/nghiệp vụ bắt buộc phải có trên màn hình đó.

### 3.1 Màn hình dùng chung (khối nền tảng)

| Vai trò | Mục tiêu người dùng | Nhiệm vụ người dùng | Màn hình | Tệp | CRUD/Trạng thái | AI | Người phụ trách |
|---|---|---|---|---|---|---|---|
| Mọi vai trò | Tiếp cận sản phẩm, hiểu giá trị | Xem giới thiệu, chọn vai trò demo | Trang đích | `index.html` | R · Rỗng | — | SV1 |
| Mọi vai trò | Vào được hệ thống | Đăng nhập hợp lệ | Đăng nhập | `login.html` | R · Lỗi xác thực, Vô hiệu hoá | — | SV1 |
| Mọi vai trò | Có tài khoản | Đăng ký, kiểm tra hợp lệ | Đăng ký | `register.html` | C · Lỗi xác thực | — | SV1 |
| Mọi vai trò | Lấy lại quyền truy cập | Gửi yêu cầu đặt lại mật khẩu | Quên mật khẩu | `forgot-password.html` | C · Thành công | — | SV1 |
| — | Xử lý truy cập trái phép | Hiển thị nguyên nhân + quay về | Bị từ chối | `403.html` | R | — | SV3 |
| — | Xử lý trang lỗi | Điều hướng về trang an toàn | Không tìm thấy | `404.html` | R | — | SV3 |

> Ba màn hình mở rộng từng dự kiến (hồ sơ, cài đặt, thông báo) không nằm trong phạm vi 19 màn hình đã chốt và không có trong mã nguồn.

### 3.2 Vai trò Người dùng (SV1 phụ trách chính)

| Vai trò | Mục tiêu người dùng | Nhiệm vụ người dùng | Màn hình | Tệp | CRUD/Trạng thái | AI | Người phụ trách |
|---|---|---|---|---|---|---|---|
| Người dùng | Nắm tình hình tài chính nhanh | Xem KPI, biểu đồ chi tiêu, giao dịch gần đây | Finance Dashboard | `user-finance-dashboard.html` | R · Đang tải, Rỗng, Lỗi | AI-2 | SV1 |
| Người dùng | Ghi chép & phân loại chi tiêu nhất quán | Thêm/sửa giao dịch, tìm kiếm, lọc theo danh mục/thời gian | Transaction Management | `user-transaction-management.html` | C/R/U + Archive · Kiểm tra hợp lệ, Rỗng, Đang lưu | AI-1 | SV1 |
| Người dùng | Có kế hoạch tiết kiệm rõ ràng | Tạo/sửa/xoá mục tiêu, theo dõi tiến độ | Saving Goals | `user-saving-goals.html` | C/R/U/D · Đang tiến hành, Hoàn thành, Đã huỷ | AI-3 | SV1 |
| Người dùng *(mở rộng)* | Kiểm soát vượt ngân sách theo danh mục | Tạo ngân sách tháng, xem cảnh báo vượt hạn mức | Budgets | `user-budgets.html` | C/R/U + Archive · Cảnh báo, Vượt hạn mức | — | SV1 |

> `user-budgets.html` là màn hình mở rộng: thực thể `budgets` trong ma trận CRUD (mục 10) cần một nơi vận hành riêng thay vì nhồi vào dashboard.

### 3.3 Vai trò Huấn luyện viên tài chính giáo dục (SV2 phụ trách chính)

| Vai trò | Mục tiêu người dùng | Nhiệm vụ người dùng | Màn hình | Tệp | CRUD/Trạng thái | AI | Người phụ trách |
|---|---|---|---|---|---|---|---|
| HLV | Nắm danh sách học viên đang kèm | Tìm học viên, xem tổng quan tình hình | Client List | `coach-client-list.html` | R · Tìm kiếm, Rỗng, Lỗi | — | SV2 |
| HLV | Đánh giá & hướng dẫn ngân sách học viên | Xem ngân sách, Duyệt / Yêu cầu chỉnh sửa kèm ghi chú (coachNotes) | Budget Review | `coach-budget-review.html` | R/U · Chờ duyệt, Đã duyệt, Cần chỉnh sửa | — | SV2 |
| HLV | Chia sẻ tài nguyên giáo dục | Tạo/sửa/lưu trữ bài viết, video, checklist | Resource Management | `coach-resource-management.html` | C/R/U/D(lưu trữ) · Bản nháp, Chờ duyệt, Đã xuất bản, Từ chối | — | SV2 |

### 3.4 Vai trò Kiểm duyệt viên (SV3 phụ trách chính)

| Vai trò | Mục tiêu người dùng | Nhiệm vụ người dùng | Màn hình | Tệp | CRUD/Trạng thái | AI | Người phụ trách |
|---|---|---|---|---|---|---|---|
| Kiểm duyệt viên | Đảm bảo nội dung an toàn, đúng chuẩn | Duyệt hàng chờ tài nguyên: Duyệt / Từ chối (lý do) | Resource Review | `moderator-resource-review.html` | R/U · Chờ duyệt, Đã duyệt, Bị từ chối | — | SV3 |
| Kiểm duyệt viên | Kiểm soát chất lượng mẫu AI | Quản lý mẫu prompt AI, chạy thử mẫu | AI Template Management | `moderator-ai-template-management.html` | C/R/U · Bản nháp, Kích hoạt, Vô hiệu hoá | AI (kiểm thử mẫu) | SV3 |
| Kiểm duyệt viên | Tiếp nhận & xử lý phản hồi | Xem phản hồi, phân loại, đánh dấu đã xử lý | Feedback Center | `moderator-feedback-center.html` | C/R/U/D(lưu trữ) · Mới, Đang xử lý, Đã xử lý | — | SV3 |

### 3.5 Vai trò Quản trị viên (SV3 phụ trách chính)

| Vai trò | Mục tiêu người dùng | Nhiệm vụ người dùng | Màn hình | Tệp | CRUD/Trạng thái | AI | Người phụ trách |
|---|---|---|---|---|---|---|---|
| Quản trị viên | Duy trì hệ thống phân loại đúng | Xem/ lưu trữ / khôi phục danh mục chi tiêu | Expense Category Management | `admin-expense-category-management.html` | R + Archive/Khôi phục · Đang dùng, Đã lưu trữ | — | SV3 |
| Quản trị viên | Quản lý tài khoản hệ thống | Tạo tài khoản, đổi vai trò, khoá/mở | User Management | `admin-user-management.html` | C/R/U · Hoạt động, Bị khoá | — | SV3 |
| Quản trị viên | Theo dõi sức khoẻ hệ thống | Xem KPI, nhật ký hoạt động, gửi thông báo hệ thống | System Dashboard | `admin-system-dashboard.html` | C (thông báo) + R (KPI, log) · Bình thường, Rỗng | — | SV3 |

> **Ghi chú:** mục 8 của đề ghi CRUD danh mục = R, nhưng ma trận thực thể (mục 10) yêu cầu categories đủ C/R/U/Archive. Nhóm theo ma trận: màn hình admin có đọc + lưu trữ/khôi phục (không xoá cứng) — trình bày rõ khi duyệt bảng.

## 4. Ba trải nghiệm AI (mẫu tương tác bắt buộc)

Mỗi AI feature đi theo đúng vòng lặp: **Nhập → Kiểm tra hợp lệ → Đang xử lý (khung xương) → Kết quả → "Vì sao?" → Chấp nhận/Sửa/Từ chối/Tạo lại → Lưu**. Mỗi feature đều có 1 trạng thái thất bại/thiếu dữ liệu.

| Mã | Tính năng | Ở màn hình | Đầu vào | Kết quả mô phỏng | Trạng thái thất bại |
|---|---|---|---|---|---|
| AI-1 | Expense Categorizer | Transaction Management | Tên giao dịch + số tiền + ngày | Gợi ý 1 danh mục + 2 phương án khác, kèm lý do ("chi ở cafe → Ăn uống") | Tên quá ngắn/không rõ → "Không đủ dữ liệu để đưa ra đề xuất" → nút Nhập thêm / Tạo thủ công |
| AI-2 | Spending Pattern Insight | Finance Dashboard | Dữ liệu giao dịch 30 ngày | 1–3 insight: "Chi Ăn uống tăng 20% so với tháng trước…" + đề xuất hành động | Dưới 5 giao dịch → "Không đủ dữ liệu để phân tích" |
| AI-3 | Goal Coach | Saving Goals | Mục tiêu + số tiền + hạn | Kế hoạch: số tiền/tuần + 3 mốc + mẹo cắt giảm | Số tiền vượt khả năng (theo thu nhập nhập vào) → cảnh báo "Mục tiêu chưa khả thi, hãy thử kéo dài hạn" |

Bộ nút điều khiển người dùng ở mọi kết quả AI: **Chấp nhận · Sửa · Từ chối · Tạo lại · Lưu**.

## 5. Bao phủ trạng thái (phân tích theo chức năng)

| Trạng thái | Áp dụng ở đâu |
|---|---|
| Bình thường | Mọi trang khi có dữ liệu |
| Đang tải | Dashboard (user/admin), hàng chờ duyệt, panel AI (khung xương) |
| Rỗng | Giao dịch/mục tiêu/phan hồi/tài nguyên chưa có → minh hoạ + nút hành động |
| Thành công | Toast sau C/U/D, gửi form đăng ký |
| Lỗi | Lỗi tải dữ liệu (nút Thử lại), lỗi xác thực biểu mẫu |
| Vô hiệu hoá | Nút Duyệt khi chưa chọn mục; tài khoản bị khoá |
| Đang chờ | Tài nguyên `pending`, ngân sách chờ HLV duyệt |
| Bị từ chối | Tài nguyên bị kiểm duyệt từ chối (kèm lý do) |
| Hoàn thành | Mục tiêu tiết kiệm đạt 100% |
| Đã lưu trữ/Huỷ | Danh mục lưu trữ, giao dịch archive, mục tiêu huỷ |

## 6. Nguyên tắc thiết kế (tóm tắt)

- 1 bộ design token chung (màu, chữ, khoảng cách, bo góc) trong `css/style.css` — cả 3 thành viên dùng chung → tránh "3 website con".
- Màu vai trò: Người dùng = xanh lá `#059669`, HLV = xanh dương `#2563EB`, Kiểm duyệt = tím `#7C3AED`, Quản trị = cam đậm `#EA580C`.
- Layout chuẩn: sidebar trái (desktop) + topbar; tablet/mobile: sidebar thu thành bottom-nav.
- Mọi bảng dữ liệu có: tìm kiếm + bộ lọc + trạng thái rỗng; mọi biểu mẫu có kiểm tra hợp lệ phía JS.
- Khả năng tiếp cận cơ bản: tương phản ≥ 4.5:1, focus visible, nhãn form luôn gắn `<label>`.
