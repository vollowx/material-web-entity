import BaseButton from '../base/button-default';
import M3IconButtonStyles from './icon-button-styles.scss';
import M3Icon from '../icon/icon';

/**
 * Icon button component.
 */
class M3IconButton extends BaseButton {
  static tagName: string = 'md-icon-button';
  iconNode: M3Icon;

  protected override render(): string {
    return `
    <style>${M3IconButtonStyles}</style>
    <button class="md-icon-button"
      ${this.ariaLabel ? 'aria-label="' + this.ariaLabel + '"' : ''}
      ${this.disabled ? 'disabled' : ''}>
      <md-ripple centered></md-ripple>
      <md-icon>${this.icon ? this.icon : ''}</md-icon>
      <slot></slot>
    </button>
    `;
  }

  static get observedAttributes() {
    return ['icon', ...this.observedAttributesDefault];
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.nativeNode = this.shadowRoot.querySelector('.md-icon-button') as HTMLButtonElement;
    this.iconNode = this.shadowRoot.querySelector('md-icon') as M3Icon;
  }
  protected override exAttributeChangedCallback = (name: string, oldValue: string, newValue: string) => {
    if (name === 'icon') {
      this.iconNode.textContent = this.icon;
    }
  };

  get icon(): string {
    return this.getAttribute('icon');
  }
  set icon(value: string) {
    this.setAttribute('icon', value);
  }
}

if (!customElements.get(M3IconButton.tagName)) {
  customElements.define(M3IconButton.tagName, M3IconButton);
}
export default M3IconButton;
