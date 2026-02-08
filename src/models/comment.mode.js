import { Schema, model } from "mongoose";


const commentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    articleID: {
        type: Schema.ObjectId,
        ref: 'Article',
        required: true
    }
}, {timestamps: true})

export const Comment = model('Comment', commentSchema)