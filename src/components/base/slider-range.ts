/**
 * Base slider component.
 *
 * All the custom with actions like a range slider should extend this class.
 */
class BaseSliderRange extends HTMLElement {
  /**
   * STYLE SHEET
   */
  /** */
  get styleSheet() {
    return [new CSSStyleSheet()];
  }

  /**
   * ATTRIBUTES
   */
  static observedAttributesDefault = ['min', 'max', 'step', 'valuestart', 'valueend', 'disabled'];
  static get observedAttributes() {
    return [...this.observedAttributesDefault];
  }
  get min(): number {
    return Number(this.sliderElements ? this.sliderElements[0].min : this.getAttribute('min'));
  }
  set min(value: number) {
    this.sliderElements[0].min = value.toString();
    this.sliderElements[0].ariaValueMin = value.toString();
  }
  get max(): number {
    return Number(this.sliderElements ? this.sliderElements[1].max : this.getAttribute('max'));
  }
  set max(value: number) {
    this.sliderElements[1].max = value.toString();
    this.sliderElements[1].ariaValueMax = value.toString();
  }
  get step(): number {
    return Number(this.sliderElements ? this.sliderElements[0].step : this.getAttribute('step'));
  }
  set step(value: number) {
    this.sliderElements[0].step = value.toString();
    this.sliderElements[1].step = value.toString();
  }
  get valueStart(): number {
    return Number(this.sliderElements ? this.sliderElements[0].value : 0);
  }
  set valueStart(value: number) {
    this.sliderElements[0].value = value.toString();
    this.sliderElements[0].ariaValueNow = value.toString();
  }
  get valueEnd(): number {
    return Number(this.sliderElements ? this.sliderElements[1].value : 0);
  }
  set valueEnd(value: number) {
    this.sliderElements[1].value = value.toString();
    this.sliderElements[1].ariaValueNow = value.toString();
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
  sliderElements: NodeListOf<HTMLInputElement>;

  /**
   * LIFE CYCLE
   */
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
    this.shadowRoot.adoptedStyleSheets = this.styleSheet;

    this.sliderElements = this.shadowRoot.querySelectorAll('input') as NodeListOf<HTMLInputElement>;

    this.sliderElements[0].addEventListener('change', () => this._onChangeStart());
    this.sliderElements[1].addEventListener('change', () => this._onChangeEnd());
    this.sliderElements[0].addEventListener('input', () => this._onInputStart());
    this.sliderElements[1].addEventListener('input', () => this._onInputEnd());
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.sliderElements) {
      if (name === 'min') {
        this.sliderElements[0].min = newValue;
        this.sliderElements[0].ariaValueMin = newValue;
      } else if (name === 'max') {
        this.sliderElements[1].max = newValue;
        this.sliderElements[1].ariaValueMax = newValue;
      } else if (name === 'step') {
        this.sliderElements[0].step = newValue;
        this.sliderElements[1].step = newValue;
      } else if (name === 'valuestart') {
        this.sliderElements[0].value = newValue;
        this.sliderElements[0].ariaValueNow = newValue;
      } else if (name === 'valueend') {
        this.sliderElements[1].value = newValue;
        this.sliderElements[1].ariaValueNow = newValue;
      } else if (name === 'disabled') {
        this.sliderElements[0].disabled = this.disabled;
        this.sliderElements[1].disabled = this.disabled;
      }
    }
  }
  disconnectedCallback() {
    this.sliderElements[0].removeEventListener('change', () => this._onChangeStart());
    this.sliderElements[1].removeEventListener('change', () => this._onChangeEnd());
    this.sliderElements[0].removeEventListener('input', () => this._onInputStart());
    this.sliderElements[1].removeEventListener('input', () => this._onInputEnd());
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
        class="${this.tagName.toLowerCase()}__input-start"
        type="range"
        min="${this.min}"
        max="${this.valueEnd}"
        value="${this.valueStart}" step="${this.step}"
        aria-valuemin="${this.min}"
        aria-valuemax="${this.valueEnd}"
        aria-valuenow="${this.valueStart}"
        ${this.disabled ? 'disabled' : ''} />
      <input
        class="${this.tagName.toLowerCase()}__input-end"
        type="range"
        min="${this.valueStart}"
        max="${this.max}"
        value="${this.valueEnd}" step="${this.step}"
        aria-valuemin="${this.valueStart}"
        aria-valuemax="${this.max}"
        aria-valuenow="${this.valueEnd}"
        ${this.disabled ? 'disabled' : ''} />
    `;
  }

  /**
   * EVENT
   */
  /** */
  protected onChangeStart() {}
  protected _onChangeStart(): void {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          valueStart: this.valueStart,
          valueEnd: this.valueEnd,
        },
      })
    );
    this.sliderElements[0].ariaValueNow = this.valueStart.toString();
    this.sliderElements[1].min = this.valueStart.toString();
    this.sliderElements[1].ariaValueMin = this.valueStart.toString();
    this.onChangeStart();
  }
  protected onChangeEnd() {}
  protected _onChangeEnd(): void {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          valueStart: this.valueStart,
          valueEnd: this.valueEnd,
        },
      })
    );
    this.sliderElements[1].ariaValueNow = this.valueEnd.toString();
    this.sliderElements[0].max = this.valueEnd.toString();
    this.sliderElements[0].ariaValueMax = this.valueEnd.toString();
    this.onChangeEnd();
  }
  protected onInputStart() {}
  protected _onInputStart(): void {
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: {
          valueStart: this.valueStart,
          valueEnd: this.valueEnd,
        },
      })
    );
    this.sliderElements[0].ariaValueNow = this.valueStart.toString();
    this.sliderElements[1].min = this.valueStart.toString();
    this.sliderElements[1].ariaValueMin = this.valueStart.toString();
    this.onInputStart();
  }
  protected onInputEnd() {}
  protected _onInputEnd(): void {
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: {
          valueStart: this.valueStart,
          valueEnd: this.valueEnd,
        },
      })
    );
    this.sliderElements[1].ariaValueNow = this.valueEnd.toString();
    this.sliderElements[0].max = this.valueEnd.toString();
    this.sliderElements[0].ariaValueMax = this.valueEnd.toString();
    this.onInputEnd();
  }
}

export default BaseSliderRange;
