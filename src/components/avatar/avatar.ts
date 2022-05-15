import M3AvatarStyles from './avatar-styles.scss';

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
  imageNode: HTMLImageElement;

  static get observedAttributes() {
    return ['url'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.imageNode = this.shadowRoot.querySelector('.md-avatar') as HTMLImageElement;
  }
  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
    if (this.imageNode) {
      if (attrName === 'url' && newVal) {
        this.imageNode.setAttribute('src', newVal);
      }
    }
  }

  protected render(): string {
    return `
    <style>${M3AvatarStyles}</style>
    <slot><img ${this.url ? 'src=' + this.url : ''} class="md-avatar"/></slot>
    `;
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
