/**
 * Nothing
 */

class Typography extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  /**
   * Render the contents and define the contents (slot)
   */
  renderAndDefine() {
    let styles = document.createElement('style');
    styles.textContent = `
    :host {
      position: relative;
      box-sizing: border-box;
      display: block;
      font-family: var(--md-font-family);
    }
    :host([dp-lg]) {
      font-size: 3.5625rem;
      font-weight: calc(var(--md-font-base-weight) + 400);
      line-height: 1.12280701754386;
    }
    :host([dp-md]) {
      font-size: 2.8125rem;
      font-weight: calc(var(--md-font-base-weight) + 400);
      line-height: 1.155555555555556;
    }
    :host([dp-sm]) {
      font-size: 2.25rem;
      font-weight: calc(var(--md-font-base-weight) + 400);
      line-height: 1.222222222222222;
    }
    :host([hd-lg]) {
      font-size: 2rem;
      font-weight: calc(var(--md-font-base-weight) + 400);
      line-height: 1.25;
    }
    :host([hd-md]) {
      font-size: 1.75rem;
      font-weight: calc(var(--md-font-base-weight) + 400);
      line-height: 1.285714285714286;
    }
    :host([hd-sm]) {
      font-size: 1.5rem;
      font-weight: calc(var(--md-font-base-weight) + 400);
      line-height: 1.333333333333333;
    }
    :host([tt-lg]) {
      font-size: 1.375rem;
      font-weight: calc(var(--md-font-base-weight) + 400);
      line-height: 1.272727272727273;
    }
    :host([tt-md]) {
      font-size: 1rem;
      font-weight: calc(var(--md-font-base-weight) + 500);
      line-height: 1.5;
      letter-spacing: 0.15px;
    }
    :host([tt-sm]),
    :host([lb-lg]) {
      font-size: 0.875rem;
      font-weight: calc(var(--md-font-base-weight) + 500);
      line-height: 1.428571428571429;
      letter-spacing: 0.1px;
    }
    :host([lb-md]) {
      font-size: 0.75rem;
      font-weight: calc(var(--md-font-base-weight) + 500);
      line-height: 1.333333333333333;
      letter-spacing: 0.5px;
    }
    :host([lb-sm]) {
      font-size: 0.6875rem;
      font-weight: calc(var(--md-font-base-weight) + 500);
      line-height: 0.5454545454545455;
      letter-spacing: 0.5px;
    }
    :host([bd-lg]) {
      font-size: 1rem;
      font-weight: calc(var(--md-font-base-weight) + 500);
      line-height: 1.5;
      letter-spacing: 0.15px;
    }
    :host([bd-md]) {
      font-size: 0.875rem;
      font-weight: calc(var(--md-font-base-weight) + 500);
      line-height: 1.428571428571429;
      letter-spacing: 0.25px;
    }
    :host([bd-sm]) {
      font-size: 0.75rem;
      font-weight: calc(var(--md-font-base-weight) + 500);
      line-height: 1.333333333333333;
      letter-spacing: 0.4px;
    }
    `;

    let slot = document.createElement('slot');

    this.shadowRoot.appendChild(styles);
    this.shadowRoot.appendChild(slot);

    this.slotE = slot;
  }

  connectedCallback() {
    this.renderAndDefine();
  }
}

export default Typography;
