import AsyncHandler from "express-async-handler"
import { prisma } from "../prisma.js"
import { UserFields } from "../utils/user.utils.js"



// @desc Get user profile
// @route GET /api/users/profile
// @access Public


export const getUserProfile =  AsyncHandler(async(req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        select: UserFields
    })

    res.json(user)
})