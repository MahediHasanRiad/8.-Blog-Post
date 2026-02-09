import { User } from "../../../../models/user.model.js";
import { apiError } from "../../../../utils/apiError.js";
import { apiResponse } from "../../../../utils/apiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";

const changePassword = asyncHandler(async (req, res) => {
  /**
   * get id from cookie
   * req.body {old pass, new pass}
   * varify old password
   * update new pass
   * res
   */

  const { oldPass, newPass } = req.body;

  if ([oldPass, newPass].some((item) => item === ""))
    throw new apiError(400, "Old and New Password Both are required !!!");

  const user = await User.findById(req.user._id);
  if (!user) throw new apiError(400, "Invalid User !!!");

  const varifyPassword = await user.isPasswordCorrect(oldPass);
  if (!varifyPassword) throw new apiError(400, "Invalid Old Password !!!");

  user.password = newPass;
  await user.save({ validateBeforeSave: false });

  res.status(200).json(new apiResponse(200, user, 'Password Updated !!!'));
});

export { changePassword };
