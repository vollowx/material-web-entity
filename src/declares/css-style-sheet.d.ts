declare global {
  interface CSSStyleSheet {
    replaceSync(css: string): void;
    replace(css: string): void;
  }
}

export {};
