import ActionElementLabeled from '../shared/button-labeled';
import M3FABStyles from './fab-styles.scss';

const sheet = new CSSStyleSheet();
sheet.replaceSync(M3FABStyles);

/**
 * Floating action button component.
 */
class M3FAB extends ActionElementLabeled {
  /**
   * Style sheet
   */
  /** */
  override get styleSheet() {
    return [sheet];
  }

  static tagName: string = 'md-fab';

  /**
   * Render
   */
  /** */
  protected render(): string {
    return `
    ${this.renderButton(
      `<md-ripple></md-ripple>
      <span class="md-fab__label">${this.label ? this.label : ''}</span>
      <slot></slot>`
    )}`;
  }
}

if (!customElements.get(M3FAB.tagName)) {
  customElements.define(M3FAB.tagName, M3FAB);
}
export default M3FAB;
