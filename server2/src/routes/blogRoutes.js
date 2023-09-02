const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogControllers')
const { authenticate } = require('../middleware/authenticate')

router
  .route('/')
  .get(blogController.getAllBlog)
  .post(authenticate, blogController.createBlog)

router
  .route('/:blogId')
  .get(blogController.getBlog)
  .patch(authenticate, blogController.updateBlog)
  .delete(authenticate, blogController.deleteBlog)

module.exports = router
