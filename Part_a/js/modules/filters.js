import { state } from "./state.js";

export function getFilteredBooks() {
  const kw = state.keyword.trim().toLowerCase();
  return state.books.filter((b) => {
    const matchKw = !kw || b.ten.toLowerCase().includes(kw);
    const matchGenre = state.genre === "all" || b.theLoai === state.genre;
    return matchKw && matchGenre;
  });
}

export function getGenres() {
  // Set tự loại trùng thể loại, sắp xếp alphabet
  return [...new Set(state.books.map((b) => b.theLoai))].sort();
}
