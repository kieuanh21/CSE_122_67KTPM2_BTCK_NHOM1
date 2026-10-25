/* ai.js — ba tính năng AI mô phỏng bằng quy tắc, không cần máy chủ thật.
   AI-1 gợi ý danh mục, AI-2 phân tích thói quen chi tiêu, AI-3 lập kế hoạch mục tiêu.
   Mỗi hàm chờ 1,2–1,8 giây (để thấy trạng thái "AI đang xử lý") và trả về:
     { ok: true,  result: ..., reason: "vì sao AI làm vậy" }
     { ok: false, reason: "lý do thất bại" } */
(function () {
  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function start() {
    await wait(1200 + Math.random() * 600);
    if (sessionStorage.getItem("spendwise.fail") === "1") {
      throw new Error("AI chưa khả dụng (mô phỏng lỗi). Bạn có thể thử lại hoặc nhập thủ công.");
    }
  }

  function money(n) {
    return n.toLocaleString("vi-VN") + "₫";
  }

  function categoryLabel(id) {
    const c = window.API.categoryName(id);
    return c.icon + " " + c.name;
  }

  /* Từ khoá → danh mục, dùng cho AI-1 */
  const RULES = [
    { category: "cat-an-uong", words: ["cơm", "cà phê", "cafe", "trà sữa", "bún", "phở", "mì", "chợ", "ăn", "uống", "lẩu", "bánh"] },
    { category: "cat-di-chuyen", words: ["xe buýt", "bus", "grab", "xe ôm", "taxi", "xăng", "gửi xe", "xe đạp", "vé tàu"] },
    { category: "cat-hoc-tap", words: ["in ", "sách", "học phí", "tài liệu", "khóa học", "vở", "thi"] },
    { category: "cat-giai-tri", words: ["phim", "cgv", "game", "karaoke", "du lịch", "kèo", "bóng đá"] },
    { category: "cat-mua-sam", words: ["áo", "quần", "giày", "mua", "shopee", "laptop", "điện thoại", "túi"] },
    { category: "cat-hoa-don", words: ["điện", "nước", "internet", "wifi", "tiền phòng", "hoá đơn", "hóa đơn"] },
    { category: "cat-suc-khoe", words: ["thuốc", "khám", "bệnh viện", "vitamin", "mask"] },
  ];

  window.AI = {
    /* AI-1: nhìn tên giao dịch, tìm từ khoá và đề xuất danh mục */
    async categorize(name) {
      try { await start(); } catch (err) { return { ok: false, reason: err.message }; }

      const text = (name || "").toLowerCase().trim();
      if (text.length < 3) {
        return { ok: false, reason: "Tên giao dịch quá ngắn để nhận diện. Hãy nhập tên rõ hơn hoặc chọn danh mục thủ công." };
      }

      const matches = [];
      for (const rule of RULES) {
        const words = rule.words.filter((word) => text.includes(word));
        if (words.length > 0) {
          matches.push({ category: rule.category, score: words.length, words });
        }
      }
      if (matches.length === 0) {
        return { ok: false, reason: "Không đủ dữ liệu để đưa ra đề xuất cho giao dịch này. Bạn có thể chọn danh mục thủ công." };
      }

      matches.sort((a, b) => b.score - a.score);
      const best = matches[0];
      const confidence = Math.min(0.6 + best.score * 0.15, 0.95);

      return {
        ok: true,
        result: {
          categoryId: best.category,
          alternatives: matches.slice(1, 3).map((m) => m.category),
          confidence,
        },
        reason: `AI thấy tên giao dịch chứa từ khoá "${best.words.join('", "')}" nên đề xuất danh mục này (độ tin cậy ${Math.round(confidence * 100)}%).`,
      };
    },

    /* AI-2: so sánh tổng chi từng danh mục với tháng trước */
    async insight(transactions) {
      try { await start(); } catch (err) { return { ok: false, reason: err.message }; }

      const expenses = transactions.filter((t) => t.type === "expense" && t.status === "active");
      if (expenses.length < 5) {
        return { ok: false, reason: "Không đủ dữ liệu để phân tích — cần ít nhất 5 giao dịch chi tiêu trong tháng." };
      }

      const now = {};
      let total = 0;
      for (const t of expenses) {
        now[t.categoryId] = (now[t.categoryId] || 0) + t.amount;
        total += t.amount;
      }

      const prev = window.MOCK.prevMonthTotals;
      const insights = [];

      // Chênh lệch từ 20% trở lên mới đáng nêu
      for (const categoryId in now) {
        if (!prev[categoryId]) continue;
        const diff = Math.round((now[categoryId] - prev[categoryId]) / prev[categoryId] * 100);
        if (diff >= 20) {
          insights.push({
            text: `Chi "${categoryLabel(categoryId)}" tăng ${diff}% so với tháng trước (${money(now[categoryId])}).`,
            action: "Đặt hạn mức cho danh mục này trong mục Ngân sách.",
          });
        } else if (diff <= -20) {
          insights.push({
            text: `Chi "${categoryLabel(categoryId)}" giảm ${Math.abs(diff)}% so với tháng trước — tiến bộ rõ rệt!`,
            action: "Cân nhắc chuyển phần tiền tiết kiệm được vào mục tiêu.",
          });
        }
      }

      const entries = Object.entries(now).sort((a, b) => b[1] - a[1]);
      if (entries.length > 0) {
        const [topCategory, topAmount] = entries[0];
        insights.push({
          text: `Danh mục chi nhiều nhất tháng này: ${categoryLabel(topCategory)} với ${money(topAmount)} (${Math.round(topAmount / total * 100)}% tổng chi).`,
          action: "Rà lại các giao dịch lớn nhất của danh mục này.",
        });
      }

      return {
        ok: true,
        result: insights.slice(0, 3),
        reason: "AI so sánh tổng chi theo danh mục của bạn với số liệu tháng trước (nguồn: giao dịch 30 ngày gần nhất).",
      };
    },

    /* AI-3: chia số tiền còn thiếu cho số tuần còn lại, kèm 3 mốc và mẹo */
    async goalPlan(goal, weeklyBudget) {
      try { await start(); } catch (err) { return { ok: false, reason: err.message }; }

      const weeks = Math.max(1, Math.round((new Date(goal.deadline) - Date.now()) / (7 * 86400000)));
      const remain = Math.max(0, goal.target - goal.saved);
      const perWeek = Math.ceil(remain / weeks);
      const cap = weeklyBudget || 1500000; // mức gửi mặc định nếu người dùng không nhập

      if (perWeek > cap) {
        return {
          ok: false,
          reason: `Mục tiêu chưa khả thi: cần gửi ${money(perWeek)}/tuần, vượt quá ${money(cap)}/tuần bạn có thể dành. Hãy kéo dài thời hạn hoặc giảm mục tiêu, rồi Tạo lại.`,
        };
      }

      const milestoneDate = (index) =>
        new Date(Date.now() + index * (weeks / 3) * 7 * 86400000).toLocaleDateString("vi-VN");

      return {
        ok: true,
        result: {
          perWeek,
          weeks,
          milestones: [
            `Mốc 1 (trước ${milestoneDate(1)}): gửi được ${money(Math.round(remain / 3))}`,
            `Mốc 2 (trước ${milestoneDate(2)}): đạt ${money(Math.round(remain * 2 / 3 + goal.saved))}`,
            `Mốc 3 (${milestoneDate(3)}): đủ ${money(goal.target)}`,
          ],
          tips: `Mẹo: chuyển tiền sang mục tiêu ngay khi nhận thu nhập; cắt 1 bữa ăn ngoài/tuần (≈${money(Math.min(50000, perWeek))}) là gần đủ nhịp gửi.`,
        },
        reason: `AI chia đều phần còn thiếu (${money(remain)}) cho ${weeks} tuần còn lại, bám sát hạn chế chi tiêu bạn khai báo.`,
      };
    },
  };
})();
