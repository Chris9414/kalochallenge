const { body , validationResult} = require('express-validator');
const { check, param } = require("express-validator");

const validFields = (req , res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty){
        return res.status(400).json({
            status: 'error',
            errors: errors.mapped(),
        })
    }

    next();
};

const createUserValidator = [
    check("name", "name error")
      .exists()
      .withMessage("the name field must exist")
      .notEmpty()
      .withMessage("name cannot be empty")
      .isString()
      .withMessage("the name field must be a string")
      .isLength({ min: 6, max: 30 })
      .withMessage("the name field must be between 6 and 30 characters"),
    check("lastname", "lastname error")
      .exists()
      .withMessage("the lastname field must exist")
      .notEmpty()
      .withMessage("lastname cannot be empty")
      .isString()
      .withMessage("the lastname field must be a string")
      .isLength({ min: 6, max: 30 })
      .withMessage("the lastname field must be between 6 and 30 characters"),
    check("username", "lastname error")
      .exists()
      .withMessage("the username field must exist")
      .notEmpty()
      .withMessage("username cannot be empty")
      .isString()
      .withMessage("the username field must be a string")
      .isLength({ min: 6, max: 30 })
      .withMessage("the username field must be between 6 and 30 characters"),
    check("avatar", "avatar error")
      .exists()
      .withMessage("the avatar field must exist")
      .notEmpty()
      .withMessage("avatar cannot be empty")
      .isString()
      .withMessage("the avatar field must be a URL"),
    check("email", "email error")
      .exists()
      .withMessage("the field wmail must exist")
      .notEmpty()
      .withMessage("email cannot be empty")
      .isString()
      .isLength({ min: 7, max: 50 })
      .withMessage("the email field must be between 7 and 50 characters")
      .isEmail()
      .withMessage("wrong mail forma"),
    check("password", "Password error")
      .exists()
      .withMessage("the password field must exist")
      .notEmpty()
      .withMessage("password cannot be empty")
      .isString()
      .isLength({ min: 8 })
      .withMessage("The password must have a minimum of 8 characters."),
    validFields,
  ];


  const createPostValidator = [
    check("title", "title error")
      .exists()
      .withMessage("the title field must exist")
      .notEmpty()
      .withMessage("title cannot be empty")
      .isString()
      .withMessage("the title field must be a string"),
    check("description", "description error")
      .exists()
      .withMessage("the description field must exist")
      .notEmpty()
      .withMessage("description cannot be empty")
      .isString()
      .withMessage("the description field must be a string"),
    validFields,
  ];

  const updatePostValidator = [
    check("title", "title error")
      .exists()
      .withMessage("the title field must exist")
      .notEmpty()
      .withMessage("title cannot be empty")
      .isString()
      .withMessage("the title field must be a string"),
    check("description", "description error")
      .exists()
      .withMessage("the description field must exist")
      .notEmpty()
      .withMessage("description cannot be empty")
      .isString()
      .withMessage("the description field must be a string"),
    validFields,
  ];


  module.exports = {
    createUserValidator,
    createPostValidator,
    updatePostValidator
  }