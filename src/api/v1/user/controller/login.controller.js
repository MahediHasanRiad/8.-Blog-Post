import { User } from "../../../../models/user.model.js";
import { apiError } from "../../../../utils/apiError.js";
import { apiResponse } from "../../../../utils/apiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { generateToken } from "../../../../utils/generateToken.js";

const logInController = asyncHandler(async (req, res) => {
  /**
   * req.body {email, password}
   * if(!email) return error
   * if password !== match return error
   * generate JWT token
   * set in cookies
   * res data
   */

  const { email, password } = req.body;

  if ([email, password].some((item) => item === ""))
    throw new apiError(400, "Email & Password are required !!!");

  const user = await User.findOne({ email });
  if (!user) throw new apiError(404, "User not found !!!");

  const passwordVerify = await user.isPasswordCorrect(password)
  if (!passwordVerify) throw new apiError(400, "not valid password");

  // generate token
  const { accessToken } = await generateToken(user._id);

  // donot send password
  const loginUser = await User.findById(user._id).select("-password");

  // cookie security
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new apiResponse(200, {loginUser, accessToken}));
});

export { logInController };
