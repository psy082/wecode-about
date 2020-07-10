import {
  Rule
} from "./Rule";
import {
  KeyFramesRule
} from "./KeyFramesRule";

export const Sheet = class {
  constructor(sheet) {
    this._sheet = sheet;
    this._rules = new Map;
  }

  has(selector) {
    if (this._rules.has(selector)) return true;

    let result = false;
    Array.from(this._sheet.cssRules).some((cssRule) => {
      if (cssRule.selectorText == selector) {
        this._rules.set(selector, cssRule);
        result = true;
        return true;
      }
    })
    return result;
  }

  get(selector) {
    return this._rules.get(selector);
  }

  add(selector) {
    if (this.has(selector)) return this.get(selector);
    const index = this._sheet.cssRules.length;
    this._sheet.insertRule(`${selector}{}`, index);
    const cssRule = this._sheet.cssRules[index];
    let rule;
    if (selector.startsWith('@keyframes')) {
      rule = new KeyFramesRule(cssRule);
    } else {
      rule = new Rule(cssRule);
    }
    this._rules.set(selector, rule);
    return rule;
  }

  remove(selector) {
    if (!this._sheet.contains(selector)) return;
    const rule = this._rules.get(selector)._rule;
    Array.from(this._sheet.cssRules).some((cssRule, index) => {
      if (cssRule === rule) {
        this._sheet.deleteRule(index);
        return true;
      }
    });
  }
}