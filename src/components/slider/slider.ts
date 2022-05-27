import BaseSlider from '../base/slider';
import M3SliderStyles from './slider-styles.scss';

/**
 * Slider component.
 */
class M3Slider extends BaseSlider {
  static tagName: string = 'md-slider';
}

if (!customElements.get(M3Slider.tagName)) {
  customElements.define(M3Slider.tagName, M3Slider);
}
export default M3Slider;
