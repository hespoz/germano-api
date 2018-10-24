import mongoose from "mongoose"
mongoose.Promise = Promise

const CreditCardSchema = new mongoose.Schema({
    ccToken:String,
    description:String,
    type:{ type: String, enum: ['VISA', 'MASTERCARD','AMERICAN_EXPRESS', 'OTHER'] }
})

export const CreditCard = mongoose.model('CreditCard', CreditCardSchema)
