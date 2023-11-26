'use strict'

const dev = {
    app: {port: process.env.DEV_APP_PORT || 3000},
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        PORT: process.env.DEV_DB_PORT || 12017,
        name: process.env.DEV_DB_NAME || 'Task_Management',
        username: process.env.DEV_DB_USERNAME || 'admin',
        password: process.env.DEV_DB_PASSWORD || 'Tducanh263'
    }
}

const pro = {
    app: {port: process.env.PRO_APP_PORT || 3000},
    db: {
        host: process.env.PRO_DB_HOST || 'localhost',
        PORT: process.env.PRO_DB_PORT || 12017,
        name: process.env.PRO_DB_NAME || 'ducanh',
        username: process.env.PRO_DB_USERNAME || 'admin',
        password: process.env.PRO_DB_PASSWORD || 'Tducanh263'
    }
}

const config = {dev, pro}
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env]