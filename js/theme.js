/* theme.js — đổi giao diện sáng/tối.
   Nạp trong <head> để đặt theme trước khi trang hiện ra (tránh nháy trắng).
   Lựa chọn được nhớ trong localStorage với khoá "spendwise.theme".
   Mọi nút có thuộc tính data-theme-toggle đều bấm được. */
(function () {
  const KEY = "spendwise.theme";

  function getTheme() {
    return localStorage.getItem(KEY) === "dark" ? "dark" : "light";
  }

  function apply(theme) {
    if (theme === "dark") document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const isDark = theme === "dark";
      button.textContent = isDark ? "☀️ Sáng" : "🌙 Tối";
      button.title = isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối";
      button.setAttribute("aria-pressed", String(isDark));
    });
  }

  function toggle() {
    const next = getTheme() === "dark" ? "light" : "dark";
    localStorage.setItem(KEY, next);
    apply(next);
  }

  window.SWTheme = {
    toggle,
    sync() { apply(getTheme()); },
  };

  apply(getTheme()); // áp ngay khi trang còn đang tải

  /* Bắt sự kiện ở document để nút được layout.js thêm sau vẫn hoạt động */
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-theme-toggle]")) toggle();
  });
  document.addEventListener("DOMContentLoaded", () => apply(getTheme()));
})();
