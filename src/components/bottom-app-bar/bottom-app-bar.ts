import M3BottomAppBarStyles from './bottom-app-bar-styles.scss';

class M3BottomAppBar extends HTMLElement {
  static tagName: string = 'md-bottom-app-bar';

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
  }

  protected render(): string {
    return `
    <style>${M3BottomAppBarStyles}</style>
    <div class="md-bottom-app-bar">
      <slot></slot>
      <div class="md-bottom-app-bar__spacer"></div>
      <slot name="fab"></slot>
    </div>
    `;
  }
}

if (!customElements.get(M3BottomAppBar.tagName)) {
  customElements.define(M3BottomAppBar.tagName, M3BottomAppBar);
}
export default M3BottomAppBar;
