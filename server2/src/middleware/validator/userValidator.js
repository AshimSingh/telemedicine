const Joi = require('joi')

const validator = (schema) => async (payload) => {
  const value = await schema.validateAsync(payload)
  return value
}

const signupSchema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(30).required(),
  lastname: Joi.string().alphanum().min(3).max(15).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9@#$%^&*()_/+]{8,30}$'))
    .required(),
  phone:Joi.string(),
  role: Joi.string().min(2).max(20),
  // confirm_password: Joi.ref('password'),
})
const updateSchema = Joi.object({
  id: Joi.string().min(3).max(50).required(),
  firstname: Joi.string().alphanum().min(3).max(30),
  lastname: Joi.string().alphanum().min(3).max(15),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9@#$%^&*()_/+]{8,30}$'))
    .required(),
  newpassword: Joi.string().pattern(
    new RegExp('^[a-zA-Z0-9@#$%^&*()_/+]{8,30}$'),
  ),
  phone:Joi.string(),
  role: Joi.string().min(2).max(20),
  userId: Joi.string().min(3).max(30).required(),
})

const loginSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9@#$%^&*()_/+]{8,30}$'))
    .required(),
})

const deleteSchema = Joi.object({
  id: Joi.string().min(3).max(30).required(),
})

validateSignup = validator(signupSchema)
validateUpdate = validator(updateSchema)
validateDelete = validator(deleteSchema)
validateLogin = validator(loginSchema)

module.exports = {
  validateSignup,
  validateUpdate,
  validateDelete,
  validateLogin,
  validateLogin,
}
