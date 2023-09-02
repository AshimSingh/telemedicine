const Joi = require('joi');
const { validate } = require('../models/user');
const validator = (schema) => async (payload) => {
  const value = await schema.validateAsync(payload);
  return value;
};

const signupSchema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(30).required(),
  lastname: Joi.string().alphanum().min(3).max(15).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  // confirm_password: Joi.ref('password'),
});
const updateSchema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(30).required(),
  lastname: Joi.string().alphanum().min(3).max(15).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  confirm_password: Joi.ref('password'),
  id: Joi.string().min(3).max(30).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const deleteSchema = Joi.object({
  id: Joi.string().min(3).max(30).required(),
});

//blog schema

const createBlogSchema = Joi.object({
  author: Joi.string().min(3).max(30).required(),
  title: Joi.string().min(5).max(100),
  content: Joi.string().min(5).max(500),
  categories: Joi.string().min(3).max(30).required(),
  excerpt: Joi.string().min(5).max(500),
  thumbnail: Joi.string(),
  tags: Joi.array(),
//   Joi.object({
//     tag: Joi.string().required(),
//   }),
  slug: Joi.string().min(5).max(100),
});
const updateBlogSchema = Joi.object({
  id: Joi.string().min(3).max(30).required(),
  author: Joi.string().min(3).max(30).required(),
  title: Joi.string().min(5).max(100),
  content: Joi.string().min(5).max(500),
  categories: Joi.string().min(3).max(30).required(),
  excerpt: Joi.string().min(5).max(500),
  thumbnail: Joi.string(),
  tags: Joi.object({
    tag: Joi.string().required(),
  }),
  slug: Joi.string().min(5).max(100),
});
const deleteBlog = Joi.object({
  id: Joi.string().min(3).max(30).required(),
});

// categories validator
const createCategoriesSchema = Joi.object({
  title: Joi.string().max(50).required(),
  description: Joi.string().max(100).required(),
  slug: Joi.string().max(100),
  thumbnail: Joi.string().min(1).max(40),
});

const updateCategoriesSchema = Joi.object({
  id: Joi.string().max(50).required(),
  title: Joi.string().max(50).required(),
  description: Joi.string().max(100).required(),
  slug: Joi.string().max(100),
  humbnail: Joi.string().min(1).max(40),
});
const deleteCategoriesSchema = Joi.object({
  id: Joi.string().max(50).required(),
});

// media validator
const createMediaSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  caption: Joi.string().max(300),
  description: Joi.string().max(600),
  alt: Joi.string().max(200),
  type: Joi.string().max(100),
  // path:Joi.string()
});

const updateMediaSchema = Joi.object({
  id: Joi.string().max(30).required(),
  title: Joi.string().max(30).required(),
  caption: Joi.string().max(100),
  description: Joi.string().max(400),
  alt: Joi.string(),
  type: Joi.string(),
});

const deleteMediaSchema = Joi.object({
  id: Joi.string().max(30).required(),
});

const imageValidation = Joi.object({
  fieldname: Joi.string(),
  originalname: Joi.string(),
  encoding: Joi.string(),
  destination: Joi.string(),
  filename: Joi.string().required(),
  size: Joi.number().required(),
  path: Joi.string(),
  mimetype: Joi.string().valid('image/jpeg', 'image/png').required(),
}).required();

//tags
const createTagsSchema = Joi.object({
  title: Joi.string().max(50).required(),
  slug: Joi.string().max(150).required(),
  description: Joi.string().max(200),
});

const updateTagsSchema = Joi.object({
  id: Joi.string().max(30).required(),
  title: Joi.string().max(50).required(),
  slug: Joi.string().max(150).required(),
  description: Joi.string().max(200),
});

const deleteTagsSchema = Joi.object({
  id: Joi.string().max(30).required(),
});

// sign up
validateSignup = validator(signupSchema);
validateUpdate = validator(updateSchema);
validateDelete = validator(deleteSchema);
// create blog
validateCreateBlog = validator(createBlogSchema);
validateUpdateBlog = validator(updateBlogSchema);
validateDleteBlog = validator(deleteBlog);

//login
validateLogin = validator(loginSchema);
//categories
validateCreateCat = validator(createCategoriesSchema);
validateUpdateCat = validator(updateCategoriesSchema);
validateDeleteCat = validator(deleteCategoriesSchema);

//medai validator
validateCreateMedia = validator(createMediaSchema);
validateUpdateMedia = validator(updateMediaSchema);
validateDeleteMedia = validator(deleteMediaSchema);
validateImage = validator(imageValidation);

//tags validator
validateCreateTags = validator(createTagsSchema);
validateUpdateTags = validator(updateTagsSchema);
validateDeleteTags = validator(deleteTagsSchema);

module.exports = {
  validateSignup,
  validateUpdate,
  validateDelete,

  validateCreateBlog,
  validateUpdateBlog,
  validateDleteBlog,

  validateLogin,

  validateCreateCat,
  validateUpdateCat,
  validateDeleteCat,

  validateCreateMedia,
  validateUpdateMedia,
  validateDeleteMedia,
  validateImage,

  validateCreateTags,
  validateUpdateTags,
  validateDeleteTags,
};
