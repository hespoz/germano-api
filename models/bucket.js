import mongoose from "mongoose"
mongoose.Promise = Promise

import { DictionarySchema } from "./dictionary"

export const CommentSchema = new mongoose.Schema({
    comment:String,
    authorId:{ type: mongoose.Schema.ObjectId, ref: 'User' },
    authorName:String,
})

const SentenceSchema = new mongoose.Schema({
    germanSentence:String,
    spanishSentence:String,
    comments:[CommentSchema]
})

const BucketSchema = new mongoose.Schema({
    name:String,
    time : { type : Date, default: Date.now },
    ownerId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    ownerName: String,
    sentences:[SentenceSchema],
    words: [DictionarySchema]
})

export const Sentence = mongoose.model('Sentence', SentenceSchema)
export const Bucket = mongoose.model('Bucket', BucketSchema)
