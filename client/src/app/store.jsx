import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/users/userSlice'
import blogReducer from '../features/blogs/blogsSlice'
import tokenSlice from '../features/users/userToken'

const store =configureStore({
    reducer:{
        user:userReducer,
        blogs: blogReducer,
        token: tokenSlice,
    }
})
export default store