'use strict'
const AccessService = require('../services/access.service')
const {OK, CREATED, SuccessResponse} = require('../cores/success.response')

class AccessController{
    refreshToken = async ( req, res, next ) => {
        new SuccessResponse({
            message: 'Get token success!',
            metadata: await AccessService.refreshToken(req.refreshToken, req.user)
        }).send(res)
    }

    login = async ( req, res, next ) => {
        new SuccessResponse({
            message: 'Login OK!',
            metadata: await AccessService.login(req.body)
        }).send(res)
    }

    logout = async ( req, res, next ) => {
        new SuccessResponse({
            message: 'Logout Success!',
            metadata: await AccessService.logout(req.user, req.body)
        }).send(res)
    }
    
    register = async ( req, res, next ) => {
        new CREATED({
            message: 'Registered OK!',
            metadata: await AccessService.register(req.body)
        }).send(res)
    }
}

module.exports = new AccessController()