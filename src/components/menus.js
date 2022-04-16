/**
 * Menu component.
 *
 * Description.
 */

class Menu extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  /**
   * Render the contents
   */
  render() {
    let styles = document.createElement('style');
    styles.textContent = `
    :host {
      --md-icon-size: 24px;
      --md-menu-padding: 20px;
      z-index: 12;
    }
    .md-menu {
      display: flex;
      flex-direction: column;
      position: fixed;
      padding: 8px 0;
      width: max-content;
      max-height: 100vh;
      overflow-y: auto;
      background-color: rgb(var(--md-c-surface-variant-rgb));
      box-shadow: var(--md-e-shadow-2);
      border-radius: 4px;
      transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1), opacity 120ms cubic-bezier(0.4, 0, 0.2, 1);
      transform: scale(0.9, 0.9);
      transform-origin: top left;
      opacity: 0;
      pointer-events: none;
      visibility: invisible;
      box-sizing: border-box;
      z-index: 14;
    }
    .md-menu.md-menu--bottom {
      transform-origin: bottom left;
    }
    .md-menu.md-menu--right {
      transform-origin: top right;
    }
    .md-menu.md-menu--bottom.md-menu--right {
      transform-origin: bottom right;
    }
    :host([open]) .md-menu {
      transform: scale(1, 1);
      opacity: 1;
      pointer-events: initial;
      visibility: visible;
    }
    :host([sub][open]) .md-menu {
      transition-delay: 240ms;
    }
    :host([dense]) {
      --md-icon-size: 16px;
      --md-menu-padding: 16px;
    }
    :host([dense]) ::slotted(md-menu-item) {
      height: 36px;
    }
    :host([fast]) {
      --md-hover-transition-time: 0ms;
    }
    :host([fast]) .md-menu {
      transition-duration: 0ms;
      transition-delay: 0ms !important;
    }
    ::slotted(md-divider) {
      display: block;
      height: 1px;
      background-color: rgba(var(--md-c-on-surface-rgb), 0.08);
      margin: 7.5px 0;
    }
    `;

    let template = document.createElement('template');
    template.innerHTML = `
    <div class="md-menu" id="md-menu">
      <slot></slot>
    </div>
    `;

    this.shadowRoot.appendChild(styles);
    this.shadowRoot.innerHTML += template.innerHTML;
  }

  get open() {
    return this.getAttribute('open') != undefined;
  }
  get dense() {
    return this.getAttribute('dense') != undefined;
  }
  get fast() {
    return this.getAttribute('fast') != undefined;
  }
  get sub() {
    return this.getAttribute('sub') != undefined;
  }
  /**
   * @param value {Boolean}
   */
  set open(value) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }
  /**
   * @param value {Boolean}
   */
  set dense(value) {
    if (value) {
      this.setAttribute('dense', '');
    } else {
      this.removeAttribute('dense');
    }
  }
  /**
   * @param value {Boolean}
   */
  set fast(value) {
    if (value) {
      this.setAttribute('fast', '');
    } else {
      this.removeAttribute('fast');
    }
  }
  /**
   * @param value {Boolean}
   */
  set sub(value) {
    if (value) {
      this.setAttribute('sub', '');
    } else {
      this.removeAttribute('sub');
    }
  }

  /**
   * @param isSub {Boolean}
   */
  setPosition(isSub = false) {
    this.menuE.removeAttribute('style');
    this.menuE.classList.remove('md-menu--bottom', 'md-menu--right');
    let rect = this.controllerE.getBoundingClientRect();
    let top, left;
    if (isSub) {
      top = rect.top - 8;
      left = rect.left + rect.width - 4;
    } else {
      top = rect.top + rect.height;
      left = rect.left;
    }
    if (top + this.menuE.offsetHeight > window.innerHeight) {
      this.menuE.classList.add('md-menu--bottom');
      if (isSub) {
        top += 16 + rect.height;
      }
    }
    if (left + this.menuE.offsetWidth > window.innerWidth) {
      this.menuE.classList.add('md-menu--right');
      if (isSub && this.dense) {
        left -= rect.width * 2 - 52;
      } else if (isSub) {
        left -= rect.width * 2 - 48;
      }
    }
    while (top + this.menuE.offsetHeight > window.innerHeight) {
      top -= this.menuE.offsetHeight;
    }
    while (left + this.menuE.offsetWidth > window.innerWidth) {
      left -= this.menuE.offsetWidth;
    }
    if (top < 0) {
      top = 8;
    }
    if (this.menuE.offsetHeight + top > window.innerHeight) {
      this.menuE.style.bottom = '8px';
    }
    if (left < 0) {
      left = 8;
    }
    this.menuE.style.top = top + 'px';
    this.menuE.style.left = left + 'px';
    this.open = true;
  }

  static get observedAttributes() {
    return [];
  }
  connectedCallback() {
    this.render();

    this.menuE = this.shadowRoot.getElementById('md-menu');
    document.addEventListener('click', (e) => {
      if (this.open && !this.contains(e.target) && e.target !== this.controllerE) {
        this.open = false;
      }
    });
    this.addEventListener('click', (e) => {
      let path = e.composedPath();
      if (path.indexOf(this) == 6 && e.target.getAttribute('subber') == undefined) {
        this.open = false;
      }
    });

    window.addEventListener('load', () => {
      this.controllerE = document.querySelector(`#${this.id}`);

      if (this.controllerE) {
        if (this.sub) {
          this.controllerE.addEventListener('mouseover', (e) => this.setPosition(true));
          this.controllerE.addEventListener('mouseout', (e) => (this.open = false));
          this.addEventListener('mouseover', () => (this.open = true));
          this.addEventListener('mouseout', () => (this.open = false));
        } else {
          this.controllerE.addEventListener('click', (e) => this.setPosition());
        }
      }
    });
  }
  attributeChangedCallback(attrName, oldVal, newVal) {}
  adoptedCallback() {}
  disconnectedCallback() {}
}

