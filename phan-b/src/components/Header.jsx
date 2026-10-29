export default function Header({ favCount }) {
  return (
    <header className="header">
      <h1>📚 Thư viện lớp</h1>
      <p className="fav-count">❤️ {favCount} yêu thích</p>
    </header>
  );
}