import styles from './chip-styles.scss';
import { html, render } from 'lit';

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
  chipE: HTMLButtonElement;
  labelE: HTMLElement;
  slotE: HTMLSlotElement;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  protected render(): void {
    render(
      html`
        <style>
          ${styles}
        </style>
        <button class="md3-chip" id="md3-chip" ${this.disabled ? 'disabled' : ''}>
          <md-ripple></md-ripple>
          <span class="md3-chip__label" id="md3-chip__label">${this.label ? this.label : ''}</span>
          <slot></slot>
        </button>
      `,
      this.shadowRoot
    );
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

    this.chipE = this.shadowRoot.getElementById('md3-chip') as HTMLButtonElement;
    this.labelE = this.shadowRoot.getElementById('md3-chip__label');
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

export default Chip;
