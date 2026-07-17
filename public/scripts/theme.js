// Apply the saved theme before first paint to avoid a flash of the wrong
// theme. Loaded synchronously in <head> on every page.
const storedTheme = localStorage.getItem("theme");
if (storedTheme === "light" || storedTheme === "dark") {
  document.documentElement.dataset.theme = storedTheme;
}
