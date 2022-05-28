/**
 * Base slider component.
 *
 * All the custom with actions like a slider should extend this class.
 */
class BaseSlider extends HTMLElement {
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
  static observedAttributesDefault = ['min', 'max', 'step', 'value', 'disabled', 'data-aria-labelby'];
  static get observedAttributes() {
    return [...this.observedAttributesDefault];
  }
  get min(): number {
    return Number(this.nativeNode ? this.nativeNode.min : this.getAttribute('min'));
  }
  set min(value: number) {
    this.nativeNode.min = value.toString();
    this.nativeNode.ariaValueMin = value.toString();
  }
  get max(): number {
    return Number(this.nativeNode ? this.nativeNode.max : this.getAttribute('max'));
  }
  set max(value: number) {
    this.nativeNode.max = value.toString();
    this.nativeNode.ariaValueMax = value.toString();
  }
  get step(): number {
    return Number(this.nativeNode ? this.nativeNode.step : this.getAttribute('step'));
  }
  set step(value: number) {
    this.nativeNode.step = value.toString();
  }
  get value(): number {
    return Number(this.nativeNode ? this.nativeNode.value : this.getAttribute('value'));
  }
  set value(value: number) {
    this.nativeNode.value = value.toString();
    this.nativeNode.ariaValueNow = value.toString();
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
  get ariaLabelBy(): string {
    return this.nativeNode.getAttribute('data-aria-labelby');
  }
  set ariaLabelBy(value: string) {
    this.nativeNode.setAttribute('data-aria-labelby', value);
  }

  static tagName: string;
  nativeNode: HTMLInputElement;

  /**
   * LIFE CYCLE
   */
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.nativeNode = this.shadowRoot.querySelector('input') as HTMLInputElement;

    this.nativeNode.addEventListener('change', () => this._onChange());
    this.nativeNode.addEventListener('input', () => this._onInput());
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.nativeNode) {
      if (name === 'min') {
        this.nativeNode.min = newValue;
      } else if (name === 'max') {
        this.nativeNode.max = newValue;
      } else if (name === 'step') {
        this.nativeNode.step = newValue;
      } else if (name === 'value') {
        if (this.value.toString() !== this.getAttribute('value')) {
          this.value = Number(this.getAttribute('value'));
          this._onInput();
        }
      } else if (name === 'disabled') {
        this.nativeNode.disabled = this.disabled;
      } else if (name === 'data-aria-labelby') {
        this.nativeNode.setAttribute('aria-labelby', newValue);
      }
    }
  }

  /**
   * RENDERING
   */
  protected render(): string {
    return `${this.renderInput()}`;
  }
  protected renderInput(): string {
    return `
      <input
        class="${this.tagName.toLowerCase()}__input"
        type="range"
        min="${this.min}"
        max="${this.max}"
        value="${this.value ? this.value : 0}" step="${this.step}"
        aria-valuemin="${this.min}"
        aria-valuemax="${this.max}"
        aria-valuenow="${this.value}"
        ${this.disabled ? 'disabled' : ''} />
    `;
  }

  /**
   * EVENT
   */
  /** */
  protected onChange() {}
  protected _onChange(): void {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          value: this.value,
        },
      })
    );
    this.onChange();
  }
  protected onInput() {}
  protected _onInput(): void {
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: {
          value: this.value,
        },
      })
    );
    this.setAttribute('value', this.value.toString());
    this.nativeNode.setAttribute('value', this.value.toString());
    this.nativeNode.setAttribute('aria-valuenow', this.value.toString());
    this.onInput();
  }
}

export default BaseSlider;
