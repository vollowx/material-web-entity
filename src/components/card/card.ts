import styles from './card-styles.scss';

/**
 * Card component
 */
class Card extends HTMLElement {
  static tagName: string = 'md-card';
  
  cardE: HTMLDivElement;
  
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  protected render(): void {
    this.shadowRoot.innerHTML = `
    <style>${styles}</style>
    <div class="md-card" id="md-card">
      <md-ripple></md-ripple>
      <slot></slot>
    </div>
    `;
  }

  static get observedAttributes() {
    return [''];
  }

  connectedCallback() {
    this.render();

    this.cardE = this.shadowRoot.getElementById('md-card') as HTMLDivElement;
  }
}

if (!customElements.get(Card.tagName)) {
  customElements.define(Card.tagName, Card);
}
export default Card;
