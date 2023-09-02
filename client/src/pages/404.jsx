import React from 'react'
import { useNavigate } from 'react-router-dom'
const Error = () => {
    const navigate = useNavigate()
  return (
    <div className='h-screen flex justify-center items-center flex-col'>
       
            <h1 className='text-3xl'>404 Page not found</h1>
            <button onClick={()=>{navigate(-1)}} className='bg-blue-500 p-2 mt-2  text-white text-semibold text-2xl'>Go back</button>
        
      
      
    </div>
  )
}

export default Error
