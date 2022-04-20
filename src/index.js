import * as MComponents from './components/index.js';
import * as M from './utils/index.js';
import './libs/focus-visible.js';

export { MComponents, M };

customElements.define('md-avatar', MComponents.Avatar);
customElements.define('md-button', MComponents.Button);
customElements.define('md-chip', MComponents.Chip);
customElements.define('md-fab', MComponents.FAB);
customElements.define('md-icon', MComponents.Icon);
customElements.define('md-menu', MComponents.Menu);
customElements.define('md-menu-item', MComponents.MenuItem);
customElements.define('md-ripple', MComponents.Ripple);
customElements.define('md-typo', MComponents.Typography);
