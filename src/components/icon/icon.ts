import M3IconStyles from './icon-styles.scss';

/**
 * Icon component.
 */
class M3Icon extends HTMLElement {
  static tagName: string = 'md-icon';
  iconNode: HTMLImageElement;

  static get observedAttributes() {
    return ['url'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.iconNode = this.shadowRoot.getElementById('md-icon__img') as HTMLImageElement;
  }
  attributeChangedCallback(attrName: string, oldVal: string, newVal: any) {
    if (attrName === 'url' && this.iconNode) {
      if (newVal) {
        this.iconNode.setAttribute('src', newVal);
      } else {
        this.iconNode.removeAttribute('src');
      }
    }
  }

  protected render(): string {
    return `
    <style>${M3IconStyles}</style>
    <span class="md-icon">
      <slot><img ${this.url ? 'src=' + this.url : ''} class="md-icon__img" id="md-icon__img" /></slot>
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
