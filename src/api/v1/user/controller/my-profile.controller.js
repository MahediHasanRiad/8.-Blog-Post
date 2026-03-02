import { User } from "../../../../models/user.model.js";
import { apiError } from "../../../../utils/apiError.js";
import { apiResponse } from "../../../../utils/apiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";

const myProfileController = asyncHandler( async (req, res) => {
  const id = req.user._id

  const user = await User.findById(id).select("-password")
  if(!user) throw new apiError('invalid token !!!')
console.log(user)
  res.status(200).json(new apiResponse(200, user))
})

export {myProfileController}