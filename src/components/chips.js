/**
 * Chip component.
 *
 * Request also defined Ripple component as 'md-ripple' (./ripples.js)
 */

 class Chip extends HTMLElement {
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
    .md-chip {
      padding: 0 12px;
      position: relative;
      box-sizing: border-box;
      height: 32px;
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: rgb(var(--md-c-on-primary-rgb));
      font-family: var(--md-t-font-family);
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      --md-icon-size: 1rem;
      font-size: 0.875rem;
      font-weight: calc(var(--md-t-font-base-weight) + 500);
      line-height: 1.428571428571429;
      letter-spacing: 0.1px;
      text-decoration: none;
      color: rgb(var(--md-c-important-color, var(--md-c-on-surface-rgb)));
      background-color: rgb(var(--md-c-surface-rgb));
      border: 1px solid rgb(var(--md-c-outline-rgb));
      border-radius: 8px;
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
    .md-chip::before {
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
      .md-chip:hover::before {
        opacity: 0.08;
      }
    }
    :host(.focus-visible) .md-chip::before {
      opacity: 0.12;
    }
    .md-chip:disabled {
      color: rgba(var(--md-c-on-surface-rgb), 0.38);
      border: 1px solid rgba(var(--md-c-on-surface-rgb), 0.12);
      cursor: default;
    }
    :host(:not([elevated]):not([checked])) md-ripple,
    :host(:not([elevated]):not([checked])) .md-chip::before {
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
    }
    :host([elevated]) .md-chip {
      border: none;
      box-shadow: var(--md-e-shadow-1);
    }
    :host([checked]) .md-chip {
      color: rgb(var(--md-c-on-secondary-container-rgb));
      background-color: rgb(var(--md-c-secondary-container-rgb));
      border: none;
    }
    :host([elevated]) .md-chip:disabled,
    :host([checked]) .md-chip:disabled {
      color: rgba(var(--md-c-on-surface-rgb), 0.38);
      background-color: rgba(var(--md-c-on-surface-rgb), 0.12);
      cursor: default;
      box-shadow: none;
    }
    .md-chip:disabled md-ripple,
    .md-chip:disabled::before {
      display: none;
    }
    ::slotted(md-icon),
    ::slotted(md-avatar) {
      margin-left: -4px;
      margin-right: 8px;
    }
    ::slotted(md-icon[after]),
    ::slotted(md-avatar[after]) {
      margin-left: 8px;
      margin-right: -4px;
    }
    `;

    let template = document.createElement('template');
    template.innerHTML = `
    <button class="md-chip" ${this.disabled ? 'disabled' : ''}>
      <md-ripple></md-ripple>
      <span class="md-button__label">${this.label ? this.label : ''}</span>
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
  set label(value) {
    this.setAttribute('label', value);
  }
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

    this.buttonE = this.shadowRoot.querySelector('.md-chip');
    this.labelE = this.shadowRoot.querySelector('.md-button__label');
    this.slotE = this.shadowRoot.querySelector('slot');
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'label' && this.buttonE) {
      if (newVal) {
        this.shadowRoot.querySelector('.md-button__label').textContent = newVal;
      }
    }
    if (attrName === 'disabled' && this.buttonE) {
      this.buttonE.disabled = this.disabled;
    }
  }
  adoptedCallback() {}
  disconnectedCallback() {}
}

export default Chip;
