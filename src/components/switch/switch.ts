import BaseCheck from '../base/check-default';
import M3SwitchStyles from './switch-styles.scss';

/**
 * Switch component.
 */
class M3Switch extends BaseCheck {
  static tagName = 'md-switch';
  switchNode: HTMLButtonElement;

  override connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
    this.nativeNode = this.shadowRoot.querySelector('.md-switch__input') as HTMLInputElement;
    this.switchNode = this.shadowRoot.querySelector('.md-switch') as HTMLButtonElement;
    this.switchNode.addEventListener('click', (e) => this._onChange(e));
  }

  override attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.nativeNode) {
      if (name === 'checked') {
        if (this.checked !== this.hasAttribute('checked')) {
          this.checked = this.hasAttribute('checked');
        }
        this.switchNode.setAttribute('aria-checked', this.checked.toString());
      } else if (name === 'disabled') {
        this.nativeNode.disabled = this.disabled;
      } else if (name === 'data-aria-label') {
        if (newValue) {
          this.switchNode.ariaLabel = newValue;
        } else {
          this.switchNode.removeAttribute('aria-label');
        }
      }
    }
  }

  protected override render(): string {
    return `
    <style>${M3SwitchStyles}</style>
    <button
      class="md-switch"
      role="switch"
      aria-checked="${this.hasAttribute('checked') ? 'true' : 'false'}"
      aria-label="${this.ariaLabel ? this.ariaLabel : ''}"
      ${this.disabled ? 'disabled' : ''}>
      <div class="md-switch__track">
        <div class="md-switch__thumb">
          <div class="md-switch__icons">
            <md-icon>close</md-icon>
            <md-icon>check</md-icon>
          </div>
        </div>
      </div>
    </button>
    <input
      type="checkbox"
      class="md-switch__input"
      aria-hidden="true"
      ${this.disabled ? 'disabled' : ''}
      ${this.hasAttribute('checked') ? 'checked' : ''} />`;
  }

  protected override _onChange(event: Event) {
    this.nativeNode.checked = !this.nativeNode.checked;
    if (this.nativeNode.checked) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
    this.dispatchEvent(new Event('change'));
  }

  get checked(): boolean {
    return this.nativeNode ? this.nativeNode.checked : this.hasAttribute('checked');
  }
  set checked(value: boolean) {
    this.nativeNode.checked = value;
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }
  override focus() {
    this.switchNode.focus();
  }
}

if (!customElements.get(M3Switch.tagName)) {
  customElements.define(M3Switch.tagName, M3Switch);
}
export default M3Switch;
