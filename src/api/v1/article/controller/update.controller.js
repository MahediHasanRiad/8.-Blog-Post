import {asyncHandler} from '../../../../utils/asyncHandler.js'
import {apiError} from '../../../../utils/apiError.js'
import { cloudinaryFileUpload } from '../../../../utils/cloudinary.js'
import { Article } from '../../../../models/article.model.js'
import { apiResponse } from '../../../../utils/apiResponse.js'

const updateArticleController = asyncHandler(async (req, res) => {

    /**
     * get {title, body, coverImage, status}
     * get {id} = req.params
     * if(!title) return error
     * check coverImage
     * if (!coverImage) return error
     * update data
     * res
     */

    const {title, body, status} = req.body 
    const {id} = req.params 

    if(!id) throw new apiError(400, 'ID required !!!')

    // const localFilePath = req.file?.path 
    // console.log(localFilePath)
    // const coverImage = await cloudinaryFileUpload(localFilePath)

    const article = await Article.findByIdAndUpdate(id, {
        title,
        body,
        status
    })

    res.status(200).json(new apiResponse(200, article))
})

export {updateArticleController}