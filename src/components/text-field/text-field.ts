import BaseTextField from '../base/text-field';
import M3TextFieldStyles from './text-field-styles.scss';

/**
 * Text field component.
 */
class M3TextField extends BaseTextField {
  static tagName: string = 'md-text-field';
  labelNode: HTMLElement;
  labelKeeperNode: HTMLElement;
  containerNode: HTMLElement;
  helpTextNode: HTMLElement;
  counterNode: HTMLElement;

  static get observedAttributes() {
    return ['label', 'outlined', 'help-text', ...this.observedAttributesDefault];
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
    this.defines();
    this.binds();
    this.onTempChange();
    this.onChange();
  }
  attributeChangedCallbackExtend = (_name: string, _oldValue: string, _newValue: string) => {
    if (_name === 'label') {
      this.labelNode.textContent = this.label;
      this.labelKeeperNode ? (this.labelKeeperNode.textContent = this.label) : null;
    } else if (_name === 'help-text') {
      this.helpTextNode.textContent = this.helpText;
    } else if (_name === 'outlined') {
      this.shadowRoot.innerHTML = this.render();
      this.defines();
      this.binds();
      this.onTempChange();
      this.onChange();
    }
  };

  protected override render(): string {
    return this.hasAttribute('outlined') ? this.renderOutlined() : this.renderFilled();
  }
  protected renderFilled(): string {
    return `
    <style>${M3TextFieldStyles}</style>
    <label class="md-text-field">
      <span class="md-text-field__label">${this.label}</span>
      ${this.renderInput('md-text-field__input')}
      <span class="md-text-field__underline"></span>
    </label>
    <p class="md-text-field__helper">
      <span class="md-text-field__help-text">${this.helpText}</span>
      <span class="md-text-field__counter"></span>
    </p>`;
  }
  protected renderOutlined(): string {
    return `
    <style>${M3TextFieldStyles}</style>
    <label class="md-text-field">
      <span class="md-text-field__label">${this.label}</span>
      ${this.renderInput('md-text-field__input')}
      <fieldset class="md-text-field__border" aria-hidden="true">
        <legend class="md-text-field__label-keeper">${this.label}</legend>
      </fieldset>
    </label>
    <p class="md-text-field__helper">
      <span class="md-text-field__help-text">${this.helpText}</span>
      <span class="md-text-field__counter"></span>
    </p>`;
  }

  protected defines() {
    this.nativeNode = this.shadowRoot.querySelector('.md-text-field__input') as HTMLInputElement;
    this.labelNode = this.shadowRoot.querySelector('.md-text-field__label') as HTMLLabelElement;
    this.labelKeeperNode = this.shadowRoot.querySelector('.md-text-field__label-keeper') as HTMLElement;
    this.containerNode = this.shadowRoot.querySelector('.md-text-field') as HTMLElement;
    this.helpTextNode = this.shadowRoot.querySelector('.md-text-field__help-text') as HTMLElement;
    this.counterNode = this.shadowRoot.querySelector('.md-text-field__counter') as HTMLElement;
  }

  protected override exFocus() {
    this.containerNode.classList.add('md-text-field--focused');
  }
  protected override exBlur() {
    this.containerNode.classList.remove('md-text-field--focused');
  }
  protected override exChange() {
    if (this.nativeNode.value === '') {
      this.containerNode.classList.remove('md-text-field--keep');
    } else {
      this.containerNode.classList.add('md-text-field--keep');
    }
  }
  protected override exTempChange() {
    if (this.maxlength) {
      this.counterNode.textContent = `${this.nativeNode.value.length}/${this.maxlength}`;
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
  get error(): boolean {
    return this.hasAttribute('error');
  }
  set error(value: boolean) {
    if (value) {
      this.setAttribute('error', '');
    } else {
      this.removeAttribute('error');
    }
  }
}

if (!customElements.get(M3TextField.tagName)) {
  customElements.define(M3TextField.tagName, M3TextField);
}
export default M3TextField;
