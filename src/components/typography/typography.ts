import styles from './typography-styles.scss';

/**
 * Typography component.
 */
class Typography extends HTMLElement {
  static tagName: string = 'md-typo';

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  render() {
    this.shadowRoot.innerHTML += /* html */ `
    <style>${styles}</style>
    <slot></slot>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

if (!customElements.get(Typography.tagName)) {
  customElements.define(Typography.tagName, Typography);
}
export default Typography;
