'use strict'
const TaskService = require('../services/task.service')
const {OK, CREATED, SuccessResponse} = require('../cores/success.response')

class TaskController{
    getListTask = async ( req, res, next ) => {
        new SuccessResponse({
            message: 'Get list task success!',
            metadata: await TaskService.getListTask(req.user._id, req.params.id, req.params._id)
        }).send(res)
    }

    createTask = async ( req, res, next ) => {
        new CREATED({
            message: 'Created task success!',
            metadata: await TaskService.createTask(req.body, req.user._id, req.params.id, req.params._id)
        }).send(res)
    }

    updateTask = async ( req, res, next ) => {
        new OK({
            message: 'Update task success!',
            metadata: await TaskService.updateTask(req.body, req.user._id, req.params.id, req.params._id, req.params.id_)
        }).send(res)
    }
    
    deleteTask = async ( req, res, next ) => {
        new OK({
            message: 'Delete task success!',
            metadata: await TaskService.deleteTask(req.user._id, req.params.id, req.params._id,  req.params.id_)
        }).send(res)
    }
}

module.exports = new TaskController()