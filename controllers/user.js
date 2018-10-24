import {User} from "../models/user";
import {CreditCard} from "../models/CreditCard";
import {sendConfirmationEmail, sendPasswordRecoveryEmail} from "../utils/emailUtils"
import {get} from "lodash"
import crypto from "crypto"


const generateToken = (email) => crypto.createHash('sha1').update(email + Math.random().toString(36).substring(7)).digest('hex')

export const registerUser = async (data) => {
    const result = await User.find({
        $or: [
            {email: data.email},
            {username: data.username}]
    }).limit(1)

    if (result.length > 0) {
        throw new Error("This user is already added")
    }

    const verificationToken = generateToken(data.email)

    let newUser = new User()
    newUser.email = data.email
    newUser.username = data.username
    newUser.password = data.password
    newUser.token = verificationToken

    const createdUser = await newUser.save()

    await sendConfirmationEmail(data.email, verificationToken)

    return createdUser

}


export const updateUserProfile = async (userId, data) => {
    let user = await User.findById(userId)

    const actualUser = await User.findOne({$or: [{email:data.email},{username:data.username}]})

    if(String(actualUser._id) === String(userId)){
        user.email = data.email
        user.username = data.username
        await user.save()
    } else {
        throw new Error("Email or username is already taken")
    }

    return await fetchUserInfo(userId)
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

export const resendVerificationLink = async (userId) => {
    const user = await User.findById(userId)

    if (user) {

        if (!get(user, "token")) {
            user.token = generateToken(user.email)
            await user.save()
        }

        await sendConfirmationEmail(user.email, user.token)
        return true
    }

}

export const requestRecoverPassword = async (email) => {

    const user = await User.findOne({email})


    if (user) {
        user.recoveryToken = generateToken(user.email)
        await user.save()

        await sendPasswordRecoveryEmail(user.email, user.recoveryToken)
    }


    return true

}


export const resetPassword = async (recoveryToken, newPassword) => {
    const user = await User.findOne({recoveryToken})

    if (user) {
        user.recoveryToken = null
        user.password = newPassword
        await user.save()
        return true
    }

    throw new Error("You link has expired")

}

export const fetchUserInfo = async (userId) => {
    const user = await User.findById(userId)
    return {
        user: user,
        creditCard: await CreditCard.findById(user.creditCard)
    }
}

