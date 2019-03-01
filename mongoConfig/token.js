const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const secret = 'znzheng'

class Tokens {
    constructor() {

    }

    setToken(userToken, expiresIn) {
        return jwt.sign(userToken, secret, expiresIn)
    }

    async getToken(token) {
        console.log(1111, token)
        return await verify(token.split(' ')[1], secret)
    }

    noToken(pathName) {
        return jwtKoa({secret}).unless(pathName)
    }
}

const tokens = new Tokens()
module.exports = tokens