import M3TypoStyles from './typography-styles.scss';

const sheet = new CSSStyleSheet();
sheet.replaceSync(M3TypoStyles);

/**
 * Typography component.
 */
class M3Typography extends HTMLElement {
  static tagName: string = 'md-typo';

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  protected render() {
    return `<slot></slot>`;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }
}

if (!customElements.get(M3Typography.tagName)) {
  customElements.define(M3Typography.tagName, M3Typography);
}
export default M3Typography;
