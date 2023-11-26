const TaskModel = require("../Task.model")

const findTaskById = async({task_id}) =>{
    return await TaskModel.findOne({_id: task_id}).lean();
}

const createTask = async({title}) =>{
    return await TaskModel.create({
        title
    })
}

const updateTask = async({title, task_id}) =>{
    return await TaskModel.updateOne({_id: task_id}, { $set: { title } });
}

const deleteTask = async({task_id}) =>{
    return await TaskModel.deleteOne({_id: task_id});
}

module.exports = {
    findTaskById,
    createTask,
    updateTask,
    deleteTask
}