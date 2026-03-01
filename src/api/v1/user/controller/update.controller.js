import { User } from "../../../../models/user.model.js";
import { apiError } from "../../../../utils/apiError.js";
import { apiResponse } from "../../../../utils/apiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { cloudinaryFileUpload } from "../../../../utils/cloudinary.js";

const updateUserController = asyncHandler(async (req, res) => {
  /**
   * get {name, mobile, role, status}
   * check params id with cookies id
   * if(!user) return error
   * update user
   * res
   */

  const { name, mobile, role, status } = req.body;

  const existUser = await User.findById(req.user._id);

  if (!existUser) throw new apiError(404, "User not found !!!");

  const avatarLocalFilePath = req.files?.avatar?.[0].path;
  const coverImageLocalFilePath = req.files?.coverImage?.[0].path;

  const avatar = avatarLocalFilePath ? await cloudinaryFileUpload(avatarLocalFilePath) : null
  const coverImage = coverImageLocalFilePath ? await cloudinaryFileUpload(coverImageLocalFilePath) : null

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        name: name || existUser.name,
        mobile: mobile || existUser.mobile,
        avatar: avatar?.url || existUser.avatar,
        coverImage: coverImage?.url || existUser.coverImage,
        role: role || existUser.role,
        status: status || existUser.status,
      },
    },
    { new: true },
  );

  const rmPass = await User.findById(req.user._id).select("-password");
  if (!user) throw new apiError(500, "server error during update user !!!");

  res
    .status(200)
    .json(new apiResponse(200, rmPass, "update user successfully !!!"));
});

export { updateUserController };
