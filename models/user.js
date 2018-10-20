import mongoose from "mongoose"
mongoose.Promise = Promise


const UserSchema = new mongoose.Schema({
    email:String,
    username:String,
    password:String,
    token:String,
    verified:{type:Boolean, default:false},
    type:{ type: String, enum: ['user', 'admin'] }
})

export const User = mongoose.model('User', UserSchema)
