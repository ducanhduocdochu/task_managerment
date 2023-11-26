'use strict'

const { findUserById, insertBoard, deleteBoardFromUser } = require("../models/repositories/user.repositories")

const { NotFoundError, BadRequestError } = require('../cores/error.response')
const { findBoardById, createBoard, updateBoard, deleteBoard } = require("../models/repositories/board.repositories")
const { findColumnById, deleteColumn } = require("../models/repositories/column.repositories")
const { deleteTask } = require("../models/repositories/task.repositories")

class BoardService {

    static getListBoard = async (user_id) => {
        const user = await findUserById({user_id});
        if(!user) {
            throw new NotFoundError("Not Found User")
        }
        const list = await Promise.all(user.boards.map(async (board_id) => {
            return await findBoardById({ board_id })
        }))
        return list
    }

    static createBoard = async({title}, user_id) => {
        const board = await createBoard({title})
        if (!board){
            throw new BadRequestError("Create board fail")
        }
        const updatedBoard = await insertBoard({ user_id, board_id: board._id})
        if (!updatedBoard){
            throw new BadRequestError("Create board fail")
        }
        return board
    }
    
    static updateBoard = async({title},board_id) => {
        const board = await updateBoard({board_id, title})
        if (!board.modifiedCount){
            throw new BadRequestError("Update board fail")
        }
        return board.modifiedCount
    }

    static deleteBoard = async (user_id, board_id) => {
        // 

        const _board = await findBoardById({board_id})
        const _list = await Promise.all(_board.columns.map(async (column_id) => {
            return await Promise.all((await findColumnById({column_id})).tasks.map(async (task_id) => {
                return await deleteTask({ task_id })
            }))
        }))
        const list = await Promise.all(_board.columns.map(async (column_id) => {
            return await deleteColumn({ column_id })
        }))

        const deletedBoard = await deleteBoardFromUser({user_id, board_id})
        if (!deletedBoard){
            throw new BadRequestError("Delete board fail")
        }
        const board = await deleteBoard({board_id})
        if (!board.deletedCount){
            throw new BadRequestError("Delete board fail")
        }
        return board.deletedCount
    }
}

module.exports = BoardService