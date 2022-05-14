import M3CardStyles from './card-styles.scss';

/**
 * Card component
 */
class M3Card extends HTMLElement {
  static tagName: string = 'md-card';
  cardNode: HTMLDivElement;

  static get observedAttributes() {
    return ['reactable'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.cardNode = this.shadowRoot.getElementById('md-card') as HTMLDivElement;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.cardNode) {
      if (name === 'reactable') {
        this.cardNode.tabIndex = this.reactable ? 0 : -1;
      }
    }
  }

  protected render(): string {
    return `
    <style>${M3CardStyles}</style>
    <div class="md-card" id="md-card" tabindex="${this.reactable ? 0 : -1}">
      <md-ripple></md-ripple>
      <slot></slot>
    </div>
    `;
  }

  get reactable(): boolean {
    return this.hasAttribute('reactable');
  }
  set reactable(value: boolean) {
    if (value) {
      this.setAttribute('reactable', '');
    } else {
      this.removeAttribute('reactable');
    }
  }
  focus(): void {
    if (this.reactable) {
      this.cardNode.focus();
    }
  }
}

if (!customElements.get(M3Card.tagName)) {
  customElements.define(M3Card.tagName, M3Card);
}
export default M3Card;
