const userModel = require("../user.model")
const {convertToObjectIdMongodb} = require("../../utils")

const findUserById = async({user_id}) =>{
    return await userModel.findOne({_id: user_id}).lean();
}

const findUserByName = async({username}) =>{
    return await userModel.findOne({username}).lean();
}

const findUserByEmail = async({email}) =>{
    return await userModel.findOne({email}).lean();
}

const createUser = async({email, username, passwordHash}) =>{
    return await userModel.create({
        username, email, password: passwordHash
    })
}

const insertRefreshToken = async({_id, refreshToken}) => {
    const updatedUser = await userModel.findByIdAndUpdate(
        _id,
        { $push: { refresh_token: refreshToken } },
        { new: true }
    );
    
    // Save the updated user
    return updatedUser
}

const checkRefreshTokenExist = async ({user_id, refreshToken}) => {
    return await userModel.findOne({
        _id: user_id,
        refresh_token: refreshToken
    });
}

const removeKeyById = async({_id, refreshToken}) => {
    return await userModel.updateOne(
        { _id: _id },
        { $pull: { refresh_token: refreshToken } },
    );
}

const insertKeyById = async({_id, refreshToken}) => {
    return await userModel.updateOne(
        { _id: _id },
        {
            $push: { refresh_token: refreshToken },
        }
    );
}

const insertBoard = async({user_id, board_id}) => {
    const updatedBoard = await userModel.findByIdAndUpdate(
        _id = user_id,
        { $push: { boards: convertToObjectIdMongodb(board_id) } },
        { new: true }
    );
    
    return updatedBoard
}

const deleteBoardFromUser = async({user_id, board_id}) => {
    return await userModel.updateOne(
        { _id: user_id },
        { $pull: { boards: board_id } },
    );
}

module.exports = {
    findUserById,
    findUserByName,
    findUserByEmail,
    createUser,
    insertRefreshToken,
    checkRefreshTokenExist,
    removeKeyById,
    insertKeyById,
    insertBoard,
    deleteBoardFromUser
}