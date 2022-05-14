/**
 * Base text field component.
 *
 * All the custom with actions like a text field should extend this class.
 */
class BaseTextField extends HTMLElement {
  static tagName: string;
  nativeNode: HTMLInputElement;

  static get observedAttributes() {
    return ['disabled', 'type', 'readonly', 'required', 'placeholder', 'value'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.nativeNode = this.shadowRoot.getElementById('bs-text-field') as HTMLInputElement;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.nativeNode) {
      if (name === 'disabled') {
        this.nativeNode.disabled = this.disabled;
      } else if (name === 'type') {
        this.nativeNode.type = this.type;
      } else if (name === 'readonly') {
        this.nativeNode.readOnly = this.readonly;
      } else if (name === 'required') {
        this.nativeNode.required = this.required;
      } else if (name === 'placeholder') {
        this.nativeNode.placeholder = this.placeholder;
      } else if (name === 'value') {
        this.nativeNode.value = this.value;
      }
      this.attributeChangedCallbackExtend(name, oldValue, newValue);
    }
  }
  protected attributeChangedCallbackExtend = (_name: string, _oldValue: string, _newValue: string) => {};

  protected render(): string {
    return `
    <style>
      :host {
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        -webkit-tap-highlight-color: transparent;
      }
    </style>
    <input
      class="bs-text-field"
      id="bs-text-field"
      ${this.disabled ? 'disabled' : ''}
      ${this.type ? 'type="' + this.type + '"' : ''}
      ${this.readonly ? 'readonly' : ''}
      ${this.required ? 'required' : ''}
      ${this.placeholder ? 'placeholder="' + this.placeholder + '"' : ''}
      ${this.value ? 'value="' + this.value + '"' : ''}>
    `;
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }
  set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }
  get type(): string {
    return this.getAttribute('type');
  }
  set type(value: string) {
    this.setAttribute('type', value);
  }
  get readonly(): boolean {
    return this.hasAttribute('readonly');
  }
  set readonly(value: boolean) {
    if (value) {
      this.setAttribute('readonly', '');
    } else {
      this.removeAttribute('readonly');
    }
  }
  get required(): boolean {
    return this.hasAttribute('required');
  }
  set required(value: boolean) {
    if (value) {
      this.setAttribute('required', '');
    } else {
      this.removeAttribute('required');
    }
  }
  get placeholder(): string {
    return this.getAttribute('placeholder');
  }
  set placeholder(value: string) {
    this.setAttribute('placeholder', value);
  }
  get value(): string {
    return this.getAttribute('value');
  }
  set value(value: string) {
    this.setAttribute('value', value);
  }
}

export default BaseTextField;
