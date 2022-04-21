import styles from './menu-styles.scss';

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
    this.shadowRoot.innerHTML = /* html */ `
    <style>${styles}</style>
    <div class="md3-menu__layer" id="md3-menu__layer"></div>
    <div class="md3-menu" id="md3-menu">
      <slot></slot>
    </div>
    `;
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
   * TODO: Need more position.
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
    this.controllerE
      ? (this.controllerFriendsE = this.controllerE.parentNode.querySelectorAll(
          `md-menu-item[subber]:not(#${this.id})`
        ))
      : null;

    this.addEventListener('keydown', (e) => {
      if (e.key == 'ArrowDown' || e.key == 'ArrowUp') {
        // Focus moving
        e.preventDefault();
        let focusItem = this.querySelector('md-menu-item:focus');
        let items = this.querySelectorAll('md-menu-item');
        let index = [].indexOf.call(items, focusItem);
        e.key == 'ArrowDown' ? index++ : index--;
        if (index < 0) {
          index = 0;
        } else if (index >= items.length) {
          index = items.length - 1;
        }
        items[index].focus();
      } else if (e.key == 'Escape') {
        // Menu closing
        e.preventDefault();
        this.closeMenu();
      } else if (e.key == 'ArrowLeft') {
        // Submenu closing
        if (this.sub) {
          e.preventDefault();
          this.closeMenu();
        }
      } else if (e.key == 'Enter' || e.key == 'ArrowRight') {
        // Submenu opening
        let focusItem = this.querySelector('md-menu-item:focus');
        if (focusItem.hasAttribute('subber')) {
          e.preventDefault();
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
        if (this.controllerFriendsE) {
          this.controllerFriendsE.forEach((item) => {
            item.addEventListener('mouseenter', () => (this.open = false));
          });
        }
        this.controllerE.addEventListener('mouseenter', () => this.openMenu());
        this.addEventListener('mouseenter', () => (this.open = true));
      } else {
        this.controllerE.addEventListener('click', (e) => {
          e.preventDefault();
          this.openMenu();
        });
      }
    }
  }
}

export default Menu;
