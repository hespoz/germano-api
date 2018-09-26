import mongoose from "mongoose"
mongoose.Promise = Promise

import { DictionarySchema } from "./dictionary"

const BucketSchema = new mongoose.Schema({
    name:String,
    ownerId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    words: [DictionarySchema]
})

export const Bucket = mongoose.model('Bucket', BucketSchema)
