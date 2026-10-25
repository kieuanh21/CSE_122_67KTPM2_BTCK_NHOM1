// Tạo board Trello tự động từ board-data.js.
// Cách dùng:
//   node tao-board.js --dry-run
//   TRELLO_KEY=... TRELLO_TOKEN=... node tao-board.js
// Trên Windows PowerShell:
//   $env:TRELLO_KEY="..."; $env:TRELLO_TOKEN="..."; node tao-board.js

const data = require("./board-data");

const KEY = process.env.TRELLO_KEY;
const TOKEN = process.env.TRELLO_TOKEN;
const DRY = process.argv.includes("--dry-run");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function api(method, path, params = {}) {
  const url = new URL("https://api.trello.com/1" + path);
  url.searchParams.set("key", KEY);
  url.searchParams.set("token", TOKEN);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  }

  const res = await fetch(url, { method });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(method + " " + path + " lỗi " + res.status + ": " + body);
  }
  return res.json();
}

function cardDescription(card) {
  const meta = card.meta || {};
  const lines = [];
  if (card.code) lines.push("Mã: " + card.code);
  if (meta.files) lines.push("Tệp: " + meta.files);
  if (meta.owner) lines.push("Người: " + meta.owner);
  if (meta.deadline) lines.push("Hạn: " + meta.deadline);
  if (meta.branch) lines.push("Nhánh: " + meta.branch);
  if (meta.pr) lines.push("PR/commit: " + meta.pr);
  if (meta.obs) lines.push("OBS: " + meta.obs);
  if (lines.length > 0) lines.push("");
  if (card.desc) lines.push(card.desc);
  return lines.join("\n");
}

function printDryRun() {
  console.log("BOARD: " + data.boardName);
  console.log("NHÃN: " + data.labels.map((l) => l.name).join(", "));
  for (const list of data.lists) {
    const cards = data.cards.filter((c) => c.list === list);
    console.log("\n[" + list + "] " + cards.length + " thẻ");
    for (const card of cards) {
      const check = card.checklist ? " (" + card.checklist.length + " mục checklist)" : "";
      console.log("- " + card.code + " · " + card.name + check);
    }
  }
  console.log("\nTổng: " + data.cards.length + " thẻ. Đây là chế độ xem trước, chưa gọi Trello.");
}

function printDetails() {
  console.log("\n===== CHI TIẾT TỪNG THẺ =====");
  for (const card of data.cards) {
    console.log("\n=== " + card.code + " · " + card.name + " [" + card.list + "] ===");
    console.log(cardDescription(card));
    if (card.checklist && card.checklist.length > 0) {
      console.log("Checklist:");
      for (const item of card.checklist) console.log("- " + item);
    }
  }
}

async function createBoard() {
  if (!KEY || !TOKEN) {
    console.error("Thiếu TRELLO_KEY hoặc TRELLO_TOKEN.");
    console.error("Xem docs/trello/KE-HOACH-TRELLO.md để lấy key/token.");
    console.error("Hoặc chạy: node tao-board.js --dry-run");
    process.exit(1);
  }

  let board = null;
  try {
    board = await api("POST", "/boards/", {
      name: data.boardName,
      defaultLists: "false",
      prefs_permissionLevel: "private"
    });
    console.log("Đã tạo board: " + board.url);

    const labelIds = {};
    for (const label of data.labels) {
      const created = await api("POST", "/labels/", {
        name: label.name,
        color: label.color,
        idBoard: board.id
      });
      labelIds[label.name] = created.id;
      await sleep(200);
    }
    console.log("Đã tạo " + data.labels.length + " nhãn.");

    const listIds = {};
    for (const name of data.lists) {
      const created = await api("POST", "/lists/", {
        name: name,
        idBoard: board.id,
        pos: "bottom"
      });
      listIds[name] = created.id;
      await sleep(200);
    }
    console.log("Đã tạo " + data.lists.length + " cột.");

    for (const card of data.cards) {
      const idLabels = (card.labels || [])
        .map((name) => labelIds[name])
        .filter(Boolean)
        .join(",");

      const created = await api("POST", "/cards/", {
        idList: listIds[card.list],
        name: card.code ? card.code + " · " + card.name : card.name,
        desc: cardDescription(card),
        idLabels: idLabels
      });
      await sleep(200);

      if (card.checklist && card.checklist.length > 0) {
        const checklist = await api("POST", "/checklists/", {
          idCard: created.id,
          name: "Việc cần làm"
        });
        await sleep(200);
        for (const item of card.checklist) {
          await api("POST", "/checklists/" + checklist.id + "/checkItems", { name: item });
          await sleep(200);
        }
      }

      console.log("  + " + card.name);
    }

    console.log("\nXong. Mở board: " + board.url);
    console.log("Tổng: " + data.cards.length + " thẻ, " + data.lists.length + " cột.");
  } catch (error) {
    console.error("\nLỗi: " + error.message);
    if (board) console.error("Board đang tạo dở: " + board.url);
    process.exit(1);
  }
}

if (DRY) {
  printDryRun();
  if (process.argv.includes("--details")) printDetails();
} else {
  createBoard();
}
