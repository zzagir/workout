import { prisma } from "../prisma.js"
import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'
import asyncHandler from "express-async-handler"
import { UserFields } from "../utils/user.utils.js"
import { generateToken } from './generate-token.js'

// @desc Auth user
// @route POST /api/users/login
// @access Public

export const authUser =  asyncHandler(async(req, res) => {
    const user = await prisma.user.findUnique({
        where: {
			email
		}
    }) 

    res.json(user)
})

// @desc Register user
// @route POST /api/users/register
// @access Public

export const registerUser =  asyncHandler(async(req, res) => {
    const {email, password} = req.body
    
    const isHaveUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (isHaveUser) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await prisma.user.create({
        data: {
            email, 
            password: await hash(password), 
            name: faker.name.fullName()
        },
        select: UserFields
    })

    const token = generateToken(user.id)

    res.json({user, token})
})