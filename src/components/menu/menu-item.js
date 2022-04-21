import styles from './menu-item-styles.scss';

/**
 * MenuItem component.
 *
 * The item in the menu.
 */
class MenuItem extends HTMLElement {
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
    <button class="md3-menu__item" id="md3-menu__item">
      <md-ripple></md-ripple>
      <slot name="before"></slot>
      <slot name="label"></slot>
      <div class="md3-menu__item__spacer"></div>
      <slot name="after"></slot>
    </button>
    `;
  }

  focus() {
    this.itemE.focus();
  }

  get tabIndex() {
    return this.itemE.tabIndex;
  }
  get disabled() {
    return this.hasAttribute('disabled');
  }
  set tabIndex(value) {
    this.itemE.tabIndex = value;
  }
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  connectedCallback() {
    this.render();

    this.itemE = this.shadowRoot.getElementById('md3-menu__item');
    this.tabIndex = -1;
    this.itemE.addEventListener('focus', () => this.setAttribute('focused', ''));
    this.itemE.addEventListener('blur', () => this.removeAttribute('focused'));
  }
}

export default MenuItem;
