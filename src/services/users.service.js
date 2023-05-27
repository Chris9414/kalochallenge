const {Users, Posts} = require("../database/models");

class UserServices {

    static async getAll (id) {
        try {
            const result = await Users.findByPk(id,{
                attributes: ["username", "email", "avatar"],
                include: {
                    model: Posts,
                    attributes: ["id","title","description","image"]
                }
            })
            return result
        } catch (error) {
            throw error;
        }
    }

    static async create(newUser){
        try {
            const userCreated = await Users.create(newUser)
            return userCreated
        } catch (error) {
            throw error
        }
    }
}

module.exports = UserServices