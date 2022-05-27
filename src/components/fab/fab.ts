import BaseButtonLabeled from '../base/button-labeled';
import M3FABStyles from './fab-styles.scss';

/**
 * Floating action button component.
 */
class M3FAB extends BaseButtonLabeled {
  static tagName: string = 'md-fab';

  /**
   * RENDERING
   */
  /** */
  protected render(): string {
    return `
    <style>${M3FABStyles}</style>
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
