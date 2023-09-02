const User = require('../models/user')
const bcrypt = require('bcrypt')
const {
  validateSignup,
  validateUpdate,
  validateDelete,
} = require('../middleware/validator/userValidator')
const { successResponse } = require('../helper/response')
const { errorResponse } = require('../helper/response')
const { slugCreator, slugExist } = require('../helper/slugCreator')
const { sendEmail } = require('../helper/sendEmail.js')
const { accountOpeningPayload } = require('../helper/emailPayload')
const { pageInitionHelper } = require('../helper/pageinitionHelper')

const getAllUsers = async (req, res, next) => {
  try {
    const search = req.query.search
    var { page, limit, sort, skip } = await pageInitionHelper(req, User)
    let searchBy = req.query.searchby|| 'firstname'
    let sortObject = {}
    var searchObject = {}
    var users
    var totalCount
    sortObject[sort.sortBy] = sort.sortOrder
    if (search) {
      if(searchBy!='_id'){
        searchObject[searchBy] = new RegExp(search, 'i')
      }
      else{
        searchObject[searchBy] = search
      }     
    } else {
      totalCount = await User.countDocuments().exec()
    }
     users = await User.find(searchObject)
      .select('-password')
      .sort(sortObject)
      .skip(skip)
      .limit(limit)
     totalCount = users.length
    // var users = await User.aggregate([{$match:{firstname:search}}])
    // .select('-password').sort(sortObject).skip(skip).limit(limit);
    var totalPage =
      totalCount % limit == 0
        ? totalCount / limit
        : Math.floor(totalCount / limit) + 1
    if (!users) {
      return successResponse(res, 204, 'No user found')
    }
    return successResponse(
      res,
      200,
      'message',
      users,
      page,
      limit,
      totalCount,
      totalPage,
      sort,
    )
  } catch (err) {
    next(err)
  }
}

const getUser = async (req, res, next) => {
  try {
    // console.log('ashim',req.userId)
    const { userId } = req.body
    console.log(userId)
    var id =  userId || req.params.userId 
      var users = await User.findById(id).select('-password')
      console.log(users)
      if (!users) {
        return successResponse(res, 204, 'No user found')
      }
      
      return successResponse(res, 200, 'message', users)
  } catch (err) {
    console.log(err)
    next(err)
  }
}

const createNewUser = async (req, res, next) => {
  try {
    console.log(req.body)
    const value = await validateSignup(req.body)
    var { firstname, lastname, email, password, slug, role,phone } = req.body
    const duplicate = await User.findOne({ email }).lean().exec()
    //if slug is not provided then
    if (slug == null || slug == undefined) {
      slug = await slugCreator(firstname, User)
      if (!slug) {
        return errorResponse(res, 500, 'somethig went wrong generating slug')
      }
    } else {
      const is_slugExist = await slugExist(slug, User)
      if (is_slugExist) {
        return errorResponse(res, 409, 'Slug exist reenter slug')
      }
      // it returns true if slug already exists
    }
    if (duplicate) {
      return errorResponse(res, 409, 'User Already exists')
    } else {
      const hashedPwd = await bcrypt.hash(password, 10)
      const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPwd,
        slug,
        role,
        phone,
      })
      if (user) {
        const token = await user.generateAuthToken()
        // res.cookie('jwtoken', token, {
        //   expires: new Date(Date.now() + 259200200),
        //   httpOnly: true,
        // });
        var _id = user._id
        var data = { token, _id, firstname, lastname, email, slug, role,phone }
        var payload = accountOpeningPayload(email, firstname)
        // sendEmail(payload)
        return successResponse(res, 201, 'Registered successfully', data)
      } else {
        return errorResponse(res, 400, 'Cannot create user')
      }
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const value = await validateUpdate(req.body)
    // Destructuring the request body for easier access
    var {
      firstname,
      lastname,
      email,
      password,
      id,
      slug,
      role,
      newpassword,
      userId,
    } = req.body
    //if user logins with same jwt token or not else unauthorized
    if (userId === id) {
      // Find the user by ID
      const user = await User.findById(id).exec()

      // Check if the user exists
      if (!user) {
        return errorResponse(res, 400, 'User Not found')
      }

      // Check if the provided slug exists in other users
      if (slug) {
        const is_slugExist = await slugExist(slug, User)
        if (is_slugExist) {
          return errorResponse(res, 400, 'Slug exists, please choose another')
        }
      }

      // Check if the provided email is already taken by another user
      const duplicate = await User.findOne({ email }).lean().exec()
      if (duplicate && duplicate._id.toString() !== id) {
        return errorResponse(res, 409, 'Duplicate email not allowed')
      }

      // Update user details with new data
      user.firstname = firstname
      user.lastname = lastname
      user.email = email
      user.role = role
      // If the user provided a new password, update it else update other variables
      if (newpassword) {
        // Check if the user provided password matches the database password (hashed)
        if (await bcrypt.compare(password, user.password)) {
          user.password = await bcrypt.hash(newpassword, 10)
        } else {
          return errorResponse(res, 401, 'Invalid Credentials')
        }
      }
      // Save the updated user data
      const updatedUser = await user.save()
      if (updatedUser) {
        const data = { firstname, lastname, email, role, slug }
        return successResponse(res, 200, 'Updated successfully', data)
      } else {
        return errorResponse(res, 400, 'Cannot update User')
      }
    } else {
      return errorResponse(res, 401, 'UnAuthorized User')
    }
  } catch (err) {
    next(err)
  }
}
const deleteUser = async (req, res, next) => {
  try {
    const value = validateDelete(req.body)
    const { id, userId } = req.body
    if (id == userId) {
      const user = await User.findById(id).exec()
      if (!user) {
        return res.status(400).json({ message: 'User not found' })
      }
      const result = await user.deleteOne()
      if (result) {
        successResponse(res, 200, 'Deleted successfully')
      } else {
        errorResponse(res, 204, 'Deletion was unsuccessful')
      }
    } else {
      errorResponse(res, 401, 'Unauthorized User')
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUser
}
