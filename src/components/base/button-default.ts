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
  static observedAttributesDefault = ['href', 'target', 'disabled', 'data-aria-label'];
  static get observedAttributes() {
    return [...this.observedAttributesDefault];
  }
  get ariaLabel(): string {
    return this.getAttribute('data-aria-label');
  }
  set ariaLabel(value: string) {
    this.setAttribute('data-aria-label', value);
  }
  get href(): string {
    return this.getAttribute('href');
  }
  set href(value: string) {
    this.setAttribute('href', value);
  }
  get target(): string {
    return this.getAttribute('target');
  }
  set target(value: string) {
    this.setAttribute('target', value);
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
  nativeNode: HTMLLinkElement;

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

    this.nativeNode = this.shadowRoot.querySelector(`.${this.tagName.toLowerCase()}`) as HTMLLinkElement;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.nativeNode) {
      if (name === 'href') {
        if (this.nativeNode.tagName === 'A') {
          if (newValue) {
            this.nativeNode.href = newValue;
          } else {
            this.shadowRoot.innerHTML = this.render();
            this.nativeNode = this.shadowRoot.querySelector(`.${this.tagName.toLowerCase()}`) as HTMLLinkElement;
          }
        } else {
          this.shadowRoot.innerHTML = this.render();
          this.nativeNode = this.shadowRoot.querySelector(`.${this.tagName.toLowerCase()}`) as HTMLLinkElement;
        }
      } else if (name === 'target') {
        if (newValue) {
          this.nativeNode.target = newValue;
        } else {
          this.nativeNode.removeAttribute('target');
        }
      } else if (name === 'disabled') {
        this.nativeNode.disabled = this.disabled;
      } else if (name === 'data-aria-label') {
        if (newValue) {
          this.nativeNode.ariaLabel = this.ariaLabel;
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
    return `${this.renderButton()}`;
  }
  protected renderButton(_content: string = '<slot></slot>'): string {
    return `
    <${
      this.href ? 'a' + ' href="' + this.href + '"' + (this.target ? ' target="' + this.target + '"' : '') : 'button'
    } class="${this.tagName.toLowerCase()}"
      ${this.ariaLabel ? 'aria-label="' + this.ariaLabel + '"' : ''}
      ${this.disabled ? 'disabled' : ''}>
      ${_content}
    </${this.href ? 'a' : 'button'}>`;
  }
}

export default BaseButton;
