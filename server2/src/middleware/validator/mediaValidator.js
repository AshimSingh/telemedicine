/* eslint-disable no-undef */
const Joi = require('joi')

const validator = (schema) => async (payload) => {
  const value = await schema.validateAsync(payload)
  return value
}

const createMediaSchema = Joi.object({
  userId: Joi.string().max(30),
  title: Joi.string().min(1).max(100).required(),
  caption: Joi.string().max(300),
  description: Joi.string().max(600),
  alt: Joi.string().max(200),
  type: Joi.string().max(100).required(),
  // path:Joi.string()
})

const updateMediaSchema = Joi.object({
  userId: Joi.string().max(30),
  id: Joi.string().max(30).required(),
  title: Joi.string().max(30).required(),
  caption: Joi.string().max(100),
  description: Joi.string().max(400),
  alt: Joi.string(),
  type: Joi.string().required(),
})

const deleteMediaSchema = Joi.object({
  id: Joi.string().min(2).max(30).required(),
  userId: Joi.string().min(2).max(30),
})

const imageValidation = Joi.object({
  fieldname: Joi.string(),
  originalname: Joi.string(),
  encoding: Joi.string(),
  destination: Joi.string(),
  filename: Joi.string().required(),
  size: Joi.number().required(),
  path: Joi.string(),
  mimetype: Joi.string().valid('image/jpeg', 'image/png').required(),
}).required()

validateCreateMedia = validator(createMediaSchema)
validateUpdateMedia = validator(updateMediaSchema)
validateDeleteMedia = validator(deleteMediaSchema)
validateImage = validator(imageValidation)

module.exports = {
  validateCreateMedia,
  validateUpdateMedia,
  validateDeleteMedia,
  validateImage,
}
