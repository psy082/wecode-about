import {
  videoSlider
} from "../slider";

const src = [
  "https://www.youtube.com/embed/wCNv2oAXJSY",
  "https://www.youtube.com/embed/tsCpWjjp9Oc",
  "https://www.youtube.com/embed/LjRM8huiOFw",
  "https://www.youtube.com/embed/hxYBkciFKdc"
]

const slider = new videoSlider(500, 300, '.music-container', src, 300);
slider.makeSlider();