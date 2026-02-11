import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { Comment } from "../../../../models/comment.mode.js";
import { apiError } from "../../../../utils/apiError.js";
import { apiResponse } from "../../../../utils/apiResponse.js";


const deleteCommentController = asyncHandler(async (req, res) => {
    const {id, commentID} = req.params 
    if(!id) throw new apiError(400, 'id required !!!')
    if(!commentID) throw new apiError(400, 'comment id required !!!')

    const comment = await Comment.findByIdAndDelete(commentID)
    if(!comment) throw new apiError(404, 'comment not found !!!')

    res.status(200).json(new apiResponse(200, [], 'successfully deleted !'))
})

export {deleteCommentController}