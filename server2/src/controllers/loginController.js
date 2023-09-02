const { validateLogin } = require('../middleware/validator/userValidator')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const loginUser = async (req, res, next) => {
  try {
    console.log(req.body)
    const { email, password } = req.body
    const value = await validateLogin(req.body)
    const userExists = await User.findOne({ email })
    if (userExists) {
      const isMatch = await bcrypt.compare(password, userExists.password)
      if (!isMatch) {
        res.status(401).send('Invalid Credintials')
      } else {
        const token = await userExists.generateAuthToken()
        console.log(token)
        res.cookie('jwtoken', token, {
          expires: new Date(Date.now() + 259200200),
          httpOnly: true,
        })
        res.status(200).send({ message: 'Login Successful' })
      }
    } else {
      res.status(401).send('Invalid Credintials')
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = loginUser
