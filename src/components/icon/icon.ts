import styles from './icon-styles.scss';

/**
 * Icon component.
 *
 * *Button, Chip, Dialog, FAB and Menu all need this as 'md-icon'*
 */
class Icon extends HTMLElement {
  imgE: HTMLImageElement;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>${styles}</style>
    <span class="md3-icon">
      <slot><img ${this.url ? 'src=' + this.url : ''} class="md3-icon__img" id="md3-icon__img" /></slot>
    </span>
    `;
  }

  get url() {
    return this.getAttribute('url');
  }
  set url(value) {
    this.setAttribute('url', value);
  }

  static get observedAttributes() {
    return ['url'];
  }
  connectedCallback() {
    this.render();

    this.imgE = this.shadowRoot.getElementById('md3-icon__img') as HTMLImageElement;
  }
  attributeChangedCallback(attrName: string, oldVal: string, newVal: any) {
    if (attrName === 'url' && this.imgE) {
      if (newVal) {
        this.imgE.setAttribute('src', newVal);
      } else {
        this.imgE.removeAttribute('src');
      }
    }
  }
}

export default Icon;
