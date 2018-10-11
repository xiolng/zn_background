const router = require('koa-router')()
const https = require('https')
const querystring = require('querystring')
const {URL} = require('url')


const homeDb = require('../mongoConfig')

// const navData = require('./header/navData.js')


router.post('/', async (ctx, next) => {

    next()

})

//nav
router.post('/banner', async (ctx, next) => {


    await homeDb.find('banner',{ }).then((docs )=>{
        ctx.body = docs
    })

})

// router.use('/navData',navData)

module.exports = router.routes()
