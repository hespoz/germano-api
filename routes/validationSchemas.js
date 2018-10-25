import Joi from 'joi'

Joi.objectId = require('joi-objectid')(Joi)

export const updateTranslationsSchema = Joi.object().keys({
    id: Joi.objectId().required(),
    lang: Joi.string().valid('de', 'es', 'en', 'fr', 'it', 'ru').required(),
    translation: Joi.array().items(Joi.string()).required()
}).required()

const translationListSchema = Joi.array().items(Joi.object().keys({
    lang: Joi.string().valid('de', 'es', 'en', 'fr', 'it', 'ru').required(),
    translation: Joi.array().items(Joi.string()).required()
})).required()

export const addWordSchema = Joi.object({
    _id: Joi.objectId(),
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
    conjugation_past: Joi.array().items(Joi.object().keys({
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
    username: Joi.string().required(),
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

export const numberParam = Joi.object({
    number: Joi.number().required()
})

export const tokenParam = Joi.object({
    token: Joi.string().required()
})

export const fetchWordsSchema = Joi.object({
    categories: Joi.array().items(Joi.string()),
    types: Joi.array().items(Joi.string()),
    wordsFrom: Joi.string().required(),
    bucketsSelected: Joi.array().items(Joi.string())
})

export const createBucketSchema = Joi.object({
    _id: Joi.objectId().optional(),
    name: Joi.string().optional(),
    sentences: Joi.array().items(Joi.object({
        germanSentence: Joi.string(),
        spanishSentence: Joi.string()
    })).optional(),
    wordsIds: Joi.array().items(Joi.objectId()).optional()
})

export const bucketPerNameParam = Joi.object({
    username: Joi.string().required()
})

export const addCommentSchema = Joi.object().keys({
    id: Joi.objectId().required(),
    comment: Joi.string().required()
}).required()

export const editCommentSchema = Joi.object().keys({
    sentenceId: Joi.objectId().required(),
    commentId: Joi.objectId().required(),
    comment: Joi.string().required()
}).required()

export const removeCommentSchema = Joi.object({
    sentenceId: Joi.objectId().required(),
    commentId: Joi.objectId().required()
})

export const emailParam = Joi.object({
    email: Joi.string().email().required()
})

export const resetPasswordSchema = Joi.object({
    password: Joi.string().required(),
    recoveryToken: Joi.string().required()
})

export const updateUserProfileSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    notifications: Joi.boolean().required()
})
