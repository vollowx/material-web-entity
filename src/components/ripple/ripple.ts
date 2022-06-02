import M3RippleStyles from './ripple-styles.scss';

/**
 * Ripple component.
 *
 * Button, Card and Menu are all request define this component as 'md-ripple'
 */
class M3Ripple extends HTMLElement {
  static tagName: string = 'md-ripple';

  parentE: HTMLElement;
  containerE: HTMLElement;
  radius: number;
  centerRadius: number;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
    <style>${M3RippleStyles}</style>
    <div class="md-ripple__container"></div>
    `;
  }

  addActiveLayer(_event: { clientX: number; clientY: number }) {
    let ripple = document.createElement('span');
    ripple.classList.add('md-ripple__element');

    let rect = this.parentE.getBoundingClientRect();
    let x = _event.clientX - rect.left,
      y = _event.clientY - rect.top;
    this.radius = Math.max(
      Math.sqrt(x ** 2 + y ** 2),
      Math.sqrt((rect.width - x) ** 2 + y ** 2),
      Math.sqrt((rect.height - y) ** 2 + x ** 2),
      Math.sqrt((rect.width - x) ** 2 + (rect.height - y) ** 2)
    );
    this.centerRadius = Math.sqrt((rect.width / 2) ** 2 + (rect.height / 2) ** 2);

    this.containerE.appendChild(ripple);
    setTimeout(() => {
      ripple.style.cssText = `
      top: ${this.centered ? rect.height / 2 - this.centerRadius : y - this.radius}px;
      left: ${this.centered ? rect.width / 2 - this.centerRadius : x - this.radius}px;
      width: ${this.centered ? this.centerRadius * 2 : this.radius * 2}px;
      height: ${this.centered ? this.centerRadius * 2 : this.radius * 2}px;
      transition-duration: 225ms;
      transform: scale3d(1, 1, 1);
      `;
    }, 0);
  }
  removeActiveLayer(_ripple: HTMLElement) {
    if (_ripple) {
      if (
        Math.floor(_ripple.getBoundingClientRect().width) >=
        (this.centered ? Math.floor(this.centerRadius * 2) : Math.floor(this.radius * 2))
      ) {
        _ripple.style.opacity = '0';
        setTimeout(() => {
          _ripple.remove();
        }, 225);
      } else {
        _ripple.addEventListener('transitionend', () => {
          _ripple.style.opacity = '0';
          setTimeout(() => {
            _ripple.remove();
          }, 225);
        });
      }
    }
  }
  removeAllActiveLayers() {
    let _ripples = this.containerE.querySelectorAll('.md-ripple__element');
    _ripples.forEach((_ripple: HTMLElement) => this.removeActiveLayer(_ripple));
  }

  get unbounded() {
    return this.hasAttribute('unbounded');
  }
  get centered() {
    return this.hasAttribute('centered');
  }
  get disabled() {
    return this.hasAttribute('disabled');
  }
  set unbounded(value) {
    if (value) {
      this.setAttribute('unbounded', '');
    } else {
      this.removeAttribute('unbounded');
    }
  }
  set centered(value) {
    if (value) {
      this.setAttribute('centered', '');
    } else {
      this.removeAttribute('centered');
    }
  }
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  static get observedAttributes() {
    return ['classical'];
  }
  connectedCallback() {
    this.render();

    this.parentE = this.parentElement as HTMLElement;
    this.containerE = this.shadowRoot.querySelector('.md-ripple__container');

    this.parentE.addEventListener('pointerdown', (event) => this.addActiveLayer(event));
    this.parentE.addEventListener('mouseleave', () => this.removeAllActiveLayers());
    this.parentE.addEventListener('mouseup', () => this.removeAllActiveLayers());
    this.parentE.addEventListener('touchmove', () => this.removeAllActiveLayers());
    this.parentE.addEventListener('touchend', () => this.removeAllActiveLayers());
  }
  disconnectedCallback() {
    this.parentE.removeEventListener('pointerdown', (event) => this.addActiveLayer(event));
    this.parentE.removeEventListener('mouseleave', () => this.removeAllActiveLayers());
    this.parentE.removeEventListener('mouseup', () => this.removeAllActiveLayers());
    this.parentE.removeEventListener('touchmove', () => this.removeAllActiveLayers());
    this.parentE.removeEventListener('touchend', () => this.removeAllActiveLayers());
  }
}

if (!customElements.get(M3Ripple.tagName)) {
  customElements.define(M3Ripple.tagName, M3Ripple);
}
export default M3Ripple;
