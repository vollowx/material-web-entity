import M3AvatarStyles from './avatar-styles.scss';

const sheet = new CSSStyleSheet();
sheet.replaceSync(M3AvatarStyles);

/**
 * Avatar component.
 *
 * Template
 * ```html
 * <md-avatar>A</md-avatar>
 * <!-- or -->
 * <md-avatar url="theImageUrl"></md-avatar>
 * ```
 */
class M3Avatar extends HTMLElement {
  static tagName: string = 'md-avatar';
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

    this.imageElement = this.shadowRoot.querySelector('.md-avatar') as HTMLImageElement;
  }
  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
    if (this.imageElement) {
      if (attrName === 'url' && newVal) {
        this.imageElement.setAttribute('src', newVal);
      }
    }
  }

  protected render(): string {
    return `<slot><img ${this.url ? 'src=' + this.url : ''} class="md-avatar"/></slot>`;
  }

  get url() {
    return this.getAttribute('url');
  }
  set url(value) {
    this.setAttribute('url', value);
  }
}

if (!customElements.get(M3Avatar.tagName)) {
  customElements.define(M3Avatar.tagName, M3Avatar);
}
export default M3Avatar;
