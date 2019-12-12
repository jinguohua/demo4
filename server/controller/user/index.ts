const router = require('koa-router')
const home = new router()



// // home/list
// home.get('/list', async (ctx, next) => {
//     ctx.response.status = 200
//     ctx.response.body = 'home-list'
//     await next()
// })

module.exports = home;
export { };