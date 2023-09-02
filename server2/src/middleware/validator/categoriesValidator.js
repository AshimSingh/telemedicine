const Joi = require('joi')
const validator = (schema) => async (payload) => {
  const value = await schema.validateAsync(payload)
  return value
}

const createCategoriesSchema = Joi.object({
  title: Joi.string().max(50).required(),
  description: Joi.string().max(100).required(),
  slug: Joi.string().max(100),
  thumbnail: Joi.string().min(1).max(40),
  userId:Joi.string().max(50).min(5)
})

const updateCategoriesSchema = Joi.object({
  id: Joi.string().max(50).required(),
  title: Joi.string().max(50).required(),
  description: Joi.string().max(100).required(),
  slug: Joi.string().max(100),
  thumbnail: Joi.string().min(1).max(40),
  userId:Joi.string().max(50).min(5)
})
const deleteCategoriesSchema = Joi.object({
  id: Joi.string().max(50).required(),
  userId:Joi.string().max(50).min(5)
})

var validateCreateCat = validator(createCategoriesSchema)
var validateUpdateCat = validator(updateCategoriesSchema)
var validateDeleteCat = validator(deleteCategoriesSchema)

module.exports = {
  validateCreateCat,
  validateUpdateCat,
  validateDeleteCat,
}
