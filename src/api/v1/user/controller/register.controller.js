import {asyncHandler} from "../../../../utils/asyncHandler.js";
import {apiError} from '../../../../utils/apiError.js';
import { User } from "../../../../models/user.model.js";
import {apiResponse} from '../../../../utils/apiResponse.js'

export const registerController = asyncHandler( async (req, res) => {
  /**
   * req body {name, email, mobile, password, role, status}
   * check all if(empty) return error
   * if (email) exist = return error
   * create user
   * remove {password}
   * res user
   */

  const { name, email, mobile, password, role, status } = req.body;

  if ([name, email, mobile, password, role, status].some((item) => item === ""))
    throw new apiError(400, "all field are required !!!");

  const exist = await User.findOne({email})
  if(exist) throw new apiError(400, 'user already exist !!!')

    let user = await User.create({
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        role: role,
        status: status
    })

    const register = await User.findById(user._id).select("-password")

    if(!user) throw new apiError(500, 'server error')

    res.status(201).json( new apiResponse(200, register))
});
