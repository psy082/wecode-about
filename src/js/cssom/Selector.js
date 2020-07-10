export const Selector = class {
  constructor(selector) {
    this.selector = selector;
  }

  add(selector) {
    this.selector = `${this.selector} ${selector}`;
    return this;
  }

  remove(seletor) {
    let pattern = new RegExp(` ${seletor}`, 'g');
    this.selector = this.selector.replace(pattern, '');
    return this;
  }

  get() {
    return this.selector;
  }
}