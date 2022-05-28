import BaseButton from '../base/button-default';
import M3IconButtonStyles from './icon-button-styles.scss';
import M3Icon from '../icon/icon';

/**
 * Icon button component.
 */
class M3IconButton extends BaseButton {
  /**
   * EXTEND ATTRIBUTES
   */
  static get observedAttributes() {
    return ['icon', ...this.observedAttributesDefault];
  }
  get icon(): string {
    return this.getAttribute('icon');
  }
  set icon(value: string) {
    this.setAttribute('icon', value);
  }

  static tagName: string = 'md-icon-button';
  iconNode: M3Icon;

  /**
   * LIFE CYCLE
   */
  /** */
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.nativeNode = this.shadowRoot.querySelector('.md-icon-button') as HTMLLinkElement;
    this.iconNode = this.shadowRoot.querySelector('md-icon') as M3Icon;
  }
  override attributeChangedCallback = (name: string, oldValue: string, newValue: string) => {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'icon') {
      this.iconNode.textContent = this.icon;
    }
  };

  /**
   * RENDERING
   */
  /** */
  protected override render(): string {
    return `
    <style>${M3IconButtonStyles}</style>
    ${this.renderButton(
      `<md-ripple centered></md-ripple>
      <md-icon>${this.icon}</md-icon>`
    )}`;
  }
}

if (!customElements.get(M3IconButton.tagName)) {
  customElements.define(M3IconButton.tagName, M3IconButton);
}
export default M3IconButton;
