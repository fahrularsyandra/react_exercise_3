const {User} = require("../models");
const bcrypt = require('bcrypt');
const { decryptPwd } = require("../helpers/bcrypt");
const Joi = require("joi");

class UserController{
    static async getAll(req, res) {
        try {
            const users = await User.findAll()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    static async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({
                where: {
                    username : username
                }
            })
            const schema = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required().min(7)
            })
            const { error } = schema.validate(req.body)
            if (error) {
                return res.status(401).json({data: error.details[0].message})
            }
            if(user){
                const check = decryptPwd(password, user.password)
                if(check){
                    return res.status(200).json({message: "Login success!", data: user})
                }
            }
            return res.status(200).json({message: "Email or password is not correct!"})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    static async create(req, res) {
        try {
            const schema = Joi.object({
                username: Joi.string().required(),
                email: Joi.email().required(),
                password: Joi.string().required().min(7),
                age: Joi.number().required()
            })
            const { error } = schema.validate(req.body)
            if (error) {
                return res.status(401).json({ message: error.details[0].message })
            }
            const {username, email, password, age} = req.body
            const hashPwd = bcrypt.hashSync(password, 5)
            const newUser = await User.create({username, email, password: hashPwd, age})
            res.status(200).json({message: "User has been created!", data: newUser})
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    static async update(req, res) {
        
    }
    static async delete(req, res) {
        
    }
}

module.exports = UserController