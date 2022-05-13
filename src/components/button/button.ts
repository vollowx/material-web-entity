import BaseButtonLabeled from '../base/button-labeled';
import M3ButtonStyles from './button-styles.scss';

/**
 * Button component.
 *
 * Template
 * ```html
 * <md-button label="Label"></md-button>
 * <!-- or -->
 * <md-button>
 *   <md-icon>code</md-icon>
 *   <span>Label</span>
 * </md-button>
 * ```
 */
class M3Button extends BaseButtonLabeled {
  static tagName: string = 'md-button';

  protected override render(): string {
    return `
    <style>${M3ButtonStyles}</style>
    <button class="md-button"id="md-button"${this.disabled ? 'disabled' : ''}>
      <md-ripple></md-ripple>
      <span class="md-button__label" id="md-button__label">${this.label ? this.label : ''}</span>
      <slot></slot>
    </button>
    `;
  }

  static get observedAttributes() {
    return ['label', 'disabled', 'loading'];
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.buttonNode = this.shadowRoot.getElementById('md-button') as HTMLButtonElement;
    this.labelNode = this.shadowRoot.getElementById('md-button__label') as HTMLElement;
  }
}

if (!customElements.get(M3Button.tagName)) {
  customElements.define(M3Button.tagName, M3Button);
}
export default M3Button;
