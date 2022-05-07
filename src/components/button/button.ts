import styles from './button-styles.scss';

/**
 * Button component.
 *
 * Template
 * ```html
 * <md-button label="Label"></md-button>
 * <!-- or -->
 * <md-button>
 *   <md-icon>code</md-icon>
 *   <span>Label</span>
 * </md-button>
 * ```
 * *For ripple effect, need Ripple with tag 'md-ripple'*
 */
class Button extends HTMLElement {
  static tagName: string = 'md-button';
  
  buttonE: HTMLButtonElement;
  labelE: HTMLElement;
  slotE: HTMLSlotElement;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  protected render(): void {
    this.shadowRoot.innerHTML = `
    <style>${styles}</style>
    <button class="md-button"id="md-button"${this.disabled ? 'disabled' : ''}>
      <md-ripple></md-ripple>
      <span class="md-button__label" id="md-button__label">${this.label ? this.label : ''}</span>
      <slot></slot>
    </button>
    `;
  }

  focus() {
    this.buttonE.focus();
  }

  get label() {
    return this.getAttribute('label');
  }
  set label(value: string) {
    this.setAttribute('label', value);
  }
  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }
  get tabIndex() {
    return this.buttonE.tabIndex;
  }
  set tabIndex(value: number) {
    this.buttonE.tabIndex = value;
  }

  static get observedAttributes() {
    return ['label', 'disabled', 'loading'];
  }
  connectedCallback() {
    this.render();

    this.buttonE = this.shadowRoot.getElementById('md-button') as HTMLButtonElement;
    this.labelE = this.shadowRoot.getElementById('md-button__label');
    this.slotE = this.shadowRoot.querySelector('slot');
  }
  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
    if (attrName === 'label' && this.buttonE) {
      if (newVal) {
        this.labelE.textContent = newVal;
      }
    }
    if (attrName === 'disabled' && this.buttonE) {
      this.buttonE.disabled = this.disabled;
    }
  }
}

if (!customElements.get(Button.tagName)) {
  customElements.define(Button.tagName, Button);
}
export default Button;
