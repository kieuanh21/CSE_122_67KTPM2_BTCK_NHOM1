/* api.js — "máy chủ giả": đọc/ghi dữ liệu mẫu trong localStorage.
   - Mỗi thao tác chờ 0,4–0,9 giây để trang kịp hiện trạng thái "Đang tải".
   - Bật nút "Mô phỏng lỗi" trên thanh trên cùng thì mọi thao tác sẽ báo lỗi.
   - Mọi hàm trả về Promise, nên nơi gọi phải dùng await. */
(function () {
  const DB_KEY = "spendwise.db.v1";
  const FAIL_KEY = "spendwise.fail"; // "1" = đang giả lập lỗi (trong sessionStorage)

  function readDB() {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw);
    const db = structuredClone(window.MOCK); // bản sao để không sửa dữ liệu gốc
    localStorage.setItem(DB_KEY, JSON.stringify(db));
    return db;
  }

  function saveDB(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /* Mọi thao tác đều đi qua đây: chờ một nhịp rồi mới chạy */
  async function call(work) {
    await wait(400 + Math.random() * 500);
    if (sessionStorage.getItem(FAIL_KEY) === "1") {
      throw new Error("Không kết nối được dữ liệu (mô phỏng lỗi).");
    }
    return work();
  }

  function updateRow(entity, id, patch) {
    const db = readDB();
    const row = db[entity].find((x) => x.id === id);
    if (!row) throw new Error("Không tìm thấy bản ghi " + id);
    Object.assign(row, patch);
    saveDB(db);
    return row;
  }

  window.API = {
    /* Hai nút demo trên thanh trên cùng dùng ba hàm này */
    failOn() {
      return sessionStorage.getItem(FAIL_KEY) === "1";
    },
    toggleFail() {
      const on = !this.failOn();
      sessionStorage.setItem(FAIL_KEY, on ? "1" : "0");
      return on;
    },
    resetDemo() {
      localStorage.removeItem(DB_KEY);
      sessionStorage.removeItem(FAIL_KEY);
    },

    list(entity, filterFn) {
      return call(() => {
        const rows = readDB()[entity] || [];
        return filterFn ? rows.filter(filterFn) : rows;
      });
    },
    get(entity, id) {
      return call(() => readDB()[entity].find((x) => x.id === id) || null);
    },
    create(entity, item) {
      return call(() => {
        const db = readDB();
        item.id = entity[0] + Date.now();
        db[entity].push(item);
        saveDB(db);
        return item;
      });
    },
    update(entity, id, patch) {
      return call(() => updateRow(entity, id, patch));
    },
    /* "Xoá" trong đồ án = lưu trữ, vẫn giữ lịch sử tài chính */
    archive(entity, id) {
      return call(() => updateRow(entity, id, { status: "archived" }));
    },
    restore(entity, id) {
      return call(() => updateRow(entity, id, { status: "active" }));
    },

    /* Tra cứu nhanh để hiển thị tên danh mục / người dùng */
    categoryName(id) {
      const c = readDB().categories.find((x) => x.id === id);
      return c ? { icon: c.icon, name: c.name } : { icon: "📦", name: "—" };
    },
    userName(id) {
      const u = readDB().users.find((x) => x.id === id);
      return u ? { name: u.name } : { name: "—" };
    },
  };
})();
