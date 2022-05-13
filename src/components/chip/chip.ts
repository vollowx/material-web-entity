import BaseButton from '../base/button';
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
class M3Chip extends BaseButton {
  static tagName: string = 'md-chip';

  protected override render(): string {
    return `
    <style>${M3ChipStyles}</style>
    <button class="md-chip" id="md-chip" ${this.disabled ? 'disabled' : ''}>
      <md-ripple></md-ripple>
      <span class="md-chip__label" id="md-chip__label">${this.label ? this.label : ''}</span>
      <slot></slot>
    </button>
    `;
  }

  static get observedAttributes() {
    return ['label', 'disabled', 'loading'];
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.buttonNode = this.shadowRoot.getElementById('md-chip') as HTMLButtonElement;
    this.labelNode = this.shadowRoot.getElementById('md-chip__label') as HTMLElement;
  }
}

if (!customElements.get(M3Chip.tagName)) {
  customElements.define(M3Chip.tagName, M3Chip);
}
export default M3Chip;
