import mongoose from "mongoose"
mongoose.Promise = Promise

import { DictionarySchema } from "./dictionary"
import { CommentSchema } from "./comment"


const SentenceSchema = new mongoose.Schema({
    germanSentence:String,
    spanishSentence:String,
    comments:[CommentSchema]
})

const BucketSchema = new mongoose.Schema({
    name:String,
    ownerId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    sentences:[SentenceSchema],
    words: [DictionarySchema]
})

export const Bucket = mongoose.model('Bucket', BucketSchema)
