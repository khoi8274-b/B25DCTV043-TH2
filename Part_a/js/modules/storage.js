const FAV_KEY = "library-favorites";
const THEME_KEY = "library-theme";

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
  } catch {
    return [];
  }
}
export function saveFavorites(ids) {
  localStorage.setItem(FAV_KEY, JSON.stringify(ids));
}
export function getTheme() {
  return localStorage.getItem(THEME_KEY) || "light";
}
export function saveTheme(t) {
  localStorage.setItem(THEME_KEY, t);
}
