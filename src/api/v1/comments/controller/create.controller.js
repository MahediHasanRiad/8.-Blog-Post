import { apiError } from "../../../../utils/apiError.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { Article } from "../../../../models/article.model.js";
import { Comment } from "../../../../models/comment.mode.js";
import { apiResponse } from "../../../../utils/apiResponse.js";

const createCommentController = asyncHandler(async (req, res) => {
  /**
   * get {message} = req.body
   * get {id} = req.params
   * find article by id
   * if !article == return error
   * if(!message) return error
   * create comment
   * res
   */

  const { text } = req.body;
  const { id } = req.params;

  if (!id) throw new apiError(400, "id required !!!");
  if (!text) throw new apiError(400, "comment required !!!");

  const article = await Article.findById(id);
  if (!article) throw new apiError(404, "Article not found !!!");

  const comment = await Comment.create({
    text,
    articleID: id,
    user: req.user._id,
  });

  const links = {
    self: `${req.path}`,
    article: `/article/${id}`,
    author: `/user/${id}`,
  };

  res.status(201).json(new apiResponse(200, {comment, links}));
});

export { createCommentController };
