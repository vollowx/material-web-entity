import styles from './common-button-styles.scss';

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
    this.shadowRoot.innerHTML = /* html */ `
    <style>${styles}</style>
    <button class="md3-button" id="md3-button" ${this.disabled ? 'disabled' : ''}>
      <md-ripple></md-ripple>
      <span class="md3-button__label" id="md3-button__label">${this.label ? this.label : ''}</span>
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
  get disabled() {
    return this.hasAttribute('disabled');
  }
  get tabIndex() {
    return this.buttonE.tabIndex;
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
  /**
   * @param {Number} value
   */
  set tabIndex(value) {
    this.buttonE.tabIndex = value;
  }

  static get observedAttributes() {
    return ['label', 'disabled', 'loading'];
  }
  connectedCallback() {
    this.render();

    this.buttonE = this.shadowRoot.getElementById('md3-button');
    this.labelE = this.shadowRoot.getElementById('md3-button__label');
    this.slotE = this.shadowRoot.querySelector('slot');
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
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

export default Button;
