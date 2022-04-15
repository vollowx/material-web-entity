import * as MComponents from './components/index.js';
import * as M from './utils/index.js';
import './libs/focus-visible.js';

export { MComponents, M };

customElements.define('md-avatar', MComponents.Avatar);
customElements.define('md-button', MComponents.Button);
customElements.define('md-chip', MComponents.Chip);
customElements.define('md-icon', MComponents.Icon);
customElements.define('md-ripple', MComponents.Ripple);
customElements.define('md-typo', MComponents.Typography);
