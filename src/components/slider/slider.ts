import BaseSlider from '../base/slider-default';
import M3SliderStyles from './slider-styles.scss';

/**
 * Slider component.
 */
class M3Slider extends BaseSlider {
  static tagName: string = 'md-slider';
  trackNode: HTMLElement;
  thumbNode: HTMLElement;
  activeFillNode: HTMLElement;

  /**
   * LIFE CYCLE
   */
  connectedCallback() {
    super.connectedCallback();

    this.trackNode = this.shadowRoot.querySelector('.md-slider__track');
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
      <div class="md-slider__track">
        <div class="md-slider__track-inactive"></div>
        <div class="md-slider__track-active">
          <div class="md-slider__track-active-fill"></div>
        </div>
        <div class="md-slider__marks"></div>
        <div class="md-slider__thumb">
          <div class="md-slider__thumb-knob"></div>
        </div>
      </div>
      ${this.renderInput()}
    `;
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
    this.thumbNode.style.transform = `translateX(${((this.value - this.min) / (this.max - this.min)) * this.getBoundingClientRect().width}px)`;
    this.activeFillNode.style.transform = `scaleX(${(this.value - this.min) / (this.max - this.min)})`;
    this.onInput();
  }
}

if (!customElements.get(M3Slider.tagName)) {
  customElements.define(M3Slider.tagName, M3Slider);
}
export default M3Slider;
