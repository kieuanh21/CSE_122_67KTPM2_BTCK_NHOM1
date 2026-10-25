/* ui.js — bộ hàm giao diện dùng chung, gắn vào window.SW.
   Trang nào cũng nạp file này (trước layout.js và script riêng của trang).
   Nhóm chức năng: chọn phần tử · định dạng · đăng nhập · khối HTML ·
   kiểm tra form · toast · modal · hộp xác nhận · thao tác API · AI · debounce. */
(function () {
  const SW = {};

  /* ---------- 1. Chọn phần tử ---------- */
  SW.$ = (selector, root) => (root || document).querySelector(selector);
  SW.$$ = (selector, root) => Array.from((root || document).querySelectorAll(selector));

  /* Gắn sự kiện click cho mọi nút khớp selector; handler nhận nút vừa bấm */
  SW.onClick = (selector, handler, root) =>
    SW.$$(selector, root).forEach((button) =>
      button.addEventListener("click", () => handler(button)));

  /* ---------- 2. Định dạng ---------- */
  SW.fmtVND = (n) => new Intl.NumberFormat("vi-VN").format(Math.round(n || 0)) + "₫";

  SW.fmtDate = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  SW.escapeHtml = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));

  /* ---------- 3. Đăng nhập (lưu tạm trong sessionStorage) ---------- */
  SW.currentUser = () => JSON.parse(sessionStorage.getItem("spendwise.user") || "null");

  SW.currentUserId = (role, fallback) => {
    const user = SW.currentUser();
    return user && user.role === role ? user.id : fallback;
  };

  SW.login = (user) => {
    sessionStorage.setItem("spendwise.user",
      JSON.stringify({ id: user.id, name: user.name, role: user.role }));
  };

  /* ---------- 4. Khối HTML dùng lại ---------- */
  SW.empty = (icon, message) =>
    `<div class="empty"><div class="icon">${icon}</div>${message}</div>`;

  /* Chồng khung xương chờ tải: SW.skeleton(3, 44) */
  SW.skeleton = (count, height) =>
    Array.from({ length: count || 1 },
      () => `<div class="skeleton" style="height:${height || 44}px; margin-bottom:8px"></div>`).join("");

  /* Bảng dữ liệu: SW.table("<th>Tên</th><th>Tiền</th>", rows) */
  SW.table = (head, rows) => `
    <div class="table-wrap">
      <table class="data">
        <thead><tr>${head}</tr></thead>
        <tbody>${rows.join("")}</tbody>
      </table>
    </div>`;

  SW.errorBox = (message) => `
    <div class="error-box">
      <div class="icon">⚠️</div>
      <p>${SW.escapeHtml(message)}</p>
      <button class="btn secondary sm" style="margin-top:12px" onclick="location.reload()">Thử lại</button>
    </div>`;

  SW.badge = (text, color) =>
    `<span class="badge ${color}">${SW.escapeHtml(text)}</span>`;

  /* Bảng trạng thái dùng chung cho mọi trang: [nhãn, màu] */
  const STATUS = {
    active: ["Hoạt động", "success"],
    locked: ["Đã khoá", "danger"],
    pending: ["Chờ duyệt", "warning"],
    approved: ["Đã duyệt", "success"],
    changes_requested: ["Cần chỉnh sửa", "warning"],
    rejected: ["Từ chối", "danger"],
    draft: ["Nháp", "muted"],
    published: ["Đã đăng", "success"],
    archived: ["Đã lưu trữ", "muted"],
    disabled: ["Đã tắt", "danger"],
    completed: ["Hoàn thành", "success"],
    cancelled: ["Đã huỷ", "muted"],
    new: ["Mới", "danger"],
    processing: ["Đang xử lý", "warning"],
    resolved: ["Đã xử lý", "success"],
  };

  SW.statusBadge = (status) => {
    const item = STATUS[status] || [status, "muted"];
    return SW.badge(item[0], item[1]);
  };

  /* Khung tải dữ liệu: hiện skeleton → gọi getHTML() → hiện HTML.
     Nếu getHTML() báo lỗi thì hiện khung lỗi có nút "Thử lại".
     Tham số thứ ba (không bắt buộc) là HTML hiện trong lúc chờ. */
  SW.loadInto = async (box, getHTML, skeletonHTML) => {
    box.innerHTML = skeletonHTML || SW.skeleton(1, 120);
    try {
      box.innerHTML = await getHTML();
    } catch (err) {
      box.innerHTML = SW.errorBox(err.message);
    }
  };

  /* Chạy một việc AI: bật khung chờ, tự hiện lỗi và trả về null nếu thất bại.
     Dùng: const res = await SW.runAI("#aiThinking", "#aiFail", () => AI.categorize(name));
     Tham số thứ tư (không bắt buộc) là câu nối thêm khi AI từ chối. */
  SW.runAI = async (thinkingSelector, failSelector, task, failSuffix) => {
    const thinking = SW.$(thinkingSelector);
    const fail = SW.$(failSelector);
    thinking.hidden = false;
    fail.hidden = true;
    try {
      const result = await task();
      thinking.hidden = true;
      if (!result.ok) {
        fail.hidden = false;
        fail.textContent = "⚠️ " + result.reason + (failSuffix || "");
        return null;
      }
      return result;
    } catch (err) {
      thinking.hidden = true;
      fail.hidden = false;
      fail.textContent = "⚠️ " + err.message;
      return null;
    }
  };

  /* ---------- 5. Kiểm tra form ---------- */
  SW.clearErrors = (formSelector) => {
    SW.$$(formSelector + " .field-error").forEach((el) => (el.hidden = true));
    SW.$$(formSelector + " .input").forEach((el) => el.classList.remove("invalid"));
  };

  SW.markInvalid = (inputSelector, errorSelector) => {
    SW.$(inputSelector).classList.add("invalid");
    SW.$(errorSelector).hidden = false;
  };

  /* ---------- 6. Toast thông báo nổi ---------- */
  SW.toast = (message, type) => {
    let box = SW.$("#toastBox");
    if (!box) {
      box = document.createElement("div");
      box.id = "toastBox";
      document.body.appendChild(box);
    }

    const toast = document.createElement("div");
    toast.className = "toast " + (type || "success");
    toast.textContent = message;
    box.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  /* ---------- 7. Modal ---------- */
  SW.openModal = (id) => {
    const modal = SW.$("#" + id);
    if (!modal) return;
    modal.classList.add("open");
    const firstInput = SW.$("input, select, textarea", modal);
    if (firstInput) setTimeout(() => firstInput.focus(), 50);
  };

  SW.closeModal = (id) => {
    const modal = SW.$("#" + id);
    if (modal) modal.classList.remove("open");
  };

  /* Phím Esc: đóng hộp xác nhận trước, rồi mới đóng modal thường */
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (SW.$("#confirmBox")) { SW.$("#cfNo").click(); return; }
    SW.$$(".modal-backdrop.open").forEach((modal) => modal.classList.remove("open"));
  });

  /* Bấm nút [data-close] hoặc bấm nền tối để đóng modal */
  document.addEventListener("click", (e) => {
    if (e.target.id === "confirmBox") return; // hộp xác nhận tự xử lý
    const closeButton = e.target.closest("[data-close]");
    if (closeButton) {
      closeButton.closest(".modal-backdrop").classList.remove("open");
      return;
    }
    if (e.target.classList.contains("modal-backdrop") && e.target.classList.contains("open")) {
      e.target.classList.remove("open");
    }
  });

  /* Tự thêm nút × cho các modal viết sẵn trong HTML */
  document.addEventListener("DOMContentLoaded", () => {
    SW.$$(".modal-backdrop .modal").forEach((modal) => {
      if (modal.querySelector(".modal-x")) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "modal-x";
      button.textContent = "×";
      button.setAttribute("aria-label", "Đóng");
      button.addEventListener("click", () => modal.closest(".modal-backdrop").classList.remove("open"));
      modal.prepend(button);
    });
  });

  /* Hộp xác nhận trả về Promise<true/false> để dùng với await */
  SW.confirmDialog = (title, message) => new Promise((resolve) => {
    const old = SW.$("#confirmBox");
    if (old) old.remove();

    const backdrop = document.createElement("div");
    backdrop.id = "confirmBox";
    backdrop.className = "modal-backdrop open";
    backdrop.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true">
        <h3></h3>
        <p style="margin-top:6px"></p>
        <div class="modal-actions">
          <button class="btn ghost" id="cfNo">Huỷ</button>
          <button class="btn danger" id="cfYes">Xác nhận</button>
        </div>
      </div>`;

    backdrop.querySelector("h3").textContent = title || "Xác nhận";
    backdrop.querySelector("p").textContent = message || "";
    document.body.appendChild(backdrop);

    const close = (answer) => {
      backdrop.remove();
      resolve(answer);
    };
    backdrop.querySelector("#cfNo").onclick = () => close(false);
    backdrop.querySelector("#cfYes").onclick = () => close(true);
  });

  /* Gộp nhiều lần bấm liên tiếp thành một lần chạy (dùng cho ô tìm kiếm) */
  SW.debounce = (fn, ms) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms || 300);
    };
  };

  /* ---------- 8. Thao tác API nhanh ---------- */
  /* Chạy task, báo thành công rồi tải lại danh sách; lỗi thì báo toast đỏ. */
  SW.runAction = async (task, successMessage, reload) => {
    try {
      await task();
      if (successMessage) SW.toast(successMessage, "success");
      if (reload) reload();
      return true;
    } catch (err) {
      SW.toast(err.message, "error");
      return false;
    }
  };

  /* Hỏi xác nhận trước, đồng ý thì mới chạy task */
  SW.confirmAndRun = async (title, note, task, successMessage, reload) => {
    if (!(await SW.confirmDialog(title, note))) return false;
    return SW.runAction(task, successMessage, reload);
  };

  window.SW = SW;
})();
