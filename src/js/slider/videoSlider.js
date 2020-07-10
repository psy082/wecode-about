import {
  Slider
} from './slider';

export const videoSlider = (() => {
  const makeVideoFrames = (width, height, videoLinks) => {
    const videoFrames = [];

    for (let link of videoLinks) {
      let video = document.createElement('iframe');
      video.setAttribute('width', `${width}`);
      video.setAttribute('height', `${height}`);
      video.setAttribute('src', `${link}`);
      video.setAttribute('frameborder', '0');
      videoFrames.push(video);
    }

    return videoFrames;
  }

  return class extends Slider {
    constructor(w, h, pElement, videoLinks, speed) {
      const videoFrames = makeVideoFrames(w, h, videoLinks);
      super(w, h, pElement, videoFrames, speed);
    }
  }
})();