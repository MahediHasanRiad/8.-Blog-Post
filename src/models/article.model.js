import { Schema, model } from "mongoose";

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Draft', 'Published'],
        default: 'Draft'
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

export const Article = model('Article', articleSchema)