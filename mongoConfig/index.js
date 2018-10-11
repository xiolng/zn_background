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
                        user: ''+Config.loginData.user,
                        password: ''+Config.loginData.pwd
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
                let result = db.collection(collectionName).find(json);

                result.toArray(function (err, docs) {
                    if (err) {
                        reject(err)
                        return;
                    }
                    resolve(docs)
                })
            })
        })
    }

    update(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                let result = db.collection(collectionName).update(json);

                result.toArray(function (err, docs) {
                    if (err) {
                        reject(err)
                        return;
                    }
                    resolve(docs)
                })
            })
        })
    }

    insert(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                let result = db.collection(collectionName).insertOne(json);

                result.toArray(function (err, docs) {
                    if (err) {
                        reject(err)
                        return;
                    }
                    resolve(docs)
                })
            })
        })
    }

    remove(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                let result = db.collection(collectionName).remove(json);

                result.toArray(function (err, docs) {
                    if (err) {
                        reject(err)
                        return;
                    }
                    resolve(docs)
                })
            })
        })
    }


}


module.exports = Index.getInstance()
