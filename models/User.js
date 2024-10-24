import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        unique: [true, 'Name is already taken'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already taken'],
        validate: [validator.isEmail, 'Invalid email format'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
})


userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.comparePassword = async function (inpitPassword) {
    return await bcrypt.compare(inpitPassword, this.password)
}

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
