/**
 * Base slider component.
 *
 * All the custom with actions like a range slider should extend this class.
 */
class BaseSliderRange extends HTMLElement {
  /**
   * Style sheet
   */
  /** */
  get styleSheet() {
    return [new CSSStyleSheet()];
  }

  /**
   * Attributes
   */
  /** */
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
  sliderContainers: NodeListOf<HTMLElement>;
  
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

    this.sliderElements = this.shadowRoot.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    this.sliderContainers = this.shadowRoot.querySelectorAll('.md-slider__input-container') as NodeListOf<HTMLElement>;

    this.sliderElements[0].addEventListener('change', () => this._onChangeStart());
    this.sliderElements[1].addEventListener('change', () => this._onChangeEnd());
    this.sliderElements[0].addEventListener('input', () => this._onInputStart());
    this.sliderElements[1].addEventListener('input', () => this._onInputEnd());
    this.updateSize();
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
    this.removeEventListener('mousemove', (e) => this._onMouseMove(e));
  }

  /**
   * Render
   */
  protected render(): string {
    return `${this.renderInput()}`;
  }
  protected renderInput(_className: string = this.tagName.toLowerCase()): string {
    return `
      <div class="${_className}__input-containers">
      <div class="${_className}__input-container start"><input
        class="${_className}__input start"
        type="range"
        min="${this.min}"
        max="${this.valueEnd}"
        value="${this.valueStart ? this.valueStart : this.min}" step="${this.step}"
        aria-valuemin="${this.min}"
        aria-valuemax="${this.valueEnd}"
        aria-valuenow="${this.valueStart ? this.valueStart : this.min}"
        ${this.disabled ? 'disabled' : ''} /></div>
      <div class="${_className}__input-container end"><input
        class="${_className}__input end"
        type="range"
        min="${this.valueStart}"
        max="${this.max}"
        value="${this.valueEnd ? this.valueEnd : this.min}" step="${this.step}"
        aria-valuemin="${this.valueStart}"
        aria-valuemax="${this.max}"
        aria-valuenow="${this.valueEnd ? this.valueEnd : this.min}"
        ${this.disabled ? 'disabled' : ''} /></div></div>
    `;
  }

  protected updateSize(): void {
    this.sliderElements[0].style.width = `${this.valueEnd - this.min}%`;
    this.sliderElements[1].style.width = `${this.max - this.valueStart}%`;
  }

  /**
   * EVENT
   */
  /** */
  protected _onMouseMove(e: MouseEvent): void {
    let rect = this.getBoundingClientRect();
    let position = ((e.clientX - rect.left) / rect.width) * (this.max - this.min) + this.min;
    let middleValue = (this.valueStart + this.valueEnd) / 2;

    if (position < middleValue && this.sliderElements[0].style.zIndex !== '2') {
      this.sliderElements[0].style.zIndex = '2';
    } else if (position >= middleValue && this.sliderElements[0].style.zIndex !== '0') {
      this.sliderElements[0].style.zIndex = '0';
    }
  }
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
    this.updateSize();
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
    this.updateSize();
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
    this.updateSize();
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
    this.updateSize();
    this.onInputEnd();
  }
}

export default BaseSliderRange;
