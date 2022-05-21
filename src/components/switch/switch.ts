import BaseCheck from '../base/check-default';
import M3SwitchStyles from './switch-styles.scss';

/**
 * Switch component.
 */
class M3Switch extends BaseCheck {
  static tagName = 'md-switch';
  switchNode: HTMLButtonElement;

  static get observedAttributes() {
    return ['data-aria-label', ...super.observedAttributes];
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
    this.nativeNode = this.shadowRoot.querySelector('.md-switch__input') as HTMLInputElement;
    this.switchNode = this.shadowRoot.querySelector('.md-switch') as HTMLButtonElement;
    this.switchNode.addEventListener('click', () => this.onChange());
  }

  protected exAttributeChangedCallback = (name: string, oldValue: string, newValue: string) => {
    if (name === 'data-aria-label') {
      if (newValue) {
        this.switchNode.ariaLabel = newValue;
      } else {
        this.switchNode.removeAttribute('aria-label');
      }
    } else if (name === 'checked') {
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
      <div class="md-switch__track">
        <div class="md-switch__thumb"></div>
        <div class="md-switch__icons">
          <md-icon>close</md-icon>
          <md-icon>check</md-icon>
        </div>
        <div class="md-switch__ripple"></div>
      </div>
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

  get checked(): boolean {
    return this.nativeNode ? this.nativeNode.checked : this.hasAttribute('checked');
  }
  set checked(value: boolean) {
    this.nativeNode.checked = value;
    if (value) {
      this.setAttribute('checked', '');
      this.switchNode.classList.add('md-switch--checked');
    } else {
      this.removeAttribute('checked');
      this.switchNode.classList.remove('md-switch--checked');
    }
  }
  get ariaLabel(): string {
    return this.getAttribute('data-aria-label');
  }
  set ariaLabel(value: string) {
    this.setAttribute('data-aria-label', value);
  }
  override focus() {
    this.switchNode.focus();
  }
}

if (!customElements.get(M3Switch.tagName)) {
  customElements.define(M3Switch.tagName, M3Switch);
}
export default M3Switch;
