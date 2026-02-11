import { Article } from "../../../../models/article.model.js";
import { apiError } from "../../../../utils/apiError.js";
import { apiResponse } from "../../../../utils/apiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";

const deleteArticleController = asyncHandler(async (req, res) => {
    const {id} = req.params 

    if(!id) throw new apiError(400, 'ID required !!!')

    const article = await Article.findByIdAndDelete(id)
    if(!article) throw new apiError(404, 'Article not Found !!!')

    res.status(200).json(new apiResponse(204, 'Article Delete Successfully !'))
})

export {deleteArticleController}