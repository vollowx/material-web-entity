import styles from './chip-styles.scss';

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
    this.shadowRoot.innerHTML = /* html */ `
    <style>${styles}</style>
    <button class="md3-chip" id="md3-chip" ${this.disabled ? 'disabled' : ''}>
      <md-ripple></md-ripple>
      <span class="md3-chip__label" id="md3-chip__label">${this.label ? this.label : ''}</span>
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
  get disabled() {
    return this.hasAttribute('disabled');
  }
  /**
   * @param {String} value
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

    this.chipE = this.shadowRoot.getElementById('md3-chip');
    this.labelE = this.shadowRoot.getElementById('md3-chip__label');
    this.slotE = this.shadowRoot.querySelector('slot');
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
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
