import express from 'express'
import { searchByKeyword, addNewWord, updateWord, addTranslation, searchById, fetchWords } from "../controllers/dictionary"
import Validator from 'express-joi-validation'
import { addWordSchema, keywordParam, updateTranslationsSchema, idParam, fetchWordsSchema} from './validationSchemas'

const router = express.Router()
const validator = Validator({})

module.exports = (app, passport) => {

    router.post('/', passport.authenticate('jwt', {session: false}), validator.body(addWordSchema, {
        joi: {allowUnknown: true}
    }), async (req, res, next) => {
        try {
            const word = req.body._id ? await updateWord(req.body) : await addNewWord(req.body, req.user._id)
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

    router.get('/:id', validator.params(idParam), async (req, res, next) => {

        try {
            const resultList = await searchById(req.params.id)
            res.json(resultList)
        } catch (err) {
            next(err)
        }


    })


    router.post('/search', validator.body(fetchWordsSchema), async (req, res, next) => {

        try {
            const resultList = await fetchWords(req.body.categories, req.body.types)
            res.json(resultList)
        } catch (err) {
            next(err)
        }


    })

    return router
}
