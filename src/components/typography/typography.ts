import M3TypoStyles from './typography-styles.scss';

/**
 * Typography component.
 */
class M3Typography extends HTMLElement {
  static tagName: string = 'md-typo';

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  render() {
    this.shadowRoot.innerHTML += /* html */ `
    <style>${M3TypoStyles}</style>
    <slot></slot>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

if (!customElements.get(M3Typography.tagName)) {
  customElements.define(M3Typography.tagName, M3Typography);
}
export default M3Typography;
