import express from 'express'
import { registerUser } from '../controllers/user'
import {generateToken} from "../utils/authUtils"
import Validator from 'express-joi-validation'

const router = express.Router()
const validator = Validator({})

import {registerSchema} from './validationSchemas'

router.post('/', validator.body(registerSchema), async (req, res, next) => {
    try {

        const createdUser = await registerUser(req.body)
        return res.json({
            token:generateToken(createdUser), userId: createdUser._id, userName:createdUser.username
        })

    } catch (err) {
        next(err)
    }
})

module.exports = router;
