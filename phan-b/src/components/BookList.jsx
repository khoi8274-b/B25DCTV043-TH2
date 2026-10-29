import BookCard from "./BookCard.jsx";

export default function BookList({ books, favorites, onToggleFavorite }) {
  if (books.length === 0) {
    return <p className="empty">Không có sách phù hợp</p>;
  }
  return (
    <ul className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isFavorite={favorites.includes(book.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </ul>
  );
}
