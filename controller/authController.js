import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken'
import asyncHandler from '../middleware/asyncHandler.js'


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + (3 * 24 * 60 * 60 * 1000)
        ),
        httpOnly: true,
        secure: true,

    }
    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

export const Register = asyncHandler(async (req, res) => {

    const createUser = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

    });
    createSendToken(createUser, 201, res)

})
export const Login = asyncHandler(async (req, res) => {
    if (!req.body.email && !req.body.password) {
        res.status(400)
        throw new Error('Email and Password is required')
    }

    const userData = await UserModel.findOne({ email: req.body.email })
    if (userData && (await userData.comparePassword(req.body.password))) {
        createSendToken(userData, 200, res)
    } else {
        res.status(400)
        throw new Error('Email or Password is incorrect')
    }


})
export const Logout = async (req, res) => {
    res.cookie('jwt', '', {
        expire: new Date(0),
        httpOnly: true,
        secure: false,
    })
    res.status(200).json({
        message: 'Logout successfully'
    })
}
export const GetProfile = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user._id).select({ password: 0 })
    if (user) {
        return res.status(200).json({
            user
        })
    }
    return res.status(404).json({
        message: 'User not found'
    })
})