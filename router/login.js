const router = require('koa-router')()
const https = require('https')
const querystring = require('querystring')
const {URL} = require('url')
const tokens = require('../mongoConfig/token')


const loginDB = require('../mongoConfig')


router.post('/', async (ctx, next) => {

    next()

})

router.post('/getToken', async (ctx, next) => {
    let data = ctx.request.body.data
    await loginDB.find('login', {
        username: data.username,
        password: data.password
    }).then(res => {
        let userToken = {
            name: data.username,
            role: data.role
        }
        const token = tokens.setToken(userToken, {expiresIn: '1h'})  //token签名 有效期为1小时
        if (res[0]) {
            ctx.body = {
                data: {token},
                success: 'success',
                code: 200,
                message: '获取成功'
            }
        } else {
            ctx.status = 401
            ctx.body = '账号或密码错误'
        }
    })
})

module.exports = router.routes()