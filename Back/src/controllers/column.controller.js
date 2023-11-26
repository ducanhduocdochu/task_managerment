'use strict'
const ColumnService = require('../services/column.service')
const {OK, CREATED, SuccessResponse} = require('../cores/success.response')

class ColumnController{
    getListColumn = async ( req, res, next ) => {
        new SuccessResponse({
            message: 'Get list Column success!',
            metadata: await ColumnService.getListColumn(req.user._id, req.params.id)
        }).send(res)
    }

    createColumn = async ( req, res, next ) => {
        new CREATED({
            message: 'Created Column success!',
            metadata: await ColumnService.createColumn(req.body, req.user._id, req.params.id)
        }).send(res)
    }

    updateColumn = async ( req, res, next ) => {
        new OK({
            message: 'Update Column success!',
            metadata: await ColumnService.updateColumn(req.body, req.user._id, req.params.id, req.params._id)
        }).send(res)
    }
    
    deleteColumn = async ( req, res, next ) => {
        new OK({
            message: 'Delete Column success!',
            metadata: await ColumnService.deleteColumn(req.user._id, req.params.id, req.params._id)
        }).send(res)
    }
}

module.exports = new ColumnController()