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

  /**
   * LIFE CYCLE
   */
  /** */
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.nativeNode = this.shadowRoot.querySelector('.md-button') as HTMLButtonElement;
    this.labelNode = this.shadowRoot.querySelector('.md-button__label') as HTMLElement;
  }

  /**
   * RENDERING
   */
  /** */
  protected override render(): string {
    return `
    <style>${M3ButtonStyles}</style>
    ${this.renderButton(
      'md-button',
      `<md-ripple></md-ripple>
      <span class="md-button__label">${this.label ? this.label : ''}</span>
      <slot></slot>`
    )}`;
  }
}

if (!customElements.get(M3Button.tagName)) {
  customElements.define(M3Button.tagName, M3Button);
}
export default M3Button;
