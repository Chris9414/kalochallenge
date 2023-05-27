const UserServices = require("../services/users.service");
const bcrypt = require('bcrypt')
const {Users} = require('../database/models')
const jwt = require('jsonwebtoken')

const getAllUserPosts = async (req,res,next) => {
    try {
        const {id} = req.params;

        const result = await UserServices.getAll(id)
        res.status(200).json({
            status: 'success',
            result: result,
        })
    } catch (error) {
        next(error)
    }
}

const createUser = async (req,res,next) => {
    try {
        const {name, lastname, username, avatar, email , password} = req.body;

        const hashed = await bcrypt.hash(password, 10)

        const result = await UserServices.create({name, lastname, username, avatar, email , password: hashed})
        res.status(201).json({
            status: "success",
            message: "The User has been created",
            result
            }
        )
    } catch (error) {
        next (error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({
            where: {email}
        })

        if(!user){
            return res.status(400).json({
                error: 'Invalid email',
                message: 'email not exist'
            })
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if(!validPassword){
            return res.status(400).json({
                message: "password incorrect"
            })
        }

        const {name, lastname, username, avatar} = user
        userData = {name, lastname, username, avatar, email}

        const token = jwt.sign(userData, "kalo_challenge", {
            algorithm: "HS512",
            expiresIn: "1h"
        });

        userData.token = token;

        res.json(userData)

    } catch (error) {
        next(error)
    }
}

module.exports = {
    createUser,
    getAllUserPosts,
    login
}