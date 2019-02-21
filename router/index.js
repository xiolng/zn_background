const router = require('koa-router')()

//index
router.get('/', async (ctx) =>{
    await ctx.render('../index/index')
})

//blog
router.get('/blogs', async (ctx) =>{
    await ctx.render('../blogs/index')
})

module.exports = router.routes()