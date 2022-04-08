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
      text-transform: uppercase;
      background: rgb(var(--md-primary-rgb));
      border: none;
      border-radius: 20px;
      outline: none;
      -webkit-user-select: none;
      user-select: none;
      cursor: pointer;
      vertical-align: middle;
      overflow: visible;
      transition: 240ms cubic-bezier(0.4, 0, 0.2, 1);
      -webkit-appearance: none;
      -moz-appearance: none;
      -webkit-tap-highlight-color: transparent;
    }
    :host([tonal]) .md-button {
      color: rgb(var(--md-on-secondary-container-rgb));
      background: rgb(var(--md-secondary-container-rgb));
    }
    .md-button:hover {
      box-shadow: var(--md-elevation-2);
    }
    .md-button:focus-visible {
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
    :host([elevated]) .md-button:focus-visible {
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
    :host([outlined]) .md-button:focus-visible {
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

    let ripple = document.createElement('md-ripple');

    this.shadowRoot.appendChild(styles);
    this.shadowRoot.appendChild(button);
    button.appendChild(label);
    button.appendChild(ripple);

    this.button = button;
    this.label = label;
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
    if (attrName === 'label' && this.button) {
      this.shadowRoot.querySelector('.md-button__label').textContent = newVal;
    }
    if (attrName === 'disabled' && this.button) {
      this.button.disabled = this.disabled;
    }
  }
  adoptedCallback() {}
  disconnectedCallback() {}
}

export default Button;
