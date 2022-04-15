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
    styles.textContent = `
    :host {
      position: relative;
      box-sizing: border-box;
      display: inline-block;
      width: var(--md-avatar-size, 1rem);
      height: var(--md-avatar-size, 1rem);
    }
    :host([small]) {
      width: 0.75rem;
      height: 0.75rem;
    }
    :host([large]) {
      width: 1.5rem;
      height: 1.5rem;
    }
    .md-avatar {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }
    `;

    let template = document.createElement('template');
    template.innerHTML = `
    <slot></slot>
    <img src="${this.url}" class="md-avatar" id="md-avatar"></img>
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

    this.imgE = this.shadowRoot.getElementById('md-avatar');
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'url' && this.imgE) {
      if (newVal) {
        this.imgE.setAttribute('src', newVal);
      }
    }
  }
  adoptedCallback() {}
  disconnectedCallback() {}
}

export default Avatar;
