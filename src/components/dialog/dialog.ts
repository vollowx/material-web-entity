import styles from './dialog-styles.scss';

/**
 * Dialog component.
 */
class Dialog extends HTMLElement {
  dialogE: HTMLElement;
  primaryActionE: HTMLSpanElement;
  secondaryActionE: HTMLSpanElement;
  controllerE: HTMLElement;
  backdropE: HTMLElement;
  heroIconE: HTMLElement;
  headlineE: HTMLElement;
  bodyE: HTMLElement;
  actionsE: HTMLElement;
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>${styles}</style>
    <div class="md3-dialog__backdrop" id="md3-dialog__backdrop"></div>
    <div class="md3-dialog__container">
      <div role="alertdialog" class="md3-dialog" id="md3-dialog" tabindex="-1">
        <div class="md3-dialog__hero-icon" id="md3-dialog__hero-icon"><md-icon>${
          this.heroIcon ? this.heroIcon : ''
        }</md-icon></div>
        <div class="md3-dialog__headline" id="md3-dialog__headline"><md-typo hd-sm>${
          this.headline ? this.headline : ''
        }</md-typo></div>
        <div class="md3-dialog__body" id="md3-dialog__body"><slot name="body"></slot></div>
        <footer class="md3-dialog__actions" id="md3-dialog__actions">
          <span><slot name="secondaryAction"></slot></span>
          <span><slot name="primaryAction"></slot></span>
        </footer>
      </div>
    </div>
    `;
  }

  get open() {
    return this.hasAttribute('open');
  }
  set open(value: boolean) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }
  get heroIcon() {
    return this.getAttribute('hero-icon');
  }
  set heroIcon(value: string) {
    this.setAttribute('hero-icon', value);
  }
  get headline() {
    return this.getAttribute('headline');
  }
  set headline(value: string) {
    this.setAttribute('headline', value);
  }

  /**
   * Open the dialog.
   */
  openDialog() {
    this.open = true;
    this.primaryActionE.tabIndex = 0;
    this.secondaryActionE.tabIndex = 0;
    (this.querySelector('[slot="primaryAction"]') as HTMLElement).focus();
  }
  /**
   * Close the dialog.
   */
  closeDialog() {
    this.open = false;
    this.controllerE.focus();
    this.primaryActionE.tabIndex = -1;
    this.secondaryActionE.tabIndex = -1;
  }

  static get observedAttributes() {
    return ['open', 'headline', 'hero-icon'];
  }
  connectedCallback() {
    this.render();

    this.backdropE = this.shadowRoot.getElementById('md3-dialog__backdrop');
    this.dialogE = this.shadowRoot.getElementById('md3-dialog');
    this.heroIconE = this.shadowRoot.getElementById('md3-dialog__hero-icon');
    this.headlineE = this.shadowRoot.getElementById('md3-dialog__headline');
    this.bodyE = this.shadowRoot.getElementById('md3-dialog__body');
    this.actionsE = this.shadowRoot.getElementById('md3-dialog__actions');
    this.primaryActionE = this.shadowRoot.querySelector('[name="primaryAction"]');
    this.secondaryActionE = this.shadowRoot.querySelector('[name="secondaryAction"]');
    this.controllerE = document.getElementById(this.id);

    this.primaryActionE.tabIndex = -1;
    this.secondaryActionE.tabIndex = -1;

    this.controllerE.addEventListener('click', () => this.openDialog());
    this.backdropE.addEventListener('click', () => this.closeDialog());
    this.primaryActionE.addEventListener('click', () => this.closeDialog());
    this.secondaryActionE.addEventListener('click', () => this.closeDialog());
    this.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        this.closeDialog();
      } else if (e.key == 'Tab') {
        let focusE = document.activeElement;
        if (!focusE.nextElementSibling) {
          e.preventDefault();
          let firstE = this.firstElementChild as HTMLElement;
          if (firstE.tabIndex == 0) {
            firstE.focus();
          } else {
            (firstE.nextElementSibling as HTMLElement).focus();
          }
        }
      }
    });
  }
  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
    if (attrName === 'hero-icon' && this.heroIconE && newVal) {
      this.heroIconE.textContent = newVal;
    }
    if (attrName === 'headline' && this.headlineE && newVal) {
      this.headlineE.textContent = newVal;
    }
  }
  disconnectedCallback() {
    this.controllerE.removeEventListener('click', () => this.openDialog());
    this.backdropE.removeEventListener('click', () => this.closeDialog());
    this.primaryActionE.removeEventListener('click', () => this.closeDialog());
    this.secondaryActionE.removeEventListener('click', () => this.closeDialog());
    this.removeEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        this.closeDialog();
      } else if (e.key == 'Tab' && this.dialogE.tabIndex == 0) {
        e.preventDefault();
        if (this.querySelector('[slot="secondaryAction"]:focus')) {
          (this.querySelector('[slot="primaryAction"]') as HTMLButtonElement).focus();
        } else {
          (this.querySelector('[slot="secondaryAction"]') as HTMLButtonElement).focus();
        }
      }
    });
  }
}

export default Dialog;
