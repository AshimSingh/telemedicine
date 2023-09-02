// const jwt = require('jsonwebtoken')
// const { errorResponse } = require('../helper/response')

// const authenticate = async (req, res, next) => {
//   const bearerHeader = req.headers.authorization
//   var query_token = req.query.token
//   var bearertoken
//   if (bearerHeader) {
//     bearertoken = bearerHeader.split(' ')
//   }
//   const token = query_token || bearertoken[1]
//   if (!token) {
//     return errorResponse(res, 401, 'validation token not provided')
//   } else {
//     const verify = await jwt.verify(
//       token,
//       process.env.SECRET_KEY,
//       function (err, decode) {
//         if (err) {
//           console.log('not verified')
//           return errorResponse(res, 401, 'validation token invalid')
//         }
//         const { _id } = decode
//         const userId = _id
//         req.body = { ...req.body, userId }
//         next()
//       },
//     )
//   }
// }

// module.exports = { authenticate }
const jwt = require('jsonwebtoken')
const { errorResponse } = require('../helper/response')

const authenticate = async (req, res, next) => {
  try {
    const inputString = req.headers.cookie || ''
    const cookie = inputString.replace(/jwtoken=/, '')
    console.log(cookie)
    const bearerHeader = req.headers.authorization
    var query_token = req.query.token
    var bearertoken
    if (bearerHeader) {
      bearertoken = bearerHeader.split(' ')
    }
    if (query_token || bearerHeader || cookie) {
      const token = query_token  || cookie || bearertoken[1]
      if (!token) {
        return errorResponse(res, 401, 'validation token not provided')
      } else {
        const verify = await jwt.verify(
          token,
          process.env.SECRET_KEY,
          function (err, decode) {
            if (err) {
              console.log('not verified')
              return errorResponse(res, 401, 'validation token invalid')
            }
            const { _id } = decode
            const userId = _id
            req.body = { ...req.body, userId }
            next()
          },
        )
      }
    } else {
      return errorResponse(res, 401, 'provide valid token')
    }
  } catch (err) {
    console.log(err)
    return errorResponse(res, 500, 'something went wrong')
  }
}

module.exports = { authenticate }
