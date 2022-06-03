import BaseSliderRange from '../base/slider-range';

class M3SliderRange extends BaseSliderRange {
  static tagName: string = 'md-slider-range';

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!customElements.get(M3SliderRange.tagName)) {
  customElements.define(M3SliderRange.tagName, M3SliderRange);
}
export default M3SliderRange;
