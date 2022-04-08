/**
 * Describe the component
 */

class ComponentName extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  /**
   * Render the contents and define the contents (what you defined in the function)
   */
  renderAndDefine() {
    let styles = document.createElement('style');
    styles.textContent = `
    :host {
      position: relative;
      box-sizing: border-box;
      display: inline-flex;
    }
    `;

    this.shadowRoot.appendChild(styles);

    // this.sth = sth;
  }

  // get disabled() {
  //   return this.getAttribute('disabled') != undefined;
  // }
  // set disabled(value) {
  //   if (value) {
  //     this.setAttribute('disabled', '');
  //   } else {
  //     this.removeAttribute('disabled');
  //   }
  // }

  static get observedAttributes() {
    return [];
  }
  connectedCallback() {
    this.renderAndDefine();
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    // if (attrName === 'disabled' && this.sth) {
    //   this.sth.disabled = this.disabled;
    // }
  }
  adoptedCallback() {}
  disconnectedCallback() {}
}

export default ComponentName;
