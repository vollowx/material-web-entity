import BaseButtonLabeled from '../base/button-labeled';
import M3FABStyles from './fab-styles.scss';

/**
 * Floating action button component.
 */
class M3FAB extends BaseButtonLabeled {
  static tagName: string = 'md-fab';

  /**
   * LIFE CYCLE
   */
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.nativeNode = this.shadowRoot.querySelector('.md-fab') as HTMLButtonElement;
    this.labelNode = this.shadowRoot.querySelector('.md-fab__label') as HTMLElement;
  }

  /**
   * RENDERING
   */
  /** */
  protected render(): string {
    return `
    <style>${M3FABStyles}</style>
    <button class="md-fab"
      ${this.ariaLabel ? 'aria-label="' + this.ariaLabel + '"' : this.label ? 'aria-label="' + this.label + '"' : ''}
      ${this.disabled ? 'disabled' : ''}>
      <md-ripple></md-ripple>
      <span class="md-fab__label">${this.label ? this.label : ''}</span>
      <slot></slot>
    </button>
    `;
  }
}

if (!customElements.get(M3FAB.tagName)) {
  customElements.define(M3FAB.tagName, M3FAB);
}
export default M3FAB;
