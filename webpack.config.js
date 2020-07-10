const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    animation: path.join(path.resolve(__dirname, "src/js"), "hideHeader"),
    slider: path.join(path.resolve(__dirname, "src/js"), "slider"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/js"),
  },
};
