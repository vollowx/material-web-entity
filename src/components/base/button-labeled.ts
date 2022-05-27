import BaseButton from './button-default';

/**
 * Base button component with label.
 *
 * All the custom with actions like a button with label should extend this class.
 */
class BaseButtonLabeled extends BaseButton {
  /**
   * ATTRIBUTES
   *
   * `observedAttributesDefault` is a list of attributes that are observed by default.
   * When extending this class, use
   * ```js
   * static get observedAttributes() {
   *   return [...this.observedAttributesDefault];
   * }
   * ```
   * setter, getter for setting, getting the attributes easier and more intuitive.
   */
  /** */
  static observedAttributesDefault = ['label', 'data-aria-label', 'disabled'];
  get label(): string {
    return this.getAttribute('label');
  }
  set label(value: string) {
    this.setAttribute('label', value);
  }

  labelNode: HTMLElement;

  /**
   * LIFE CYCLE
   */
  /** */
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();

    this.labelNode = this.shadowRoot.querySelector('.bs-button__label') as HTMLElement;
  }
  protected override exAttributeChangedCallback = (name: string, oldValue: string, newValue: string) => {
    if (this.nativeNode && this.labelNode) {
      if (name === 'label') {
        this.labelNode.textContent = newValue;
        if (!this.ariaLabel) {
          this.nativeNode.ariaLabel = newValue;
          if (newValue === '') {
            this.nativeNode.removeAttribute('aria-label');
          }
        }
      }
    }
  };

  /**
   * RENDERING
   */
  /** */
  protected override renderButton(
    _className: string = 'button',
    _content: string = `
    <span class="${_className}__label">${this.label ? this.label : ''}</span>
    <slot></slot>`
  ): string {
    return `
    <button class="${_className}"
      ${this.ariaLabel ? 'aria-label="' + this.ariaLabel + '"' : this.label ? 'aria-label="' + this.label + '"' : ''}
      ${this.disabled ? 'disabled' : ''}>
      ${_content}
    </button>`;
  }
}

export default BaseButtonLabeled;
