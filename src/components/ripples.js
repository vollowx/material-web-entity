/**
 * Ripple component.
 *
 * Button, Card and Menu are all request define this component as 'md-ripple'
 */

class Ripple extends HTMLElement {
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

    let template = document.createElement('template');
    template.innerHTML = `
    <div class="md-ripple__container" id="md-ripple__container"></div>
    `;

    this.shadowRoot.appendChild(styles);
    this.shadowRoot.innerHTML += template.innerHTML;
  }

  addHoverLayer() {
    this.containerE.classList.add('md-ripple--hover');
  }
  addFocusLayer() {
    this.containerE.classList.add('md-ripple--focus');
  }
  removeHoverLayer() {
    this.containerE.classList.remove('md-ripple--hover');
  }
  removeFocusLayer() {
    this.containerE.classList.remove('md-ripple--focus');
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
    this.render();

    this.parentE = this.parentNode.host || this.parentNode;
    this.containerE = this.shadowRoot.getElementById('md-ripple__container');

    this.parentE.addEventListener('mouseover', () => this.addHoverLayer());
    this.parentE.addEventListener('mouseleave', () => this.removeHoverLayer());
    this.parentE.addEventListener('focus', () => this.addFocusLayer());
    this.parentE.addEventListener('blur', () => this.removeFocusLayer());
  }
  attributeChangedCallback(attrName, oldVal, newVal) {}
  adoptedCallback() {}
  disconnectedCallback() {}
}

export default Ripple;
