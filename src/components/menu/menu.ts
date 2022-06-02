import M3MenuStyles from './menu-styles.scss';

/**
 * Menu component.
 *
 * Description.
 */
class M3Menu extends HTMLElement {
  static tagName: string = 'md-menu';
  menuElement: HTMLDivElement;
  controllerElement: HTMLElement;
  layerElement: HTMLElement;
  controllerFriendsElements: ElementListOf<Element>;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.layerElement = this.shadowRoot.querySelector('.md-menu__layer');
    this.menuElement = this.shadowRoot.querySelector('.md-menu') as HTMLDivElement;
    this.controllerElement = document.querySelector(`#${this.id}`);
    this.controllerElement
      ? (this.controllerFriendsElements = this.controllerElement.parentElement.querySelectorAll(
          `md-menu-item[subber]:not(#${this.id})`
        ))
      : null;

    this.addEventListener('keydown', (e) => {
      if (e.key == 'ArrowDown' || e.key == 'ArrowUp') {
        // Focus moving
        e.preventDefault();
        let focusItem = this.querySelector('md-menu-item:focus') as HTMLButtonElement;
        let items = this.querySelectorAll('md-menu-item') as ElementListOf<HTMLButtonElement>;
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
      } else if (e.key == 'Enter' || e.key == 'ArrowRight' || e.key == ' ') {
        // Submenu opening
        let focusItem = this.querySelector('md-menu-item:focus');
        if (focusItem.hasAttribute('subber')) {
          e.preventDefault();
          (document.querySelector(`md-menu#${focusItem.id}`) as M3Menu).openMenu();
        }
      } else if (e.key == 'Tab') {
        // Blur as Menu closing
        this.closeMenu();
      }
    });
    document.addEventListener('click', (e: Event) => {
      if (this.open && !this.contains(e.target as HTMLElement) && e.target !== this.controllerElement) {
        this.closeMenu();
      }
    });
    this.layerElement.addEventListener('mousedown', (e: Event) => {
      if (this.open && !this.contains(e.target as HTMLElement) && e.target !== this.controllerElement) {
        this.closeMenu();
      }
    });
    this.addEventListener('click', (e) => {
      let path = e.composedPath();
      if (path.indexOf(this) == 6 && (e.target as HTMLElement).getAttribute('subber') == undefined) {
        this.closeMenu();
      }
    });
    if (this.controllerElement) {
      if (this.sub) {
        if (this.controllerFriendsElements) {
          this.controllerFriendsElements.forEach((item) => {
            item.addEventListener('mouseenter', () => (this.open = false));
          });
        }
        this.controllerElement.addEventListener('mouseenter', () => this.openMenu());
        this.addEventListener('mouseenter', () => (this.open = true));
      } else {
        this.controllerElement.addEventListener('click', (e) => {
          e.preventDefault();
          this.openMenu();
        });
      }
    }
  }

  protected render(): string {
    return `
    <style>${M3MenuStyles}</style>
    <div class="md-menu__layer"></div>
    <div class="md-menu">
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
    this.menuElement.removeAttribute('style');
    this.menuElement.classList.remove('md-menu--bottom', 'md-menu--right');
    let rect = this.controllerElement.getBoundingClientRect();
    if (rect.top + rect.height / 2 > window.innerHeight / 2) {
      this.menuElement.classList.add('md-menu--bottom');
      if (this.sub) {
        this.menuElement.style.bottom = window.innerHeight - rect.top - rect.height - 8 + 'px';
      } else {
        this.menuElement.style.bottom = window.innerHeight - rect.top + 'px';
      }
      if (this.menuElement.offsetTop < rect.height) {
        this.menuElement.style.top = rect.height + 'px';
      }
    } else {
      if (this.sub) {
        this.menuElement.style.top = rect.top - 8 + 'px';
      } else {
        this.menuElement.style.top = rect.top + rect.height + 'px';
      }
      if (window.innerHeight - this.menuElement.offsetTop - this.menuElement.offsetHeight < rect.height) {
        this.menuElement.style.bottom = rect.height + 'px';
      }
    }
    if (this.sub) {
      if (rect.left + rect.width + this.menuElement.offsetWidth > window.innerWidth) {
        this.menuElement.style.left = rect.left - this.menuElement.offsetWidth + 'px';
        this.menuElement.classList.add('md-menu--right');
      } else {
        this.menuElement.style.left = rect.left + rect.width + 'px';
      }
    } else {
      if (rect.left + rect.width + this.menuElement.offsetWidth > window.innerWidth) {
        this.menuElement.style.left = rect.right - this.menuElement.offsetWidth + 'px';
        this.menuElement.classList.add('md-menu--right');
      } else {
        this.menuElement.style.left = rect.left + 'px';
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
    this.menuElement.style.visibility = 'visible';
    setTimeout(() => {
      this.menuElement.setAttribute('style', '');
    }, 150);
    this.open = false;
    this.controllerElement.focus();
  }
}

if (!customElements.get(M3Menu.tagName)) {
  customElements.define(M3Menu.tagName, M3Menu);
}
export default M3Menu;
