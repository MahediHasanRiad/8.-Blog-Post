import { Router } from "express";
import { createArticleController } from "../api/v1/article/controller/create.controller.js";
import { jwtVerify } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { findOneController } from "../api/v1/article/controller/findOne.controller.js";
import { updateArticleController } from "../api/v1/article/controller/update.controller.js";
import { updateCoverImageController } from "../api/v1/article/controller/updateCoverImage.controller.js";
import { deleteArticleController } from "../api/v1/article/controller/delete.controller.js";
import { listOfAllArticleController } from "../api/v1/article/controller/listAllArticle.controller.js";

const articleRouter = Router()


articleRouter.post('/', jwtVerify, upload.single('coverImage'), createArticleController )
articleRouter.get('/all', jwtVerify, listOfAllArticleController)
articleRouter.get('/:id', jwtVerify, findOneController)
articleRouter.patch('/:id', jwtVerify, updateArticleController)
articleRouter.post('/:id', jwtVerify, upload.single('coverImage'), updateCoverImageController)
articleRouter.post('/:id', jwtVerify, updateCoverImageController)
articleRouter.delete('/:id', jwtVerify, deleteArticleController)



export {articleRouter}