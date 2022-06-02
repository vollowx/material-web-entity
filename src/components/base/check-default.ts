/**
 * Base check component.
 *
 * All the custom with actions like a checkbox should extend this class.
 */
class BaseCheck extends HTMLElement {
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
  static observedAttributesDefault = ['checked', 'disabled', 'data-aria-label'];
  static get observedAttributes() {
    return [...this.observedAttributesDefault];
  }
  get checked(): boolean {
    return this.checkElement ? this.checkElement.checked : this.hasAttribute('checked');
  }
  set checked(value: boolean) {
    this.checkElement.checked = value;
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
  get tabIndex(): number {
    return this.checkElement.tabIndex;
  }
  set tabIndex(value: number) {
    this.checkElement.tabIndex = value;
  }
  get ariaLabel(): string {
    return this.getAttribute('data-aria-label');
  }
  set ariaLabel(value: string) {
    this.setAttribute('data-aria-label', value);
  }
  focus() {
    this.checkElement.focus();
  }

  static tagName: string;
  checkElement: HTMLInputElement;

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
    this.checkElement = this.shadowRoot.querySelector(`.${this.tagName.toLowerCase()}__input`) as HTMLInputElement;

    this.checkElement.addEventListener('change', (e) => this._onChange(e));
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.checkElement) {
      if (name === 'checked') {
        if (this.checked !== this.hasAttribute('checked')) {
          this.checked = this.hasAttribute('checked');
        }
        this.checkElement.setAttribute('aria-checked', this.checked.toString());
      } else if (name === 'disabled') {
        this.checkElement.disabled = this.disabled;
      } else if (name === 'data-aria-label') {
        if (newValue) {
          this.checkElement.ariaLabel = newValue;
        } else {
          this.checkElement.removeAttribute('aria-label');
        }
      }
    }
  }

  /**
   * RENDERING
   */
  /** */
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
      type="checkbox"
      class="md-check"
      ${this.disabled ? 'disabled' : ''}
      ${this.hasAttribute('checked') ? 'checked' : ''} />`;
  }

  protected onChange() {}
  protected _onChange(event: Event) {
    if (this.checkElement.checked) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
    this.dispatchEvent(new Event('change'));
    this.onChange();
  }
}

export default BaseCheck;
