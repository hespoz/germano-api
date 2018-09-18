import mongoose from "mongoose"
mongoose.Promise = Promise


const ConjugationSchema = new mongoose.Schema({
    pronoun:String,
    conjugation:String,
    translation:String
})

const TranslationSchema = new mongoose.Schema({
    lang:{ type: String, enum: ['es', 'en', 'fr', 'jp', 'ru'] },
    translation:[{type: String}],
    description:String
})


const DictionarySchema = new mongoose.Schema({
    word:String,
    plural:String,
    article:{ type: String, enum: ['der', 'die', 'das'] },
    perfect:String,
    type: { type: String, enum: ['noun', 'verb', 'modal_verb', 'local_preposition'] },
    translations:[TranslationSchema],
    conjugation_present: [ConjugationSchema],
    categories:[{type: String}]
})

export const Dictionary = mongoose.model('Dictionary', DictionarySchema)
