const webpack = require("webpack");
const webpackDevMiddleware = require("koa-webpack-dev-middleware");
const webpackHotMiddleware = require("koa-webpack-hot-middleware");
const config = require("../../../webpack.config");
const compiler = webpack(config);

const webpackMiddleware = {
  wdm() {
    return webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    });
  },
  whm() {
    return webpackHotMiddleware(compiler);
  }
};

module.exports = webpackMiddleware;
export { };