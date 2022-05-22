/**
 * Base button component.
 *
 * All the custom with actions like a button should extend this class.
 */
class BaseButton extends HTMLElement {
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
  static observedAttributesDefault = ['data-aria-label', 'disabled'];
  static get observedAttributes() {
    return [...this.observedAttributesDefault];
  }
  get ariaLabel(): string {
    return this.getAttribute('data-aria-label');
  }
  set ariaLabel(value: string) {
    this.setAttribute('data-aria-label', value);
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
  focus() {
    this.nativeNode.focus();
  }

  static tagName: string;
  nativeNode: HTMLButtonElement;

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

    this.nativeNode = this.shadowRoot.querySelector('.bs-button') as HTMLButtonElement;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.nativeNode) {
      if (name === 'data-aria-label') {
        if (newValue) {
          this.nativeNode.ariaLabel = this.ariaLabel;
        } else {
          this.nativeNode.removeAttribute('aria-label');
        }
      } else if (name === 'disabled') {
        this.nativeNode.disabled = this.disabled;
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
    return `${this.renderButton('bs-button')}`;
  }
  protected renderButton(_className: string): string {
    return `
    <button class="${_className}"
      ${this.ariaLabel ? 'aria-label="' + this.ariaLabel + '"' : ''}
      ${this.disabled ? 'disabled' : ''}>
      <slot></slot>
    </button>`;
  }
}

export default BaseButton;
