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
    return this.nativeNode ? this.nativeNode.checked : this.hasAttribute('checked');
  }
  set checked(value: boolean) {
    this.nativeNode.checked = value;
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
    return this.nativeNode.tabIndex;
  }
  set tabIndex(value: number) {
    this.nativeNode.tabIndex = value;
  }
  get ariaLabel(): string {
    return this.getAttribute('data-aria-label');
  }
  set ariaLabel(value: string) {
    this.setAttribute('data-aria-label', value);
  }
  focus() {
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
    this.nativeNode = this.shadowRoot.querySelector(`.${this.tagName.toLowerCase()}__input`) as HTMLInputElement;

    this.nativeNode.addEventListener('change', (e) => this._onChange(e));
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.nativeNode) {
      if (name === 'checked') {
        if (this.checked !== this.hasAttribute('checked')) {
          this.checked = this.hasAttribute('checked');
        }
        this.nativeNode.setAttribute('aria-checked', this.checked.toString());
      } else if (name === 'disabled') {
        this.nativeNode.disabled = this.disabled;
      } else if (name === 'data-aria-label') {
        if (newValue) {
          this.nativeNode.ariaLabel = newValue;
        } else {
          this.nativeNode.removeAttribute('aria-label');
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
    if (this.nativeNode.checked) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
    this.dispatchEvent(new Event('change'));
    this.onChange();
  }
}

export default BaseCheck;
