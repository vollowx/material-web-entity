// Url
/**
 * Get full url href
 * @returns {String}
 */
function getUrlHref() {
  return window.location.href;
}
/**
 * Get url host
 * @returns {String}
 */
function getUrlHost() {
  return window.location.host;
}
/**
 * Get url hash (the part after #)
 * @returns {String}
 */
function getUrlHash() {
  return window.location.hash;
}
/**
 * Get url hash (the part after ?)
 * @returns {String}
 */
function getUrlSearch() {
  return window.location.search;
}
/**
 * Get url value (the specified part after ?)
 * @param {String} url
 * @returns {String}
 */
function getUrlValue(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = getUrlSearch().substring(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}
// Theme
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

export { getUrlHref, getUrlHost, getUrlHash, getUrlSearch, getUrlValue };
export { toggleTheme };
