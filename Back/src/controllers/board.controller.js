'use strict'
const BoardService = require('../services/board.service')
const {OK, CREATED, SuccessResponse} = require('../cores/success.response')

class BoardController{
    getListBoard = async ( req, res, next ) => {
        new SuccessResponse({
            message: 'Get list board success!',
            metadata: await BoardService.getListBoard(req.user._id)
        }).send(res)
    }

    createBoard = async ( req, res, next ) => {
        new CREATED({
            message: 'Created board success!',
            metadata: await BoardService.createBoard(req.body, req.user._id)
        }).send(res)
    }

    updateBoard = async ( req, res, next ) => {
        new OK({
            message: 'Update board success!',
            metadata: await BoardService.updateBoard(req.body, req.params.id)
        }).send(res)
    }
    
    deleteBoard = async ( req, res, next ) => {
        new OK({
            message: 'Delete board success!',
            metadata: await BoardService.deleteBoard(req.user._id, req.params.id)
        }).send(res)
    }
}

module.exports = new BoardController()