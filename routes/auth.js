import express from 'express'
import {generateToken} from "../utils/authUtils"
import {authenticate} from "../controllers/auth"
import Validator from 'express-joi-validation'
import {loginSchema} from './validationSchemas'

const router = express.Router()
const validator = Validator({})

router.post('/', validator.body(loginSchema), async (req, res, next) => {
    const user = await authenticate(req.body.email, req.body.password)
    if(!user){
        return res.status(401).json({message:'Email or password is incorrect'})
    }
    return res.json({token: generateToken(user), userId: user.id, userName:user.username, verified: user.verified})
})

export default router
