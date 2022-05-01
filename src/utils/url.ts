function getUrlHref(): string {
  return window.location.href;
}
function getUrlHost(): string {
  return window.location.host;
}
/**
 * the part after #
 */
function getUrlHash(): string {
  return window.location.hash;
}
/**
 * the part after ?
 */
function getUrlSearch(): string {
  return window.location.search;
}
/**
 * the specified part after ?
 */
function getUrlValue(name: string): string {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = getUrlSearch().substring(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}

export { getUrlHref, getUrlHost, getUrlHash, getUrlSearch, getUrlValue };
