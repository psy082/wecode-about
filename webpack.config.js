const path = require("path");



module.exports = {
  mode: "production",
  entry: {
    animation: path.join(path.resolve(__dirname, "src/js/active"), "runHideAnimation.js"),
    slider: path.join(path.resolve(__dirname, "src/js/active"), "runSlider.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/js"),
  },
};