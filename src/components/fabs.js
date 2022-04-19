/**
 * FAB (Floating action button) component.
 *
 * Request also defined Ripple component as 'md3-ripple' (./ripples.js)
 */

class FAB extends HTMLElement {
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
      display: inline-flex;
    }
    .md3-fab {
      padding: 0 24px;
      position: relative;
      box-sizing: border-box;
      height: 40px;
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--md3-t-font-family);
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      --md3-icon-size: 1rem;
      font-size: 0.875rem;
      font-weight: calc(var(--md3-t-font-base-weight) + 500);
      line-height: 1.428571428571429;
      letter-spacing: 0.1px;
      text-decoration: none;
      border: 0;
      border-radius: 20px;
      outline: 0;
      -webkit-user-select: none;
      user-select: none;
      cursor: pointer;
      vertical-align: middle;
      overflow: visible;
      transition: 240ms cubic-bezier(0.4, 0, 0.2, 1);
      -webkit-tap-highlight-color: transparent;
      -webkit-appearance: none;
      -moz-appearance: none;
    }
    .md3-fab * {
      pointer-events: none;
    }
    .md3-fab::before {
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
    @media screen and (min-width: 1240px) {
      .md3-fab:hover::before {
        opacity: 0.08;
      }
    }
    :host(.focus-visible) .md3-fab::before {
      opacity: 0.12;
    }
    .md3-fab:disabled md3-ripple,
    .md3-fab:disabled::before {
      display: none;
    }
    `;

    let template = document.createElement('template');
    template.innerHTML = `
    <button class="md3-fab" ${this.disabled ? 'disabled' : ''}>
      <md3-ripple></md3-ripple>
      <span class="md3-fab__label">${this.label ? this.label : ''}</span>
      <slot></slot>
    </button>
    `;

    this.shadowRoot.appendChild(styles);
    this.shadowRoot.innerHTML += template.innerHTML;
  }

  get label() {
    return this.getAttribute('label');
  }
  get disabled() {
    return this.getAttribute('disabled') != undefined;
  }
  /**
   * @param {Boolean} value
   */
  set label(value) {
    this.setAttribute('label', value);
  }
  /**
   * @param {Boolean} value
   */
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  static get observedAttributes() {
    return ['label', 'disabled', 'loading'];
  }
  connectedCallback() {
    this.render();

    this.fabE = this.shadowRoot.querySelector('.md3-fab');
    this.labelE = this.shadowRoot.querySelector('.md3-fab__label');
    this.slotE = this.shadowRoot.querySelector('slot');
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'label' && this.fabE) {
      if (newVal) {
        this.shadowRoot.querySelector('.md3-fab__label').textContent = newVal;
      }
    }
    if (attrName === 'disabled' && this.fabE) {
      this.fabE.disabled = this.disabled;
    }
  }
  adoptedCallback() {}
  disconnectedCallback() {}
}

export default FAB;
