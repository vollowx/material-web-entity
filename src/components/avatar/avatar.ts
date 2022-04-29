import styles from './avatar-styles.scss';
import { html, render } from 'lit';

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
  imgE: HTMLImageElement;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  protected render(): void {
    render(
      html`
        <style>${styles}</style>
        <slot>
          <img src="${this.url}" class="md3-avatar" id="md3-avatar"></img>
        </slot>`,
      this.shadowRoot
    );
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

    this.imgE = this.shadowRoot.getElementById('md3-avatar') as HTMLImageElement;
  }
  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
    if (attrName === 'url' && this.imgE) {
      if (newVal) {
        this.imgE.setAttribute('src', newVal);
      }
    }
  }
}

export default Avatar;
