import { fetchBooks, removeBook } from "./modules/api.js";
import { getFavorites, saveFavorites } from "./modules/storage.js";
import { state } from "./modules/state.js";
import { getFilteredBooks } from "./modules/filters.js";
import {
  renderBooks,
  renderStatus,
  renderFavCount,
  renderGenres,
} from "./modules/render.js";
import { initForm } from "./modules/form.js";
import { initTheme } from "./modules/theme.js";

const grid = document.getElementById("book-grid");
const searchInput = document.getElementById("search");
const genreSelect = document.getElementById("genre-filter");
const formGenre = document.getElementById("theLoai");

function update() {
  const filtered = getFilteredBooks();
  renderBooks(filtered);
  renderStatus(filtered.length, state.books.length);
  renderFavCount();
}

async function init() {
  state.loading = true;
  state.favorites = new Set(getFavorites().map(String));
  update();

  try {
    state.books = await fetchBooks();
    state.loading = false;
    renderGenres(genreSelect, formGenre);
  } catch (err) {
    state.loading = false;
    state.error = err.message;
  }
  update();
}

// Tìm kiếm ngay khi gõ
searchInput.addEventListener("input", () => {
  state.keyword = searchInput.value;
  update();
});

// Lọc theo thể loại
genreSelect.addEventListener("change", () => {
  state.genre = genreSelect.value;
  update();
});

// Event delegation cho nút Yêu thích và Xóa
grid.addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const li = btn.closest(".book-card");
  const id = li.dataset.id;
  const action = btn.dataset.action;

  if (action === "fav") {
    if (state.favorites.has(id)) state.favorites.delete(id);
    else state.favorites.add(id);
    saveFavorites([...state.favorites]);
    update();
  } else if (action === "delete") {
    if (!confirm("Bạn có chắc chắn muốn xóa cuốn sách này?")) return;
    try {
      await removeBook(id); // DELETE nếu dùng mockapi
      state.books = state.books.filter((b) => String(b.id) !== id);
      state.favorites.delete(id);
      saveFavorites([...state.favorites]);
      update();
    } catch (err) {
      alert("Lỗi xóa: " + err.message);
    }
  }
});

initForm(update);
init();
initTheme();
