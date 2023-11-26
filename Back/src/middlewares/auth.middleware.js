const { findUserById, checkRefreshTokenExist } = require("../models/repositories/user.repositories")
const { verifyJWT } = require("../utils/auth")
const asyncHandler = require("../helpers/asyncHandler")
const { NotFoundError, AuthFailureError } = require("../cores/error.response")

const authentication = asyncHandler(async (req, res, next) => {
    
    const userId = req.headers["client_id"]
    if (!userId) throw new AuthFailureError('Invalid request')

    const user = await findUserById({user_id: userId})
    if (!user) throw new NotFoundError('Not found user')

    if (req.headers["refresh_token"]){
        try {
            const refreshToken = req.headers["refresh_token"]
            const _user = await checkRefreshTokenExist({user_id: userId, refreshToken})
            if (!_user) throw new NotFoundError('Not found token')
                  
            const decodeUser = await verifyJWT(refreshToken)
            console.log(decodeUser)
            if (!decodeUser) throw new AuthFailureError('Invalid token')

            if (userId != decodeUser._id) throw new AuthFailureError("Invalid userId")

            req.user = decodeUser
            req.refreshToken = refreshToken
            return next()
        } catch(err){
            throw err
        }
    }
    const accessToken = req.headers["access_token"]
    if (!accessToken) throw new AuthFailureError("Invalid Request")
    
    try {
        const decodeUser = await verifyJWT(accessToken)

        if (userId != decodeUser._id) throw new AuthFailureError("Invalid userId")
        
        req.user = decodeUser
        return next()
    
    } catch(err){
        throw err
    }
})

module.exports = authentication
