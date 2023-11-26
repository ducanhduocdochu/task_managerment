'use strict'

const { findUserById } = require("../models/repositories/user.repositories")

const { NotFoundError, BadRequestError } = require('../cores/error.response')
const { findColumnById, insertTask, deleteTaskFromColumn } = require("../models/repositories/column.repositories")
const { findBoardById } = require("../models/repositories/board.repositories")
const { convertToObjectIdMongodb } = require("../utils")
const { createTask, updateTask, deleteTask } = require("../models/repositories/task.repositories")

class TaskService {

    static getListTask = async (user_id, board_id, column_id) => {
        const user = await findUserById({user_id});
        if(!user) {
            throw new NotFoundError("Not Found User")
        }

        if(!user.boards.some(objId => objId.toString() === convertToObjectIdMongodb(board_id).toString())){
            throw new BadRequestError("Not Found Board")
        }

        const board = await findBoardById({board_id});
        if(!board) {
            throw new NotFoundError("Not Found Board")
        }

        if(!board.columns.some(objId => objId.toString() === convertToObjectIdMongodb(column_id).toString())){
            throw new BadRequestError("Not Found Column")
        }

        const column = await findColumnById({column_id});
        if(!column) {
            throw new NotFoundError("Not Found Column")
        }

        // 
        const list = await Promise.all(column.tasks.map(async (task_id) => {
            return await findTaskById({ task_id })
        }))
        return list
    }

    static createTask = async({title}, user_id, board_id, column_id) => {
        const user = await findUserById({user_id});
        if(!user) {
            throw new NotFoundError("Not Found User")
        }

        if(!user.boards.some(objId => objId.toString() === convertToObjectIdMongodb(board_id).toString())){
            throw new BadRequestError("Not Found Board")
        }

        const board = await findBoardById({board_id});
        if(!board) {
            throw new NotFoundError("Not Found Board")
        }

        if(!board.columns.some(objId => objId.toString() === convertToObjectIdMongodb(column_id).toString())){
            throw new BadRequestError("Not Found Column")
        }

        const column = await findColumnById({column_id});
        if(!column) {
            throw new NotFoundError("Not Found Column")
        }

        // 
        const task = await createTask({title})
        if (!task){
            throw new BadRequestError("Create Task fail")
        }
        const updatedTask = await insertTask({column_id, task_id: task._id})
        if (!updatedTask){
            throw new BadRequestError("Create Task fail")
        }

        return task
    }
    
    static updateTask = async({title, subtasks}, user_id, board_id, column_id, task_id) => {
        const user = await findUserById({user_id});
        if(!user) {
            throw new NotFoundError("Not Found User")
        }

        if(!user.boards.some(objId => objId.toString() === convertToObjectIdMongodb(board_id).toString())){
            throw new BadRequestError("Not Found Board")
        }

        const board = await findBoardById({board_id});
        if(!board) {
            throw new NotFoundError("Not Found Board")
        }
        console.log(board)
        if(!board.columns.some(objId => objId.toString() === convertToObjectIdMongodb(column_id).toString())){
            throw new BadRequestError("Not Found Column")
        }

        const column = await findColumnById({column_id});
        if(!column) {
            throw new NotFoundError("Not Found Column")
        }
        
        // 
        const task = await updateTask({task_id,title, subtasks})
        if (!task.modifiedCount){
            throw new BadRequestError("Update Task fail")
        }
        return task.modifiedCount
    }

    static deleteTask = async (user_id, board_id, column_id, task_id) => {
        const user = await findUserById({user_id});
        if(!user) {
            throw new NotFoundError("Not Found User")
        }

        if(!user.boards.some(objId => objId.toString() === convertToObjectIdMongodb(board_id).toString())){
            throw new BadRequestError("Not Found Board")
        }

        const board = await findBoardById({board_id});
        if(!board) {
            throw new NotFoundError("Not Found Board")
        }

        if(!board.columns.some(objId => objId.toString() === convertToObjectIdMongodb(column_id).toString())){
            throw new BadRequestError("Not Found Column")
        }

        const column = await findColumnById({column_id});
        if(!column) {
            throw new NotFoundError("Not Found Column")
        }
        
        // 
        const deletedTask = await deleteTaskFromColumn({column_id, task_id})
        if (!deletedTask){
            throw new BadRequestError("Delete Task fail")
        }
        const task = await deleteTask({task_id})
        if (!task.deletedCount){
            throw new BadRequestError("Delete Task fail")
        }
        return task.deletedCount
    }
}

module.exports = TaskService