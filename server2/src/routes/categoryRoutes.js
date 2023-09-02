const express = require('express')
const router = express.Router()
const categoriesController = require('../controllers/categoriesController')
router.route('/')
    .get(categoriesController.getCategories)
    .post(categoriesController.createCategories)
    .patch(categoriesController.updateCategories)
    .delete(categoriesController.deleteCategories)

module.exports = router