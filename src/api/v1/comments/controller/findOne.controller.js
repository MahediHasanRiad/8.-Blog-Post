import { Article } from "../../../../models/article.model.js";
import { Comment } from "../../../../models/comment.mode.js";
import { apiError } from "../../../../utils/apiError.js";
import { apiResponse } from "../../../../utils/apiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";

const findSingleComment = asyncHandler(async(req, res) => {

    const {id, commentID} = req.params 
    if(!id) throw new apiError(400, 'article id required !!!')
    if(!commentID) throw new apiError(400, 'comment id required !!!')
    
    const article = await Article.findById(id).select("title")
    const comment = await Comment.findById(commentID)

    if(!article) throw new apiError(404, 'article not found !!!')
    if(!comment) throw new apiError(404, 'comment not found !!!')
    
    // links 
    const links = {
        article: `/article/${article._id}`,
        // author: `/users/${articleAuthor._id}`
    }

    res.status(200).json(new apiResponse(200, {article, comment, links}))

})

export {findSingleComment}