import { apiResponse } from "../../../../utils/apiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";

const logOutController = asyncHandler((_req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new apiResponse(200, {}, "LogOut successfully !"));
});

export { logOutController };
