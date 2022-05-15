import BaseCheck from '../base/check-default';
import M3SwitchStyles from './switch-styles.scss';

/**
 * Switch component.
 */
class M3Switch extends BaseCheck {
  static tagName = 'md-switch';
  switchNode: HTMLButtonElement;

  static get observedAttributes() {
    return ['aria-label', ...super.observedAttributes];
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
    this.nativeNode = this.shadowRoot.querySelector('.md-switch__input') as HTMLInputElement;
    this.switchNode = this.shadowRoot.querySelector('.md-switch') as HTMLButtonElement;
    this.switchNode.addEventListener('click', () => this.onChange());
  }

  protected exAttributeChangedCallback = (_name: string, _oldValue: string, _newValue: string) => {
    if (_name === 'aria-label') {
      this.switchNode.setAttribute('aria-label', this.ariaLabel);
    } else if (_name === 'checked') {
      this.switchNode.setAttribute('aria-checked', this.checked.toString());
    }
  };

  protected override render(): string {
    return `
    <style>${M3SwitchStyles}</style>
    <button
      class="md-switch ${this.hasAttribute('checked') ? 'md-switch--checked' : ''}"
      role="switch"
      aria-checked="${this.hasAttribute('checked') ? 'true' : 'false'}"
      aria-label="${this.ariaLabel ? this.ariaLabel : ''}"
      ${this.disabled ? 'disabled' : ''}>
      <div class="md-switch__track"></div>
    </button>
    <input
      type="checkbox"
      class="md-switch__input"
      aria-hidden="true"
      ${this.disabled ? 'disabled' : ''}
      ${this.hasAttribute('checked') ? 'checked' : ''} />`;
  }

  protected override onChange() {
    this.nativeNode.checked = !this.nativeNode.checked;
    if (this.nativeNode.checked) {
      this.setAttribute('checked', '');
      this.switchNode.classList.add('md-switch--checked');
    } else {
      this.removeAttribute('checked');
      this.switchNode.classList.remove('md-switch--checked');
    }
    this.dispatchEvent(new Event('change'));
    this.exChange();
  }
}

if (!customElements.get(M3Switch.tagName)) {
  customElements.define(M3Switch.tagName, M3Switch);
}
export default M3Switch;
