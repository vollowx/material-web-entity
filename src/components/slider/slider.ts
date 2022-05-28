import BaseSlider from '../base/slider-default';
import M3SliderStyles from './slider-styles.scss';

/**
 * Slider component.
 */
class M3Slider extends BaseSlider {
  /**
   * ATTRIBUTES
   */
  /** */
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
  trackNode: HTMLElement;
  marksNode: HTMLElement;
  thumbNode: HTMLElement;
  activeFillNode: HTMLElement;

  /**
   * LIFE CYCLE
   */
  connectedCallback() {
    super.connectedCallback();

    this.trackNode = this.shadowRoot.querySelector('.md-slider__track');
    this.marksNode = this.shadowRoot.querySelector('.md-slider__marks');
    this.thumbNode = this.shadowRoot.querySelector('.md-slider__thumb');
    this.activeFillNode = this.shadowRoot.querySelector('.md-slider__track-active-fill');

    this._onInput();
  }

  /**
   * RENDERING
   */
  protected override render(): string {
    return `
      <style>${M3SliderStyles}</style>
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
    if (this.nativeNode) {
      if (name === 'marks') {
        this.marks = this.marks;
        this.marksNode.innerHTML = this.renderMarks();
      }
    }
  }

  /**
   * EVENT
   */
  /** */
  protected override _onInput(): void {
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: {
          value: this.value,
        },
      })
    );
    this.thumbNode.style.transform = `translateX(${ ((this.value - this.min) / (this.max - this.min)) * this.getBoundingClientRect().width }px)`;
    this.activeFillNode.style.transform = `scaleX(${(this.value - this.min) / (this.max - this.min)})`;
    this.marksNode.innerHTML = this.renderMarks();
    this.onInput();
  }
}

if (!customElements.get(M3Slider.tagName)) {
  customElements.define(M3Slider.tagName, M3Slider);
}
export default M3Slider;
