/* layout.js — dựng sidebar và thanh trên cùng cho các trang bên trong.
   Mỗi trang khai báo vai trò + tên trang ngay trên thẻ body:
   <body data-role="user" data-page="user-finance-dashboard" data-title="Tài chính của tôi"> */
(function () {
  /* Menu theo từng vai trò */
  const NAV = {
    user: [
      { icon: "📊", label: "Tài chính", file: "user-finance-dashboard.html" },
      { icon: "🧾", label: "Giao dịch", file: "user-transaction-management.html" },
      { icon: "🎯", label: "Mục tiêu", file: "user-saving-goals.html" },
      { icon: "💰", label: "Ngân sách", file: "user-budgets.html" },
    ],
    coach: [
      { icon: "👥", label: "Học viên", file: "coach-client-list.html" },
      { icon: "📋", label: "Duyệt ngân sách", file: "coach-budget-review.html" },
      { icon: "📚", label: "Tài nguyên", file: "coach-resource-management.html" },
    ],
    moderator: [
      { icon: "🔍", label: "Duyệt tài nguyên", file: "moderator-resource-review.html" },
      { icon: "🤖", label: "Mẫu AI", file: "moderator-ai-template-management.html" },
      { icon: "💬", label: "Phản hồi", file: "moderator-feedback-center.html" },
    ],
    admin: [
      { icon: "🗂️", label: "Danh mục chi", file: "admin-expense-category-management.html" },
      { icon: "👤", label: "Người dùng", file: "admin-user-management.html" },
      { icon: "🖥️", label: "Hệ thống", file: "admin-system-dashboard.html" },
    ],
  };

  const ROLE_LABEL = {
    user: "Người dùng",
    coach: "Huấn luyện viên",
    moderator: "Kiểm duyệt viên",
    admin: "Quản trị viên",
  };

  const ROLE_CLASS = {
    user: "role-user",
    coach: "role-coach",
    moderator: "role-mod",
    admin: "role-admin",
  };

  /* ---------- Sidebar ---------- */
  function buildSidebar(role, currentPage) {
    const items = (NAV[role] || []).map((item) => `
      <a class="nav-item ${item.file === currentPage ? "active" : ""}" href="${item.file}"
         ${item.file === currentPage ? 'aria-current="page"' : ""}>
        <span class="nav-ico" aria-hidden="true">${item.icon}</span>
        <span>${item.label}</span>
      </a>`).join("");

    SW.$("#sidebar").innerHTML = `
      <div class="brand"><span class="brand-ico" aria-hidden="true">💰</span> SpendWise</div>
      <div class="role-chip ${ROLE_CLASS[role] || ""}">${ROLE_LABEL[role] || role}</div>
      <nav class="nav" aria-label="Menu chính">${items}</nav>
      <div class="sidebar-foot">
        <a class="nav-item" href="../index.html"><span class="nav-ico" aria-hidden="true">🏠</span><span>Trang chủ</span></a>
        <a class="nav-item" href="#" id="navLogout"><span class="nav-ico" aria-hidden="true">🚪</span><span>Đăng xuất</span></a>
      </div>`;

    SW.$("#navLogout").addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.removeItem("spendwise.user");
      SW.toast("Đã đăng xuất (mô phỏng).", "info");
      setTimeout(() => (location.href = "login.html"), 500);
    });
  }

  /* ---------- Thanh trên cùng ---------- */
  function buildTopbar(main, role, title) {
    const loggedIn = SW.currentUser();
    const demoUser = (window.MOCK.users || []).find((u) => u.role === role);
    const displayName = loggedIn && loggedIn.role === role
      ? loggedIn.name
      : (demoUser ? demoUser.name : ROLE_LABEL[role]);

    const bar = document.createElement("header");
    bar.className = "topbar";
    bar.innerHTML = `
      <div>
        <h1 class="page-title">${SW.escapeHtml(title)}</h1>
        <p class="page-sub">${ROLE_LABEL[role] || ""} · SpendWise</p>
      </div>
      <div class="topbar-actions">
        <button type="button" class="btn ghost sm theme-toggle" data-theme-toggle title="Đổi giao diện sáng/tối">🌙 Tối</button>
        <button type="button" class="btn ghost sm" id="failBtn" title="Bật/tắt mô phỏng lỗi API để xem trạng thái lỗi">⚠️ Mô phỏng lỗi</button>
        <button type="button" class="btn ghost sm" id="resetBtn" title="Xoá dữ liệu LocalStorage và nạp lại dữ liệu mẫu">♻️ Reset dữ liệu</button>
        <a class="user-chip" href="#" title="Hồ sơ cá nhân">👤 <span>${SW.escapeHtml(displayName)}</span></a>
      </div>`;
    main.insertBefore(bar, main.firstChild);
    if (window.SWTheme) window.SWTheme.sync();

    SW.$("#failBtn").addEventListener("click", () => {
      const on = window.API.toggleFail();
      SW.toast(on ? "Đã BẬT mô phỏng lỗi — mọi API/AI sẽ trả lỗi." : "Đã TẮT mô phỏng lỗi.", on ? "error" : "success");
      if (on) SW.toast("Tải lại trang để thấy trạng thái lỗi.", "info");
    });

    SW.$("#resetBtn").addEventListener("click", () => {
      window.API.resetDemo();
      SW.toast("Đã reset dữ liệu mẫu.", "success");
      setTimeout(() => location.reload(), 600);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const role = body.dataset.role || "user";
    const currentPage = body.dataset.page || "";
    const title = body.dataset.title || "SpendWise";
    const sidebar = SW.$("#sidebar");
    const main = SW.$("#main");
    if (!sidebar || !main) return; // trang đăng nhập / 403 / 404 không có khung này

    buildSidebar(role, currentPage);
    buildTopbar(main, role, title);
  });
})();
