'use strict'

const { findUserById } = require("../models/repositories/user.repositories")

const { NotFoundError, BadRequestError } = require('../cores/error.response')
const { createColumn, updateColumn, deleteColumn, findColumnById } = require("../models/repositories/column.repositories")
const { findBoardById, insertColumn, deleteColumnFromBoard } = require("../models/repositories/board.repositories")
const { convertToObjectIdMongodb } = require("../utils")
const TaskService = require("./task.service")
const { deleteTask } = require("../models/repositories/task.repositories")

class ColumnService {

    static getListColumn = async (user_id, board_id) => {
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

        // 
        const list = await Promise.all(board.columns.map(async (column_id) => {
            return await findColumnById({ column_id })
        }))
        return list
    }

    static createColumn = async({title}, user_id, board_id) => {
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

        // 
        const column = await createColumn({title})
        if (!column){
            throw new BadRequestError("Create Column fail")
        }
        const updatedColumn = await insertColumn({board_id, column_id: column._id})
        if (!updatedColumn){
            throw new BadRequestError("Create Column fail")
        }

        return column
    }
    
    static updateColumn = async({title}, user_id, board_id, column_id) => {
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
        
        // 
        const column = await updateColumn({column_id,title})
        if (!column.modifiedCount){
            throw new BadRequestError("Update Column fail")
        }
        return column.modifiedCount
    }

    static deleteColumn = async (user_id, board_id, column_id) => {
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
        
        // 
        const _column = await findColumnById({column_id})
        const list = await Promise.all(_column.tasks.map(async (task_id) => {
            return await deleteTask({ task_id })
        }))

        // 
        const deletedColumn = await deleteColumnFromBoard({board_id, column_id})
        if (!deletedColumn){
            throw new BadRequestError("Delete Column fail")
        }
        const Column = await deleteColumn({column_id})
        if (!Column.deletedCount){
            throw new BadRequestError("Delete Column fail")
        }
        return Column.deletedCount
    }
}

module.exports = ColumnService