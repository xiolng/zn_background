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
const tokens = require('./mongoConfig/token')
const noTokenPath = require('./mongoConfig/noTokenPath')


const index = require('./router/index.js')
const blogs = require('./router/blogs.js')
const login = require('./router/login.js')
const user = require('./router/user.js')

app
    .use(bodyParser())

app.use(tokens.noToken({
    path: noTokenPath
}))

render(app, {
    root: path.join(__dirname, './'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

//index
app.use(static(
    path.join(__dirname, 'dist')
))
app.use(async (ctx, next) => {
    // console.log('userCtx', ctx);
    await next();
})


router.use(index)


router.use('/blogs', blogs)
router.use('/login', login)
router.use('/user', user)


app
    .use(router.routes())
    .use(router.allowedMethods())

if (process.env.NODE_ENV !== 'production') {
    app.listen(5599, () => {
        console.log('starting at port 5599');
    })
} else {
    app.listen(5182, () => {
        console.log('starting at port 5182');
    })
}

