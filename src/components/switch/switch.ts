import BaseCheck from '../base/check-default';
import M3SwitchStyles from './switch-styles.scss';

const sheet = new CSSStyleSheet();
sheet.replaceSync(M3SwitchStyles);

/**
 * Switch component.
 */
class M3Switch extends BaseCheck {
  static tagName = 'md-switch';
  switchElement: HTMLButtonElement;

  override connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
    this.shadowRoot.adoptedStyleSheets = [sheet];

    this.checkElement = this.shadowRoot.querySelector('.md-switch__input') as HTMLInputElement;
    this.switchElement = this.shadowRoot.querySelector('.md-switch') as HTMLButtonElement;
    this.switchElement.addEventListener('click', (e) => this._onChange(e));
  }

  override attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.checkElement) {
      if (name === 'checked') {
        if (this.checked !== this.hasAttribute('checked')) {
          this.checked = this.hasAttribute('checked');
        }
        this.switchElement.setAttribute('aria-checked', this.checked.toString());
      } else if (name === 'disabled') {
        this.checkElement.disabled = this.disabled;
      } else if (name === 'data-aria-label') {
        if (newValue) {
          this.switchElement.ariaLabel = newValue;
        } else {
          this.switchElement.removeAttribute('aria-label');
        }
      }
    }
  }

  protected override render(): string {
    return `
    <button
      class="md-switch ${this.hasAttribute('checked') ? 'md-switch--checked' : ''}"
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
    this.checkElement.checked = !this.checkElement.checked;
    if (this.checkElement.checked) {
      this.setAttribute('checked', '');
      this.switchElement.classList.add('md-switch--checked');
    } else {
      this.removeAttribute('checked');
      this.switchElement.classList.remove('md-switch--checked');
    }
    this.dispatchEvent(new Event('change'));
  }

  get checked(): boolean {
    return this.checkElement ? this.checkElement.checked : this.hasAttribute('checked');
  }
  set checked(value: boolean) {
    this.checkElement.checked = value;
    if (value) {
      this.setAttribute('checked', '');
      this.switchElement.classList.add('md-switch--checked');
    } else {
      this.removeAttribute('checked');
      this.switchElement.classList.remove('md-switch--checked');
    }
  }
  override focus() {
    this.switchElement.focus();
  }
}

if (!customElements.get(M3Switch.tagName)) {
  customElements.define(M3Switch.tagName, M3Switch);
}
export default M3Switch;
