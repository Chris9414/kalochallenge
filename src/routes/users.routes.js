const express = require("express");
const { createUser,getAllUserPosts, login } = require("../controllers/users.controller");
const { createUserValidator } = require("../middlewares/validations.middleware");
const { upload } = require("../utils/multer")

const router = express.Router()

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerUsers:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *    Users:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: user name
 *        lastname:
 *          type: string
 *          description: user lastname
 *        username:
 *          type: string
 *          description: user username
 *        avatar:
 *          type: string
 *          description: user avatar
 *        email:
 *          type: string
 *          description: user email
 *        password:
 *          type: string
 *          description: user password
 *      required:
 *        - name
 *        - lastname
 *        - username
 *        - avatar
 *        - email
 *        - password
 *      example:
 *        name: luis
 *        lastname: aguilar
 *        username: luis1234
 *        avatar: ImgUrl
 *        email: luisaguilar@mail.com
 *        password: root123
*/

/**
 * @swagger
 * /api/v1/users/:
 *  post:
 *    summary: register user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                  type: string
 *                  description: user name
 *              lastname:
 *                  type: string
 *                  description: user lastname
 *              username:
 *                  type: string
 *                  description: user username
 *              avatar:
 *                  type: string
 *                  format: binary
 *                  description: user avatar
 *                  example: ''
 *              email:
 *                  type: string
 *                  description: user email
 *              password:
 *                  type: string
 *                  description: user password
 *          required:
 *              - name
 *              - lastname
 *              - username
 *              - avatar
 *              - email
 *              - password   
 *    responses:
 *      201:     
 *          user created
 */


router.get("/api/v1/users/:id", getAllUserPosts)

router.post("/api/v1/users", upload.single('avatar'),createUserValidator,createUser) 


module.exports = router