export default function BookCard({ book, isFavorite, onToggleFavorite }) {
  return (
    <li className="book-card">
      <h3>{book.ten}</h3>
      <p>Tác giả: {book.tacGia}</p>
      <p>Thể loại: {book.theLoai}</p>
      <p>Năm: {book.nam}</p>
      <button
        type="button"
        className={`btn-fav ${isFavorite ? "active" : ""}`}
        onClick={() => onToggleFavorite(book.id)}
      >
        {isFavorite ? "❤️ Yêu thích" : "🤍 Yêu thích"}
      </button>
    </li>
  );
}
