import { state } from "./state.js";

export function renderStatus(visible, total) {
  const el = document.getElementById("status");
  if (state.loading) return (el.textContent = "Đang tải...");
  if (state.error) return (el.textContent = "Lỗi: " + state.error);
  el.textContent = `Đang hiển thị ${visible} / ${total} cuốn`;
}

export function renderFavCount() {
  document.getElementById("fav-count").textContent = state.favorites.size;
}

export function renderGenres(toolbarSelect, formSelect) {
  // Xóa option cũ (giữ option mặc định)
  toolbarSelect
    .querySelectorAll('option:not([value="all"])')
    .forEach((o) => o.remove());
  formSelect
    .querySelectorAll('option:not([value=""])')
    .forEach((o) => o.remove());

  [...new Set(state.books.map((b) => b.theLoai))].sort().forEach((g) => {
    const o1 = document.createElement("option");
    o1.value = g;
    o1.textContent = g;
    toolbarSelect.appendChild(o1);

    const o2 = document.createElement("option");
    o2.value = g;
    o2.textContent = g;
    formSelect.appendChild(o2);
  });
}

export function renderBooks(books) {
  const grid = document.getElementById("book-grid");
  grid.innerHTML = "";

  if (state.loading || state.error) return;
  if (books.length === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "Không có sách phù hợp";
    grid.appendChild(li);
    return;
  }

  books.forEach((book) => {
    const li = document.createElement("li");
    li.className = "book-card";
    li.dataset.id = String(book.id);

    const h3 = document.createElement("h3");
    h3.textContent = book.ten;

    const pAuthor = document.createElement("p");
    pAuthor.textContent = `Tác giả: ${book.tacGia}`;

    const pGenre = document.createElement("p");
    pGenre.textContent = `Thể loại: ${book.theLoai}`;

    const pYear = document.createElement("p");
    pYear.textContent = `Năm: ${book.nam}`;

    const actions = document.createElement("div");
    actions.className = "actions";

    const favBtn = document.createElement("button");
    favBtn.type = "button";
    favBtn.dataset.action = "fav";
    favBtn.className = "btn-fav";
    favBtn.textContent = state.favorites.has(String(book.id))
      ? "❤️ Yêu thích"
      : "🤍 Yêu thích";

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.dataset.action = "delete";
    delBtn.className = "btn-del";
    delBtn.textContent = "🗑 Xóa";

    actions.append(favBtn, delBtn);
    li.append(h3, pAuthor, pGenre, pYear, actions);
    grid.appendChild(li);
  });
}
