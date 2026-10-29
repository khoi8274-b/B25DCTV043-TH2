import { getTheme, saveTheme } from "./storage.js";

export function initTheme() {
  const btn = document.getElementById("theme-toggle");
  const apply = (theme) => {
    document.body.classList.toggle("dark", theme === "dark");
    btn.textContent = theme === "dark" ? "☀️" : "🌙";
  };
  apply(getTheme());

  btn.addEventListener("click", () => {
    const next = document.body.classList.contains("dark") ? "light" : "dark";
    saveTheme(next);
    apply(next);
  });
}
