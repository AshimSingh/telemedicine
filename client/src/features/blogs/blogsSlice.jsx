import { createSlice } from "@reduxjs/toolkit";

const blogSlice =createSlice({
    name:'blog',
    initialState:[],
    reducers:{
        addPostList:(state,action)=>{
            if(action.payload !=[]){
                return state = action.payload
            }
            else{
                return state
            }
        }
    }
})

export const selectAllBlogs = (state)=>state.blogs
export const {addPostList} = blogSlice.actions
export default blogSlice.reducer