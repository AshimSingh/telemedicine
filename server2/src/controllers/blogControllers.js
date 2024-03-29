/* eslint-disable no-unused-vars */
const User = require('../models/user')
const Blog = require('../models/blog')
// const Tags = require('../models/tags')
const {
  validateCreateBlog,
  validateUpdateBlog,
  validateDleteBlog,
} = require('../middleware/validator/blogValidator')
const { errorResponse, successResponse } = require('../helper/response')
const mediaHelper = require('../helper/mediaUrlHelper')
const { slugCreator, slugExist } = require('../helper/slugCreator')
const { excerptCreator } = require('../helper/excerptCreator')
const { pageInitionHelper } = require('../helper/pageinitionHelper')
const imageUrlAddertoThumbnail = require('../helper/imageURLtoThumbnail')

//adds imageurl to data that is sent as response
const imageUrlAdderToData = async (req, data) => {
  for (var i = 0; i < data.length; i++) {
    var image = await mediaHelper(req, data[i]?.thumbnail?.path)
    console.log(image, 'img')
    // var categories_image =await mediaHelper(req, data[i].categories?.thumbnail?.path)
    data[i] = { ...data[i]?._doc }
    data[i].thumbnail = { ...data[i].thumbnail?._doc, image_url: image }
    // data[i].categories = { ...data[i].categories?._doc }
    // data[i].categories.thumbnail = {
    //   ...data[i].categories.thumbnail?._doc,
    //   image_url: categories_image,
    // }
    console.log(data[i])
    var categories_data = await imageUrlAddertoThumbnail(
      req,
      data[i]?.categories?.thumbnail?.thumbnails,
    )
    console.log(categories_data)
    data[i].categories = { ...data[i].categories?._doc }
    data[i].categories.thumbnail = { ...data[i].categories?.thumbnail?._doc }
    data[i].categories.thumbnail.thumbnails = categories_data
    var thumbnails_data = await imageUrlAddertoThumbnail(
      req,
      data[i]?.thumbnail?.thumbnails,
    )
    data[i].thumbnail = { ...data[i].thumbnail }
    data[i].thumbnail.thumbnails = thumbnails_data
  }
  return data
}

const getAllBlog = async (req, res, next) => {
  try {
    var { page, limit, sort, skip } = await pageInitionHelper(req)
    let sortObject = {}
    sortObject[sort.sortBy] = sort.sortOrder
    var search = req.query.search
    let searchObj = {}
    var totalCount
    if (search) {
      searchObj['title'] = new RegExp(search, 'i')
    }
    var blogs = await Blog.find(searchObj)
      .sort(sortObject)
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'author',
        select: ['firstname', 'lastname'],
      })
      .populate({
        path: 'categories',
        populate: { path: 'thumbnail' },
      })
      .populate('thumbnail')
    totalCount = await Blog.countDocuments(searchObj).exec()
    var totalPage =
      totalCount % limit == 0
        ? totalCount / limit
        : Math.floor(totalCount / limit) + 1
    console.log(blogs, 'data')
    var data = await imageUrlAdderToData(req, blogs)
    if (!blogs) {
      return errorResponse(res, 204, 'No blogs found')
    } else {
      return successResponse(
        res,
        200,
        'message',
        data,
        page,
        limit,
        totalCount,
        totalPage,
        sort,
      )
    }
  } catch (err) {
    next(err)
  }
}

const getBlog = async (req, res, next) => {
  try {
    const id = req.params.blogId
    console.log('here',id)
    var blogs = await Blog.findById(id)
      .populate({
        path: 'author',
        select: ['firstname', 'lastname'],
      })
      .populate({
        path: 'categories',
        populate: { path: 'thumbnail' },
      })
      .populate('thumbnail')
    console.log(blogs, 'data')
    var data = await imageUrlAdderToData(req, [blogs])
    if (!blogs) {
      return errorResponse(res, 204, 'No blogs found')
    } else {
      return successResponse(res, 200, 'message', data)
    }
  } catch (err) {
    next(err)
  }
}

