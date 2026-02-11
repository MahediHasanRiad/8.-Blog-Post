import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { Article } from "../../../../models/article.model.js";
import {apiResponse} from '../../../../utils/apiResponse.js'

const listOfAllArticleController = asyncHandler(async (req, res) => {
  /**
   * get {page, limit, sortType, sortBy, search} = req.query
   * filter by search
   * sort - skip - limit
   * pagination
   * links
   * res
   */

  let {
    page = 1,
    limit = 10,
    sortType = "dec",
    sortBy = 1,
    search = "",
  } = req.query;

  page = Number(page)
  limit = Number(limit)
  sortBy = Number(sortBy)

  // filter by search
  const sortKey = `${sortType === "dec" ? "-" : ""}${sortBy}`;

  const filterArticle = await Article.find({
    title: { $regex: search, $options: "i" },
  }).populate("author", "_id name")
    .sort(sortKey)
    .skip((page - 1) * limit)
    .limit(limit);

    // add self link in article
    const article = filterArticle.map(item => ({
        ...item._doc,
        link: `/article/${item._id}`
    }))

    // count article
    const count = await Article.countDocuments(filterArticle)
    const totalPage = Math.ceil(count / limit)

    // pagination
    const pagination = {
        page,
        limit,
        totalPage, 
        totalArticle: count,
    }

    if(page < totalPage){
        pagination.next = `/article/${page + 1}`
    }
    if(page > 1){
        pagination.prev = `/article/${page - 1}`
    }

    // links
    const links = {
        self: req.path
    }

    if(pagination.next){
        const query = new URLSearchParams({...req.query, page: page + 1}).toString()
        links.next = `${req.path}?${query}`
    }
    if(pagination.prev){
        const query = new URLSearchParams({...req.query, page: page - 1}).toString()
        links.prev = `${req.path}?${query}`
    }

    res.status(200).json(new apiResponse(200, {article, pagination, links}))
});

export { listOfAllArticleController };
