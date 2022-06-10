/**
 * Base slider component.
 *
 * All the custom with actions like a slider should extend this class.
 */
class BaseSlider extends HTMLElement {
  /**
   * Style sheet
   */
  /** */
  get styleSheet() {
    return [new CSSStyleSheet()];
  }

  /**
   * Attributes
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
  static observedAttributesDefault = ['min', 'max', 'step', 'value', 'disabled'];
  static get observedAttributes() {
    return [...this.observedAttributesDefault];
  }
  get min(): number {
    return Number(this.sliderElement ? this.sliderElement.min : this.getAttribute('min'));
  }
  set min(value: number) {
    this.sliderElement.min = value.toString();
    this.sliderElement.ariaValueMin = value.toString();
  }
  get max(): number {
    return Number(this.sliderElement ? this.sliderElement.max : this.getAttribute('max'));
  }
  set max(value: number) {
    this.sliderElement.max = value.toString();
    this.sliderElement.ariaValueMax = value.toString();
  }
  get step(): number {
    return Number(this.sliderElement ? this.sliderElement.step : this.getAttribute('step'));
  }
  set step(value: number) {
    this.sliderElement.step = value.toString();
  }
  get value(): number {
    return Number(this.sliderElement ? this.sliderElement.value : this.getAttribute('value'));
  }
  set value(value: number) {
    this.sliderElement.value = value.toString();
    this.sliderElement.ariaValueNow = value.toString();
    this._onInput();
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

  static tagName: string;
  sliderElement: HTMLInputElement;

  /**
   * Life cycle
   */
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
    this.shadowRoot.adoptedStyleSheets = this.styleSheet;

    this.sliderElement = this.shadowRoot.querySelector('input') as HTMLInputElement;

    this.sliderElement.addEventListener('change', () => this._onChange());
    this.sliderElement.addEventListener('input', () => this._onInput());
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.sliderElement) {
      if (name === 'min') {
        this.sliderElement.min = newValue;
        this.sliderElement.ariaValueMin = newValue;
      } else if (name === 'max') {
        this.sliderElement.max = newValue;
        this.sliderElement.ariaValueMax = newValue;
      } else if (name === 'step') {
        this.sliderElement.step = newValue;
      } else if (name === 'value') {
        if (this.value.toString() !== this.getAttribute('value')) {
          this.value = Number(this.getAttribute('value'));
        }
        this._onInput();
      } else if (name === 'disabled') {
        this.sliderElement.disabled = this.disabled;
      }
    }
  }
  disconnectedCallback() {
    this.sliderElement.removeEventListener('change', () => this._onChange());
    this.sliderElement.removeEventListener('input', () => this._onInput());
  }

  /**
   * Render
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
        value="${this.value ? this.value : this.min}" step="${this.step}"
        aria-valuemin="${this.min}"
        aria-valuemax="${this.max}"
        aria-valuenow="${this.value ? this.value : this.min}"
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
    this.sliderElement.setAttribute('aria-valuenow', this.value.toString());
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
    this.sliderElement.setAttribute('aria-valuenow', this.value.toString());
    this.onInput();
  }
}

export default BaseSlider;
