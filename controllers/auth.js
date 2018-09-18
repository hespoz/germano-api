import {User} from "../models/user";

export const authenticate = async (email, password) => {
    return await User.findOne({email, password})
}
