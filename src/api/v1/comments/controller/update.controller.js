import { Article } from "../../../../models/article.model.js";
import { Comment } from "../../../../models/comment.mode.js";
import { apiError } from "../../../../utils/apiError.js";
import { apiResponse } from "../../../../utils/apiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";

const updateCommentController = asyncHandler(async (req, res) => {
    /**
     * get {id, commentID} = req.params
     * if(!id || !commentID) return error
     * get {comment} = req.body
     * if(!comment) return error
     * update comment
     * res
     */

    const {id, commentID} = req.params 
    const {text} = req.body 

    if(!id) throw new apiError(400, 'id required !!!')
    if(!commentID) throw new apiError(400, 'commnet id required !!!')
    
    if(!text) throw new apiError(400, 'Comment text required !!!')

    const verifyCommentID = await Comment.findById(commentID)
    if(!verifyCommentID) throw new apiError(404, 'comment not found !!!')
    
    const comment = await Comment.findByIdAndUpdate(commentID, {
        text
    })

    const artilce = await Article.findById(id)

    const links = {
        self: req.path,
        article: `/article/${id}`,
        author: `/user/${artilce.author}`
    }


    res.status(200).json(new apiResponse(200, {comment, links}))
})

export {updateCommentController}