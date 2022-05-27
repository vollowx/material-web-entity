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
   * RENDERING
   */
  /** */
  protected override render(): string {
    return `
    <style>${M3ButtonStyles}</style>
    ${this.renderButton(
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
