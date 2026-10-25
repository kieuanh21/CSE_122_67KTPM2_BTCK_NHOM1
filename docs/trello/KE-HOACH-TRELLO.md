# Trello cho SpendWise — nhóm 2 SV

Board bám theo **mục 16 của đề BTL-18**: 5 cột, mỗi thẻ có mã công việc, tệp, người làm, hạn, nhánh, PR/commit và link OBS.

> Đề gốc ghi nhóm 3 SV. Board này chia lại cho **2 SV** theo yêu cầu của nhóm. Mỗi bạn vẫn phải làm đủ HTML + CSS + JavaScript + Git + OBS, không chia kiểu “một người chỉ làm tài liệu”.

## 1. Board gồm những gì

- **Tên board:** `SpendWise – BTL-18 CSE122 (2 SV)`
- **5 cột:** Backlog → To Do → In Progress → Review → Done
- **8 nhãn:** SV1 (xanh lá), SV2 (xanh dương), Chung (tím), Ưu tiên (đỏ), Tài liệu (vàng), Kiểm thử (cam), OBS (xanh nhạt), Git (xanh chanh)
- **33 thẻ:**
  - Backlog: 3 thẻ để sau
  - To Do: 12 thẻ
  - In Progress: 2 thẻ
  - Review: 2 thẻ
  - Done: 14 mốc đã hoàn thành
- 16 thẻ đang hoạt động (To Do + In Progress + Review) có checklist; 3 thẻ Backlog và 14 thẻ Done chỉ có mô tả ngắn.

Tên thẻ có tiền tố `[SV1]`, `[SV2]` hoặc `[Chung]`. Thẻ review có dạng `[SV1 → SV2]`.

## 2. Bảy trường bắt buộc trên mỗi thẻ

Mỗi thẻ phải có đủ 7 trường theo mục 16 của đề:

| Trường | Ví dụ | Ghi chú |
|---|---|---|
| Mã công việc | `TASK-08` | Duy nhất, dùng trong commit/PR |
| Giao diện/tệp | `index.html + 18 trang` | Đường dẫn tương đối trong repo |
| Người thực hiện | `SV1 + SV2` | Ghi rõ ai làm chính, ai review |
| Hạn hoàn thành | `__/__/____` | **Điền ngày thật của nhóm** |
| Nhánh | `docs/obs-videos` | Tên nhánh đề xuất, đổi theo repo thật |
| PR/commit | `(điền link)` | Link PR hoặc commit trên GitHub |
| Link OBS | `(điền link)` | Link video sau khi quay; ghi “Không bắt buộc” nếu là việc tài liệu |

Script tự điền 7 trường vào mô tả thẻ. Các chỗ `__/__/____` và `(điền link)` là **chỗ trống phải thay bằng dữ liệu thật**, không được để nguyên khi nộp.

## 3. Cách 1 — Tạo tự động (khuyến nghị)

Cần Node.js 18 trở lên và tài khoản Trello. Board được tạo ở chế độ **private**.

### Bước 1: Lấy API key

1. Đăng nhập Trello.
2. Mở https://trello.com/app-key.
3. Copy dòng **Key**.

### Bước 2: Lấy token

1. Vẫn ở trang trên, bấm link **Token**.
2. Bấm **Allow** để cấp quyền cho tài khoản của bạn.
3. Copy token hiện ra. Không gửi token cho người khác.

### Bước 3: Chạy script

Mở PowerShell tại thư mục dự án:

```powershell
cd C:\Users\ASUS\Downloads\cse122-spendwise\docs\trello
$env:TRELLO_KEY="dán_key_vào_đây"
$env:TRELLO_TOKEN="dán_token_vào_đây"
node tao-board.js
```

Script tạo board, 5 cột, 8 nhãn, 33 thẻ, mô tả 7 trường và 103 mục checklist. Khi xong, script in ra link board.

