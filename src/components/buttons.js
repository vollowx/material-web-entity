/**
 * Request also defined Ripple component as 'md-ripple' (./ripples.js)
 */

class Button extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  /**
   * Render the contents and define the contents (button, label)
   */
  renderAndDefine() {
    let styles = document.createElement('style');
    styles.textContent = `
    :host {
      position: relative;
      box-sizing: border-box;
      display: inline-flex;
    }
    .md-button {
      padding: 0 24px;
      position: relative;
      box-sizing: border-box;
      height: 40px;
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: rgb(var(--md-on-primary-rgb));
      font-family: var(--md-font-family);
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      font-size: 0.875rem;
      font-weight: calc(var(--md-font-base-weight) + 500);
      letter-spacing: 0.0892857143em;
      text-decoration: none;
      background: rgb(var(--md-primary-rgb));
      border: none;
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
    :host([tonal]) .md-button {
      color: rgb(var(--md-on-secondary-container-rgb));
      background: rgb(var(--md-secondary-container-rgb));
    }
    .md-button:hover {
      box-shadow: var(--md-elevation-2);
    }
    .md-button:focus {
      box-shadow: none;
    }
    .md-button:active {
      box-shadow: none;
    }
    :host([elevated]) .md-button {
      padding: 0 23px;
      color: rgb(var(--md-primary-rgb));
      background-color: rgb(var(--md-surface-rgb));
      box-shadow: var(--md-elevation-1);
    }
    :host([elevated]) .md-button:hover {
      box-shadow: var(--md-elevation-2);
    }
    :host([elevated]) .md-button:focus {
      box-shadow: var(--md-elevation-1);
    }
    :host([elevated]) .md-button:active {
      box-shadow: var(--md-elevation-1);
    }
    :host([outlined]) .md-button {
      padding: 0 23px;
      color: rgb(var(--md-ipt-color, var(--md-primary-rgb)));
      background-color: rgb(var(--md-surface-rgb));
      border: 1px solid rgb(var(--md-outline-rgb));
      box-shadow: none;
    }
    :host([outlined]) .md-button:focus {
      border-color: rgb(var(--md-primary-rgb));
    }
    :host([outlined]) .md-button:disabled {
      color: rgba(var(--md-on-surface-rgb), 0.38);
      border: 1px solid rgba(var(--md-on-surface-rgb), 0.12);
    }
    :host([outlined]) md-ripple {
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
    }
    :host([text]) .md-button {
      padding: 0 12px;
      color: rgb(var(--md-ipt-color, var(--md-primary-rgb)));
      background: transparent;
      box-shadow: none;
    }
    :host([text]) .md-button:disabled {
      color: rgba(var(--md-on-surface-rgb), 0.38);
    }
    .md-button:disabled,
    :host([tonal]) .md-button:disabled,
    :host([elevated]) .md-button:disabled {
      color: rgba(var(--md-on-surface-rgb), 0.38);
      background-color: rgba(var(--md-on-surface-rgb), 0.12);
      cursor: auto;
      box-shadow: none;
    }
    .md-button:disabled md-ripple {
      display: none;
    }
    `;

    let button = document.createElement('button');
    button.classList.add('md-button');
    button.disabled = this.disabled;

    let label = document.createElement('span');
    label.classList.add('md-button__label');
    label.textContent = this.getAttribute('label');

    let slot = document.createElement('slot');

    let ripple = document.createElement('md-ripple');

    this.shadowRoot.appendChild(styles);
    this.shadowRoot.appendChild(button);
    button.appendChild(ripple);
    button.appendChild(label);
    button.appendChild(slot);

    this.buttonE = button;
    this.labelE = label;
    this.slotE = slot;
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
    return ['label', 'disabled', 'icon', 'loading'];
  }
  connectedCallback() {
    this.renderAndDefine();
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'label' && this.buttonE) {
      this.shadowRoot.querySelector('.md-button__label').textContent = newVal;
    }
    if (attrName === 'disabled' && this.buttonE) {
      this.buttonE.disabled = this.disabled;
    }
  }
  adoptedCallback() {}
  disconnectedCallback() {}
}

export default Button;
