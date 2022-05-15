import BaseButton from './button-default';

/**
 * Base button component with label.
 *
 * All the custom with actions like a button with label should extend this class.
 */
class BaseButtonLabeled extends BaseButton {
  labelNode: HTMLElement;

  static get observedAttributes() {
    return ['label', 'disabled'];
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.labelNode = this.shadowRoot.querySelector('.bs-button__label') as HTMLElement;
  }
  protected override exAttributeChangedCallback = (_name: string, _oldValue: string, _newValue: string) => {
    if (this.nativeNode && this.labelNode) {
      if (_name === 'label') {
        this.labelNode.textContent = _newValue;
      } else if (_name === 'disabled') {
        this.nativeNode.disabled = this.disabled;
      }
    }
  };

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
      <span class="bs-button__label">${this.label ? this.label : ''}</span>
      <slot></slot>
    </button>`;
  }

  get label(): string {
    return this.getAttribute('label');
  }
  set label(value: string) {
    this.setAttribute('label', value);
  }
}

export default BaseButtonLabeled;
