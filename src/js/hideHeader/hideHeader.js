//원본: https://webdir.tistory.com/481
//일부 수정

import {
  Selector,
  Sheet
} from "../cssom";

export const hideHeader = (() => {

  const sheet = new Sheet(document.styleSheets[0]);

  const makeHideAnimation = (type, target, height) => {
    if (type !== 'in' && type !== 'out') {
      throw new Error(`there is no type: ${type}`)
    }

    let selector = new Selector(`.${target}-fade-${type}`).get(),
      keyframeSelector = new Selector(`${target}fade${type}`).get(),
      keyframe = sheet.add(`@keyframes ${keyframeSelector}`),
      effect = '0.3s ease-in normal forwards';

    sheet.add(selector).set('animation', `${keyframeSelector} ${effect}`);

    if (type == 'in') {
      keyframe.add('from').set('top', `-${height}px`);
      keyframe.add('to').set('top', '0px');
    } else {
      keyframe.add('from').set('top', '0px');
      keyframe.add('to').set('top', `-${height}px`);
    }
  }

  const initStyle = (height) => {
    makeHideAnimation('in', 'header', height);
    makeHideAnimation('out', 'header', height);
  }

  const initEvent = (height) => {
    let didscroll, lastScrollTop = 0,
      delta = 50,
      header = document.querySelector('header');

    const hasScrolled = _ => {
      const st = window.scrollY;
      console.log(st);

      if (Math.abs(lastScrollTop - st) <= delta) return;

      if (st > lastScrollTop && st > height / 4) {
        header.classList.remove('header-fade-in');
        header.classList.add('header-fade-out');
      } else {
        if (st < lastScrollTop && st < height / 4) {
          header.classList.remove('header-fade-out');
          header.classList.add('header-fade-in');
        }
      }

      lastScrollTop = st;
    }

    window.addEventListener('scroll', _ => {
      didscroll = true;
    })

    setInterval(_ => {
      if (didscroll) {
        hasScrolled();
        didscroll = false;
      }
    }, 250);
  }

  return class {
    constructor(height) {
      this._height = height;
    }

    begin() {
      initStyle(this._height);
      initEvent(this._height);
    }
  }
})();