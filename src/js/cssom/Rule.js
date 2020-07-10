import { Style } from "./Style";

export const Rule = class {
  constructor(rule) {
    this._rule = rule;
    this._style = new Style(rule.style);
  }

  get(key) {
    return this._style.get(key);
  }

  set(key, val) {
    this._style.set(key, val);
    return this;
  }
}