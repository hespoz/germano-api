import {User} from "../models/user";
import mailgun from 'mailgun.js'

const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

export const registerUser = async (data) => {
    const result = await User.find({$or:[
            {email: data.email},
            {username: data.username}]}).limit(1)

    if (result.length > 0) {
        throw new Error("This user is already added")
    }

    let newUser = new User()
    newUser.email = data.email
    newUser.username = data.username
    newUser.password = data.password

    const createdUser = await newUser.save()


    let html = `<h1>Bienvenido a Germanos!</h1>`

    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
        from: `Excited User <mailgun@${process.env.MAILGUN_DOMAIN}>`,
        to: [data.email],
        subject: "Hello",
        text: "Bienvenido a Germanos! Por favor confirma to email",
        html: html
    })

    return createdUser

}
