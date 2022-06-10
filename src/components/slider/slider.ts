import BaseSlider from '../shared/slider-default';
import M3SliderSharedStyles from './slider-styles-shared.scss';
import M3SliderStyles from './slider-styles.scss';

const sharedSheet = new CSSStyleSheet();
sharedSheet.replaceSync(M3SliderSharedStyles);
const sheet = new CSSStyleSheet();
sheet.replaceSync(M3SliderStyles);

/**
 * Slider component.
 */
class M3Slider extends BaseSlider {
  override get styleSheet() {
    return [sharedSheet, sheet];
  }

  static get observedAttributes() {
    return ['marks', ...this.observedAttributesDefault];
  }
  get marks(): boolean {
    return this.hasAttribute('marks');
  }
  set marks(value: boolean) {
    if (value) {
      this.setAttribute('marks', '');
    } else {
      this.removeAttribute('marks');
    }
  }

  static tagName: string = 'md-slider';
  trackElement: HTMLElement;
  marksElement: HTMLElement;
  thumbElement: HTMLElement;
  activeFillElement: HTMLElement;

  /**
   * Life cycle
   */
  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('resize', () => this._onResize());

    this.trackElement = this.shadowRoot.querySelector('.md-slider__track');
    this.marksElement = this.shadowRoot.querySelector('.md-slider__marks');
    this.thumbElement = this.shadowRoot.querySelector('.md-slider__thumb');
    this.activeFillElement = this.shadowRoot.querySelector('.md-slider__track-active-fill');

    this._onInput();
  }
  disconnectedCallback() {
    window.removeEventListener('resize', () => this._onResize());
  }

  /**
   * Render
   */
  protected override render(): string {
    return `
      <div class="md-slider">
        <div class="md-slider__track">
          <div class="md-slider__track-inactive"></div>
          <div class="md-slider__track-active">
            <div class="md-slider__track-active-fill"></div>
          </div>
        </div>
        <div class="md-slider__marks">${this.renderMarks()}</div>
        <div class="md-slider__thumb">
          <div class="md-slider__thumb-knob"></div>
        </div>
      </div>
      ${this.renderInput()}
    `;
  }
  protected renderMarks(): string {
    let marks = [];
    for (let i = this.min; i <= this.value; i += this.step) {
      marks.push(`<span class="md-slider__mark--active"></span>`);
    }
    for (let i = this.value + this.step; i <= this.max; i += this.step) {
      marks.push(`<span class="md-slider__mark--inactive"></span>`);
    }
    return this.marks ? marks.join('') : '';
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (this.sliderElement) {
      if (name === 'marks' || name === 'step' || name === 'min' || name === 'max') {
        this.marksElement.innerHTML = this.renderMarks();
      } else if (name === 'value') {
        this.marksElement.innerHTML = this.renderMarks();
        if (this.value !== Number(this.getAttribute('value'))) {
          this.value = Number(this.getAttribute('value'));
          this._onInput();
        }
      }
    }
  }

  /**
   * EVENT
   */
  /** */
  protected override _onInput(): void {
    super._onInput();
    this.thumbElement.style.transform = `translateX(${
      ((this.value - this.min) / (this.max - this.min)) * this.getBoundingClientRect().width
    }px)`;
    this.activeFillElement.style.transform = `scaleX(${(this.value - this.min) / (this.max - this.min)})`;
    this.marksElement.innerHTML = this.renderMarks();
    this.onInput();
  }
  protected _onResize(): void {
    this.thumbElement.style.transform = `translateX(${
      ((this.value - this.min) / (this.max - this.min)) * this.getBoundingClientRect().width
    }px)`;
  }
}

if (!customElements.get(M3Slider.tagName)) {
  customElements.define(M3Slider.tagName, M3Slider);
}
export default M3Slider;
