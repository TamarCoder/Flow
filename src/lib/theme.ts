export type Theme = "light" | "dark";

export function applyTheme(theme: Theme) {
  const html = document.documentElement;
  html.dataset.theme = theme;
  html.classList.remove("light", "dark");
  html.classList.add(theme);
}

// Saved choice first, then the system setting.
export function readSavedTheme(): Theme {
  const saved = localStorage.getItem("theme") as Theme | null;
  return saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

export function saveTheme(theme: Theme) {
  applyTheme(theme);
  localStorage.setItem("theme", theme);
}
