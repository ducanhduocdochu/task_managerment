'use strict'

const { createUser, insertRefreshToken, removeKeyById, findUserByName, findUserByEmail, insertKeyById } = require("../models/repositories/user.repositories")

const bcrypt = require('bcrypt')
const { BadRequestError, AuthFailureError } = require('../cores/error.response')
const { createTokenPair } = require("../utils/auth")

class AccessService {

    static refreshToken = async (refreshToken, user) => {
        const {_id, email} = user
        // if (keyStore.refreshTokensUsed.includes(refreshToken)){
        //     await KeyTokenService.deleteKeyById(userId)
        //     throw new ForbiddenError("Something wrong happen !! Please relogin")

        // }

        const foundUser = await findUserByEmail({email})
        if (!foundUser) throw new AuthFailureError("Shop not registered")

        const tokens = await createTokenPair({_id, email})

        const delKey = await removeKeyById({_id, refreshToken: refreshToken})
        if (!delKey) throw new AuthFailureError("Authentication error")

        const insKey = await insertKeyById({_id, refreshToken: tokens.refreshToken})

        return {
            user: {_id, email},
            tokens
        }
    }

    static logout = async({_id}, {refresh_token}) => {
        const delKey = await removeKeyById({_id, refreshToken: refresh_token})
        if (!delKey) throw new AuthFailureError("Authentication error")
        return delKey
    }
    
    static login = async({email, password}) => {
        const foundUser = await findUserByEmail({email})
        if (!foundUser){
            throw new BadRequestError('Shop not registered')
        } 

        const match = bcrypt.compare(password, foundUser.password)
        if (!match){
            throw new BadRequestError('Authentication error')
        }

        const tokens = await createTokenPair({_id: foundUser._id, email})

        if (!tokens.accessToken || !tokens.refreshToken){
            throw new BadRequestError('GenerateKey Error')
        }

        const savedUser = await insertRefreshToken({_id: foundUser._id, refreshToken: tokens.refreshToken})

        if (!savedUser){
            throw new BadRequestError('GenerateKey Error')
        }
        return {
            code: 201,
            metadata: {
                user: {
                    _id: savedUser._id,
                    username: savedUser.username,
                    email: savedUser.email,
                },
                tokens
            }
        }
    }

    static register = async ({email, username, password}) => {
        const __existedUser = await findUserByName({username})
        const _existedUser = await findUserByEmail({email})
        if (_existedUser){
            throw new BadRequestError('Error: Username already registered')
        }
        if (__existedUser){
            throw new BadRequestError('Error: Email already registered')
        }
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = await createUser({email, username, passwordHash})
        if(!newUser){
            throw new BadRequestError('Error: Database error')
        }
        return {
            code: 201,
            metadata: {
                user: {
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                },
            }
        }
    }
}

module.exports = AccessService