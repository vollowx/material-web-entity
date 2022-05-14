import M3CardStyles from './card-styles.scss';

/**
 * Card component
 */
class M3Card extends HTMLElement {
  static tagName: string = 'md-card';
  cardNode: HTMLDivElement;

  static get observedAttributes() {
    return [''];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.cardNode = this.shadowRoot.getElementById('md-card') as HTMLDivElement;
  }

  protected render(): string {
    return `
    <style>${M3CardStyles}</style>
    <div class="md-card" id="md-card">
      <md-ripple></md-ripple>
      <slot></slot>
    </div>
    `;
  }
}

if (!customElements.get(M3Card.tagName)) {
  customElements.define(M3Card.tagName, M3Card);
}
export default M3Card;
