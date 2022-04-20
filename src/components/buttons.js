/**
 * Button component.
 *
 * Request also defined Ripple component as 'md-ripple' (./ripples.js)
 */

class Button extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  /**
   * Render the contents
   */
  render() {
    let styles = document.createElement('style');
    styles.textContent = /* css */`
    :host {
      position: relative;
      box-sizing: border-box;
      display: inline-flex;
      -webkit-tap-highlight-color: transparent;
      --md-icon-size: 1rem;
    }
    .md3-button {
      padding: 0 24px;
      position: relative;
      box-sizing: border-box;
      height: 40px;
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: rgb(var(--md-c-on-primary-rgb));
      font-family: var(--md-t-font-family);
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      font-size: 0.875rem;
      font-weight: calc(var(--md-t-font-base-weight) + 500);
      line-height: 1.428571428571429;
      letter-spacing: 0.1px;
      text-decoration: none;
      background-color: rgb(var(--md-c-primary-rgb));
      border: 0;
      border-radius: 20px;
      outline: 0;
      user-select: none;
      cursor: pointer;
      vertical-align: middle;
      overflow: visible;
      transition: 240ms cubic-bezier(0.4, 0, 0.2, 1);
      appearance: none;
    }
    .md3-button * {
      pointer-events: none;
    }
    .md3-button::before {
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
      .md3-button:hover::before {
        opacity: 0.08;
      }
    }
    :host(.focus-visible) .md3-button::before {
      opacity: 0.12;
    }
    :host([tonal]) .md3-button {
      color: rgb(var(--md-c-on-secondary-container-rgb));
      background: rgb(var(--md-c-secondary-container-rgb));
    }
    @media screen and (min-width: 1240px) {
      .md3-button:hover {
        box-shadow: var(--md-e-shadow-2);
      }
    }
    :host(.focus-visible) .md3-button {
      box-shadow: none;
    }
    .md3-button:active {
      box-shadow: none;
    }
    :host([elevated]) .md3-button {
      color: rgb(var(--md-c-primary-rgb));
      background-color: rgb(var(--md-c-surface-rgb));
      box-shadow: var(--md-e-shadow-1);
    }
    @media screen and (min-width: 1240px) {
      :host([elevated]) .md3-button:hover {
        box-shadow: var(--md-e-shadow-2);
      }
    }
    :host([elevated]) .md3-button:focus-visible {
      box-shadow: var(--md-e-shadow-1);
    }
    :host([elevated]) .md3-button:active {
      box-shadow: var(--md-e-shadow-1);
    }
    :host([outlined]) .md3-button {
      padding: 0 23px;
      color: rgb(var(--md-c-important-color, var(--md-c-primary-rgb)));
      background-color: rgb(var(--md-c-surface-rgb));
      border: 1px solid rgb(var(--md-c-outline-rgb));
      box-shadow: none;
    }
    :host([outlined]) .md3-button:focus-visible {
      border-color: rgb(var(--md-c-primary-rgb));
    }
    :host([outlined]) .md3-button:active {
      border-color: rgb(var(--md-c-outline-rgb));
    }
    :host([outlined]) .md3-button:disabled {
      color: rgba(var(--md-c-on-surface-rgb), 0.38);
      border: 1px solid rgba(var(--md-c-on-surface-rgb), 0.12);
    }
    :host([outlined]) md-ripple,
    :host([outlined]) .md3-button::before {
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
    }
    :host([text]) .md3-button {
      padding: 0 12px;
      color: rgb(var(--md-c-important-color, var(--md-c-primary-rgb)));
      background: transparent;
      box-shadow: none;
    }
    :host([text]) .md3-button:disabled {
      color: rgba(var(--md-c-on-surface-rgb), 0.38);
    }
    .md3-button:disabled,
    :host([tonal]) .md3-button:disabled,
    :host([elevated]) .md3-button:disabled {
      color: rgba(var(--md-c-on-surface-rgb), 0.38);
      background-color: rgba(var(--md-c-on-surface-rgb), 0.12);
      cursor: default;
      box-shadow: none;
    }
    .md3-button:disabled md-ripple,
    .md3-button:disabled::before {
      display: none;
    }
    ::slotted(md-icon) {
      margin-left: -8px;
      margin-right: 8px;
    }
    ::slotted(md-icon[after]) {
      margin-left: 8px;
      margin-right: -8px;
    }
    :host([text]) ::slotted(md-icon) {
      margin-left: -4px;
      margin-right: 8px;
    }
    :host([text]) ::slotted(md-icon[after]) {
      margin-left: 8px;
      margin-right: -4px;
    }
    `;

    let template = document.createElement('template');
    template.innerHTML = /* html */`
    <button class="md3-button" ${this.disabled ? 'disabled' : ''}>
      <md-ripple></md-ripple>
      <span class="md3-button__label">${this.label ? this.label : ''}</span>
      <slot></slot>
    </button>
    `;

    this.shadowRoot.appendChild(styles);
    this.shadowRoot.innerHTML += template.innerHTML;
  }

  focus() {
    this.buttonE.focus();
  }

  get label() {
    return this.getAttribute('label');
  }
  get disabled() {
    return this.hasAttribute('disabled');
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

    this.buttonE = this.shadowRoot.querySelector('.md3-button');
    this.labelE = this.shadowRoot.querySelector('.md3-button__label');
    this.slotE = this.shadowRoot.querySelector('slot');
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'label' && this.buttonE) {
      if (newVal) {
        this.shadowRoot.querySelector('.md3-button__label').textContent = newVal;
      }
    }
    if (attrName === 'disabled' && this.buttonE) {
      this.buttonE.disabled = this.disabled;
    }
  }
}

export default Button;
