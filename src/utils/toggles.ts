/**
 * Toggle the theme
 */
function toggleTheme() {
  if (document.body.classList.contains('light-theme')) {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  }
}
/**
 * Toggle one's attribute
 */
function toggleAttr(element: HTMLElement, attribute: string) {
  if (element.getAttribute(attribute) != null) {
    element.removeAttribute(attribute);
  } else {
    element.setAttribute(attribute, '');
  }
}

export { toggleTheme, toggleAttr };
