import M3IconStyles from './icon-styles.scss';

const sheet = new CSSStyleSheet();
sheet.replaceSync(M3IconStyles);

/**
 * Icon component.
 */
class M3Icon extends HTMLElement {
  static tagName: string = 'md-icon';
  imageElement: HTMLImageElement;

  static get observedAttributes() {
    return ['url'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
    this.shadowRoot.adoptedStyleSheets = [sheet];

    this.imageElement = this.shadowRoot.querySelector('.md-icon__img') as HTMLImageElement;
  }
  attributeChangedCallback(attrName: string, oldVal: string, newVal: any) {
    if (attrName === 'url' && this.imageElement) {
      if (newVal) {
        this.imageElement.setAttribute('src', newVal);
      } else {
        this.imageElement.removeAttribute('src');
      }
    }
  }

  protected render(): string {
    return `
    <span class="md-icon">
      <slot><img ${this.url ? 'src=' + this.url : ''} class="md-icon__img" /></slot>
    </span>
    `;
  }

  get url() {
    return this.getAttribute('url');
  }
  set url(value) {
    this.setAttribute('url', value);
  }
}

if (!customElements.get(M3Icon.tagName)) {
  customElements.define(M3Icon.tagName, M3Icon);
}
export default M3Icon;
