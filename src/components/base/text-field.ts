/**
 * Base text field component.
 *
 * All the custom with actions like a text field should extend this class.
 */
class BaseTextField extends HTMLElement {
  /**
   * ATTRIBUTES
   *
   * `observedAttributesDefault` is a list of attributes that are observed by default.
   * When extending this class, use
   * ```js
   * static get observedAttributes() {
   *   return [...this.observedAttributesDefault];
   * }
   * ```
   * setter, getter for setting, getting the attributes easier and more intuitive.
   */
  /** */
  static observedAttributesDefault = [
    'disabled',
    'type',
    'readonly',
    'required',
    'placeholder',
    'value',
    'autocomplete',
    'maxlength',
  ];
  static get observedAttributes() {
    return [...this.observedAttributesDefault];
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
  get autocomplete(): string {
    return this.getAttribute('autocomplete');
  }
  set autocomplete(value: string) {
    this.setAttribute('autocomplete', value);
  }
  get maxlength(): number {
    return this.getAttribute('maxlength') ? parseInt(this.getAttribute('maxlength')) : 0;
  }
  set maxlength(value: number) {
    this.setAttribute('maxlength', value.toString());
  }
  focus(): void {
    this.nativeNode.focus();
  }

  static tagName: string;
  nativeNode: HTMLInputElement;

  /**
   * LIFE CYCLE
   */
  /** */
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.nativeNode = this.shadowRoot.querySelector(`.${this.tagName.toLowerCase()}`) as HTMLInputElement;
    this.binds();
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
      } else if (name === 'autocomplete') {
        this.nativeNode.autocomplete = this.autocomplete;
      } else if (name === 'maxlength') {
        this.nativeNode.maxLength = this.maxlength;
      }
      this.exAttributeChangedCallback(name, oldValue, newValue);
    }
  }
  protected exAttributeChangedCallback = (name: string, oldValue: string, newValue: string) => {};

  /**
   * RENDERING
   */
  /** */
  protected render(): string {
    return `${this.renderInput('bs-text-field')}`;
  }
  protected renderInput(_className: string): string {
    return `
    <input
      class="${_className}"
      ${this.disabled ? 'disabled' : ''}
      ${this.type ? 'type="' + this.type + '"' : ''}
      ${this.readonly ? 'readonly' : ''}
      ${this.required ? 'required' : ''}
      ${this.placeholder ? 'placeholder="' + this.placeholder + '"' : ''}
      ${this.value ? 'value="' + this.value + '"' : ''}
      ${this.autocomplete ? 'autocomplete="' + this.autocomplete + '"' : ''}
      ${this.maxlength ? 'maxlength="' + this.maxlength + '"' : ''}
    />`;
  }

  protected binds() {
    this.nativeNode.addEventListener('focus', () => this._onFocus());
    this.nativeNode.addEventListener('blur', () => this._onBlur());
    this.nativeNode.addEventListener('change', () => this._onChange());
    this.nativeNode.addEventListener('input', () => this._onInput());
  }

  /**
   * EVENTS
   *
   * ALl the functions with '_' prefix are for internal use only.
   * To extend this class, override the functions with '_' prefix,
   * the functions without '_' prefix are for external use.
   */
  /** */
  protected onFocus() {}
  protected _onFocus(): void {
    this.onFocus();
  }
  protected onBlur() {}
  protected _onBlur(): void {
    this.onBlur();
  }
  protected onChange() {}
  protected _onChange(): void {
    this.value = this.nativeNode.value;
    this.onChange();
  }
  protected onInput() {}
  protected _onInput(): void {
    this.value = this.nativeNode.value;
    this.onInput();
  }
}

export default BaseTextField;
