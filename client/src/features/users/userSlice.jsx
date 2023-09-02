import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:'users',
    initialState:{},
    reducers:{
        addUser:(state,action)=>{
                return state = action.payload
        },
        removeUser:(state)=>{
            return ''
        },
    }
})

export const selectUser = (state)=>state.user
export const {addUser,removeUser,incrementByAmount} = userSlice.actions
export default userSlice.reducer