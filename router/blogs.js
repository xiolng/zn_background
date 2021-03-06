const router = require('koa-router')()
const https = require('https')
const querystring = require('querystring')
const {URL} = require('url')
const {getToken} = require('../mongoConfig/token')


const blogDB = require('../mongoConfig')


router.post('/', async (ctx, next) => {

    next()

})

//getList
router.post('/blogsList', async (ctx, next) => {
    await blogDB.find('blog', {}).then((docs) => {
        let data = docs.map(v => {
            // 截取一部分内容展示
            let arrCon = v.content.split('')
            arrCon.length = 10
            v.content = arrCon.join(',').replace(/,/g, '')
            return v
        })
        ctx.body = {
            data: data,
            success: 'success',
            code: 200,
            message: '获取成功'
        }
    })

})
//getListDetail
router.post('/blogsDetail', async (ctx, next) => {
    let token = ctx.request.headers.authorization
    getToken(token).then(res => {
        console.log(3333, res)
    })
    let ids = ctx.request.body.data.id
    await blogDB.find('blog', {id: ids}).then((docs) => {
        ctx.body = {
            data: docs[0],
            success: 'success',
            code: 200,
            message: '获取成功'
        }
    })

})
//newBlogs
router.post('/createBlogs', async (ctx, next) => {

    let token = ctx.request.headers.authorization
    getToken(token).then(res => {
        console.log(3333, res)
    })
    let ids = await blogDB.findLast('blog',{}).then(res => {
        console.log(333, res)
        return res[0] && res[0].id || 1
    })
    await blogDB.insert('blog', {
        id: ids > 1 ? ids + 1 : ids,
        ...ctx.request.body.data
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
//dropBlogs
router.post('/deleteBlogs', async (ctx, next) => {
    await blogDB.remove('blog', ctx.request.body.data).then((docs) => {
        ctx.body = {
            success: 'success',
            code: 200,
            message: '新建成功'
        }
    })

})
//updateBlogs
router.post('/updateBlogs', async (ctx, next) => {
    let data = ctx.request.body.data
    await blogDB.update('blog', [
        {id: data.id},
        {$set: {data}},
        {
            upsert: false,
            multi: true,
            writeConcern: true
        }
    ]).then((docs) => {
        ctx.body = {
            success: 'success',
            code: 200,
            message: '新建成功'
        }
    })

})

// router.use('/navData',navData)

module.exports = router.routes()
