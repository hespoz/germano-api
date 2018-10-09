import mongoose from "mongoose"
mongoose.Promise = Promise

export const CommentSchema = new mongoose.Schema({
    comment:String,
    authorId:{ type: mongoose.Schema.ObjectId, ref: 'User' }
})

export const Comment = mongoose.model('Comment', CommentSchema)
