const express = require('express')
const router = express.Router()
const mediaController = require('../controllers/mediaController')
const { authenticate } = require('../middleware/authenticate')
const multerShapMiddleware = require('../middleware/upload')

router
  .route('/')
  .get(mediaController.getMedia)
  .post(multerShapMiddleware.shapUpload, mediaController.createMedia)
  .patch(multerShapMiddleware.shapUpload, mediaController.updateMedia)
  .delete(mediaController.deleteMedia)

module.exports = router
