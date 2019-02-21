const router = require('koa-router')()

//index
router.get('/', async (ctx) =>{
    await ctx.render('./index/index')
})

//blog
router.get('/blog', async (ctx) =>{
    await ctx.render('./blog/index')
})

module.exports = router.routes()