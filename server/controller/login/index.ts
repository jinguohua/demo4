const login = require('koa-router')();
const loginout = require('./loginout');
const daoLogin = require('../../dao/login');
// login
login.post('/login', async (ctx, next) => {
    const user = ctx.request.body;
    const response = await daoLogin.loginCheck(user, next);
    if (response && response.length > 0) {
        ctx.set("Content-Type", "application/json")
        ctx.body = JSON.stringify({
            code: 200,
            data: { username: response[0].username },
            message: '登录成功',
        })
    } else {
        ctx.set("Content-Type", "application/json")
        ctx.body = JSON.stringify({
            code: 202,
            message: '密码错误',
        })
    }
})

//可以引入其他文件的但是属于本模块的路由，类似于logout 这样的功能
login.use('/loginout', loginout.routes());

module.exports = login;
export { };