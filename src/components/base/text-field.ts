/**
 * Base text field component.
 *
 * All the custom with actions like a text field should extend this class.
 */
class BaseTextField extends HTMLElement {
  /**
   * STYLE SHEET
   */
  /** */
  get styleSheet() {
    return [new CSSStyleSheet()];
  }

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
    this.inputElement.focus();
  }

  static tagName: string;
  inputElement: HTMLInputElement;

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
    this.shadowRoot.adoptedStyleSheets = this.styleSheet;

    this.inputElement = this.shadowRoot.querySelector(`.${this.tagName.toLowerCase()}`) as HTMLInputElement;
    this.binds();
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.inputElement) {
      if (name === 'disabled') {
        this.inputElement.disabled = this.disabled;
      } else if (name === 'type') {
        this.inputElement.type = this.type;
      } else if (name === 'readonly') {
        this.inputElement.readOnly = this.readonly;
      } else if (name === 'required') {
        this.inputElement.required = this.required;
      } else if (name === 'placeholder') {
        this.inputElement.placeholder = this.placeholder;
      } else if (name === 'value') {
        if (this.inputElement.value !== this.value) {
          this.inputElement.value = this.value;
          this._onChange();
        }
      } else if (name === 'autocomplete') {
        this.inputElement.autocomplete = this.autocomplete;
      } else if (name === 'maxlength') {
        this.inputElement.maxLength = this.maxlength;
      }
    }
  }

  /**
   * RENDERING
   */
  /** */
  protected render(): string {
    return `${this.renderInput(this.tagName.toLowerCase())}`;
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
    this.inputElement.addEventListener('focus', () => this._onFocus());
    this.inputElement.addEventListener('blur', () => this._onBlur());
    this.inputElement.addEventListener('change', () => this._onChange());
    this.inputElement.addEventListener('input', () => this._onInput());
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
    if (this.value !== this.inputElement.value) {
      this.value = this.inputElement.value;
    }
    this.onChange();
  }
  protected onInput() {}
  protected _onInput(): void {
    this.value = this.inputElement.value;
    this.onInput();
  }
}

export default BaseTextField;
