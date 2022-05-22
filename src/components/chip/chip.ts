import BaseButtonLabeled from '../base/button-labeled';
import M3ChipStyles from './chip-styles.scss';

/**
 * M3Chip component.
 *
 * Template
 * ```html
 * <md-chip label="Label"></md-chip>
 * <!-- or -->
 * <md-chip>
 *   <md-icon>code</md-icon>
 *   <span>Label</span>
 * </md-chip>
 * ```
 */
class M3Chip extends BaseButtonLabeled {
  static tagName: string = 'md-chip';

  /**
   * LIFE CYCLE
   */
  /** */
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.nativeNode = this.shadowRoot.querySelector('.md-chip') as HTMLButtonElement;
    this.labelNode = this.shadowRoot.querySelector('.md-chip__label') as HTMLElement;
  }

  /**
   * RENDERING
   */
  /** */
  protected override render(): string {
    return `
    <style>${M3ChipStyles}</style>
    <button class="md-chip"
      ${this.ariaLabel ? 'aria-label="' + this.ariaLabel + '"' : this.label ? 'aria-label="' + this.label + '"' : ''}
      ${this.disabled ? 'disabled' : ''}>
      <md-ripple></md-ripple>
      <span class="md-chip__label">${this.label ? this.label : ''}</span>
      <slot></slot>
    </button>
    `;
  }
}

if (!customElements.get(M3Chip.tagName)) {
  customElements.define(M3Chip.tagName, M3Chip);
}
export default M3Chip;
