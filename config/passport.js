import passport from 'passport'
import passportJWT from "passport-jwt"
import {User} from '../models/user'
import dotenv from 'dotenv'

const JWTStrategy   = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

dotenv.config()

console.log(process.env.SECRET_JWT_KEY)

const findUserById = async (jwtPayload, cb) => {
    try{
        const user = await User.findById(jwtPayload.id)
        return cb(null, user);
    } catch(err) {
        return cb(err);
    }
}

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.SECRET_JWT_KEY
    },
    findUserById
));


export default passport
