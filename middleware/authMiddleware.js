import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'


export const authMiddleware = async (req, res, next) => {
    let token
    let decoded
    token = req.cookies.jwt

    if (!token) {
        return next(
            res.status(401).json({
                message: 'Unauthorized'
            })
        )
    }
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET)


    } catch (error) {
        return next(
            res.status(401).json({
                message: 'Token is invalid'
            })
        )
    }

    const currentUser = await UserModel.findById(decoded.id)
    if (!currentUser) {
        return next(
            res.status(401).json({
                message: 'User not found'
            })
        )
    }
    req.user = currentUser
    next()
}

export const permissionUser = (...rolse) => {
    return (req, res, next) => {
        if (!rolse.includes(req.user.role)) {
            return next(
                res.status(403).json({
                    message: 'Forbidden Access'
                })
            )
        }
        next()
    }
}
