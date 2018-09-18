import express from 'express'
import { searchByKeyword, addNewWord, addTranslation } from "../controllers/dictionary"
import Validator from 'express-joi-validation'
import { addWordSchema, keywordParam, updateTranslationsSchema} from './validationSchemas'

const router = express.Router()
const validator = Validator({})

module.exports = (app, passport) => {

    router.post('/', passport.authenticate('jwt', {session: false}), validator.body(addWordSchema), async (req, res, next) => {
        try {
            const word = await addNewWord(req.body)
            res.json(word)
        } catch (err) {
            return next(err)
        }
    })

    router.put('/', passport.authenticate('jwt', {session: false}), validator.body(updateTranslationsSchema), async (req, res, next) => {
        try {
            const word = await addTranslation(req.body)
            return res.json(word)
        } catch (err) {
            return next(err)
        }
    })

    router.get('/:keyword/:exact', validator.params(keywordParam), async (req, res, next) => {

        try {
            const resultList = await searchByKeyword(req.params.keyword,req.params.exact)
            res.json(resultList)
        } catch (err) {
            next(err)
        }


    })

    return router
}
