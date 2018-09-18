import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        type: user.type
    }, process.env.SECRET_JWT_KEY);
}
