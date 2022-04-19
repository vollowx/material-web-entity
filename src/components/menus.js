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
    styles.textContent = /* css */`
    :host {
      --md3-icon-size: 24px;
      --md3-menu-padding: 16px;
      z-index: 1000;
    }
    .md3-menu__layer {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: auto;
      z-index: 1000;
      -webkit-tap-highlight-color: transparent;
      visibility: hidden;
    }
    :host([open]:not([sub])) .md3-menu__layer {
      visibility: visible;
    }
    .md3-menu {
      display: flex;
      flex-direction: column;
      position: fixed;
      padding: 8px 0;
      width: max-content;
      max-height: 100vh;
      overflow-y: auto;
      background-color: rgb(var(--md3-c-surface-variant-rgb));
      box-shadow: var(--md3-e-shadow-2);
      border-radius: 4px;
      transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1), opacity 120ms cubic-bezier(0.4, 0, 0.2, 1);
      transform: scale(0.9, 0.9);
      transform-origin: top left;
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
      box-sizing: border-box;
      z-index: 1000;
    }
    .md3-menu.md3-menu--bottom {
      transform-origin: bottom left;
    }
    .md3-menu.md3-menu--right {
      transform-origin: top right;
    }
    .md3-menu.md3-menu--bottom.md3-menu--right {
      transform-origin: bottom right;
    }
    :host([open]) .md3-menu {
      transform: scale(1, 1);
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }
    :host([dense]) ::slotted(md-menu-item) {
      height: 36px;
    }
    :host([fast]) .md3-menu {
      transition-duration: 0ms;
      transition-delay: 0ms !important;
    }
    :host([no-icon]) {
      --md3-menu-item-before-display: none;
    }
    ::-webkit-scrollbar {
      background: transparent;
      width: 12px;
    }
    ::-webkit-scrollbar-thumb {
      height: 56px;
      border-radius: 8px;
      border: 4px solid transparent;
      background-clip: content-box;
      background-color: #808080;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: #a9a9a9;
    }
    ::-webkit-scrollbar-thumb:active {
      background-color: #c0c0c0;
    }
    `;

    let template = document.createElement('template');
    template.innerHTML = /* html */`
    <div class="md3-menu__layer" id="md3-menu__layer"></div>
    <div class="md3-menu" id="md3-menu">
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
   * @param {Boolean} value
   */
  set open(value) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }
  /**
   * @param {Boolean} value
   */
  set dense(value) {
    if (value) {
      this.setAttribute('dense', '');
    } else {
      this.removeAttribute('dense');
    }
  }
  /**
   * @param {Boolean} value
   */
  set fast(value) {
    if (value) {
      this.setAttribute('fast', '');
    } else {
      this.removeAttribute('fast');
    }
  }
  /**
   * @param {Boolean} value
   */
  set sub(value) {
    if (value) {
      this.setAttribute('sub', '');
    } else {
      this.removeAttribute('sub');
    }
  }

  /**
   * Set the menu position.
   * ! Need more testing.
   */
  openMenu() {
    this.menuE.removeAttribute('style');
    this.menuE.classList.remove('md3-menu--bottom', 'md3-menu--right');
    let rect = this.controllerE.getBoundingClientRect();
    if (rect.top + rect.height / 2 > window.innerHeight / 2) {
      this.menuE.classList.add('md3-menu--bottom');
      if (this.sub) {
        this.menuE.style.bottom = window.innerHeight - rect.top - rect.height - 8 + 'px';
      } else {
        this.menuE.style.bottom = window.innerHeight - rect.top + 'px';
      }
      if (this.menuE.offsetTop < rect.height) {
        this.menuE.style.top = rect.height + 'px';
      }
    } else {
      if (this.sub) {
        this.menuE.style.top = rect.top - 8 + 'px';
      } else {
        this.menuE.style.top = rect.top + rect.height + 'px';
      }
      if (window.innerHeight - this.menuE.offsetTop - this.menuE.offsetHeight < rect.height) {
        this.menuE.style.bottom = rect.height + 'px';
      }
    }
    if (this.sub) {
      this.menuE.style.left = rect.left + rect.width + 'px';
    } else {
      this.menuE.style.left = rect.left + 'px';
    }
    this.open = true;
    this.querySelector('md-menu-item').itemE.focus();
  }
  /**
   * Close the menu.
   */
  closeMenu() {
    this.open = false;
    this.controllerE.focus();
  }

  connectedCallback() {
    this.render();

    this.layerE = this.shadowRoot.getElementById('md3-menu__layer');
    this.menuE = this.shadowRoot.getElementById('md3-menu');
    this.controllerE = document.getElementById(this.id);

    this.addEventListener('keydown', (e) => {
      if (e.key == 'ArrowDown' || e.key == 'ArrowUp') {
        // Focus moving
        // TODO: check for divider
        e.preventDefault();
        let focusItem = this.querySelector('md-menu-item:focus');
        let items = this.querySelectorAll('md-menu-item');
        let index = [].indexOf.call(focusItem.parentNode.children, focusItem);
        e.key == 'ArrowDown' ? index++ : index--;
        if (index < 0) {
          index = 0;
        } else if (index >= items.length) {
          index = items.length - 1;
        }
        items[index].focus();
      } else if (e.key == 'Escape') {
        // Menu closing
        this.closeMenu();
      } else if (e.key == 'ArrowLeft') {
        // Submenu closing
        if (this.sub) {
          this.closeMenu();
        }
      } else if (e.key == 'Enter' || e.key == 'ArrowRight') {
        // Submenu opening
        let focusItem = this.querySelector('md-menu-item:focus');
        if (focusItem.hasAttribute('subber')) {
          document.querySelector(`md-menu#${focusItem.id}`).openMenu();
        }
      }
    });
    document.addEventListener('click', (e) => {
      if (this.open && !this.contains(e.target) && e.target !== this.controllerE) {
        this.closeMenu();
      }
    });
    this.layerE.addEventListener('pointerdown', (e) => {
      if (this.open && !this.contains(e.target) && e.target !== this.controllerE) {
        this.closeMenu();
      }
    });
    this.addEventListener('click', (e) => {
      let path = e.composedPath();
      if (path.indexOf(this) == 6 && e.target.getAttribute('subber') == undefined) {
        this.closeMenu();
      }
    });
    if (this.controllerE) {
      if (this.sub) {
        this.controllerE.addEventListener('mouseenter', () => this.openMenu());
        this.addEventListener('mouseover', () => (this.open = true));
      } else {
        this.controllerE.addEventListener('click', () => this.openMenu());
      }
    }
  }
}

