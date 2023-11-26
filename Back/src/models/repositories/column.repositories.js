const { convertToObjectIdMongodb } = require("../../utils");
const ColumnModel = require("../Column.model")

const findColumnById = async({column_id}) =>{
    return await ColumnModel.findOne({_id: column_id}).lean();
}

const createColumn = async({title}) =>{
    return await ColumnModel.create({
        title
    })
}

const updateColumn = async({title, column_id}) =>{
    return await ColumnModel.updateOne({_id: column_id}, { $set: { title } });
}

const deleteColumn = async({column_id}) =>{
    return await ColumnModel.deleteOne({_id: column_id});
}

const insertTask = async ({ column_id, task_id }) => {
    const updatedColumn = await ColumnModel.findByIdAndUpdate(
      _id = column_id,
      { $push: { tasks: convertToObjectIdMongodb(task_id)} },
      { new: true }
    );
    return updatedColumn;
  };
  
  const deleteTaskFromColumn = async ({ column_id, task_id }) => {
    return await ColumnModel.updateOne(
      { _id: column_id },
      { $pull: { tasks: task_id } }
    );
  };

module.exports = {
    findColumnById,
    createColumn,
    updateColumn,
    deleteColumn,
    insertTask,
    deleteTaskFromColumn
}