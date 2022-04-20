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
    styles.textContent = /* css */ `
    :host {
      position: relative;
      box-sizing: border-box;
      display: inline-flex;
      -webkit-tap-highlight-color: transparent;
      --md-fab-size: 56px;
      --md-icon-size: 24px;
      --md-fab-border-radius: 16px;
      --md-fab-shadow-enabled: var(--md-e-shadow-3);
      --md-fab-shadow-hovered: var(--md-e-shadow-4);
      --md-fab-shadow-focused: var(--md-e-shadow-3);
      --md-fab-shadow-pressed: var(--md-e-shadow-3);
    }
    :host([lower]) {
      --md-fab-shadow-enabled: var(--md-e-shadow-1);
      --md-fab-shadow-hovered: var(--md-e-shadow-2);
      --md-fab-shadow-focused: var(--md-e-shadow-1);
      --md-fab-shadow-pressed: var(--md-e-shadow-1);
    }
    :host([lowest]) {
      --md-fab-shadow-enabled: var(--md-e-shadow-0);
      --md-fab-shadow-hovered: var(--md-e-shadow-1);
      --md-fab-shadow-focused: var(--md-e-shadow-0);
      --md-fab-shadow-pressed: var(--md-e-shadow-0);
    }
    :host([small]) {
      --md-fab-size: 40px;
      --md-fab-border-radius: 12px;
    }
    :host([large]) {
      --md-fab-size: 96px;
      --md-icon-size: 36px;
      --md-fab-border-radius: 28px;
    }
    .md3-fab {
      padding: 0 calc((var(--md-fab-size) - var(--md-icon-size)) / 2);
      position: relative;
      box-sizing: border-box;
      height: var(--md-fab-size, 56px);
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--md-t-font-family);
      color: rgb(var(--md-c-on-primary-container-rgb));
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      font-size: 0.875rem;
      font-weight: calc(var(--md-t-font-base-weight) + 500);
      line-height: 1.428571428571429;
      letter-spacing: 0.1px;
      text-decoration: none;
      background-color: rgb(var(--md-c-primary-container-rgb));
      box-shadow: var(--md-fab-shadow-enabled);
      border: 0;
      border-radius: var(--md-fab-border-radius, 16px);
      outline: 0;
      -webkit-user-select: none;
      user-select: none;
      cursor: pointer;
      vertical-align: middle;
      overflow: visible;
      transition: 240ms cubic-bezier(0.4, 0, 0.2, 1);
      appearance: none;
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
      .md3-fab:hover {
        box-shadow: var(--md-fab-shadow-hovered);
      }
      .md3-fab:hover::before {
        opacity: 0.08;
      }
    }
    :host(.focus-visible) .md3-fab {
      box-shadow: var(--md-fab-shadow-focused);
    }
    :host(.focus-visible) .md3-fab::before {
      opacity: 0.12;
    }
    .md3-fab:active {
      box-shadow: var(--md-fab-shadow-pressed);
    }
    .md3-fab:disabled md3-ripple,
    .md3-fab:disabled::before {
      display: none;
    }
    :host([surface]) .md3-fab {
      color: rgb(var(--md-c-primary-rgb));
      background-color: rgb(var(--md-c-surface-rgb));
    }
    :host([secondary]) .md3-fab {
      color: rgb(var(--md-c-on-secondary-container-rgb));
      background-color: rgb(var(--md-c-secondary-container-rgb));
    }
    :host([tertiary]) .md3-fab {
      color: rgb(var(--md-c-on-tertiary-container-rgb));
      background-color: rgb(var(--md-c-tertiary-container-rgb));
    }
    `;

    let template = document.createElement('template');
    template.innerHTML = /* html */ `
    <button class="md3-fab" ${this.disabled ? 'disabled' : ''}>
      <md-ripple></md-ripple>
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
