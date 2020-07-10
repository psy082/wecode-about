export const Style = (() => {
  const prop = new Map,
    prefix = 'webkit,moz,ms,o,chrome,khtml'.split(',');
  const NONE = Symbol();
  const BASE = document.body.style;

  const getKey = key => {
    if (prop.has(key)) return prop.get(key);
    if (key in BASE) prop.set(key, key);
    else {
      if (!prefix.some(v => {
          const newKey = v + key[0].toUpperCase() + key.substr(1);
          if (newKey in BASE) {
            prop.set(key, newKey)
            key = newKey;
            return true;
          } else {
            return false;
          }
        })) {
        prop.set(key, NONE);
        key = NONE
      }
    }

    return key;
  }

  return class {
    constructor(style) {
      this._style = style;
    }
    get(key) {
      key = getKey(key);
      if (key === NONE) return null;
      return this._style[key];
    }
    set(key, val) {
      key = getKey(key);
      if (key !== NONE) this._style[key] = val;
      return this;
    }
  }
})()