import { Router } from "express";
import { jwtVerify } from "../middleware/auth.middleware.js";
import { createCommentController } from "../api/v1/comments/controller/create.controller.js";
import { findSingleComment } from "../api/v1/comments/controller/findOne.controller.js";
import { updateCommentController } from "../api/v1/comments/controller/update.controller.js";
import { deleteCommentController } from "../api/v1/comments/controller/delete.controller.js";
import { allCommentsController } from "../api/v1/comments/controller/allComments.controller.js";



const commentRouter = Router()

commentRouter.get('/allComments/:id', jwtVerify, allCommentsController)
commentRouter.post('/:id/comment', jwtVerify, createCommentController)
commentRouter.get('/:id/:commentID', jwtVerify, findSingleComment)
commentRouter.get('/:id/:commentID', jwtVerify, findSingleComment)
commentRouter.patch('/:id/:commentID', jwtVerify, updateCommentController)
commentRouter.delete('/:id/:commentID', jwtVerify, deleteCommentController)


export {commentRouter}