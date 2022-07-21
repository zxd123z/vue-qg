// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  autoprefixer: {},
  "postcss-px-to-viewport": {
    unitToConvert: "px",
    viewportWidth: 750,
    unitPrecision: 6,
    propList: ["*"],
    viewportUnit: "vw",
    fontViewportUnit: "vw",
    selectorBlackList: ["wrap"],
    minPixelValue: 1,
    mediaQuery: true,
    replace: true,
    exclude: [/node_modules/],
    landscape: false // 是否处理横屏情况
  }
};
