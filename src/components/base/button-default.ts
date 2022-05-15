/**
 * Base button component.
 *
 * All the custom with actions like a button should extend this class.
 */
class BaseButton extends HTMLElement {
  static tagName: string;
  nativeNode: HTMLButtonElement;

  static get observedAttributes() {
    return ['disabled'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.nativeNode = this.shadowRoot.querySelector('.bs-button') as HTMLButtonElement;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.nativeNode) {
      if (name === 'disabled') {
        this.nativeNode.disabled = this.disabled;
      }
      this.exAttributeChangedCallback(name, oldValue, newValue);
    }
  }
  protected exAttributeChangedCallback = (_name: string, _oldValue: string, _newValue: string) => {};

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
    <button class="bs-button" ${this.disabled ? 'disabled' : ''}>
      <slot></slot>
    </button>`;
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
    return this.nativeNode.tabIndex;
  }
  set tabIndex(value: number) {
    this.nativeNode.tabIndex = value;
  }
  focus() {
    this.nativeNode.focus();
  }
}

export default BaseButton;
