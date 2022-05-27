/**
 * Code demo component.
 */
class CodeDemo extends HTMLElement {
  static tagName = 'code-demo';

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
  }

  render() {
    return `
      <style>
        :host {
          padding: 24px 48px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          border: 1px solid rgba(var(--md-sys-color-outline), 0.24);
          border-radius: 16px;
        }
      </style>
      <slot></slot>`;
  }
}

if (!customElements.get(CodeDemo.tagName)) {
  customElements.define(CodeDemo.tagName, CodeDemo);
}
export default CodeDemo;
