import BaseButton from '../base/button-default';
import M3MenuItemStyles from './menu-item-styles.scss';

const sheet = new CSSStyleSheet();
sheet.replaceSync(M3MenuItemStyles);

/**
 * MenuItem component.
 *
 * TODO: be 'list-item'
 */
class M3MenuItem extends BaseButton {
  override get styleSheet() {
    return [sheet];
  }

  static tagName: string = 'md-menu-item';

  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
    this.shadowRoot.adoptedStyleSheets = this.styleSheet;

    this.buttonElement = this.shadowRoot.querySelector('.md-menu__item') as HTMLLinkElement;

    this.tabIndex = -1;
  }

  protected override render(): string {
    return `
    <button class="md-menu__item"
      ${this.ariaLabel ? 'aria-label="' + this.ariaLabel + '"' : ''}
      ${this.disabled ? 'disabled' : ''}>
      <md-ripple></md-ripple>
      <slot name="before"></slot>
      <slot name="label"></slot>
      <div class="md-menu__item__spacer"></div>
      <slot name="after"></slot>
    </button>
    `;
  }
}

if (!customElements.get(M3MenuItem.tagName)) {
  customElements.define(M3MenuItem.tagName, M3MenuItem);
}
export default M3MenuItem;
