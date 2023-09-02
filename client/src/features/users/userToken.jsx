import { createSlice } from '@reduxjs/toolkit'

const tokenSlice = createSlice({
    name:'token',
    initialState:[],
    reducers:{
        addToken:(state,action)=>{
                return state = action.payload
        },
        removeToken:(state)=>{
            return ''
        },
    }
})

export const selectToken = (state)=>state.token
export const {addToken,removeToken} = tokenSlice.actions
export default tokenSlice.reducer