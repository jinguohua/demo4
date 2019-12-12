const express = require("express");
const path = require("path");
const app = express();

// // 本地测试启动webpack打包
if (process.env.NODE_ENV === "development") {
  const webpack = require("webpack");
  const config = require("./config/webpackconfig");
  const webpackHotMiddleware = require("webpack-hot-middleware"); // HMR热更新中间件
  const compiler = webpack(config);
  app.use(
    require("webpack-hot-middleware")(compiler, {
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000
    })
  );
  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    })
  );
  // 挂载HMR热更新中间件
  app.use(webpackHotMiddleware(compiler));
}
app.use("/dist", express.static("dist"));

//使用app.get('/',()=>{}) 就会导致这里是严格匹配，致使其他路由不能正常分发，所以这里用正则匹配，
//或者使用app.use('/',()=>{})，这里效果类似于正则的模糊匹配

app.get(/test/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});
// app.use('/', (req, res) => {
//   res.sendFile(path.join(__dirname, "dist/index.html"));
// });

app.listen(8080, function() {
  console.log("8080");
});
