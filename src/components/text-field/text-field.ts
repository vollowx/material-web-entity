import BaseTextField from '../base/text-field';
import M3TextFieldStyles from './text-field-styles.scss';

/**
 * Text field component.
 */
class M3TextField extends BaseTextField {
  static tagName: string = 'md-text-field';
  containerNode: HTMLElement;
  helpTextNode: HTMLElement;

  static get observedAttributes() {
    return ['help-text', 'disabled', 'type', 'readonly', 'required', 'placeholder', 'value', 'autocomplete'];
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.nativeNode = this.shadowRoot.getElementById('md-text-field__input') as HTMLInputElement;
    this.containerNode = this.shadowRoot.getElementById('md-text-field') as HTMLElement;
    this.helpTextNode = this.shadowRoot.getElementById('md-text-field__help-text') as HTMLElement;
    this.nativeNode.addEventListener('focus', () => {
      this.containerNode.classList.add('md-text-field--keep');
    });
    this.nativeNode.addEventListener('blur', () => {
      if (this.nativeNode.value === '') {
        this.containerNode.classList.remove('md-text-field--keep');
      }
    });
  }
  attributeChangedCallbackExtend = (_name: string, _oldValue: string, _newValue: string) => {
    if (_name === 'help-text') {
      this.helpTextNode.textContent = this.helpText;
    }
  };

  protected override render(): string {
    return this.hasAttribute('outlined') ? this.renderOutlined() : this.renderFilled();
  }
  protected renderFilled(): string {
    return `
    <style>${M3TextFieldStyles}</style>
    <label class="md-text-field" id="md-text-field">
      <span class="md-text-field__label">${this.label}</span>
      ${this.renderInput('md-text-field__input')}
      <span class="md-text-field__underline"></span>
    </label>
    <p class="md-text-field__help-text" id="md-text-field__help-text">${this.helpText}</p>`;
  }
  protected renderOutlined(): string {
    return `
    <style>${M3TextFieldStyles}</style>
    <label class="md-text-field" id="md-text-field">
      <span class="md-text-field__label">${this.label}</span>
      ${this.renderInput('md-text-field__input')}
    </label>
    <p class="md-text-field__help-text" id="md-text-field__help-text">${this.helpText}</p>`;
  }

  get label(): string {
    return this.getAttribute('label') || '';
  }
  set label(value: string) {
    this.setAttribute('label', value);
  }
  get helpText(): string {
    return this.getAttribute('help-text') || '';
  }
  set helpText(value: string) {
    this.setAttribute('help-text', value);
  }
  focus() {
    this.nativeNode.focus();
  }
}

if (!customElements.get(M3TextField.tagName)) {
  customElements.define(M3TextField.tagName, M3TextField);
}
export default M3TextField;
