import mongoose from "mongoose"
mongoose.Promise = Promise

const PendingChangeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    newEmail:String,
    token: String
})

export const PendingChange = mongoose.model('PendingChange', PendingChangeSchema)