Xem trước mà chưa tạo gì:

```powershell
node tao-board.js --dry-run
```

Muốn xem cả mô tả 7 trường và checklist để chép tay:

```powershell
node tao-board.js --dry-run --details
```

**Lưu ý:**

- Mỗi lần chạy tạo **một board mới**. Chỉ chạy một lần, trừ khi muốn làm lại.
- Nếu lỗi giữa chừng, script in link board đang tạo dở.
- Script tạo nhãn SV1/SV2 thay vì gắn thành viên, vì API không tự biết tài khoản Trello của từng người. Sau khi mời SV2, bạn gắn thành viên thật vào thẻ nếu muốn.
- Board đang để **private**. Khi nộp, kiểm tra lại quyền chia sẻ với giảng viên.

## 4. Cách 2 — Tạo tay (không cần API)

### Bước 1: Tạo board và 5 cột

Vào Trello → **Create new board** → đặt tên `SpendWise – BTL-18 CSE122 (2 SV)` → tạo 5 list theo đúng thứ tự:

1. Backlog
2. To Do
3. In Progress
4. Review
5. Done

### Bước 2: Tạo 8 nhãn

| Nhãn | Màu |
|---|---|
| SV1 | Xanh lá |
| SV2 | Xanh dương |
| Chung | Tím |
| Ưu tiên | Đỏ |
| Tài liệu | Vàng |
| Kiểm thử | Cam |
| OBS | Xanh nhạt (sky) |
| Git | Xanh chanh (lime) |

### Bước 3: Dán thẻ vào từng cột

Trello cho phép dán nhiều dòng vào ô thêm thẻ: mỗi dòng thành một thẻ. Copy từng khối dưới đây và dán vào đúng cột.

**Cột Backlog**

```text
TASK-31 · [Chung] Kiểm thử trên Firefox và Safari
TASK-32 · [SV1] Biểu đồ so sánh chi tiêu 2 tháng
TASK-33 · [SV2] Xuất báo cáo chi tiêu ra CSV
```

**Cột To Do**

```text
TASK-01 · [SV1] Quay video demo tổng quan 4 phút
TASK-02 · [SV2] Viết báo cáo BTL-18
TASK-03 · [SV2] Rà soát 19 màn hình trên Chrome và Edge
TASK-04 · [SV1] Ôn 12 câu vấn đáp
TASK-05 · [SV1] Kiểm tra gói nộp bài
TASK-06 · [SV2] Chụp ảnh board Trello cho báo cáo
TASK-07 · [Chung] Tập demo chung trước khi quay
TASK-08 · [Chung] Quay 19 video OBS theo màn hình
TASK-09 · [Chung] Git/GitHub: repo, nhánh, PR, merge
TASK-10 · [SV2] Bản mô phỏng Figma/Canva
TASK-11 · [SV1] Cập nhật bảng kiểm kê màn hình cho 2 SV
TASK-12 · [SV2] Viết docs/ai-usage-report.md
```

**Cột In Progress**

```text
TASK-13 · [SV1] Tập demo luồng Người dùng + AI
TASK-14 · [SV2] Soát báo cáo và số liệu
```

**Cột Review**

```text
TASK-15 · [SV1 → SV2] Kiểm tra video demo tổng quan
TASK-16 · [SV2 → SV1] Kiểm tra báo cáo BTL-18
```

**Cột Done**

```text
TASK-17 · [SV1] Design system dùng chung
TASK-18 · [SV1] Dữ liệu mẫu + API giả lập
TASK-19 · [SV1] AI mô phỏng + layout theo vai trò
TASK-20 · [SV1] 4 màn Người dùng
TASK-21 · [SV1] Trang chủ + xác thực + trang lỗi
TASK-22 · [SV2] 3 màn Huấn luyện viên
TASK-23 · [SV2] 3 màn Kiểm duyệt viên
TASK-24 · [SV2] 3 màn Quản trị viên
TASK-25 · [Chung] Tách 5 file lõi và rút gọn code
TASK-26 · [Chung] Kiểm thử 19 màn + 10 luồng tương tác
TASK-27 · [SV2] Slide thiết kế 18 trang
TASK-28 · [SV1] Tài liệu giải thích code + 12 câu hỏi
TASK-29 · [SV2] README + hướng dẫn chạy
TASK-30 · [Chung] Sửa giao diện khớp class HTML
```

