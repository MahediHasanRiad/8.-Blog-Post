import { apiError } from '../../../../utils/apiError.js'
import {asyncHandler} from '../../../../utils/asyncHandler.js'
import { cloudinaryFileUpload } from '../../../../utils/cloudinary.js'
import { Article } from '../../../../models/article.model.js'
import {apiResponse} from '../../../../utils/apiResponse.js'

const createArticleController = async (req, res) => {
    /**
     * get {title, body, coverImage, status} = req.body
     * if(!title) return error
     * check local file for image
     * update image in cloudinary
     * remove image from local
     * create an article
     * add links [self, author]
     * res
     */

    try {
        const {title, body, status = 'Draft'} = req.body 
        if(!title) {
            throw new apiError(400, 'Title are required !!!')
        }
    
        const localFilePath = req.file?.path 

        if(!localFilePath){
            throw new apiError('Image File Path not found !!!')
        }
        const coverImg = await cloudinaryFileUpload(localFilePath)

        const article = await Article.create({
            title,
            body,
            coverImage : coverImg.url || '',
            status,
            author: req.user._id
        })

        // links
        const links = {
            self: `api/v1/article${req.path}`,
            author: `/users/${req.user._id}`
        }
    
        res.status(201).json(new apiResponse(200, {article, links}))
    } catch (error) {
        throw new apiError(400, error)
    }

}

export {createArticleController}