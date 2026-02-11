import { Article } from "../../../../models/article.model.js";
import { apiError } from "../../../../utils/apiError.js";
import { apiResponse } from "../../../../utils/apiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { Comment } from "../../../../models/comment.mode.js";
import mongoose from "mongoose";

const allCommentsController = asyncHandler( async (req, res) => {

    /**
     * get {id} = req.params
     * find article by id
     * if(!article) return error
     * res all comments
     */

    const {id} = req.params 
    if(!id) throw new apiError(400, 'article id required !!!')
    
    const article = await Article.findById(id)
    if(!article) throw new apiError(404, 'article not found !!!')
    
    const allComments = await Comment.aggregate([
        {
            $match: {
                articleID: new mongoose.Types.ObjectId(id)
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ])

    res.status(200).json(new apiResponse(200, {article, allComments}))

})

export {allCommentsController}