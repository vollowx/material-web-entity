/**
 * Ripple component.
 *
 * Button, Card and Menu are all request define this component as 'md-ripple'
 */

class Ripple extends HTMLElement {
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
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      box-sizing: border-box;
      display: inline-flex;
      border-radius: inherit;
      pointer-events: none;
    }
    .md-ripple__container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      pointer-events: none;
    }
    :host(:not([unbounded])) .md-ripple__container {
      overflow: hidden;
    }
    .md-ripple__itself {
      position: absolute;
      background: currentColor;
      border-radius: 50%;
      transform: scale(0);
      opacity: 0;
      transition: transform 0ms cubic-bezier(0, 0, 0.2, 1);
      will-change: transform, opacity;
      pointer-events: none;
    }
    .md-ripple__itself--active {
      top: var(--md-ripple-top);
      left: var(--md-ripple-left);
      width: var(--md-ripple-size);
      height: var(--md-ripple-size);
      opacity: 0.16;
      transform: scale(1);
      transition-duration: 240ms;
    }
    :host([centered]) .md-ripple__itself--active {
      top: var(--md-ripple-top-centered);
      left: var(--md-ripple-left-centered);
      width: var(--md-ripple-size-centered);
      height: var(--md-ripple-size-centered);
    }
    :host([circle]) .md-ripple__itself--active {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .md-ripple__itself--removing {
      opacity: 0;
      transition: opacity 120ms linear;
    }
    `;

    let template = document.createElement('template');
    template.innerHTML = `
    <div class="md-ripple__container" id="md-ripple__container">
      <!-- -->
      <!-- -->
    </div>
    `;

    this.shadowRoot.appendChild(styles);
    this.shadowRoot.innerHTML += template.innerHTML;
  }

  addHoverLayer() {
    this.containerE.classList.add('md-ripple--hover');
  }
  removeHoverLayer() {
    this.containerE.classList.remove('md-ripple--hover');
  }
  addFocusLayer() {
    this.containerE.classList.add('md-ripple--focus');
  }
  removeFocusLayer() {
    this.containerE.classList.remove('md-ripple--focus');
  }
  addActiveLayer(_event) {
    this.containerE.classList.add('md-ripple--active');

    let ripple = document.createElement('span');
    ripple.classList.add('md-ripple__itself');

    let rect = this.parentE.getBoundingClientRect();
    let x = _event.clientX - rect.left,
      y = _event.clientY - rect.top;
    let radius = Math.max(Math.sqrt(x ** 2 + y ** 2), Math.sqrt((rect.width - x) ** 2 + y ** 2), Math.sqrt((rect.height - y) ** 2 + x ** 2), Math.sqrt((rect.width - x) ** 2 + (rect.height - y) ** 2));
    let centerRadius = Math.sqrt(rect.width ** 2 + rect.height ** 2);

    this.containerE.appendChild(ripple);
    setTimeout(() => {
      ripple.classList.add('md-ripple__itself--active');
      ripple.style.cssText = `
      --md-ripple-top: ${y - radius}px;
      --md-ripple-left: ${x - radius}px;
      --md-ripple-size: ${2 * radius}px;
      --md-ripple-top-centered: ${rect.height / 2 - centerRadius}px;
      --md-ripple-left-centered: ${rect.width / 2 - centerRadius}px;
      --md-ripple-size-centered: ${2 * centerRadius}px;`;
    }, 0);
    this.parentE.addEventListener('mouseleave', () => this.removeActiveLayer(ripple));
    this.parentE.addEventListener('mouseup', () => this.removeActiveLayer(ripple));
    this.parentE.addEventListener('touchmove', () => this.removeActiveLayer(ripple));
    this.parentE.addEventListener('touchend', () => this.removeActiveLayer(ripple));
  }
  removeActiveLayer(_ripple) {
    if (_ripple) {
      setTimeout(() => {
        _ripple.classList.add('md-ripple__itself--removing');
        this.containerE.classList.remove('md-ripple--active');
        setTimeout(() => {
          _ripple.remove();
        }, 240);
      }, 180);
    }
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

    this.parentE = this.parentNode.host || this.parentNode;
    this.containerE = this.shadowRoot.getElementById('md-ripple__container');

    this.parentE.addEventListener('mouseover', () => this.addHoverLayer());
    this.parentE.addEventListener('mouseleave', () => this.removeHoverLayer());
    this.parentE.addEventListener('focus', () => this.addFocusLayer());
    this.parentE.addEventListener('blur', () => this.removeFocusLayer());
    this.parentE.addEventListener('pointerdown', (event) => this.addActiveLayer(event));
  }
  attributeChangedCallback(attrName, oldVal, newVal) {}
  adoptedCallback() {}
  disconnectedCallback() {}
}

export default Ripple;
