import express from 'express'
import { registerUser, verifyUser, fetchUserInfo, updateUserProfile } from '../controllers/user'
import {generateToken} from "../utils/authUtils"
import Validator from 'express-joi-validation'

const router = express.Router()
const validator = Validator({})

import {registerSchema, tokenParam, updateUserProfileSchema} from './validationSchemas'

module.exports = (app, passport) => {
    router.post('/', validator.body(registerSchema), async (req, res, next) => {
        try {

            const createdUser = await registerUser(req.body)
            return res.json({
                token: generateToken(createdUser),
                userId: createdUser._id,
                userName: createdUser.username,
                verified: createdUser.verified
            })

        } catch (err) {
            next(err)
        }
    })


    router.put('/confirm/:token', validator.params(tokenParam), async (req, res, next) => {
        try {

            return res.json(await verifyUser(req.params.token))

        } catch (err) {
            next(err)
        }
    })

    router.get('/info', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
        try {

            return res.json(await fetchUserInfo(req.user._id))

        } catch (err) {
            next(err)
        }
    })

    router.put('/info', passport.authenticate('jwt', {session: false}), validator.body(updateUserProfileSchema), async (req, res, next) => {
        try {

            return res.json(await updateUserProfile(req.user._id, req.body))

        } catch (err) {
            next(err)
        }
    })

    return router

}