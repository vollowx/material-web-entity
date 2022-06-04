import BaseSliderRange from '../base/slider-range';
import M3SliderSharedStyles from './slider-styles-shared.scss';
import M3SliderRangeStyles from './slider-styles-range.scss';

const sharedSheet = new CSSStyleSheet();
sharedSheet.replaceSync(M3SliderSharedStyles);
const sheet = new CSSStyleSheet();
sheet.replaceSync(M3SliderRangeStyles);

class M3SliderRange extends BaseSliderRange {
  static tagName: string = 'md-slider-range';

  override get styleSheet() {
    return [sharedSheet, sheet];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  protected override render(): string {
    return `
      <div class="md-slider">
        <div class="md-slider__track">
          <div class="md-slider__track-inactive"></div>
          <div class="md-slider__track-active">
            <div class="md-slider__track-active-fill"></div>
          </div>
        </div>
        <div class="md-slider__marks"></div>
        <div class="md-slider__thumb">
          <div class="md-slider__thumb-knob"></div>
        </div>
      </div>
      ${this.renderInput('md-slider')}
    `;
  }

  protected override updateSize(): void {
    this.sliderElements[0].style.width = `calc(${this.valueEnd - this.min}% + 16px)`;
    this.sliderElements[1].style.width = `calc(${this.max - this.valueStart}% + 16px)`;
  }
}

if (!customElements.get(M3SliderRange.tagName)) {
  customElements.define(M3SliderRange.tagName, M3SliderRange);
}
export default M3SliderRange;
