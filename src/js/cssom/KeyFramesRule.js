import { Rule } from "./Rule";

export const KeyFramesRule = class {
  constructor(rule) {
    this._keyframe = rule;
    this._rule = new Map;
  }

  add(selector) {
    const index = this._keyframe.cssRules.length;
    this._keyframe.appendRule(`${selector}{}`, index);
    const cssRule = this._keyframe.cssRules[index];
    const rule = new Rule(cssRule);
    this._rule.set(selector, rule);
    return rule;
  }

  remove(selector) {
    if (!this._rules.contains(selector)) return;
    const rule = this._rule.get(selector)._rule;
    Array.from(this._keyframe.cssRules).some((cssRule, index) => {
      if (cssRule === rule) {
        this._keyframe.deleteRule(index);
        return true;
      }
    })
  }
}