import { User } from "../../../../models/user.model.js";
import { apiError } from "../../../../utils/apiError.js";
import { apiResponse } from "../../../../utils/apiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";

const deleteUserController = asyncHandler(async (req, res) => {
  /**
   * get {id} = req.params
   * if(!user) return error
   * delete user
   * res
   */

  const { id } = req.params;

  const exist = await User.findById(id);

  if (!exist) throw new apiError(404, "User not Found !!!");

  const user = await User.findByIdAndDelete(id);

  return res
    .status(204)
    .json(new apiResponse(200, user, "user delete successfully !!!"));
});

export { deleteUserController };
