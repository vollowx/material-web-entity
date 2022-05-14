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
    return ['outlined', 'help-text', ...this.observedAttributesDefault];
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.nativeNode = this.shadowRoot.getElementById('md-text-field__input') as HTMLInputElement;
    this.containerNode = this.shadowRoot.getElementById('md-text-field') as HTMLElement;
    this.helpTextNode = this.shadowRoot.getElementById('md-text-field__help-text') as HTMLElement;
    this.nativeNode.addEventListener('focus', () => this.onFocus());
    this.nativeNode.addEventListener('blur', () => this.onBlur());
    this.nativeNode.addEventListener('change', () => this.onChange());
  }
  attributeChangedCallbackExtend = (_name: string, _oldValue: string, _newValue: string) => {
    if (_name === 'help-text') {
      this.helpTextNode.textContent = this.helpText;
    } else if (_name === 'outlined') {
      this.nativeNode.removeEventListener('focus', this.onFocus);
      this.nativeNode.removeEventListener('blur', this.onBlur);
      this.nativeNode.removeEventListener('change', this.onChange);
      this.shadowRoot.innerHTML = this.render();
      this.nativeNode = this.shadowRoot.getElementById('md-text-field__input') as HTMLInputElement;
      this.containerNode = this.shadowRoot.getElementById('md-text-field') as HTMLElement;
      this.helpTextNode = this.shadowRoot.getElementById('md-text-field__help-text') as HTMLElement;
      this.nativeNode.addEventListener('focus', () => this.onFocus());
      this.nativeNode.addEventListener('blur', () => this.onBlur());
      this.nativeNode.addEventListener('change', () => this.onChange());
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
      <fieldset class="md-text-field__border">
        <legend class="md-text-field__label-keeper">${this.label}</legend>
      </fieldset>
    </label>
    <p class="md-text-field__help-text" id="md-text-field__help-text">${this.helpText}</p>`;
  }

  protected onFocus() {
    this.containerNode.classList.add('md-text-field--focused');
  }
  protected onBlur() {
    this.containerNode.classList.remove('md-text-field--focused');
  }
  protected onChange() {
    if (this.nativeNode.value === '') {
      this.containerNode.classList.remove('md-text-field--keep');
    } else {
      this.containerNode.classList.add('md-text-field--keep');
    }
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
