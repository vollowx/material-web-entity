import styles from './fab-styles.scss';

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
    this.shadowRoot.innerHTML = /* html */ `
    <style>${styles}</style>
    <button class="md3-fab" ${this.disabled ? 'disabled' : ''}>
      <md-ripple></md-ripple>
      <span class="md3-fab__label">${this.label ? this.label : ''}</span>
      <slot></slot>
    </button>
    `;
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
