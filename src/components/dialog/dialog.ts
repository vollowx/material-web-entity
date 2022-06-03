import M3DialogStyles from './dialog-styles.scss';

const sheet = new CSSStyleSheet();
sheet.replaceSync(M3DialogStyles);

/**
 * Dialog component.
 */
class M3Dialog extends HTMLElement {
  static tagName: string = 'md-dialog';
  dialogE: HTMLElement;
  primaryActionE: HTMLSpanElement;
  secondaryActionE: HTMLSpanElement;
  controllerE: HTMLElement;
  backdropE: HTMLElement;
  heroIconE: HTMLElement;
  headlineE: HTMLElement;
  bodyE: HTMLElement;
  actionsE: HTMLElement;

  static get observedAttributes() {
    return ['open', 'headline', 'hero-icon'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = this.render();
    this.shadowRoot.adoptedStyleSheets = [sheet];

    this.backdropE = this.shadowRoot.querySelector('.md-dialog__backdrop');
    this.dialogE = this.shadowRoot.querySelector('.md-dialog');
    this.heroIconE = this.shadowRoot.querySelector('.md-dialog__hero-icon');
    this.headlineE = this.shadowRoot.querySelector('.md-dialog__headline');
    this.bodyE = this.shadowRoot.querySelector('.md-dialog__body');
    this.actionsE = this.shadowRoot.querySelector('.md-dialog__actions');
    this.primaryActionE = this.shadowRoot.querySelector('[name="primaryAction"]');
    this.secondaryActionE = this.shadowRoot.querySelector('[name="secondaryAction"]');
    this.controllerE = document.querySelector(`#${this.id}`);

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

  protected render(): string {
    return `
    <div class="md-dialog__backdrop"></div>
    <div class="md-dialog__container">
      <div role="alertdialog" class="md-dialog" tabindex="-1">
        <div class="md-dialog__hero-icon"><md-icon>${
          this.heroIcon ? this.heroIcon : ''
        }</md-icon></div>
        <div class="md-dialog__headline"><md-typo hd-sm>${
          this.headline ? this.headline : ''
        }</md-typo></div>
        <div class="md-dialog__body"><slot name="body"></slot></div>
        <footer class="md-dialog__actions">
          <span><slot name="secondaryAction"></slot></span>
          <span><slot name="primaryAction"></slot></span>
        </footer>
      </div>
    </div>
    `;
  }

  openDialog() {
    this.open = true;
    this.primaryActionE.tabIndex = 0;
    this.secondaryActionE.tabIndex = 0;
    (this.querySelector('[slot="primaryAction"]') as HTMLElement).focus();
  }
  closeDialog() {
    this.open = false;
    this.controllerE.focus();
    this.primaryActionE.tabIndex = -1;
    this.secondaryActionE.tabIndex = -1;
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
}

if (!customElements.get(M3Dialog.tagName)) {
  customElements.define(M3Dialog.tagName, M3Dialog);
}
export default M3Dialog;
