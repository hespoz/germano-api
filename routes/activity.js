import express from 'express'
import Validator from "express-joi-validation"

import {numberParam} from './validationSchemas'
import {fetchActivity} from "../controllers/activity";

const router = express.Router()
const validator = Validator({})

module.exports = (app, passport) => {

    router.get('/:number', passport.authenticate('jwt', {session: false}), validator.params(numberParam), async (req, res, next) => {

        try {
            const resultList = await fetchActivity(req.user, req.params.number)
            res.json(resultList)
        } catch (err) {
            next(err)
        }


    })

    return router
}
