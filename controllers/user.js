import {User} from "../models/user";

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

    return await newUser.save()

}
