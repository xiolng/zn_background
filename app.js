/**
 * Created by xiolng on 2018/7/20.
 */
const koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const http = require('http')
const app = new koa()
const router = new Router()
const querystring = require('querystring');
const static = require('koa-static');
const render = require('koa-art-template');
const path = require('path');

// let Db = require('./mongoConfig/index.js')


const index = require('./router/index.js')
const header = require('./router/header.js')
const home = require('./router/home.js')
const resume = require('./router/resume.js')


render(app,{
    root:path.join(__dirname,'./dist'),
    extname:'.html',
    debug:process.env.NODE_ENV !== 'production'
});


app.use(static(
	path.join(__dirname,'dist')
))

app.use(async (ctx, next) => {
    // console.log('userCtx', ctx);
    await next();
})



router.use(index)


router.use('/header',header)
router.use('/home',home)
router.use('/resume',resume)


app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

if(process.env.NODE_ENV !== 'production'){
    app.listen(5599, () => {
        console.log('starting at port 5599');
    })
} else {
    app.listen(80, () => {
        console.log('starting at port 80');
    })
}

