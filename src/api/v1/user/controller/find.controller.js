import { User } from "../../../../models/user.model.js";
import { apiError } from "../../../../utils/apiError.js";
import { apiResponse } from "../../../../utils/apiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";

const findUserController = asyncHandler( async (req, res) => {
    /**
     * get {id} = req.params
     * find user by id
     * if (!user) return error
     * remove password
     * res
     */

    const {id} = req.params 

    const existUser = await User.findById(id)
    if(!existUser) throw new apiError(404, 'User not found !!!')

    const user = await User.findById(id).select("-password")

    res.status(200).json(new apiResponse(200, user))

})

export {findUserController}