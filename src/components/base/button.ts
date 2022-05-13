/**
 * Base button component.
 *
 * All the custom with actions like a button should extend this class.
 */
class BaseButton extends HTMLElement {
  static tagName: string;
  buttonNode: HTMLButtonElement;
  labelNode: HTMLElement;

  static get observedAttributes() {
    return ['label', 'disabled'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
    this.buttonNode = this.shadowRoot.getElementById('bs-button') as HTMLButtonElement;
    this.labelNode = this.shadowRoot.getElementById('bs-button__label') as HTMLElement;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.buttonNode && this.labelNode) {
      if (name === 'label') {
        this.labelNode.textContent = newValue;
      } else if (name === 'disabled') {
        this.buttonNode.disabled = this.disabled;
      }
    }
  }

  protected render(): string {
    return `
    <style>
      :host {
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        -webkit-tap-highlight-color: transparent;
      }
    </style>
    <button class="bs-button" id="bs-button" ${this.disabled ? 'disabled' : ''}>
      <span class="bs-button__label" id="bs-button__label">${this.label ? this.label : ''}</span>
      <slot></slot>
    </button>`;
  }

  get label(): string {
    return this.getAttribute('label');
  }
  set label(value: string) {
    this.setAttribute('label', value);
  }
  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }
  set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }
  get tabIndex(): number {
    return this.buttonNode.tabIndex;
  }
  set tabIndex(value: number) {
    this.buttonNode.tabIndex = value;
  }
  focus() {
    this.buttonNode.focus();
  }
}

export default BaseButton;
