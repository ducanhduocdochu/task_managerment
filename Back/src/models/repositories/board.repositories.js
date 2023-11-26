const { convertToObjectIdMongodb } = require("../../utils");
const boardModel = require("../board.model");

const findBoardById = async ({ board_id }) => {
  return await boardModel.findOne({ _id: board_id }).lean();
};

const createBoard = async ({ title }) => {
  return await boardModel.create({
    title,
  });
};

const updateBoard = async ({ title, board_id }) => {
  return await boardModel.updateOne({ _id: board_id }, { $set: { title } });
};

const deleteBoard = async ({ board_id }) => {
  return await boardModel.deleteOne({ _id: board_id });
};

const insertColumn = async ({ board_id, column_id }) => {
  const updatedBoard = await boardModel.findByIdAndUpdate(
    _id = board_id,
    { $push: { columns: convertToObjectIdMongodb(column_id)} },
    { new: true }
  );
  console.log(updatedBoard);

  return updatedBoard;
};

const deleteColumnFromBoard = async ({ board_id, column_id }) => {
  return await boardModel.updateOne(
    { _id: board_id },
    { $pull: { columns: column_id } }
  );
};

module.exports = {
  findBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  insertColumn,
  deleteColumnFromBoard,
};
