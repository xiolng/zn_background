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



const index = require('./router/index.js')
const blogs = require('./router/blogs.js')


render(app,{
    root:path.join(__dirname,'./index'),
    extname:'.html',
    debug:process.env.NODE_ENV !== 'production'
});

//index
app.use(static(
	path.join(__dirname,'index')
))
//blog
app.use(static(
	path.join(__dirname,'blog')
))

app.use(async (ctx, next) => {
    // console.log('userCtx', ctx);
    await next();
})



router.use(index)


router.use(blogs)


app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

if(process.env.NODE_ENV !== 'production'){
    app.listen(5599, () => {
        console.log('starting at port 5599');
    })
} else {
    app.listen(5182, () => {
        console.log('starting at port 5182');
    })
}

