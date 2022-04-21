import styles from './typography-styles.scss';

/**
 * Typography component.
 */
class Typography extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  /**
   * Render the contents
   */
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

export default Typography;
