import styles from './avatar-styles.scss';

/**
 * Avatar component.
 *
 * Description.
 */
class Avatar extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  /**
   * Render the contents
   */
  render() {
    this.shadowRoot.innerHTML = /* html */ `
    <style>${styles}</style>
    <slot>
      <img src="${this.url}" class="md3-avatar" id="md3-avatar"></img>
    </slot>
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

    this.imgE = this.shadowRoot.getElementById('md3-avatar');
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'url' && this.imgE) {
      if (newVal) {
        this.imgE.setAttribute('src', newVal);
      }
    }
  }
}

export default Avatar;
