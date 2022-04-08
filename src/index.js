import * as MComponents from './components/index.js';
import * as MUtils from './utils/index.js';

export { MComponents, MUtils };

customElements.define('md-button', MComponents.Button);
customElements.define('md-ripple', MComponents.Ripple);
