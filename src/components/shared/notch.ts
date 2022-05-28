/**
 * Notch shared component.
 *
 * Border with a notch
 */
class SharedNotch extends HTMLElement {
  static tagName: string = 'md-notch';
}

if (!customElements.get(SharedNotch.tagName)) {
  customElements.define(SharedNotch.tagName, SharedNotch);
}
export default SharedNotch;
