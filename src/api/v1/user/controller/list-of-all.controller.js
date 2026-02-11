import { User } from "../../../../models/user.model.js";
import { apiResponse } from "../../../../utils/apiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { Pagination } from "../../../../utils/pagination.js";

const allUserController = asyncHandler(async (req, res) => {
  /**
   * get {page, limit, sortType, sortBy, search} = req.params
   * fileter by search
   * add pagination
   * add links
   * res
   */

  let {
    page = 1,
    limit = 10,
    sortType = "asc",
    sortBy = "updatedAt",
    search = "",
  } = req.query;

  page = Number(page)
  limit = Number(limit)
  sortBy = Number(sortBy)

  // all users
  const sort = `${sortType === "dec" ? "-" : ""}${sortBy}`;
  let data = await User.find({ name: { $regex: search, $options: "i" } })
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  // add self link
  const users = data.map((item) => ({
    ...item._doc,
    link: `/users/${item.id}`,
  }));

  // count
  const totalUser = await User.countDocuments(data);
  const totalPage = Math.ceil(totalUser / limit);

  // pagination
  const pagination = Pagination({ page, limit, totalUser, totalPage });

  // links
  const links = {
    self: req.path,
  };

  if (pagination.next) {
    // convert query object to string
    const query = new URLSearchParams({...req.query, page: page + 1,}).toString();
    links.next = `${req.path}?${query}`;
  }

  if (pagination.prev) {
    const query = new URLSearchParams({...req.query, page: page - 1,}).toString();
    links.prev = `${req.path}?${query}`;
  }

  res.status(200).json(new apiResponse(200, { users, pagination, links }));
});

export { allUserController };
