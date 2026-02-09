import { User } from "../../../../models/user.model.js";
import { apiError } from "../../../../utils/apiError.js";
import { apiResponse } from "../../../../utils/apiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";

const updateOrCreateUserController = asyncHandler(async (req, res) => {
  /**
   * get {name, email, mobile, role, status}
   * if (empty) return error
   * if(!email) create new
   * if(email) update
   * res
   */

  const { name, email, password, mobile, role, status } = req.body;

  if (!name || !email || !mobile || !role || !status)
    throw new apiError(400, "All field are required !!!");

  const existUser = await User.findOne({ email });

  // create
  if (!existUser) {
    // if (!email) throw new apiError(400, "Email are required !!!")
    if (!password) throw new apiError(400, "Password Required !!!");

    let user = await User.create({
      name: name,
      email: email,
      password: password,
      mobile: mobile,
      role: role,
      status: status,
    });

    const rmPass = await User.findById(user._id).select("-password");

    res
      .status(200)
      .json(new apiResponse(201, rmPass, "user create successfully"));
  }

  // update
  if (existUser) {
    let user = await User.findByIdAndUpdate(
      existUser._id,
      {
        $set: {
          name: name,
          mobile: mobile,
          role: role,
          status: status,
        },
      },
      { new: true },
    );
    const rmPass = await User.findById(user._id).select("-password");
    res
      .status(200)
      .json(new apiResponse(200, rmPass, "User update successfully"));
  }
});

export { updateOrCreateUserController };
