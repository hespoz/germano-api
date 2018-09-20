import {Dictionary} from "../models/dictionary";

export const addTranslation = async (body) => {
    let word = await Dictionary.findById(body.id)
    word.translations.push({
        lang: body.lang,
        translation: body.translation
    })

    await Dictionary.update({_id: body.id}, word, {multi: false})
    return word
}

export const searchByKeyword = async (keyword, exact) => {

    if (exact) {

        let searchQuery = {
            $or: [{
                word: keyword
            }, {
                plural: keyword
            }, {
                perfect: keyword
            }]
        }

        return await Dictionary.findOne(searchQuery)

    } else {
        let searchQuery = {
            $or: [{
                word: {
                    $regex: `^${keyword}.*`,
                    $options: 'i'
                }
            }, {
                plural: {
                    $regex: `^${keyword}.*`,
                    $options: 'i'
                }
            }, {
                perfect: {
                    $regex: `^${keyword}.*`,
                    $options: 'i'
                }
            },
                {'translations': {$elemMatch: {translation: {$regex: `^${keyword}.*`, $options: 'i'}}}}
            ]
        }

        return await Dictionary.find(searchQuery)

    }

}

export const updateWord = async (newWord) => {
    let word = await Dictionary.findById(newWord._id)
    word.word = newWord.word
    word.type = newWord.type
    word.plural = newWord.plural
    word.article = newWord.article
    word.perfect = newWord.perfect
    word.translations = newWord.translations
    word.conjugation_present = newWord.conjugation_present
    word.categories = newWord.categories


    await Dictionary.update({_id: newWord._id}, word, {multi: false})
    return word
}

export const addNewWord = async (word, id) => {

    const result = await Dictionary.find({word: word.word}).limit(1)

    if (result.length > 0) {
        throw new Error("This word is already added")
    }

    let newWord = new Dictionary()
    newWord.word = word.word
    newWord.type = word.type
    newWord.plural = word.plural
    newWord.article = word.article
    newWord.perfect = word.perfect
    newWord.translations = word.translations
    newWord.conjugation_present = word.conjugation_present
    newWord.categories = word.categories
    newWord.ownerId = id


    let res = await newWord.save()

    return res
}


export const searchById = async (id) => {
    return await Dictionary.findById(id)
}