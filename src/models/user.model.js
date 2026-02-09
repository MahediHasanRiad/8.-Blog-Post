import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'Email Required !!!'],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
             message: (props) => `${props.value} is not a valid Email !`
        }
    },
    mobile: {
        type: Number,
        // max: [16, 'Too Long'],
        // min: [10, 'Not Valid'],
        required: [true, 'Mobile number required !!!'],
        validate:{
            validator: function(v){
                return /^(?:\+88|88)?(01[3-9]\d{8})$/.test(v);
            },
            message: (props) => `${props.value} in not valid Number !!!`
        }
    },
    password: {
        type: String,
        minLength: [6, 'Minimum 6 character'],
        required: [true, 'Password Required !!!']
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    }
}, {timestamps: true})


// hash password
userSchema.pre("save", async function(next) {
    try {
        if(!this.isModified("password")) return

        this.password = await bcrypt.hash(this.password, 10)
        return next()
    } catch (error) {
        console.log(error)
    }
})

// compare hash password
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

// jwt token
userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            password: this.password
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRE}
    )
}


export const User = model('User', userSchema)