import { User } from "../models/user.model.js"

const generateToken = async (userId) => {
    try {
        
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()

        return {
            accessToken
        }

    } catch (error) {
        console.log(error)
    }
}

export { generateToken }