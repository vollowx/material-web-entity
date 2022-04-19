/**
 * Toggle the theme
 */
function toggleTheme() {
  if (document.body.getAttribute('data-dark') == 'true') {
    document.body.removeAttribute('data-dark');
  } else {
    document.body.setAttribute('data-dark', 'true');
  }
}
/**
 * Toggle one's attribute
 */
function toggleAttr(element, attribute) {
  if (element.getAttribute(attribute) != null) {
    element.removeAttribute(attribute);
  } else {
    element.setAttribute(attribute, '');
  }
}

export { toggleTheme, toggleAttr };
