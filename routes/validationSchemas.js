import Joi from 'joi'

Joi.objectId = require('joi-objectid')(Joi)

export const updateTranslationsSchema =Joi.object().keys({
    id:Joi.objectId().required(),
    lang: Joi.string().valid('de', 'es', 'en', 'fr', 'it', 'ru').required(),
    translation: Joi.array().items(Joi.string()).required()
}).required()

const translationListSchema = Joi.array().items(Joi.object().keys({
    lang: Joi.string().valid('de', 'es', 'en', 'fr', 'it', 'ru').required(),
    translation: Joi.array().items(Joi.string()).required()
})).required()

export const addWordSchema = Joi.object({
    _id:Joi.objectId(),
    word: Joi.string().required(),
    plural: Joi.string(),
    article: Joi.string(),
    perfect: Joi.string(),
    type: Joi.string().valid('noun', 'verb', 'modal_verb', 'local_preposition').required(),
    translations: translationListSchema,
    conjugation_present: Joi.array().items(Joi.object().keys({
        pronoun: Joi.string().valid('ich', 'du', 'er/sie/es', 'ihr', 'Sie', 'wir').required(),
        conjugation: Joi.string().required()
    })),
    categories: Joi.array().items(Joi.string()).required()
})


export const keywordParam = Joi.object({
    keyword: Joi.string().required(),
    exact: Joi.boolean().required()
})

export const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    type: Joi.string().valid('user', 'admin').required()
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const idParam = Joi.object({
    id: Joi.objectId().required()
})

