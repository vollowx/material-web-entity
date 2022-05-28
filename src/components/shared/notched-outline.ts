import NotchedOutlinedStyles from './notched-outline-styles.scss';

/**
 * Notch shared component.
 *
 * Border with a notch
 */
class NotchedOutlined extends HTMLElement {
  static tagName: string = 'md-notched-outline';

  /**
   * LIFE CYCLE
   */
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
  }

  /**
   * RENDERING
   */
  protected render(): string {
    return `
      <style>${NotchedOutlinedStyles}</style>
      <span class="md-notched-outline">
        <span class="md-notched-outline__leading"></span>
        <span class="md-notched-outline__notch">
          <slot></slot>
        </span>
        <span class="md-notched-outline__trailing"></span>
      </span>
    `;
  }
}

if (!customElements.get(NotchedOutlined.tagName)) {
  customElements.define(NotchedOutlined.tagName, NotchedOutlined);
}
export default NotchedOutlined;
