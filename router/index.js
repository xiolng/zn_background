const router = require('koa-router')()
router.get('/', async (ctx) =>{
    await ctx.render('dist/index')
})

module.exports = router.routes()