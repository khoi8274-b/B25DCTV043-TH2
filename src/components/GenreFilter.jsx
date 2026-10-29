export default function GenreFilter({ genres, value, onChange }) {
  return (
    <div className="genre-filter">
      <button
        type="button"
        className={value === "all" ? "active" : ""}
        onClick={() => onChange("all")}
      >
        Tất cả
      </button>
      {genres.map((g) => (
        <button
          key={g}
          type="button"
          className={value === g ? "active" : ""}
          onClick={() => onChange(g)}
        >
          {g}
        </button>
      ))}
    </div>
  );
}
