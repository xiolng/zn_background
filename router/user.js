const router = require('koa-router')()
const https = require('https')
const querystring = require('querystring')
const {URL} = require('url')


const userDB = require('../mongoConfig')


router.post('/', async (ctx, next) => {

    next()

})

router.post('/registerUser', async (ctx,next) => {
    let ids = await userDB.findLast('userList',{}).then(res => {
        return res[0] && res[0].id || 0
    })
    await userDB.insert('userList', {
        id: ids > 1 ? ids + 1 : ids,
        ...ctx.request.body.data,
        role: 'user'
    }).then((docs) => {
        ctx.body = docs.ok ? {
            success: 'success',
            code: 200,
            message: '新建成功'
        } : {
            error: docs,
            code: 400,
            message: docs
        }
    })
})

module.exports = router.routes()