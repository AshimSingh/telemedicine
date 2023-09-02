/* eslint-disable no-unused-vars */
const User = require('../models/user')
const Blog = require('../models/blog')
const Tags = require('../models/tags')
const Categories = require('../models/categories')

const slugCreator = async (title, Model) => {
  try {
    var lowerCaseTitle = title.toLowerCase()
    var slug = lowerCaseTitle
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
      .replace(/^-|-$/g, '') // Remove leading and trailing dashes
      .trim() // Trim any whitespace
    var is_slugExist = await slugExist(slug, Model)
    console.log(is_slugExist)
    if (is_slugExist) {
      slug = slug + Date.now()
      return slug
    }
    if (!is_slugExist) {
      return slug
    }
    return ''
  } catch (err) {
    new Error('Cannot generate slug')
  }
}

const slugExist = async (slug, Model, id) => {
  try {
    const slugExist = await Model.findOne({ slug }).lean()
    if (id) {
      if (id == slugExist._id) {
        return slugExist ? true : false
      } else {
        return false
      }
    } else {
      return slugExist ? true : false
    }
  } catch (err) {
    new Error('Cannot check slug')
  }
}
module.exports = { slugCreator, slugExist }
