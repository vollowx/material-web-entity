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
    let styles = document.createElement('style');
    styles.textContent = /* css */ `
    :host {
      position: relative;
      box-sizing: border-box;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: var(--md-avatar-size, 40px);
      height: var(--md-avatar-size, 40px);
      color: rgb(var(--md-c-on-primary-rgb));
      font-size: 1rem;
      font-weight: calc(var(--md-font-weight-base) + 500);
      letter-spacing: 0.1px;
      background-color: var(--md-avatar-bg-color, rgb(var(--md-c-primary-rgb)));
      border-radius: 50%;
      user-select: none;
      overflow: hidden;
    }
    :host([square]) {
      border-radius: 0;
    }
    :host([small]) {
      width: 30px;
      height: 30px;
    }
    :host([large]) {
      width: 60px;
      height: 60px;
    }
    .md3-avatar {
      box-sizing: border-box;
      width: 1rem;
      height: 1rem;
    }
    :host([full-img]) .md3-avatar {
      width: 100%;
      height: 100%;
    }
    `;

    let template = document.createElement('template');
    template.innerHTML = /* html */ `
    <slot>
      <img src="${this.url}" class="md3-avatar" id="md3-avatar"></img>
    </slot>
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
