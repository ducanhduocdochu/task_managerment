'use strict'
const mongoose = require("mongoose")
const {countConnect} = require('../helpers/check.connect')
const { db: {name, username, password, host, PORT} } = require('../configs/config.mongodb')
const connectString = `mongodb://${host}:${PORT}/${name}`
// const connectString = `mongodb+srv://${username}:${password}@cluster0.b24uxmq.mongodb.net/?retryWrites=true&w=majority`

class Database {
    constructor(){
        this.connect()
    }
    // connect
    connect(type = 'mongodb'){
        if(1 == 0){
            mongoose.set('debug', true)
            mongoose.set('debug', {color :true})
        }
        mongoose.connect(connectString, {
            maxPoolSize: 50
        }).then( _ => console.log(`Connected Mongodb Success`), countConnect())
        .catch(err => console.log(`Error Connect`, err))

    }
    static getInstance(){
        if (!Database.instance){
            Database.instance = new Database()
        }

        return Database.instance
    }
}
const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb