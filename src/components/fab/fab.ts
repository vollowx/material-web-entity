import BaseButton from '../base/button';
import M3FABStyles from './fab-styles.scss';

/**
 * Floating action button component.
 */
class M3FAB extends BaseButton {
  static tagName: string = 'md-fab';

  protected render(): string {
    return `
    <style>${M3FABStyles}</style>
    <button class="md-fab" id="md-fab" ${this.disabled ? 'disabled' : ''}>
      <md-ripple></md-ripple>
      <span class="md-fab__label" id="md-fab__label">${this.label ? this.label : ''}</span>
      <slot></slot>
    </button>
    `;
  }

  static get observedAttributes() {
    return ['label', 'disabled', 'loading'];
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.buttonNode = this.shadowRoot.getElementById('md-fab') as HTMLButtonElement;
    this.labelNode = this.shadowRoot.getElementById('md-fab__label') as HTMLElement;
  }
}

if (!customElements.get(M3FAB.tagName)) {
  customElements.define(M3FAB.tagName, M3FAB);
}
export default M3FAB;
