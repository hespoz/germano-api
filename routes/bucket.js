import express from 'express'
import { createBucket, updateBucket, fetchBucketsByUserName, removeBucket } from "../controllers/bucket"
import Validator from 'express-joi-validation'
import { createBucketSchema, bucketPerNameParam, idParam } from './validationSchemas'

const router = express.Router()
const validator = Validator({})

module.exports = (app, passport) => {

    router.post('/', passport.authenticate('jwt', {session: false}), validator.body(createBucketSchema, {
        joi: {allowUnknown: true}
    }), async (req, res, next) => {
        try {
            const bucket = req.body._id ? await updateBucket(req.body, req.user._id) : await createBucket(req.body, req.user._id)
            res.json(bucket)
        } catch (err) {
            return next(err)
        }
    })


    router.delete('/:id', passport.authenticate('jwt', {session: false}), validator.params(idParam), async (req, res, next) => {
        try {
            const bucket = await removeBucket(req.params.id)
            res.json(bucket)
        } catch (err) {
            return next(err)
        }
    })


    router.get('/:username', validator.params(bucketPerNameParam, {
        joi: {allowUnknown: true}
    }), async (req, res, next) => {
        try {
            const buckets =  await fetchBucketsByUserName(req.params.username)
            res.json(buckets)
        } catch (err) {
            return next(err)
        }
    })

    return router
}
