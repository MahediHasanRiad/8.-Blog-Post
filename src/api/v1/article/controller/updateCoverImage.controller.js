import { Article } from "../../../../models/article.model.js";
import { apiError } from "../../../../utils/apiError.js";
import { apiResponse } from "../../../../utils/apiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { cloudinaryFileUpload } from "../../../../utils/cloudinary.js";

const updateCoverImageController = asyncHandler(async(req, res) => {
    
    const {id} = req.params 

    const localFilePath = req.file?.path
    
    if(!localFilePath) throw new apiError(400, 'Cover Image path not found !!!')
    
    const coverImage = await cloudinaryFileUpload(localFilePath)

    const articleCoverImage = await Article.findByIdAndUpdate(id, {
        coverImage: coverImage?.url || ''
    })

    res.status(200).json(new apiResponse(200, articleCoverImage))
})

export {updateCoverImageController}