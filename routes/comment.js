import express from 'express'
import Validator from 'express-joi-validation'
import {addComment, editComment, removeComment} from "../controllers/comment";
import {addCommentSchema, editCommentSchema, removeCommentSchema} from "./validationSchemas";

const router = express.Router()
const validator = Validator({})

module.exports = (app, passport) => {

    router.post('/', passport.authenticate('jwt', {session: false}), validator.body(addCommentSchema), async (req, res, next) => {
        try {
            const bucket = await addComment(req.body.id, req.body.comment)
            res.json(bucket)
        } catch (err) {
            return next(err)
        }
    })

    router.put('/', passport.authenticate('jwt', {session: false}), validator.body(editCommentSchema), async (req, res, next) => {
        try {
            const bucket = await editComment(req.body.sentenceId, req.body.commentId, req.body.comment)
            res.json(bucket)
        } catch (err) {
            return next(err)
        }
    })


    router.delete('/:sentenceId/:commentId', passport.authenticate('jwt', {session: false}), validator.params(removeCommentSchema), async (req, res, next) => {
        try {
            const bucket = await removeComment(req.params.sentenceId, req.params.commentId)
            res.json(bucket)
        } catch (err) {
            return next(err)
        }
    })


    return router
}
