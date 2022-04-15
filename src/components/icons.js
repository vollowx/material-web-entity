/**
 * Icon component.
 *
 * Description.
 */

 class Icon extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  /**
   * Render the contents
   */
  render() {
    let styles = document.createElement('style');
    styles.textContent = `
    :host {
      position: relative;
      box-sizing: border-box;
      display: inline-block;
      font-family: "Material Icons";
      font-weight: normal;
      font-style: normal;
      font-size: var(--md-icon-size, inherit);
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      font-feature-settings: 'liga';
    }
    `;

    let template = document.createElement('template');
    template.innerHTML = `
    <slot></slot>
    `;

    this.shadowRoot.appendChild(styles);
    this.shadowRoot.innerHTML += template.innerHTML;
  }

  static get observedAttributes() {
    return [];
  }
  connectedCallback() {
    this.render();

    // this.sthE = this.shadowRoot.getElementById('sth');
  }
  attributeChangedCallback(attrName, oldVal, newVal) {}
  adoptedCallback() {}
  disconnectedCallback() {}
}

export default Icon;
