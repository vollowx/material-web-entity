import styles from './menu-styles.scss';

/**
 * Menu component.
 *
 * Description.
 */
class Menu extends HTMLElement {
  static tagName: string = 'md-menu';
  
  menuE: HTMLDivElement;
  controllerE: HTMLElement;
  layerE: HTMLElement;
  controllerFriendsE: NodeListOf<Element>;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>${styles}</style>
    <div class="md-menu__layer" id="md-menu__layer"></div>
    <div class="md-menu" id="md-menu">
      <slot></slot>
    </div>
    `;
  }

  get open() {
    return this.getAttribute('open') != undefined;
  }
  set open(value: boolean) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }
  get dense() {
    return this.getAttribute('dense') != undefined;
  }
  set dense(value: boolean) {
    if (value) {
      this.setAttribute('dense', '');
    } else {
      this.removeAttribute('dense');
    }
  }
  get fast() {
    return this.getAttribute('fast') != undefined;
  }
  set fast(value: boolean) {
    if (value) {
      this.setAttribute('fast', '');
    } else {
      this.removeAttribute('fast');
    }
  }
  get sub() {
    return this.getAttribute('sub') != undefined;
  }
  set sub(value: boolean) {
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
    this.dispatchEvent(
      new CustomEvent('open', {
        detail: {},
      })
    );
    this.menuE.removeAttribute('style');
    this.menuE.classList.remove('md-menu--bottom', 'md-menu--right');
    let rect = this.controllerE.getBoundingClientRect();
    if (rect.top + rect.height / 2 > window.innerHeight / 2) {
      this.menuE.classList.add('md-menu--bottom');
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
      if (rect.left + rect.width + this.menuE.offsetWidth > window.innerWidth) {
        this.menuE.style.left = rect.left - this.menuE.offsetWidth + 'px';
        this.menuE.classList.add('md-menu--right');
      } else {
        this.menuE.style.left = rect.left + rect.width + 'px';
      }
    } else {
      if (rect.left + rect.width + this.menuE.offsetWidth > window.innerWidth) {
        this.menuE.style.left = rect.right - this.menuE.offsetWidth + 'px';
        this.menuE.classList.add('md-menu--right');
      } else {
        this.menuE.style.left = rect.left + 'px';
      }
    }
    this.open = true;
    (this.querySelector('md-menu-item') as HTMLButtonElement).focus();
    (this.querySelector('md-menu-item') as HTMLButtonElement).tabIndex = 0;
  }
  /**
   * Close the menu.
   */
  closeMenu() {
    this.dispatchEvent(
      new CustomEvent('close', {
        detail: {},
      })
    );
    this.querySelector('md-menu-item[focused]')
      ? ((this.querySelector('md-menu-item[focused]') as HTMLButtonElement).tabIndex = 0)
      : null;
    this.open = false;
    this.controllerE.focus();
  }

  connectedCallback() {
    this.render();

    this.layerE = this.shadowRoot.getElementById('md-menu__layer');
    this.menuE = this.shadowRoot.getElementById('md-menu') as HTMLDivElement;
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
        let focusItem = this.querySelector('md-menu-item:focus') as HTMLButtonElement;
        let items = this.querySelectorAll('md-menu-item') as NodeListOf<HTMLButtonElement>;
        let index = [].indexOf.call(items, focusItem);
        e.key == 'ArrowDown' ? index++ : index--;
        if (index < 0) {
          index = items.length - 1;
        } else if (index >= items.length) {
          index = 0;
        }
        items[index].tabIndex = 0;
        items[index].focus();
        focusItem.tabIndex = -1;
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
          (document.querySelector(`md-menu#${focusItem.id}`) as Menu).openMenu();
        }
      } else if (e.key == 'Tab') {
        // Blur as Menu closing
        this.closeMenu();
      }
    });
    document.addEventListener('click', (e: Event) => {
      if (this.open && !this.contains(e.target as HTMLElement) && e.target !== this.controllerE) {
        this.closeMenu();
      }
    });
    this.layerE.addEventListener('pointerdown', (e: Event) => {
      if (this.open && !this.contains(e.target as HTMLElement) && e.target !== this.controllerE) {
        this.closeMenu();
      }
    });
    this.addEventListener('click', (e) => {
      let path = e.composedPath();
      if (path.indexOf(this) == 6 && (e.target as HTMLElement).getAttribute('subber') == undefined) {
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

if (!customElements.get(Menu.tagName)) {
  customElements.define(Menu.tagName, Menu);
}
export default Menu;
