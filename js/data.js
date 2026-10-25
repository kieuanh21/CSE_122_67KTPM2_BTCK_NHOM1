/* SpendWise — dữ liệu mẫu (seed).
   Nguồn dữ liệu ban đầu: người dùng, danh mục, giao dịch, ngân sách, mục tiêu,
   tài nguyên, mẫu AI, phản hồi, nhật ký và thông báo.
   API sẽ chép dữ liệu này vào localStorage ở lần chạy đầu tiên. */
window.MOCK = {
  users: [
    { id: "u1", name: "Nguyễn Văn Minh", email: "minh@student.edu.vn", role: "user", status: "active", joined: "2026-08-12" },
    { id: "u2", name: "Trần Thu Hà", email: "ha@student.edu.vn", role: "user", status: "active", joined: "2026-09-01" },
    { id: "u3", name: "Lê Quốc Bảo", email: "bao@student.edu.vn", role: "user", status: "locked", joined: "2026-09-15" },
    { id: "c1", name: "Phạm Thị Lan", email: "lan.coach@spendwise.vn", role: "coach", status: "active", joined: "2026-07-01" },
    { id: "m1", name: "Kiểm duyệt viên", email: "nam.mod@spendwise.vn", role: "moderator", status: "active", joined: "2026-07-01" },
    { id: "a1", name: "Quản trị hệ thống", email: "admin@spendwise.vn", role: "admin", status: "active", joined: "2026-06-01" }
  ],

  categories: [
    { id: "cat-an-uong", name: "Ăn uống", icon: "🍜", status: "active" },
    { id: "cat-di-chuyen", name: "Di chuyển", icon: "🚌", status: "active" },
    { id: "cat-hoc-tap", name: "Học tập", icon: "📚", status: "active" },
    { id: "cat-giai-tri", name: "Giải trí", icon: "🎬", status: "active" },
    { id: "cat-mua-sam", name: "Mua sắm", icon: "🛍️", status: "active" },
    { id: "cat-hoa-don", name: "Hoá đơn", icon: "🧾", status: "active" },
    { id: "cat-suc-khoe", name: "Sức khoẻ", icon: "💊", status: "active" },
    { id: "cat-khac", name: "Khác", icon: "📦", status: "active" },
    { id: "cat-cu", name: "Dịch vụ đã ngưng", icon: "📼", status: "archived" }
  ],

  transactions: [
    { id: "t01", userId: "u1", name: "Cơm trọ ký túc xá", amount: 35000, type: "expense", categoryId: "cat-an-uong", date: "2026-10-18", note: "", status: "active" },
    { id: "t02", userId: "u1", name: "Xe buýt đi học", amount: 7000, type: "expense", categoryId: "cat-di-chuyen", date: "2026-10-18", note: "", status: "active" },
    { id: "t03", userId: "u1", name: "Cà phê độ học nhóm", amount: 45000, type: "expense", categoryId: "cat-an-uong", date: "2026-10-17", note: "Học nhóm môn Web", status: "active" },
    { id: "t04", userId: "u1", name: "Tiền điện phòng trọ", amount: 180000, type: "expense", categoryId: "cat-hoa-don", date: "2026-10-16", note: "", status: "active" },
    { id: "t05", userId: "u1", name: "In tài liệu ôn thi", amount: 30000, type: "expense", categoryId: "cat-hoc-tap", date: "2026-10-15", note: "", status: "active" },
    { id: "t06", userId: "u1", name: "Xem phim CGV", amount: 100000, type: "expense", categoryId: "cat-giai-tri", date: "2026-10-14", note: "", status: "active" },
    { id: "t07", userId: "u1", name: "Đi chợ tuần", amount: 260000, type: "expense", categoryId: "cat-an-uong", date: "2026-10-13", note: "", status: "active" },
    { id: "t08", userId: "u1", name: "Grab về ký túc xá", amount: 58000, type: "expense", categoryId: "cat-di-chuyen", date: "2026-10-12", note: "Mưa", status: "active" },
    { id: "t09", userId: "u1", name: "Mua áo khoác", amount: 320000, type: "expense", categoryId: "cat-mua-sam", date: "2026-10-10", note: "", status: "active" },
    { id: "t10", userId: "u1", name: "Thuốc cảm", amount: 85000, type: "expense", categoryId: "cat-suc-khoe", date: "2026-10-09", note: "", status: "active" },
    { id: "t11", userId: "u1", name: "Nhận lương làm thêm", amount: 3000000, type: "income", categoryId: "cat-khac", date: "2026-10-05", note: "Gia sư", status: "active" },
    { id: "t12", userId: "u1", name: "Gửi tiết kiệm mục tiêu laptop", amount: 500000, type: "expense", categoryId: "cat-khac", date: "2026-10-05", note: "Chuyển vào mục tiêu", status: "active" },
    { id: "t13", userId: "u1", name: "Cơm trọ ký túc xá", amount: 35000, type: "expense", categoryId: "cat-an-uong", date: "2026-09-20", note: "", status: "active" },
    { id: "t14", userId: "u1", name: "Xe buýt đi học", amount: 7000, type: "expense", categoryId: "cat-di-chuyen", date: "2026-09-20", note: "", status: "active" },
    { id: "t15", userId: "u1", name: "Trà sữa với bạn", amount: 55000, type: "expense", categoryId: "cat-an-uong", date: "2026-09-18", note: "", status: "active" },
    { id: "t16", userId: "u1", name: "Sửa xe đạp", amount: 120000, type: "expense", categoryId: "cat-di-chuyen", date: "2026-09-15", note: "", status: "active" },
    { id: "t17", userId: "u1", name: "Tiền nước phòng trọ", amount: 60000, type: "expense", categoryId: "cat-hoa-don", date: "2026-09-12", note: "", status: "active" },
    { id: "t18", userId: "u1", name: "Giao dịch cũ đã lưu trữ", amount: 50000, type: "expense", categoryId: "cat-khac", date: "2026-09-01", note: "", status: "archived" }
  ],

  budgets: [
    { id: "b1", userId: "u1", categoryId: "cat-an-uong", month: "2026-10", amount: 2000000, status: "pending", note: "" },
    { id: "b2", userId: "u1", categoryId: "cat-di-chuyen", month: "2026-10", amount: 400000, status: "approved", note: "" },
    { id: "b3", userId: "u1", categoryId: "cat-giai-tri", month: "2026-10", amount: 300000, status: "changes_requested", note: "Giải trí 300k hơi cao so với thu nhập, đề xuất giảm còn 200k." },
    { id: "b4", userId: "u2", categoryId: "cat-an-uong", month: "2026-10", amount: 1800000, status: "pending", note: "" },
    { id: "b5", userId: "u2", categoryId: "cat-mua-sam", month: "2026-10", amount: 500000, status: "pending", note: "" }
  ],

  goals: [
    { id: "g1", userId: "u1", name: "Mua laptop học lập trình", target: 15000000, saved: 4500000, deadline: "2027-03-01", status: "active", plan: "" },
    { id: "g2", userId: "u1", name: "Quỹ dự phòng 2 triệu", target: 2000000, saved: 2000000, deadline: "2026-12-31", status: "completed", plan: "" },
    { id: "g3", userId: "u1", name: "Du lịch Đà Nẵng hè", target: 4000000, saved: 600000, deadline: "2026-06-30", status: "cancelled", plan: "" }
  ],

  coachNotes: [
    { id: "n1", coachId: "c1", userId: "u1", budgetId: "b3", note: "Ngân sách giải trí 300k hơi cao so với thu nhập, đề xuất giảm còn 200k và tăng phần Ăn uống.", createdAt: "2026-10-15" }
  ],

  resources: [
    { id: "r1", authorId: "c1", title: "5 bước lập ngân sách cho sinh viên", tag: "ngan-sach", status: "published", updatedAt: "2026-09-20", createdAt: "2026-09-20", content: "Bước 1: ghi lại mọi khoản chi trong tuần. Bước 2: chia thu nhập theo 50/30/20...", rejectReason: "" },
    { id: "r2", authorId: "c1", title: "Checklist chi tiêu đầu tháng", tag: "thoi-quen", status: "pending", updatedAt: "2026-10-16", createdAt: "2026-10-16", content: "- Ghi thu nhập\n- Chia 50/30/20\n- Đặt hạn mức từng danh mục\n- Cuối tháng đối chiếu", rejectReason: "" },
    { id: "r3", authorId: "c1", title: "Video: cách đọc sao kê", tag: "tiet-kiem", status: "draft", updatedAt: "2026-10-17", createdAt: "2026-10-17", content: "Kịch bản video 5 phút hướng dẫn đọc sao kê ngân hàng.", rejectReason: "" },
    { id: "r4", authorId: "c1", title: "Bài viết sai sự thật về đầu tư", tag: "tiet-kiem", status: "rejected", updatedAt: "2026-10-10", createdAt: "2026-10-10", content: "Nội dung gợi ý mua cổ phiếu đòn bẩy cao...", rejectReason: "Nội dung gợi ý đầu tư rủi ro, không phù hợp học sinh sinh viên." }
  ],

  aiTemplates: [
    { id: "ai1", name: "Gợi ý danh mục giao dịch", purpose: "categorizer", prompt: "Dựa trên tên giao dịch và số tiền, chọn 1 trong các danh mục có sẵn và giải thích lý do.", status: "active" },
    { id: "ai2", name: "Phân tích pattern chi tiêu", purpose: "insight", prompt: "So sánh chi tiêu 30 ngày gần nhất với kỳ trước, nêu tối đa 3 insight kèm đề xuất hành động.", status: "active" },
    { id: "ai3", name: "Huấn luyện viên mục tiêu", purpose: "goal-coach", prompt: "Cho mục tiêu, số tiền và thời hạn, đề xuất số tiền cần gửi mỗi tuần và 3 mốc tiến độ.", status: "active" },
    { id: "ai4", name: "Mẫu thử nghiệm (nháp)", purpose: "categorizer", prompt: "Mẫu đang soạn thử...", status: "draft" },
    { id: "ai5", name: "Mẫu đã tắt - hint đầu tư", purpose: "insight", prompt: "Gợi ý cổ phiếu nên mua...", status: "disabled" }
  ],

  feedbacks: [
    { id: "f1", userId: "u1", title: "Nút Lưu giao dịch không ăn trên điện thoại", body: "Nút Lưu giao dịch đôi khi bấm không ăn trên điện thoại.", status: "new", reply: "", createdAt: "2026-10-17" },
    { id: "f2", userId: "u2", title: "Muốn có biểu đồ so sánh 2 tháng", body: "Muốn có biểu đồ so sánh tháng này với tháng trước.", status: "processing", reply: "Đã ghi nhận, đưa vào bản kế hoạch.", createdAt: "2026-10-15" },
    { id: "f3", userId: "u2", title: "Bài viết của HLV nên có tóm tắt", body: "Bài viết của HLV nên có tóm tắt ngắn đầu bài.", status: "resolved", reply: "Đã chuyển yêu cầu cho HLV.", createdAt: "2026-10-12" }
  ],

  logs: [
    { id: "l1", time: "2026-10-18 21:40", actor: "minh@student.edu.vn", action: "Thêm giao dịch \"Cơm trọ ký túc xá\"" },
    { id: "l2", time: "2026-10-18 09:12", actor: "lan.coach@spendwise.vn", action: "Duyệt ngân sách b2 của Nguyễn Văn Minh" },
    { id: "l3", time: "2026-10-17 16:05", actor: "nam.mod@spendwise.vn", action: "Từ chối tài nguyên r4 (lý do: nội dung đầu tư)" },
    { id: "l4", time: "2026-10-16 08:30", actor: "admin@spendwise.vn", action: "Khoá tài khoản bao@student.edu.vn" },
    { id: "l5", time: "2026-10-15 20:11", actor: "minh@student.edu.vn", action: "Lưu insight AI vào dashboard" }
  ],

  announcements: [
    { id: "an1", text: "Bảo trì hệ thống từ 22:00 đến 23:00 ngày 24/10/2026.", date: "2026-10-15", status: "active" }
  ],

  /* Tổng chi theo danh mục của tháng TRƯỚC (dùng cho AI-2 so sánh) */
  prevMonthTotals: { "cat-an-uong": 1200000, "cat-giai-tri": 150000, "cat-mua-sam": 400000, "cat-di-chuyen": 300000 }
};
