const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const send = require("koa-send");
const bodyParser = require('koa-bodyparser')
const fs = require("fs");
const webpackMiddleware = require("../config/middleware/webpack-dev-hot-middleware");

app.use(bodyParser());
const router = new Router();

/**
 * 检测返回路由
 * 检测资源文件，配置静态文件
 */
router.get("/dist/*", async (ctx, next) => {
  await send(ctx, ctx.path);
});

router.get("/test/*", async (ctx, next) => {
  ctx.type = "html";
  ctx.body = fs.createReadStream("dist/index.html");
  await next();
});

// 接口访问
let controller = fs.readdirSync(__dirname + '/controller');
controller.forEach((element) => {
  let module = require(__dirname + '/controller/' + element);
  router.use('/ajax', module.routes(), module.allowedMethods())
  console.log(router, 'router')
})


/**
 * webpack 打包热更新
 */
app.use(webpackMiddleware.wdm());
app.use(webpackMiddleware.whm());




app.use(router.routes());
app.listen(8081);
console.log("Server running on port 8081");