/**
 * MenuItem component.
 *
 * The item in the menu.
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
    .md3-menu__item {
      display: flex;
      align-items: center;
      position: relative;
      padding: 0;
      width: 100%;
      height: 100%;
      color: rgb(var(--md3-c-on-surface-variant-rgb));
      font-family: var(--md3-t-font-family);
      font-size: 0.875rem;
      font-weight: calc(var(--md3-t-font-base-weight) + 500);
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
    .md3-menu__item * {
      pointer-events: none;
    }
    .md3-menu__item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: currentColor;
      border-radius: inherit;
      opacity: 0;
      pointer-events: none;
    }
    @media screen and (min-width: 1240px) {
      .md3-menu__item:hover::before {
        opacity: 0.08;
      }
    }
    .md3-menu__item:focus::before {
      opacity: 0.12;
    }
    [name="before"] {
      margin-left: 16px;
      display: var(--md3-menu-item-before-display, inline);
      justify-content: center;
      width: 24px;
      height: 24px;
    }
    [name="label"] {
      display: flex;
      margin-left: 20px;
    } 
    [name="after"] {
      display: flex;
      margin-right: 20px;
      justify-content: center;
    }
    .md3-menu__item__spacer {
      flex: 1;
      min-width: 80px;
    }
    `;

    let template = document.createElement('template');
    template.innerHTML = `
    <button class="md3-menu__item" id="md3-menu__item">
      <md-ripple></md-ripple>
      <slot name="before"></slot>
      <slot name="label"></slot>
      <div class="md3-menu__item__spacer"></div>
      <slot name="after"></slot>
    </button>
    `;

    this.shadowRoot.appendChild(styles);
    this.shadowRoot.innerHTML += template.innerHTML;
  }

  focus() {
    this.itemE.focus();
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  connectedCallback() {
    this.render();

    this.itemE = this.shadowRoot.getElementById('md3-menu__item');
  }
}

export { Menu, MenuItem };
