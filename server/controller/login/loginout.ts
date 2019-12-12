const loginout = require('koa-router')();
// const db = require('../../../config/middleware/database');
loginout.get('/list', async (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = 'home-list'
    await next()
})
module.exports = loginout