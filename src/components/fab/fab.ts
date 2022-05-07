import styles from './fab-styles.scss';

/**
 * FAB (Floating action button) component.
 *
 * *For ripple effect, need Ripple with tag 'md-ripple'*
 */
class FAB extends HTMLElement {
  static tagName: string = 'md-fab';
  
  fabE: HTMLButtonElement;
  labelE: HTMLElement;
  slotE: HTMLSlotElement;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  protected render(): void {
    this.shadowRoot.innerHTML = `
    <style>${styles}</style>
    <button class="md-fab" id="md-fab" ${this.disabled ? 'disabled' : ''}>
      <md-ripple></md-ripple>
      <span class="md-fab__label" id="md-fab__label">${this.label ? this.label : ''}</span>
      <slot></slot>
    </button>
    `;
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
    return this.fabE.tabIndex;
  }
  set tabIndex(value: number) {
    this.fabE.tabIndex = value;
  }

  static get observedAttributes() {
    return ['label', 'disabled', 'loading'];
  }
  connectedCallback() {
    this.render();

    this.fabE = this.shadowRoot.getElementById('md-fab') as HTMLButtonElement;
    this.labelE = this.shadowRoot.getElementById('md-fab__label');
    this.slotE = this.shadowRoot.querySelector('slot');
  }
  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
    if (attrName === 'label' && this.fabE) {
      if (newVal) {
        this.labelE.textContent = newVal;
      }
    }
    if (attrName === 'disabled' && this.fabE) {
      this.fabE.disabled = this.disabled;
    }
  }
}

if (!customElements.get(FAB.tagName)) {
  customElements.define(FAB.tagName, FAB);
}
export default FAB;
