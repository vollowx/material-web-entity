import styles from './icon-styles.scss';

/**
 * Icon component.
 *
 * Button and Chip are both request define this component as 'md3-icon'
 */
class Icon extends HTMLElement {
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
    <span class="md3-icon">
      <slot>
        <img src="${this.url}" class="md3-icon__img" id="md3-icon__img"></img>
      </slot>
    </span>
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

    this.imgE = this.shadowRoot.getElementById('md3-icon__img');
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'url' && this.imgE) {
      if (newVal) {
        this.imgE.setAttribute('src', newVal);
      }
    }
  }
}

export default Icon;
