import BaseButtonLabeled from '../base/button-labeled';
import M3ButtonStyles from './button-styles.scss';

const sheet = new CSSStyleSheet();
sheet.replaceSync(M3ButtonStyles);

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

  override get styleSheet() {
    return [sheet];
  }

  /**
   * RENDERING
   */
  /** */
  protected override render(): string {
    return this.renderButton(
      `<md-ripple></md-ripple>
      <span class="md-button__label">${this.label ? this.label : ''}</span>
      <slot></slot>`
    );
  }
}

if (!customElements.get(M3Button.tagName)) {
  customElements.define(M3Button.tagName, M3Button);
}
export default M3Button;