/**
 * Menu component.
 *
 * Description.
 */

class MenuItem extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  /**
   * Render the contents
   */
  render() {
    let styles = document.createElement('style');
    styles.textContent = `
    :host {
      position: relative;
      box-sizing: border-box;
      flex-shrink: 0;
      height: 48px;
    }
    .md-menu__item {
      display: flex;
      align-items: center;
      position: relative;
      padding: 0;
      width: 100%;
      height: 100%;
      color: rgb(var(--md-c-on-surface-variant-rgb));
      font-family: var(--md-t-font-family);
      font-size: 0.875rem;
      font-weight: calc(var(--md-t-font-base-weight) + 500);
      line-height: 1.428571428571429;
      letter-spacing: 0.1px;
      background-color: transparent;
      border: none;
      outline: 0;
      cursor: pointer;
      box-sizing: border-box;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      -webkit-appearance: none;
      -moz-appearance: none;
    }
    .md-menu__item * {
      pointer-events: none;
    }
    .md-menu__item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: currentColor;
      border-radius: inherit;
      opacity: 0;
      transition: opacity var(--md-hover-transition-time, 120ms) cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    }
    @media screen and (min-width: 1240px) {
      .md-menu__item:hover::before {
        opacity: 0.08;
      }
    }
    :host(.focus-visible) .md-menu__item::before {
      opacity: 0.12;
    }
    [name="icon-before"] {
      margin-left: var(--md-menu-padding);
      display: flex;
      justify-content: center;
    }
    [name="after"] {
      display: flex;
      margin-right: var(--md-menu-padding);
      justify-content: center;
    }
    [name="label"] {
      display: inline;
      margin-left: 20px;
    } 
    .md-menu__item__spacer {
      flex: 1;
      min-width: 80px;
    }
    `;

    let template = document.createElement('template');
    template.innerHTML = `
    <button class="md-menu__item" id="md-menu__item">
      <md-ripple></md-ripple>
      <slot name="icon-before"></slot>
      <slot name="label"></slot>
      <div class="md-menu__item__spacer"></div>
      <slot name="after"></slot>
    </button>
    `;

    this.shadowRoot.appendChild(styles);
    this.shadowRoot.innerHTML += template.innerHTML;
  }

  get disabled() {
    return this.getAttribute('disabled') != undefined;
  }
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  static get observedAttributes() {
    return [];
  }
  connectedCallback() {
    this.render();

    // this.sthE = this.shadowRoot.getElementById('sth');
  }
  attributeChangedCallback(attrName, oldVal, newVal) {}
  adoptedCallback() {}
  disconnectedCallback() {}
}

export { Menu, MenuItem };
