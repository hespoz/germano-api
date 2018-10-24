import mongoose from "mongoose"
mongoose.Promise = Promise


const UserSchema = new mongoose.Schema({
    email:String,
    username:String,
    password:String,
    token:String,
    recoveryToken: String,
    verified:{type:Boolean, default:false},
    type:{ type: String, enum: ['user', 'admin'] },
    creditCard: { type: mongoose.Schema.ObjectId, ref: 'CreditCard' },
    notifications:{type:Boolean, default:true}
})

export const User = mongoose.model('User', UserSchema)