### Bước 4: Thêm 7 trường vào mô tả

Mở từng thẻ, dán mẫu sau vào mô tả rồi sửa:

```text
Mã: TASK-08
Tệp: index.html + 18 trang trong pages/
Người: SV1 (10 video) + SV2 (9 video)
Hạn: __/__/____
Nhánh: docs/obs-videos
PR/commit: (điền link)
OBS: (điền link thư mục video)

Mỗi màn hình 1 video theo mẫu SV1-01-index.mp4...
```

Giá trị chính xác của từng thẻ nằm trong `board-data.js`. Nếu tạo tay toàn bộ 33 thẻ, nên ưu tiên điền đủ 7 trường cho 16 thẻ ở To Do, In Progress và Review trước; 14 thẻ Done có thể bổ sung link sau.

### Bước 5: Gắn nhãn và checklist

- Gắn nhãn theo tiền tố: `[SV1]` → SV1; `[SV2]` → SV2; `[Chung]` → Chung.
- Thêm **Ưu tiên** cho các thẻ video, báo cáo, OBS, Git, ôn vấn đáp, kiểm tra gói nộp.
- Với 16 thẻ đang hoạt động, thêm checklist 3–19 bước. Riêng TASK-08 có 19 mục, mỗi mục là một màn hình.
- 3 thẻ Backlog và 14 thẻ Done chỉ cần mô tả ngắn.

### Bước 6: Mời SV2

Board → **Members** → mời tài khoản Trello của SV2. Sau đó gắn thành viên thật vào các thẻ `[SV2]`.

## 5. Phân công 2 SV

| Mảng việc | SV1 | SV2 |
|---|---|---|
| Nền tảng dùng chung | Viết `style.css`, `data.js`, `api.js`, `ai.js`, `layout.js` | Kiểm tra lại, chạy thử |
| Màn hình | 4 màn Người dùng + 6 trang chung/xác thực/lỗi | 9 màn HLV, Kiểm duyệt, Quản trị |
| OBS | 10 video: index, login, register, forgot, 4 màn Người dùng, 403, 404 | 9 video: 3 coach, 3 moderator, 3 admin |
| Git/PR | Nhánh cho phần Người dùng + trang chung | Nhánh cho phần HLV/Kiểm duyệt/Quản trị |
| Kiểm thử | 19 màn + 10 luồng tương tác | Chạy lại trên Chrome và Edge |
| Tài liệu | `Giai-thich-code.md`, 12 câu vấn đáp, cập nhật `screen-list.md` | `README.md`, `ai-usage-report.md`, báo cáo |
| Slide/video | Video demo tổng quan | Slide 18 trang |
| Trello | Thẻ SV1, checklist phần Người dùng | Thẻ SV2, ảnh board cho báo cáo |

**Luồng end-to-end tối thiểu:**

- SV1: đăng nhập → tạo giao dịch → AI-1 gợi ý danh mục → lưu → xem lại trong dashboard.
- SV2: đăng nhập HLV → xem học viên → duyệt ngân sách kèm ghi chú → kiểm duyệt tài nguyên → xem KPI admin.

Mỗi bạn đều phải tự làm HTML, CSS, JavaScript, dữ liệu, responsive, nhánh Git, commit, PR và OBS cho phần mình. Không chia theo kiểu “người chỉ viết tài liệu”.

## 6. Quy trình 5 cột

