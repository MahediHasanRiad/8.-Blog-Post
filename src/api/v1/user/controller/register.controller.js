import {asyncHandler} from "../../../../utils/asyncHandler.js";
import {apiError} from '../../../../utils/apiError.js';
import { User } from "../../../../models/user.model.js";
import {apiResponse} from '../../../../utils/apiResponse.js'
import { cloudinaryFileUpload } from "../../../../utils/cloudinary.js";

export const registerController = asyncHandler( async (req, res) => {
  /**
   * req body {name, email, mobile, password, role, status}
   * check all if(empty) return error
   * if(!avatar) return error
   * if (email) exist = return error
   * create user
   * remove {password}
   * res user
   */

  const { name, email, mobile, password, role = 'USER', status = 'Pending' } = req.body;

  if ([name, email, mobile, password].some((item) => item === ""))
    throw new apiError(400, "all field are required !!!");

  const avatarLocalFilePath = req.files?.avatar?.[0].path
  const coverImageLocalFilePath = req.files?.coverImage?.[0].path
  if(!avatarLocalFilePath) throw new apiError('avatar file path not found')

  const avatar = await cloudinaryFileUpload(avatarLocalFilePath)
  const coverImage = coverImageLocalFilePath ? await cloudinaryFileUpload(coverImageLocalFilePath) : ''

  const exist = await User.findOne({email})
  if(exist) throw new apiError(400, 'user already exist !!!')

    let user = await User.create({
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        avatar: avatar.url,
        coverImage: coverImage.url || '',
        role: role || 'USER',
        status: status || 'Pending'
    })

    const register = await User.findById(user._id).select("-password")

    if(!user) throw new apiError(500, 'server error')

    res.status(201).json( new apiResponse(200, register))
});
