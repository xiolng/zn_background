const router = require('koa-router')()
const https = require('https')
const querystring = require('querystring')
const {URL} = require('url')


const resumeDb = require('../mongoConfig')

// const navData = require('./header/navData.js')


router.post('/', async (ctx, next) => {

    next()

})

//nav
router.post('/nation', async (ctx, next) => {


    await resumeDb.find('nation',{ }).then((docs )=>{
        ctx.body = docs
    })

})

// router.use('/navData',navData)

module.exports = router.routes()