const createBlog = async (req, res, next) => {
  var {
    author,
    categories,
    content,
    excerpt,
    title,
    slug,
    thumbnail,
    tags,
    userId,
  } = req.body
  try {
    const value = await validateCreateBlog(req.body)
    if (userId == author) {
      const user = await User.findById(author).lean().exec()
      //if slug is not provided then
      if (slug == null || slug == undefined || slug == '') {
        slug = await slugCreator(title, Blog)
        if (!slug) {
          return errorResponse(res, 400, 'somethig went wrong generating slug')
        }
      } else {
        //if slug is provided must check slug
        const is_slugExist = await slugExist(slug, Blog)
        if (is_slugExist) {
          return errorResponse(res, 400, 'Slug exist reenter slug')
        }
        // it returns true if slug already exists
      }
      if (excerpt == null || excerpt == undefined) {
        excerpt = excerptCreator(content)
      }

      if (!user) {
        return errorResponse(res, 204, 'Cannot find user')
      }
      let postBlog = new Blog({
        author: author,
        categories,
        content,
        excerpt,
        title,
        slug,
        tags,
        thumbnail,
      })

      const result = await postBlog.save()
      if (result) {
        var populatedResult = await Blog.find(result._id)
          .populate({
            path: 'author',
            select: ['firstname', 'lastname'],
          })
          .populate({
            path: 'categories',
            populate: { path: 'thumbnail' },
          })
          .populate('thumbnail')
        console.log(populatedResult.categories)
        var data = await imageUrlAdderToData(req, populatedResult)
        if (data) {
          return successResponse(res, 201, 'Blog created successfully', data)
        } else {
          return errorResponse(res, 400, 'cannot create blog')
        }
      } else {
        return errorResponse(res, 400, 'cannot create blog')
      }
    } else {
      return errorResponse(res, 401, 'Unauthorized')
    }
  } catch (err) {
    next(err)
  }
}

const updateBlog = async (req, res, next) => {
  try {
    //all validation
    const id = req.params.blogId
    const value = await validateUpdateBlog(req.body)
    var { categories, content, excerpt, title, slug, tags, author, userId } =
      req.body
    //check if token matches author or not else unauthorized
    if (userId == author) {
      const blogExist = await Blog.findById(id).exec()
      if (!blogExist) {
        errorResponse(res, 204, 'Blog not found')
      } else {
        //if slug is not provided then
        if (slug == null || slug == undefined || slug == '') {
          slug = await slugCreator(title, Blog)
          if (!slug) {
            return errorResponse(
              res,
              400,
              'somethig went wrong generating slug',
            )
          }
        } else {
          //if slug is provided must check slug
          const is_slugExist = await slugExist(slug, Blog, id)
          if (is_slugExist) {
            return errorResponse(res, 400, 'Slug exist re-enter slug')
          }
          // it returns false if slug already exists then it returns error from that function only
        }

        // /// if tags is given in blog creator then we should create tag
        // if (tags) {
        // }

        blogExist.title = title
        blogExist.categories = categories
        blogExist.slug = slug
        blogExist.content = content
        blogExist.excerpt = excerpt
        blogExist.tags = tags
        const result = await blogExist.save()
        if (result) {
          var populatedResult = await Blog.findById(result._id)
            .populate({
              path: 'author',
              select: ['firstname', 'lastname'],
            })
            .populate({
              path: 'categories',
              populate: { path: 'thumbnail' },
            })
            .populate('thumbnail')

          // var data = reduceData(populatedResult);
          // var image = mediaHelper(req, data.thumbnail.path);
          // var categories_image = mediaHelper(
          //   req,
          //   data.categories?.thumbnail.path,
          // );
          // data.thumbnail = { ...data.thumbnail._doc, image_url: image };
          // // data.categories.thumbnail = {...data.categories.thumbnail,image_url:categories_image}
          // data.categories = { ...data.categories._doc };
          // data.categories.thumbnail = {
          //   ...data.categories.thumbnail._doc,
          //   image_url: categories_image,
          // };
          // successResponse(res, 200, 'Updated Blog', data);
          var data = await imageUrlAdderToData(req, [populatedResult])
          if (data) {
            return successResponse(res, 200, 'Updated Blog Successfully', data)
          } else {
            return errorResponse(res, 400, 'cannot create blog')
          }
        } else {
          errorResponse(res, 204, 'Blog could not be update')
        }
      }
    } else {
      return errorResponse(401, 'Unauthorized')
    }
  } catch (err) {
    next(err)
  }
}

const deleteBlog = async (req, res, next) => {
  try {
    var { userId, author } = req.body
    if (userId == author) {
      const validate = await validateDleteBlog(req.body)
      const id = req.params.blogId
      const { userId, author } = req.body
      if (userId == author) {
        const blogExists = await Blog.findById(id).lean().exec()
        if (!blogExists) {
          return errorResponse(res, 400, 'Cannot find Note')
        }
        const result = await Blog.deleteOne({ _id: id })
        if (result) {
          return successResponse(res, 200, 'successfully deleted')
        } else {
          return errorResponse(res, 500, 'couldnt delete note')
        }
      } else {
        return errorResponse(res, 400, 'UnAuthorized')
      }
    } else {
      return errorResponse(res, 400, 'UnAuthorized')
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAllBlog,
  createBlog,
  deleteBlog,
  updateBlog,
  getBlog,
}
