const MongoClient = require('mongodb').MongoClient;


const Config = require('./config')

class Index {

    static getInstance() {
        if (!Index.instance) {
            Index.instance = new Index();
        }
        return Index.instance;

    }

    constructor() {
        this.dbClient = '';
        this.connect();
    }

    connect() {
        let _that = this
        return new Promise((resolve, reject) => {
            if (!_that.dbClient) {
                MongoClient.connect(Config.url, {
                    auth: {
                        user: '' + Config.loginData.user,
                        password: '' + Config.loginData.pwd
                    },
                    authSource: 'xiolng',
                    useNewUrlParser: true
                }, (err, client) => {
                    if (err) {
                        reject(err)
                    } else {
                        _that.dbClient = client.db(Config.dbName)
                        resolve(_that.dbClient)
                    }
                })
            } else {
                resolve(_that.dbClient)
            }
        })
    }

    find(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                let result = db.collection(collectionName).find(json).sort({
                    id: -1
                });
                result.toArray((err, data) => {
                    if (err){
                        reject(err)
                        return
                    }
                    resolve(data)
                })
            })
        })
    }
    findLast(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                let result = db.collection(collectionName).find(json).sort({id: -1}).limit(1);
                result.toArray((err, data) => {
                    if (err){
                        reject(err)
                        return
                    }
                    resolve(data)
                })
            })
        })
    }

    update(collectionName, array) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                let result = db.collection(collectionName).update(array);

                result.then(res => {
                    res.result.ok ? resolve(res) : reject(res)
                })
            })
        })
    }

    insert(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                let result = db.collection(collectionName).insertOne(json);
                console.log('insert', result)
                result.then(res => {
                    res.result.ok ? resolve(res.result) : reject(res)
                })
            })
        })
    }

    remove(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                let result = db.collection(collectionName).remove(json);

                result.then(res => {
                    res.result.ok ? resolve(res) : reject(res)
                })
            })
        })
    }


}


module.exports = Index.getInstance()
