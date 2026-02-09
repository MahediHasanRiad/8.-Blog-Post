import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

const jwtVerify = asyncHandler(async (req, _res, next) => {
    /**
     * get token from {cookie,, header}
     * verify token
     * get id from token
     * find user by id
     * if (!user) return error
     * retun user
     */

    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    if(!token) throw new apiError(400, 'invalid Token')

    const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)

    const user = await User.findById(decodedToken._id).select("-password")
    if(!user) throw new apiError(401, 'Invalid Token !!!')

    req.user = user
    
    next()
})

export {jwtVerify}