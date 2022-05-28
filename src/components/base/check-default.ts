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
  static observedAttributesDefault = ['checked', 'disabled'];
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
    this.nativeNode = this.shadowRoot.querySelector('.bs-check') as HTMLInputElement;
    this.nativeNode.addEventListener('change', (e) => this.onChange(e));
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.nativeNode) {
      if (name === 'checked') {
        if (this.checked !== this.hasAttribute('checked')) {
          this.checked = this.hasAttribute('checked');
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

  protected onChange(event: Event) {
    if (this.nativeNode.checked) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
    this.dispatchEvent(new Event('change'));
    this.exChange();
  }
  protected exChange() {}
}

export default BaseCheck;
