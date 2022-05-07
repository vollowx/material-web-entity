import styles from './avatar-styles.scss';

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
class Avatar extends HTMLElement {
  static tagName: string = 'md-avatar';
  
  imgE: HTMLImageElement;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  protected render(): void {
    this.shadowRoot.innerHTML = `
    <style>${styles}</style>
    <slot><img ${this.url ? 'src=' + this.url : ''} class="md-avatar" id="md-avatar" /></slot>
    `;
  }

  get url() {
    return this.getAttribute('url');
  }
  set url(value) {
    this.setAttribute('url', value);
  }

  static get observedAttributes() {
    return ['url'];
  }
  connectedCallback() {
    this.render();

    this.imgE = this.shadowRoot.getElementById('md-avatar') as HTMLImageElement;
  }
  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
    if (attrName === 'url' && this.imgE) {
      if (newVal) {
        this.imgE.setAttribute('src', newVal);
      }
    }
  }
}

if (!customElements.get(Avatar.tagName)) {
  customElements.define(Avatar.tagName, Avatar);
}
export default Avatar;
