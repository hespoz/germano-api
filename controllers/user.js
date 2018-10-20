import {User} from "../models/user";
import {sendConfirmationEmail} from "../utils/emailUtils"
import crypto from "crypto"

export const registerUser = async (data) => {
    const result = await User.find({
        $or: [
            {email: data.email},
            {username: data.username}]
    }).limit(1)

    if (result.length > 0) {
        throw new Error("This user is already added")
    }

    const verificationToken = crypto.createHash('sha1').update(data.email + Math.random().toString(36).substring(7)).digest('hex')

    let newUser = new User()
    newUser.email = data.email
    newUser.username = data.username
    newUser.password = data.password
    newUser.token = verificationToken

    const createdUser = await newUser.save()

    await sendConfirmationEmail(data.email, verificationToken)

    return createdUser

}

export const verifyUser = async (token) => {
    let user = await User.findOne({token: token})

    if (user) {
        user.token = null
        user.verified = true
        await user.save()
        return true
    }

    throw new Error("El token no existe")

}

export const verificationStatus = async (userId) => {
    let user = await User.findById(userId)
    return user.verified
}
