import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Section from './components/Section.jsx';
import GenreFilter from './components/GenreFilter.jsx';
import BookList from './components/BookList.jsx';
import Footer from './components/Footer.jsx';
import { books } from './data/books.js';

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [genre, setGenre] = useState('all');

  const genres = useMemo(
    () => [...new Set(books.map((b) => b.theLoai))].sort(),
    []
  );

  const filtered = useMemo(
    () => books.filter((b) => genre === 'all' || b.theLoai === genre),
    [genre]
  );

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="app">
      <Header favCount={favorites.length} />
      <main className="container">
        <Section title="Bộ lọc thể loại">
          <GenreFilter genres={genres} value={genre} onChange={setGenre} />
        </Section>

        <Section title={`Danh sách sách (${filtered.length}/${books.length})`}>
          <BookList
            books={filtered}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </Section>
      </main>
      <Footer />
    </div>
  );
}