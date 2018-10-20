import express from 'express'
import { registerUser, verifyUser } from '../controllers/user'
import {generateToken} from "../utils/authUtils"
import Validator from 'express-joi-validation'

const router = express.Router()
const validator = Validator({})

import {registerSchema, tokenParam} from './validationSchemas'

router.post('/', validator.body(registerSchema), async (req, res, next) => {
    try {

        const createdUser = await registerUser(req.body)
        return res.json({
            token:generateToken(createdUser), userId: createdUser._id, userName:createdUser.username, verified: createdUser.verified
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

module.exports = router;
