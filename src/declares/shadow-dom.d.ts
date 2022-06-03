declare global {
  interface ShadowRoot extends DocumentFragment {
    adoptedStyleSheets: CSSStyleSheet[];
  }
}

export {};
