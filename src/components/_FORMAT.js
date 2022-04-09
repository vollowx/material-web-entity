/**
 * ComponentName component.
 *
 * Description.
 */

class ComponentName extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  /**
   * Render the contents
   */
  render() {
    let styles = document.createElement('style');
    styles.textContent = `
    :host {
      position: relative;
      box-sizing: border-box;
      display: inline-flex;
    }
    `;

    let template = document.createElement('template');
    template.innerHTML = `
    `;

    this.shadowRoot.appendChild(styles);
    this.shadowRoot.innerHTML += template.innerHTML;
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
    this.render();

    // this.sthE = this.shadowRoot.getElementById('sth');
  }
  attributeChangedCallback(attrName, oldVal, newVal) {}
  adoptedCallback() {}
  disconnectedCallback() {}
}

export default ComponentName;
