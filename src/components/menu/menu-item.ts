import BaseButton from '../base/button-default';
import M3MenuItemStyles from './menu-item-styles.scss';

/**
 * MenuItem component.
 *
 * TODO: be 'list-item'
 */
class M3MenuItem extends BaseButton {
  static tagName: string = 'md-menu-item';

  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.nativeNode = this.shadowRoot.querySelector('.md-menu__item') as HTMLButtonElement;

    this.tabIndex = -1;
    this.nativeNode.addEventListener('focus', () => this.setAttribute('focused', ''));
    this.nativeNode.addEventListener('blur', () => this.removeAttribute('focused'));
  }

  protected override render(): string {
    return `
    <style>${M3MenuItemStyles}</style>
    <button class="md-menu__item">
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
