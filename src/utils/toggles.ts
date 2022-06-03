/**
 * Toggle the theme
 */
export function toggleTheme(): void {
  if (document.body.classList.contains('light-theme')) {
    turnThemeDark();
  } else if (document.body.classList.contains('dark-theme')) {
    turnThemeLight();
  } else {
    let currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (currentTheme) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.add('dark-theme');
    }
  }
}
/**
 * Turn theme light
 */
export function turnThemeLight(): void {
  document.body.classList.remove('dark-theme');
  document.body.classList.add('light-theme');
}
/**
 * Turn theme dark
 */
export function turnThemeDark(): void {
  document.body.classList.remove('light-theme');
  document.body.classList.add('dark-theme');
}
/**
 * Turn theme auto
 */
export function turnThemeAuto(): void {
  document.body.classList.remove('light-theme', 'dark-theme');
}
