import mongoose from "mongoose"
import {Bucket, Sentence} from "./bucket";
import {User} from "./user";
mongoose.Promise = Promise

const ActivitySchema = new mongoose.Schema({
    type:{ type: String, enum: ['COMMENT', 'TAG'] },
    time : { type : Date, default: Date.now },
    bucket: { type: mongoose.Schema.ObjectId, ref: 'Bucket' },
    sentence: { type: mongoose.Schema.ObjectId, ref: 'Sentence' },
    comment: String,
    toUser: { type: mongoose.Schema.ObjectId, ref: 'User' },
    fromUser: { type: mongoose.Schema.ObjectId, ref: 'User' }
})


export const Activity = mongoose.model('Activity', ActivitySchema)
