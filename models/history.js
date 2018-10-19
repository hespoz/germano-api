import mongoose from "mongoose"
mongoose.Promise = Promise

const HistorySchema = new mongoose.Schema({
    time : { type : Date, default: Date.now },
    bucketId: { type: mongoose.Schema.ObjectId, ref: 'Bucket' },
    bucketName: String,
    ownerId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    ownerName: String,
    sentenceId: { type: mongoose.Schema.ObjectId },
    sentenceContent: String,
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' }
})


export const History = mongoose.model('History', HistorySchema)
