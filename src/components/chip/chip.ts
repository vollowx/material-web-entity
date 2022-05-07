import styles from './chip-styles.scss';

/**
 * Chip component.
 *
 * Template
 * ```html
 * <md-chip label="Label"></md-chip>
 * <!-- or -->
 * <md-chip>
 *   <md-icon>code</md-icon>
 *   <span>Label</span>
 * </md-chip>
 * ```
 * *For ripple effect, need Ripple with tag 'md-ripple'*
 */
class Chip extends HTMLElement {
  static tagName: string = 'md-chip';
  
  chipE: HTMLButtonElement;
  labelE: HTMLElement;
  slotE: HTMLSlotElement;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  protected render(): void {
    this.shadowRoot.innerHTML = `
    <style>${styles}</style>
    <button class="md-chip" id="md-chip" ${this.disabled ? 'disabled' : ''}>
      <md-ripple></md-ripple>
      <span class="md-chip__label" id="md-chip__label">${this.label ? this.label : ''}</span>
      <slot></slot>
    </button>
    `;
  }

  focus() {
    this.chipE.focus();
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
    return this.chipE.tabIndex;
  }
  set tabIndex(value: number) {
    this.chipE.tabIndex = value;
  }

  static get observedAttributes() {
    return ['label', 'disabled', 'loading'];
  }
  connectedCallback() {
    this.render();

    this.chipE = this.shadowRoot.getElementById('md-chip') as HTMLButtonElement;
    this.labelE = this.shadowRoot.getElementById('md-chip__label');
    this.slotE = this.shadowRoot.querySelector('slot');
  }
  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
    if (attrName === 'label' && this.chipE) {
      if (newVal) {
        this.labelE.textContent = newVal;
      }
    }
    if (attrName === 'disabled' && this.chipE) {
      this.chipE.disabled = this.disabled;
    }
  }
}

if (!customElements.get(Chip.tagName)) {
  customElements.define(Chip.tagName, Chip);
}
export default Chip;
