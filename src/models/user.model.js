import { Schema, model } from "mongoose";

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
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
             message: (props) => `${props.value} is not a valid Email !`
        }
    },
    mobile: {
        type: Number,
        max: [14, 'Too Long'],
        min: [11, 'Not Valid'],
        required: [true, 'Mobile number required !!!'],
        validate:{
            validator: function(v){
                return /\d{3}-\d{3}-\d{4}/.test(v);
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
        enum: ['Draft', 'Published'],
        default: 'Draft'
    }
}, {timestamps: true})

export const User = model('User', userSchema)