import M3CardStyles from './card-styles.scss';

/**
 * Card component
 */
class M3Card extends HTMLElement {
  static tagName: string = 'md-card';
  cardNode: HTMLDivElement;

  static get observedAttributes() {
    return ['reactive'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.cardNode = this.shadowRoot.querySelector('.md-card') as HTMLDivElement;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.cardNode) {
      if (name === 'reactive') {
        this.cardNode.tabIndex = this.reactive ? 0 : -1;
      }
    }
  }

  protected render(): string {
    return `
    <style>${M3CardStyles}</style>
    <div class="md-card" tabindex="${this.reactive ? 0 : -1}">
      <md-ripple></md-ripple>
      <slot></slot>
    </div>
    `;
  }

  get reactive(): boolean {
    return this.hasAttribute('reactive');
  }
  set reactive(value: boolean) {
    if (value) {
      this.setAttribute('reactive', '');
    } else {
      this.removeAttribute('reactive');
    }
  }
  focus(): void {
    if (this.reactive) {
      this.cardNode.focus();
    }
  }
}

if (!customElements.get(M3Card.tagName)) {
  customElements.define(M3Card.tagName, M3Card);
}
export default M3Card;
