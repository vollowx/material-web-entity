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
  static observedAttributesDefault = ['min', 'max', 'step', 'value', 'data-aria-labelby'];
  static get observedAttributes() {
    return [...this.observedAttributesDefault];
  }
  get min(): number {
    return Number(this.nativeNode ? this.nativeNode.min : this.getAttribute('min'));
  }
  set min(value: number) {
    this.nativeNode.min = value.toString();
  }
  get max(): number {
    return Number(this.nativeNode ? this.nativeNode.max : this.getAttribute('max'));
  }
  set max(value: number) {
    this.nativeNode.max = value.toString();
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
        this.nativeNode.value = newValue;
      } else if (name === 'data-aria-labelby') {
        this.nativeNode.setAttribute('aria-labelby', newValue);
      }
    }
  }

  /**
   * RENDERING
   */
  render(): string {
    return `${this.renderInput()}`;
  }
  renderInput(): string {
    return `
      <input
        class="${this.tagName.toLowerCase()}"
        type="range"
        min="${this.min}"
        max="${this.max}"
        value="${this.value ? this.value : 0}" step="${this.step}" />
    `;
  }
}

export default BaseSlider;
