import { prisma } from "../prisma.js"
// @desc Auth user
// @route POST /api/users/login
// @access Public

export const authUser = async (req, res) => {
    const user = await prisma.user.findMany() 

    res.json(user)
}