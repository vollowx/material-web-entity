import ActionElement from '../shared/action-element';
import M3IconButtonStyles from './icon-button-styles.scss';
import M3Icon from '../icon/icon';

const sheet = new CSSStyleSheet();
sheet.replaceSync(M3IconButtonStyles);

/**
 * Icon button component.
 */
class M3IconButton extends ActionElement {
  override get styleSheet() {
    return [sheet];
  }

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
  iconElement: M3Icon;

  connectedCallback() {
    super.connectedCallback();
    this.iconElement = this.shadowRoot.querySelector('md-icon') as M3Icon;
  }
  override attributeChangedCallback = (name: string, oldValue: string, newValue: string) => {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'icon') {
      this.iconElement.textContent = this.icon;
    }
  };

  protected override render(): string {
    return `
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