1. **Backlog:** ý tưởng/việc để sau, chưa cam kết làm.
2. **To Do:** việc đã thống nhất, sẵn sàng làm. Chỉ chuyển từ Backlog sang đây khi cả nhóm đồng ý.
3. **In Progress:** mỗi người tối đa **2 thẻ**. Khi bắt đầu, tạo nhánh Git và ghi tên nhánh vào thẻ.
4. **Review:** làm xong, tick checklist, tạo PR, kéo sang Review. Người còn lại kiểm tra theo checklist và link OBS/PR.
5. **Done:** chỉ chuyển sang Done khi đã merge vào `dev`, có link OBS và người kia approve.

**Điều kiện để một thẻ được coi là xong:**

- HTML/CSS/JS chạy được, không lỗi console.
- Responsive desktop + mobile.
- Có kiểm tra biểu mẫu và trạng thái rỗng/đang tải/lỗi nếu phù hợp.
- Có nhánh, commit, PR và link trong thẻ.
- Có video OBS (với thẻ màn hình).
- Người còn lại đã review.

## 7. Minh chứng bắt buộc còn thiếu

Board đã tách riêng các việc này để không bị bỏ sót:

- **TASK-08 – 19 video OBS:** mỗi màn hình 1 video, đặt tên `SV1-01-index.mp4`… Video phải có mặt sinh viên, mở bản mô phỏng, mở file HTML/CSS/JS, giải thích, sửa trực tiếp, chạy thử và commit.
- **TASK-09 – Git/GitHub:** hiện thư mục dự án **chưa phải repo Git**. Cần tạo repo, nhánh `main`/`dev`/`feature/*`, commit đúng mẫu, PR, review và merge.
- **TASK-10 – Figma/Canva:** đề yêu cầu bản mô phỏng được duyệt trước khi code. Slide 18 trang chỉ là tài liệu tham chiếu, vẫn cần link Figma/Canva thật.
- **TASK-11 – bảng kiểm kê màn hình:** hiện `docs/screen-list.md` còn ghi SV3; cần đổi về 2 SV và thêm cột mã task, OBS, PR.
- **TASK-12 – AI usage report:** đề bắt buộc `docs/ai-usage-report.md`; hiện chưa có.
- **TASK-02/05 – báo cáo và gói nộp:** phải chèn ảnh board, link Trello, link Git/PR và link OBS.

Không được bịa link hoặc đánh dấu Done khi chưa có minh chứng. Các chỗ `(điền link)` phải được thay bằng link thật trước khi nộp.

## 8. Đưa Trello vào báo cáo và vấn đáp

Trong báo cáo, thêm mục **Quản lý dự án với Trello**:

- Ảnh chụp toàn board, thấy rõ 5 cột và 8 nhãn.
- Ảnh chụp một thẻ có đủ 7 trường + checklist.
- Bảng phân công 2 SV (mục 5).

Câu trả lời gợi ý:

> Nhóm em dùng Trello với 5 cột Backlog, To Do, In Progress, Review, Done. Mỗi thẻ có mã task, tệp, người làm, hạn, nhánh, PR/commit và link OBS. Nhóm giới hạn 2 thẻ In Progress mỗi người. Thẻ chỉ sang Done khi đã merge vào dev, có OBS và người còn lại review. Các thẻ Done là mốc code đã xong; link PR/OBS được điền dần trước khi nộp.

## 9. Lưu ý

- Không bịa deadline, link PR, link OBS hoặc link Figma.
- Board để **private**, chỉ mời 2 thành viên và giảng viên nếu được yêu cầu.
- Không chạy `tao-board.js` nhiều lần nếu không muốn có nhiều board trùng.
- Nếu đã tạo board cũ 4 cột, có thể tạo board mới bằng script hoặc thêm cột Backlog, đổi tên 4 cột còn lại và bổ sung các thẻ mới.
- Trello miễn phí là đủ cho board này.
