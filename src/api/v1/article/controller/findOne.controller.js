import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { apiResponse } from "../../../../utils/apiResponse.js";
import { apiError } from "../../../../utils/apiError.js";
import { Article } from "../../../../models/article.model.js";
import { Comment } from "../../../../models/comment.mode.js";

const findOneController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const article = await Article.findById(id).populate("author", "_id name");

  if(!article){
    throw new apiError(404, 'article not found !!!')
  }
  const comments = await Comment.find(article._id)

  // links
  const links = {
    self: `/api/v1/article${req.path}`,
    author: article.author
  }

  res.status(200).json(new apiResponse(200, {article, comments, links}))
});

export { findOneController };
