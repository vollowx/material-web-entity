/**
 * Button, Card and Menu are all request define this component as 'md-ripple'
 */

class Ripple extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  /**
   * Render the contents and define the contents (container, parent)
   */
  renderAndDefine() {
    let styles = document.createElement('style');
    styles.textContent = `
    :host {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      box-sizing: border-box;
      display: inline-flex;
      border-radius: inherit;
      pointer-events: none;
    }
    .md-ripple__container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      pointer-events: none;
    }
    .md-ripple__container::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: currentColor;
      border-radius: inherit;
      opacity: 0;
      transition: opacity 240ms cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    }
    .md-ripple--hover::before {
      opacity: 0.08;
    }
    .md-ripple--focus::before {
      opacity: 0.12;
    }
    `;

    let container = document.createElement('div');
    container.classList.add('md-ripple__container');

    this.shadowRoot.appendChild(styles);
    this.shadowRoot.appendChild(container);

    this.containerE = container;
    this.parentE = this.parentNode.host || this.parentNode;

    this.parentE.addEventListener('mouseover', () => {
      this.containerE.classList.add('md-ripple--hover');
    });
    this.parentE.addEventListener('mouseleave', () => {
      this.containerE.classList.remove('md-ripple--hover');
    });
    this.parentE.addEventListener('focus', () => {
      this.containerE.classList.add('md-ripple--focus');
    });
    this.parentE.addEventListener('blur', () => {
      this.containerE.classList.remove('md-ripple--focus');
    });
  }

  get disabled() {
    return this.getAttribute('disabled') != undefined;
  }
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  static get observedAttributes() {
    return [];
  }
  connectedCallback() {
    this.renderAndDefine();
  }
  attributeChangedCallback(attrName, oldVal, newVal) {}
  adoptedCallback() {}
  disconnectedCallback() {}
}

export default Ripple;
