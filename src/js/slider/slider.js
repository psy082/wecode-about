import {
  Sheet
} from "../cssom"

export const Slider = (() => {

  const sheet = new Sheet(document.styleSheets[0]);

  const sliderList = document.createElement('div');
  sliderList.className = 'slider-list';

  const prevBtn = document.createElement('div');
  prevBtn.className = 'slider-button prev';

  const nextBtn = document.createElement('div');
  nextBtn.className = 'slider-button next';

  const initStyle = (width, height, numberOfSlides) => {
    sheet.add('.slider-wrap').set('display', 'flex').set('justify-content', 'center');
    sheet.add('.slider-button').set('display', 'inline-block').set('margin', 'auto 0');
    sheet.add('.slider-wrap .fas').set('color', 'rgba(0, 0, 0, 0.5').set('transition', 'color 100ms linear').set('font-size', '4rem').set('cursor', 'pointer');
    sheet.add('.slider-wrap .fas:hover').set('color', 'rgba(0, 0, 0, 1');
    sheet.add('.slider-box').set('width', `${width}px`).set('height', `${height}px`).set('overflow', 'hidden').set('margin', '0 30px');
    sheet.add('.slider-list').set('width', `${width * (numberOfSlides + 2)}px`).set('height', `${height}`);
    sheet.add('.slider-content').set('float', 'left').set('width', `${width}px`).set('height', `${height}px`);
  }

  const initElement = (pElement, contents) => {
    pElement = document.querySelector(pElement);

    const sliderWrap = document.createElement('div');
    sliderWrap.className = 'slider-wrap';

    const sliderBox = document.createElement('div');
    sliderBox.className = 'slider-box';

    sliderBox.appendChild(sliderList);
    sliderWrap.appendChild(sliderBox)
    pElement.appendChild(sliderWrap);

    for (let newContent of contents) {
      let contentBox = document.createElement('div');
      contentBox.className = 'slider-content';
      contentBox.appendChild(newContent);
      sliderList.appendChild(contentBox);
    }

    const prevBtnIcon = document.createElement('i');
    prevBtnIcon.className = 'fas fa-chevron-left';
    prevBtn.appendChild(prevBtnIcon);

    const nextBtnIcon = document.createElement('i');
    nextBtnIcon.className = 'fas fa-chevron-right';
    nextBtn.appendChild(nextBtnIcon);

    sliderWrap.insertBefore(prevBtn, sliderBox);
    sliderWrap.appendChild(nextBtn);
  }

  const initEvent = (width, speed, numberOfSlides) => {
    const sliderContents = sliderList.querySelectorAll('.slider-content');

    let firstChild = sliderList.firstElementChild;
    let lastChild = sliderList.lastElementChild;
    let clonedFirst = firstChild.cloneNode(true);
    let clonedLast = lastChild.cloneNode(true);

    sliderList.insertBefore(clonedLast, firstChild);
    sliderList.appendChild(clonedFirst);

    let curIdx = 0;
    let curSlide = sliderContents[curIdx];
    curSlide.classList.add('.slide-active');

    const sliderListStyle = sheet.get('.slider-list');
    sliderListStyle.set('transform', `translateX(-${width * (curIdx + 1)}px)`);

    const onClick = type => {
      curIdx = (type == 'next' ? curIdx + 1 : curIdx - 1);
      sliderListStyle.set('transition', `${speed}ms`).set('transform', `translateX(-${width * (curIdx + 1)}px)`);

      if (curIdx === (type == 'next' ? numberOfSlides : -1)) {
        curIdx = (type == 'next' ? 0 : numberOfSlides - 1);
        setTimeout(_ => {
          sliderListStyle.set('transition', '0ms').set('transform', `translateX(-${width * (curIdx + 1)}px)`);
        }, speed);
      }

      curSlide.classList.remove('.slide-active');
      curSlide = sliderContents[curIdx];
      curSlide.classList.add('.slide-active');
    }

    nextBtn.addEventListener('click', _ => onClick('next'));
    prevBtn.addEventListener('click', _ => onClick('prev'));
  }

  return class {
    constructor(w, h, pElement, contents, speed) {
      this._width = w;
      this._height = h;
      this._pElement = pElement;
      this._contents = contents;
      this._numberOfSlides = contents.length;
      this._speed = speed;
    }

    makeSlider() {
      initStyle(this._width, this._height, this._numberOfSlides);
      initElement(this._pElement, this._contents);
      initEvent(this._width, this._speed, this._numberOfSlides);
    }
  }
})();