const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const app = express()
require('dotenv').config()

// init middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// init db
require('./dbs/init.dbs')
const {checkOverload} = require('./helpers/check.connect')
checkOverload()

// init routes 
app.use('', require('./routers'))

// handling error
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const status = error.status || 500
    return res.status(status).json({
        status: 'error',
        code: status,
        stack: error.stack,
        message: error.message || 'Interal Server Error'
    })
})

module.exports = app