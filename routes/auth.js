import express from 'express'
import {generateToken} from "../utils/authUtils"
import {authenticate} from "../controllers/auth"
import {resendVerificationLink, verificationStatus} from "../controllers/user"
import Validator from 'express-joi-validation'
import {loginSchema} from './validationSchemas'


const router = express.Router()
const validator = Validator({})

module.exports = (app, passport) => {

    router.post('/', validator.body(loginSchema), async (req, res, next) => {
        const user = await authenticate(req.body.email, req.body.password)
        if(!user){
            return res.status(401).json({message:'Email or password is incorrect'})
        }
        return res.json({token: generateToken(user), userId: user.id, userName:user.username, verified: user.verified})
    })

    router.get('/confirmation/status', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
        return res.json(await verificationStatus(req.user._id))
    })

    router.put('/resend/verification', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
        try {

            return res.json(await resendVerificationLink(req.user._id))

        } catch (err) {
            next(err)
        }
    })

    return router
}
