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
    let styles = document.createElement('style');
    styles.textContent = `
    :host {
      position: relative;
      box-sizing: border-box;
      display: inline-block;
      width: var(--md3-icon-size, 1rem);
      height: var(--md3-icon-size, 1rem);
    }
    slot {
      font-family: "Material Icons";
      font-weight: normal;
      font-style: normal;
      font-size: var(--md3-icon-size, inherit);
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      font-feature-settings: 'liga';
    }
    .md3-icon,
    .md3-icon__img {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }
    `;

    let template = document.createElement('template');
    template.innerHTML = `
    <span class="md3-icon">
      <slot>
        <img src="${this.url}" class="md3-icon__img" id="md3-icon__img"></img>
      </slot>
    </span>
    `;

    this.shadowRoot.appendChild(styles);
    this.shadowRoot.innerHTML += template.innerHTML;
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
