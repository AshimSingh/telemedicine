const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { authenticate } = require('../middleware/authenticate')
router.route('/')
    .patch(authenticate,userController.updateUser)    
    .delete(authenticate,userController.deleteUser)
    .get (userController.getAllUsers)
    .post(userController.createNewUser)
router 
    .route('/:userId')
    .get (authenticate,userController.getUser)
module.exports = router