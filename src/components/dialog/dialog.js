import styles from './dialog-styles.scss';

/**
 * Dialog component.
 */
class Dialog extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  /**
   * Render the contents
   */
  render() {
    this.shadowRoot.innerHTML = /* html */ `
    <style>${styles}</style>
    <div class="md3-dialog__scrim" id="md3-dialog__scrim"></div>
    <div class="md3-dialog__container">
      <div role="alertdialog" class="md3-dialog" id="md3-dialog" tabindex="0">
        <div class="md3-dialog__hero-icon" id="md3-dialog__hero-icon">
          <md-icon>${this.heroIcon ? this.heroIcon : ''}</md-icon>
        </div>
        <div class="md3-dialog__headline" id="md3-dialog__headline">
          <md-typo hd-sm>${this.headline ? this.headline : ''}</md-typo>
        </div>
        <div class="md3-dialog__body" id="md3-dialog__body">
          <slot name="body"></slot>
        </div>
        <footer class="md3-dialog__actions" id="md3-dialog__actions">
          <span>
            <slot name="secondaryAction"></slot>
          </span>
          <span>
            <slot name="primaryAction"></slot>
          </span>
        </footer>
      </div>
    </div>
    `;
  }

  get open() {
    return this.hasAttribute('open');
  }
  get heroIcon() {
    return this.getAttribute('hero-icon');
  }
  get headline() {
    return this.getAttribute('headline');
  }
  /**
   * @param {Boolean} value
   */
  set open(value) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }
  /**
   * @param {String} value
   */
  set heroIcon(value) {
    this.setAttribute('hero-icon', value);
  }
  /**
   * @param {String} value
   */
  set headline(value) {
    this.setAttribute('headline', value);
  }

  /**
   * Open the dialog.
   */
  openDialog() {
    this.open = true;
    this.dialogE.focus();
  }
  /**
   * Close the dialog.
   */
  closeDialog() {
    this.open = false;
    this.controllerE.focus();
  }

  static get observedAttributes() {
    return ['open', 'headline', 'hero-icon'];
  }
  connectedCallback() {
    this.render();

    this.scrimE = this.shadowRoot.getElementById('md3-dialog__scrim');
    this.dialogE = this.shadowRoot.getElementById('md3-dialog');
    this.heroIconE = this.shadowRoot.getElementById('md3-dialog__hero-icon');
    this.headlineE = this.shadowRoot.getElementById('md3-dialog__headline');
    this.bodyE = this.shadowRoot.getElementById('md3-dialog__body');
    this.actionsE = this.shadowRoot.getElementById('md3-dialog__actions');
    this.primaryActionE = this.shadowRoot.querySelector('[name="primaryAction"]');
    this.secondaryActionE = this.shadowRoot.querySelector('[name="secondaryAction"]');
    this.controllerE = document.getElementById(this.id);

    this.controllerE.addEventListener('click', () => this.openDialog());
    this.scrimE.addEventListener('click', () => this.closeDialog());
    this.primaryActionE.addEventListener('click', () => this.closeDialog());
    this.secondaryActionE.addEventListener('click', () => this.closeDialog());
    this.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        this.closeDialog();
      } else if (e.key == 'Tab') {
        e.preventDefault();
        if (this.querySelector('[slot="secondaryAction"]:focus')) {
          this.querySelector('[slot="primaryAction"]').focus();
        } else {
          this.querySelector('[slot="secondaryAction"]').focus();
        }
      }
    });
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'hero-icon' && this.heroIconE && newVal) {
      this.heroIconE.textContent = newVal;
    }
    if (attrName === 'headline' && this.headlineE && newVal) {
      this.headlineE.textContent = newVal;
    }
  }
  adoptedCallback() {}
  disconnectedCallback() {}
}

export default Dialog;
