import M3MenuStyles from './menu-styles.scss';

/**
 * Menu component.
 *
 * Description.
 */
class M3Menu extends HTMLElement {
  static tagName: string = 'md-menu';
  menuNode: HTMLDivElement;
  controllerNode: HTMLElement;
  layerNode: HTMLElement;
  controllerFriendsNodes: NodeListOf<Element>;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.layerNode = this.shadowRoot.querySelector('.md-menu__layer');
    this.menuNode = this.shadowRoot.querySelector('.md-menu') as HTMLDivElement;
    this.controllerNode = document.querySelector(`#${this.id}`);
    this.controllerNode
      ? (this.controllerFriendsNodes = this.controllerNode.parentNode.querySelectorAll(
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
      if (this.open && !this.contains(e.target as HTMLElement) && e.target !== this.controllerNode) {
        this.closeMenu();
      }
    });
    this.layerNode.addEventListener('mousedown', (e: Event) => {
      if (this.open && !this.contains(e.target as HTMLElement) && e.target !== this.controllerNode) {
        this.closeMenu();
      }
    });
    this.addEventListener('click', (e) => {
      let path = e.composedPath();
      if (path.indexOf(this) == 6 && (e.target as HTMLElement).getAttribute('subber') == undefined) {
        this.closeMenu();
      }
    });
    if (this.controllerNode) {
      if (this.sub) {
        if (this.controllerFriendsNodes) {
          this.controllerFriendsNodes.forEach((item) => {
            item.addEventListener('mouseenter', () => (this.open = false));
          });
        }
        this.controllerNode.addEventListener('mouseenter', () => this.openMenu());
        this.addEventListener('mouseenter', () => (this.open = true));
      } else {
        this.controllerNode.addEventListener('click', (e) => {
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
    this.menuNode.removeAttribute('style');
    this.menuNode.classList.remove('md-menu--bottom', 'md-menu--right');
    let rect = this.controllerNode.getBoundingClientRect();
    if (rect.top + rect.height / 2 > window.innerHeight / 2) {
      this.menuNode.classList.add('md-menu--bottom');
      if (this.sub) {
        this.menuNode.style.bottom = window.innerHeight - rect.top - rect.height - 8 + 'px';
      } else {
        this.menuNode.style.bottom = window.innerHeight - rect.top + 'px';
      }
      if (this.menuNode.offsetTop < rect.height) {
        this.menuNode.style.top = rect.height + 'px';
      }
    } else {
      if (this.sub) {
        this.menuNode.style.top = rect.top - 8 + 'px';
      } else {
        this.menuNode.style.top = rect.top + rect.height + 'px';
      }
      if (window.innerHeight - this.menuNode.offsetTop - this.menuNode.offsetHeight < rect.height) {
        this.menuNode.style.bottom = rect.height + 'px';
      }
    }
    if (this.sub) {
      if (rect.left + rect.width + this.menuNode.offsetWidth > window.innerWidth) {
        this.menuNode.style.left = rect.left - this.menuNode.offsetWidth + 'px';
        this.menuNode.classList.add('md-menu--right');
      } else {
        this.menuNode.style.left = rect.left + rect.width + 'px';
      }
    } else {
      if (rect.left + rect.width + this.menuNode.offsetWidth > window.innerWidth) {
        this.menuNode.style.left = rect.right - this.menuNode.offsetWidth + 'px';
        this.menuNode.classList.add('md-menu--right');
      } else {
        this.menuNode.style.left = rect.left + 'px';
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
    this.controllerNode.focus();
  }
}

if (!customElements.get(M3Menu.tagName)) {
  customElements.define(M3Menu.tagName, M3Menu);
}
export default M3Menu;
