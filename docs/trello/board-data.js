// Nội dung board Trello cho nhóm 2 SV, bám mục 16 của đề BTL-18.
// Mỗi thẻ có 7 trường: mã, tệp, người, hạn, nhánh, PR/commit, OBS.
// Các giá trị __/__/____ và (điền link) là chỗ cần điền thật trước khi nộp.

module.exports = {
  boardName: "SpendWise – BTL-18 CSE122 (2 SV)",
  lists: ["Backlog", "To Do", "In Progress", "Review", "Done"],
  labels: [
    { name: "SV1", color: "green" },
    { name: "SV2", color: "blue" },
    { name: "Chung", color: "purple" },
    { name: "Ưu tiên", color: "red" },
    { name: "Tài liệu", color: "yellow" },
    { name: "Kiểm thử", color: "orange" },
    { name: "OBS", color: "sky" },
    { name: "Git", color: "lime" }
  ],
  cards: [
    // ===== BACKLOG =====
    {
      code: "TASK-31",
      list: "Backlog",
      name: "[Chung] Kiểm thử trên Firefox và Safari",
      labels: ["Chung", "Kiểm thử"],
      meta: {
        files: "Toàn bộ 19 trang",
        owner: "SV1 + SV2",
        deadline: "__/__/____",
        branch: "test/firefox-safari",
        pr: "(điền sau)",
        obs: "Không bắt buộc"
      },
      desc: "Việc để sau, chưa nằm trong bài nộp. Hiện chỉ kiểm tra trên Chrome và Edge."
    },
    {
      code: "TASK-32",
      list: "Backlog",
      name: "[SV1] Biểu đồ so sánh chi tiêu 2 tháng",
      labels: ["SV1"],
      meta: {
        files: "pages/user-finance-dashboard.html",
        owner: "SV1",
        deadline: "__/__/____",
        branch: "feature/spending-comparison-chart",
        pr: "(điền sau)",
        obs: "(nếu làm)"
      },
      desc: "Ý tưởng từ phản hồi người dùng: so sánh tổng chi tiêu tháng này với tháng trước. Chưa làm trong phạm vi bài nộp."
    },
    {
      code: "TASK-33",
      list: "Backlog",
      name: "[SV2] Xuất báo cáo chi tiêu ra CSV",
      labels: ["SV2"],
      meta: {
        files: "pages/user-transaction-management.html, js/api.js",
        owner: "SV2",
        deadline: "__/__/____",
        branch: "feature/export-csv",
        pr: "(điền sau)",
        obs: "(nếu làm)"
      },
      desc: "Tính năng tương lai, chưa làm. Ghi lại để không quên."
    },

    // ===== TO DO =====
    {
      code: "TASK-01",
      list: "To Do",
      name: "[SV1] Quay video demo tổng quan 4 phút",
      labels: ["SV1", "Ưu tiên", "Tài liệu", "OBS"],
      meta: {
        files: "Toàn bộ 19 trang + docs/SpendWise-Thiet-ke-giao-dien.pptx",
        owner: "SV1",
        deadline: "__/__/____",
        branch: "docs/video-demo",
        pr: "(điền link)",
        obs: "(điền link video tổng quan)"
      },
      desc: "Video tổng quan để đưa vào báo cáo. Video OBS chi tiết từng màn hình nằm ở TASK-08.",
      checklist: [
        "Mở index, đăng nhập nhanh bằng tài khoản demo",
        "Demo Người dùng: tạo giao dịch + AI-1, tạo mục tiêu + AI-3",
        "Demo Huấn luyện viên: duyệt ngân sách, ghi chú",
        "Demo Kiểm duyệt viên + Quản trị viên: duyệt tài nguyên, xem KPI",
        "Demo trạng thái lỗi và nút Thử lại",
        "Xuất video, kiểm tra hình và tiếng"
      ]
    },
    {
      code: "TASK-02",
      list: "To Do",
      name: "[SV2] Viết báo cáo BTL-18",
      labels: ["SV2", "Ưu tiên", "Tài liệu"],
      meta: {
        files: "docs/Bao-cao-BTL-18 (Word/PDF)",
        owner: "SV2",
        deadline: "__/__/____",
        branch: "docs/final-report",
        pr: "(điền link)",
        obs: "Không bắt buộc"
      },
      desc: "Báo cáo bám sát đề bài, có ảnh 19 màn hình, sơ đồ 5 file lõi, bảng phân công 2 SV và link Trello/Git/OBS.",
      checklist: [
        "Trang bìa, thông tin nhóm và bảng phân công SV1/SV2",
        "Mô tả 19 màn hình theo 4 vai trò",
        "Sơ đồ 5 file lõi và luồng dữ liệu",
        "Mô tả 3 tính năng AI và trạng thái thất bại",
        "Kết quả kiểm thử 19 màn hình và 10 luồng tương tác",
        "Chèn ảnh board Trello, link Git/PR và link OBS",
        "Đọc lại toàn bộ, kiểm tra chính tả và số liệu"
      ]
    },
    {
      code: "TASK-03",
      list: "To Do",
      name: "[SV2] Rà soát 19 màn hình trên Chrome và Edge",
      labels: ["SV2", "Kiểm thử"],
      meta: {
        files: "pages/*.html",
        owner: "SV2",
        deadline: "__/__/____",
        branch: "test/cross-browser",
        pr: "(điền link)",
        obs: "Không bắt buộc"
      },
      desc: "Mở lại từng trang sau khi rút gọn code, ưu tiên các màn hình ít được chạm tới.",
      checklist: [
        "Mở đủ 19 trang, không có lỗi console",
        "Kiểm tra form, modal và nút đóng",
        "Kiểm tra responsive ở 1280px, 768px và 390px",
        "Ghi lại lỗi nếu có vào thẻ mới"
      ]
    },
    {
      code: "TASK-04",
      list: "To Do",
      name: "[SV1] Ôn 12 câu vấn đáp",
      labels: ["SV1", "Ưu tiên", "Tài liệu"],
      meta: {
        files: "docs/Giai-thich-code.md",
        owner: "SV1 + SV2",
        deadline: "__/__/____",
        branch: "docs/defense-qa",
        pr: "(không bắt buộc)",
        obs: "Không bắt buộc"
      },
      desc: "Dùng docs/Giai-thich-code.md, mỗi người trả lời được một nửa số câu và demo được luồng chính.",
      checklist: [
        "SV1 trả lời câu 1–6",
        "SV2 trả lời câu 7–12",
        "Giải thích được quy trình Trello → nhánh → commit → PR → OBS",
        "Đổi vai hỏi – đáp và demo live một lượt"
      ]
    },
    {
      code: "TASK-05",
      list: "To Do",
      name: "[SV1] Kiểm tra gói nộp bài",
      labels: ["SV1", "Ưu tiên"],
      meta: {
        files: "Toàn bộ dự án",
        owner: "SV1 + SV2",
        deadline: "__/__/____",
        branch: "main",
        pr: "(điền link release/tag)",
        obs: "(điền link thư mục OBS)"
      },
      desc: "Kiểm tra trước khi nộp, tránh thiếu file hoặc link minh chứng không mở được.",
      checklist: [
        "Đúng tên thư mục, cấu trúc 5 file lõi + 19 trang",
        "Đủ README, tài liệu giải thích, slide, báo cáo và video",
        "Link Trello, Git/PR và OBS mở được ở chế độ ẩn danh",
        "Nộp đúng hạn và đúng kênh của lớp",
        "Mở thử gói nộp trên một máy khác"
      ]
    },
    {
      code: "TASK-06",
      list: "To Do",
      name: "[SV2] Chụp ảnh board Trello cho báo cáo",
      labels: ["SV2", "Tài liệu"],
      meta: {
        files: "docs/trello/",
        owner: "SV2",
        deadline: "__/__/____",
        branch: "docs/trello-screenshot",
        pr: "(không bắt buộc)",
        obs: "Không bắt buộc"
      },
      desc: "Ảnh board dùng làm minh chứng quản lý tiến độ và phân công trong báo cáo.",
      checklist: [
        "Chụp toàn bộ board, thấy đủ 5 cột",
        "Chụp một thẻ có đủ 7 trường và checklist",
        "Chèn ảnh vào mục quản lý dự án của báo cáo"
      ]
    },
    {
      code: "TASK-07",
      list: "To Do",
      name: "[Chung] Tập demo chung trước khi quay",
      labels: ["Chung", "Ưu tiên"],
      meta: {
        files: "19 trang",
        owner: "SV1 + SV2",
        deadline: "__/__/____",
        branch: "docs/demo-rehearsal",
        pr: "(không bắt buộc)",
        obs: "Không bắt buộc"
      },
      desc: "Cả hai chạy thử một lượt, thống nhất thứ tự trình bày và người bấm màn hình.",
      checklist: [
        "Thống nhất thứ tự 4 vai trò",
        "Thống nhất tài khoản demo và dữ liệu mẫu",
        "Chạy thử toàn bộ kịch bản một lần",
        "Ghi lại các chỗ cần sửa trước khi quay"
      ]
    },
    {
      code: "TASK-08",
      list: "To Do",
      name: "[Chung] Quay 19 video OBS theo màn hình",
      labels: ["Chung", "Ưu tiên", "OBS"],
      meta: {
        files: "index.html + 18 trang trong pages/",
        owner: "SV1 (10 video) + SV2 (9 video)",
        deadline: "__/__/____",
        branch: "docs/obs-videos",
        pr: "(không bắt buộc)",
        obs: "Thư mục OBS: (điền link)"
      },
      desc: "Mỗi màn hình 1 video theo mẫu SV1-01-index.mp4. Video phải có mặt sinh viên, mở bản mô phỏng, mở file HTML/CSS/JS, giải thích, sửa trực tiếp, chạy thử và commit.",
      checklist: [
        "SV1 – 01 – index.html",
        "SV1 – 02 – login.html",
        "SV1 – 03 – register.html",
        "SV1 – 04 – forgot-password.html",
        "SV1 – 05 – user-finance-dashboard.html",
        "SV1 – 06 – user-transaction-management.html",
        "SV1 – 07 – user-saving-goals.html",
        "SV1 – 08 – user-budgets.html",
        "SV1 – 09 – 403.html",
        "SV1 – 10 – 404.html",
        "SV2 – 11 – coach-client-list.html",
        "SV2 – 12 – coach-budget-review.html",
        "SV2 – 13 – coach-resource-management.html",
        "SV2 – 14 – moderator-resource-review.html",
        "SV2 – 15 – moderator-ai-template-management.html",
        "SV2 – 16 – moderator-feedback-center.html",
        "SV2 – 17 – admin-expense-category-management.html",
        "SV2 – 18 – admin-user-management.html",
        "SV2 – 19 – admin-system-dashboard.html"
      ]
    },
    {
      code: "TASK-09",
      list: "To Do",
      name: "[Chung] Git/GitHub: repo, nhánh, PR, merge",
      labels: ["Chung", "Ưu tiên", "Git"],
      meta: {
        files: "Toàn bộ dự án",
        owner: "SV1 + SV2",
        deadline: "__/__/____",
        branch: "main, dev, feature/*",
        pr: "(điền link repo)",
        obs: "Không bắt buộc"
      },
      desc: "Đề yêu cầu lịch sử Git + nhánh + PR. Hiện thư mục dự án chưa phải repo Git, nên đây là việc cần làm trước khi nộp.",
      checklist: [
        "Tạo repo GitHub tên cse122-spendwise-teamXX",
        "Tạo nhánh main và dev",
        "Tạo nhánh feature/<tên-màn-hình> cho từng màn hình",
        "Commit đúng mẫu feat/fix/docs, không dùng update/done/final",
        "Tạo PR từ feature → dev, ghi mã TASK trong mô tả",
        "SV còn lại review và approve",
        "Merge vào dev, chạy test tích hợp",
        "Merge dev → main",
        "Gắn link PR/commit vào từng thẻ Trello"
      ]
    },
    {
      code: "TASK-10",
      list: "To Do",
      name: "[SV2] Bản mô phỏng Figma/Canva",
      labels: ["SV2", "Tài liệu"],
      meta: {
        files: "design/figma-link.txt, design/mockups/",
        owner: "SV2",
        deadline: "__/__/____",
        branch: "docs/figma-mockups",
        pr: "(điền link Figma/Canva)",
        obs: "Không bắt buộc"
      },
      desc: "Đề yêu cầu bản mô phỏng Figma/Canva được duyệt trước khi code. Slide 18 trang có thể dùng làm tham chiếu, nhưng vẫn cần link Figma/Canva thật.",
      checklist: [
        "Sơ đồ trang",
        "Luồng người dùng",
        "Bảng kiểm kê màn hình",
        "Wireframe",
        "Mockup desktop",
        "Mockup responsive",
        "Trạng thái loading/empty/error",
        "Mockup tương tác AI",
        "Link Figma/Canva công khai"
      ]
    },
    {
      code: "TASK-11",
      list: "To Do",
      name: "[SV1] Cập nhật bảng kiểm kê màn hình cho 2 SV",
      labels: ["SV1", "Tài liệu"],
      meta: {
        files: "docs/screen-list.md, README.md",
        owner: "SV1",
        deadline: "__/__/____",
        branch: "docs/screen-list-2sv",
        pr: "(điền link)",
        obs: "Không bắt buộc"
      },
      desc: "Hiện bảng kiểm kê còn ghi SV3. Cần đổi về 2 SV và bổ sung các cột minh chứng theo đề.",
      checklist: [
        "Đổi SV3 → SV2 trong toàn bộ bảng",
        "Thêm cột Người phụ trách cho 19 màn hình",
        "Thêm cột Mã task (TASK-xx)",
        "Thêm cột Link OBS",
        "Thêm cột Link PR/commit",
        "Cập nhật README ghi nhóm 2 SV",
        "Review chéo giữa SV1 và SV2"
      ]
    },
    {
      code: "TASK-12",
      list: "To Do",
      name: "[SV2] Viết docs/ai-usage-report.md",
      labels: ["SV2", "Tài liệu"],
      meta: {
        files: "docs/ai-usage-report.md",
        owner: "SV2",
        deadline: "__/__/____",
        branch: "docs/ai-usage-report",
        pr: "(điền link)",
        obs: "Không bắt buộc"
      },
      desc: "Đề bắt buộc khai báo AI. Hiện docs chưa có file này.",
      checklist: [
        "Công cụ AI đã dùng",
        "Prompt chính",
        "Phần AI sinh ra",
        "Phần sinh viên chỉnh sửa",
        "Lỗi AI gặp phải",
        "Cách kiểm chứng",
        "Điều sinh viên học được",
        "Tính năng mock vs API thật"
      ]
    },

    // ===== IN PROGRESS =====
    {
      code: "TASK-13",
      list: "In Progress",
      name: "[SV1] Tập demo luồng Người dùng + AI",
      labels: ["SV1"],
      meta: {
        files: "4 màn Người dùng",
        owner: "SV1",
        deadline: "__/__/____",
        branch: "docs/demo-rehearsal",
        pr: "(không bắt buộc)",
        obs: "Theo dõi ở TASK-08"
      },
      desc: "Tập riêng phần Người dùng để không mất thời gian khi quay cả nhóm.",
      checklist: [
        "Tạo giao dịch và nhận gợi ý AI-1",
        "Tạo mục tiêu tiết kiệm và chạy AI-3",
        "Kiểm tra ngân sách và trạng thái vượt hạn mức",
        "Mở lại trang sau khi tải lại trình duyệt"
      ]
    },
    {
      code: "TASK-14",
      list: "In Progress",
      name: "[SV2] Soát báo cáo và số liệu",
      labels: ["SV2", "Tài liệu"],
      meta: {
        files: "docs/Bao-cao-BTL-18",
        owner: "SV2",
        deadline: "__/__/____",
        branch: "docs/final-report",
        pr: "(điền link)",
        obs: "Không bắt buộc"
      },
      desc: "Đối chiếu báo cáo với sản phẩm thật, tránh ghi sai số màn hình hoặc tên file.",
      checklist: [
        "Đúng 19 màn hình và đúng tên file",
        "Đúng số liệu KPI đang hiển thị",
        "Đúng mô tả 5 file lõi",
        "Ảnh chụp khớp với màn hình được mô tả"
      ]
    },

    // ===== REVIEW =====
    {
      code: "TASK-15",
      list: "Review",
      name: "[SV1 → SV2] Kiểm tra video demo tổng quan",
      labels: ["SV1", "Tài liệu", "OBS"],
      meta: {
        files: "Video demo 4 phút",
        owner: "SV1 làm, SV2 review",
        deadline: "__/__/____",
        branch: "docs/video-demo",
        pr: "(điền link)",
        obs: "(điền link video)"
      },
      desc: "SV1 quay, SV2 kiểm tra trước khi đưa vào bài nộp.",
      checklist: [
        "Thời lượng khoảng 4 phút",
        "Hình rõ, tiếng rõ, không bị giật",
        "Đúng kịch bản 4 vai trò",
        "Không lộ mật khẩu thật hoặc thông tin cá nhân",
        "Xuất đúng định dạng MP4"
      ]
    },
    {
      code: "TASK-16",
      list: "Review",
      name: "[SV2 → SV1] Kiểm tra báo cáo BTL-18",
      labels: ["SV2", "Tài liệu"],
      meta: {
        files: "docs/Bao-cao-BTL-18",
        owner: "SV2 làm, SV1 review",
        deadline: "__/__/____",
        branch: "docs/final-report",
        pr: "(điền link)",
        obs: "Không bắt buộc"
      },
      desc: "SV2 viết, SV1 kiểm tra trước khi nộp.",
      checklist: [
        "Đủ các mục theo yêu cầu",
        "Đúng tên file và định dạng",
        "Ảnh và bảng hiển thị rõ",
        "Link Trello, Git/PR và OBS hoạt động",
        "Bảng phân công khớp 2 SV"
      ]
    },

    // ===== DONE =====
    {
      code: "TASK-17",
      list: "Done",
      name: "[SV1] Design system dùng chung",
      labels: ["SV1"],
      meta: {
        files: "css/style.css",
        owner: "SV1",
        deadline: "__/__/____",
        branch: "feature/design-system",
        pr: "(điền link)",
        obs: "Không bắt buộc"
      },
      desc: "Kết quả: token màu, chữ, khoảng cách, nút, badge, thẻ KPI, bảng, modal và responsive 960px/640px."
    },
    {
      code: "TASK-18",
      list: "Done",
      name: "[SV1] Dữ liệu mẫu + API giả lập",
      labels: ["SV1"],
      meta: {
        files: "js/data.js, js/api.js",
        owner: "SV1",
        deadline: "__/__/____",
        branch: "feature/mock-data-api",
        pr: "(điền link)",
        obs: "Không bắt buộc"
      },
      desc: "Kết quả: dữ liệu lưu ở LocalStorage spendwise.db.v1, API trễ 400–900ms, xoá mềm bằng archived, có cờ mô phỏng lỗi."
    },
    {
      code: "TASK-19",
      list: "Done",
      name: "[SV1] AI mô phỏng + layout theo vai trò",
      labels: ["SV1"],
      meta: {
        files: "js/ai.js, js/layout.js",
        owner: "SV1",
        deadline: "__/__/____",
        branch: "feature/ai-and-layout",
        pr: "(điền link)",
        obs: "Không bắt buộc"
      },
      desc: "Kết quả: AI-1 gợi ý danh mục, AI-2 phân tích chi tiêu, AI-3 gợi ý tiết kiệm; layout dựng sidebar/topbar và helper dùng chung."
    },
    {
      code: "TASK-20",
      list: "Done",
      name: "[SV1] 4 màn Người dùng",
      labels: ["SV1"],
      meta: {
        files: "pages/user-finance-dashboard.html, pages/user-transaction-management.html, pages/user-saving-goals.html, pages/user-budgets.html",
        owner: "SV1",
        deadline: "__/__/____",
        branch: "feature/user-screens",
        pr: "(điền link)",
        obs: "Theo dõi ở TASK-08"
      },
      desc: "Kết quả: 4 màn Người dùng có trạng thái tải, rỗng, lỗi và kiểm tra biểu mẫu."
    },
    {
      code: "TASK-21",
      list: "Done",
      name: "[SV1] Trang chủ + xác thực + trang lỗi",
      labels: ["SV1"],
      meta: {
        files: "index.html, pages/login.html, pages/register.html, pages/forgot-password.html, pages/403.html, pages/404.html",
        owner: "SV1",
        deadline: "__/__/____",
        branch: "feature/common-auth-pages",
        pr: "(điền link)",
        obs: "Theo dõi ở TASK-08"
      },
      desc: "Kết quả: trang chủ, đăng nhập nhanh 4 vai trò, đăng ký, quên mật khẩu, 403, 404."
    },
    {
      code: "TASK-22",
      list: "Done",
      name: "[SV2] 3 màn Huấn luyện viên",
      labels: ["SV2"],
      meta: {
        files: "pages/coach-client-list.html, pages/coach-budget-review.html, pages/coach-resource-management.html",
        owner: "SV2",
        deadline: "__/__/____",
        branch: "feature/coach-screens",
        pr: "(điền link)",
        obs: "Theo dõi ở TASK-08"
      },
      desc: "Kết quả: danh sách học viên, duyệt ngân sách kèm ghi chú, quản lý tài nguyên giáo dục."
    },
    {
      code: "TASK-23",
      list: "Done",
      name: "[SV2] 3 màn Kiểm duyệt viên",
      labels: ["SV2"],
      meta: {
        files: "pages/moderator-resource-review.html, pages/moderator-ai-template-management.html, pages/moderator-feedback-center.html",
        owner: "SV2",
        deadline: "__/__/____",
        branch: "feature/moderator-screens",
        pr: "(điền link)",
        obs: "Theo dõi ở TASK-08"
      },
      desc: "Kết quả: duyệt/từ chối tài nguyên kèm lý do, quản lý mẫu AI và chạy thử, trung tâm phản hồi."
    },
    {
      code: "TASK-24",
      list: "Done",
      name: "[SV2] 3 màn Quản trị viên",
      labels: ["SV2"],
      meta: {
        files: "pages/admin-expense-category-management.html, pages/admin-user-management.html, pages/admin-system-dashboard.html",
        owner: "SV2",
        deadline: "__/__/____",
        branch: "feature/admin-screens",
        pr: "(điền link)",
        obs: "Theo dõi ở TASK-08"
      },
      desc: "Kết quả: quản lý danh mục chi tiêu, quản lý tài khoản, dashboard hệ thống có KPI và nhật ký."
    },
    {
      code: "TASK-25",
      list: "Done",
      name: "[Chung] Tách 5 file lõi và rút gọn code",
      labels: ["Chung"],
      meta: {
        files: "css/style.css, js/data.js, js/api.js, js/ai.js, js/layout.js, 19 trang",
        owner: "SV1 + SV2",
        deadline: "__/__/____",
        branch: "refactor/shared-core",
        pr: "(điền link)",
        obs: "Không bắt buộc"
      },
      desc: "Kết quả: 5 file lõi; helper clearErrors, markInvalid, errorBox, currentUser, currentUserId, login; modal đóng bằng data-close."
    },
    {
      code: "TASK-26",
      list: "Done",
      name: "[Chung] Kiểm thử 19 màn + 10 luồng tương tác",
      labels: ["Chung", "Kiểm thử"],
      meta: {
        files: "19 trang",
        owner: "SV1 + SV2",
        deadline: "__/__/____",
        branch: "test/full-suite",
        pr: "(điền link)",
        obs: "Không bắt buộc"
      },
      desc: "Kết quả: 19 trang tải không lỗi; 10 luồng mở/đóng modal, kiểm tra biểu mẫu, AI-1, AI-3 và đăng nhập nhanh đều đạt; đã kiểm tra desktop và mobile."
    },
    {
      code: "TASK-27",
      list: "Done",
      name: "[SV2] Slide thiết kế 18 trang",
      labels: ["SV2", "Tài liệu"],
      meta: {
        files: "docs/SpendWise-Thiet-ke-giao-dien.pptx",
        owner: "SV2",
        deadline: "__/__/____",
        branch: "docs/design-deck",
        pr: "(điền link)",
        obs: "Không bắt buộc"
      },
      desc: "Kết quả: 18 trang thiết kế giao diện trước khi code."
    },
    {
      code: "TASK-28",
      list: "Done",
      name: "[SV1] Tài liệu giải thích code + 12 câu hỏi",
      labels: ["SV1", "Tài liệu"],
      meta: {
        files: "docs/Giai-thich-code.md",
        owner: "SV1",
        deadline: "__/__/____",
        branch: "docs/code-explanation",
        pr: "(điền link)",
        obs: "Không bắt buộc"
      },
      desc: "Kết quả: kiến trúc, luồng dữ liệu, bảng chức năng, 12 câu vấn đáp và kịch bản demo."
    },
    {
      code: "TASK-29",
      list: "Done",
      name: "[SV2] README + hướng dẫn chạy",
      labels: ["SV2", "Tài liệu"],
      meta: {
        files: "README.md",
        owner: "SV2",
        deadline: "__/__/____",
        branch: "docs/readme",
        pr: "(điền link)",
        obs: "Không bắt buộc"
      },
      desc: "Kết quả: hướng dẫn chạy, cấu trúc 5 file lõi + 19 trang, danh sách màn hình và mục Trello."
    },
    {
      code: "TASK-30",
      list: "Done",
      name: "[Chung] Sửa giao diện khớp class HTML",
      labels: ["Chung"],
      meta: {
        files: "css/style.css, 19 trang",
        owner: "SV1 + SV2",
        deadline: "__/__/____",
        branch: "fix/ui-classes",
        pr: "(điền link)",
        obs: "Không bắt buộc"
      },
      desc: "Kết quả: nút, badge, thẻ KPI, biểu đồ cột và menu mobile hiển thị đúng; đã kiểm tra bằng ảnh chụp desktop và mobile."
    }
  ]
};
