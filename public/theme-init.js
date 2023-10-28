const themeKey = "theme-preference";
let themeToggleButton;
let curTheme;

const getColorPreference = () => {
  const themePreference = localStorage.getItem(themeKey);
  if (typeof themePreference === "string") return themePreference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

curTheme = getColorPreference();

const setPreference = () => {
  localStorage.setItem(themeKey, curTheme);
  reflectPreference();
};

const reflectPreference = () => {
  document.firstElementChild.setAttribute("data-theme", curTheme);
  themeToggleButton?.setAttribute("aria-label", curTheme);
  document
    .querySelector("meta[name='theme-color']")
    .setAttribute(
      "content",
      curTheme === "light" ? "hsl(21 25% 90%)" : "hsl(21 10% 10%)"
    );
};

const onThemeChange = () => {
  curTheme = curTheme === "light" ? "dark" : "light";
  setPreference();
};

reflectPreference();

window.onload = () => {
  curTheme = getColorPreference();
  themeToggleButton = document.getElementById("theme-toggle");
  reflectPreference();
  themeToggleButton?.addEventListener("click", onThemeChange);
};

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    curTheme = isDark ? "dark" : "light";
    setPreference();
  });
