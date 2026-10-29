// Đặt USE_MOCKAPI = true để dùng mockapi.io thay vì file local
const USE_MOCKAPI = false;
const BASE_URL = "https://65f0a8e6dae5c33d3a1c9a56.mockapi.io/api/books"; // thay URL của bạn

export async function fetchBooks() {
  const url = USE_MOCKAPI ? BASE_URL : "./books.json";

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Không tải được dữ liệu (HTTP ${res.status})`);
  return res.json();
}

export async function createBook(book) {
  if (!USE_MOCKAPI) {
    // Fallback khi dùng file tĩnh: giả lập id mới
    return { ...book, id: String(Date.now()) };
  }
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Không thêm được sách");
  return res.json();
}

export async function removeBook(id) {
  if (!USE_MOCKAPI) return true;
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Không xóa được sách");
  return true;
}
