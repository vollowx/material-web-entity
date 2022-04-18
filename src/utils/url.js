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
 * @param {String} name
 * @returns {String}
 */
function getUrlValue(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = getUrlSearch().substring(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}

export { getUrlHref, getUrlHost, getUrlHash, getUrlSearch, getUrlValue };
