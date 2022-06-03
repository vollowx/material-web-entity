export function getUrlHref(): string {
  return window.location.href;
}
export function getUrlHost(): string {
  return window.location.host;
}
/**
 * the part after #
 */
export function getUrlHash(): string {
  return window.location.hash;
}
/**
 * the part after ?
 */
export function getUrlSearch(): string {
  return window.location.search;
}
/**
 * the specified part after ?
 */
export function getUrlValue(name: string): string {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = getUrlSearch().substring(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}
/**
 * the specified part after #
 */
export function getUrlHashValue(name: string): string {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = getUrlHash().substring(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}
