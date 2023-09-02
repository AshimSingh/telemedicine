import { useState,useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {selectUser,addUser} from '../features/users/userSlice'
import {addPostList,selectAllBlogs} from '../features/blogs/blogsSlice'
import {useGetFetch} from '../fetch/useGetFetch'
import Carousel from '../components/carousel'
import AboutUs, { Headings } from '../components/aboutUs'
import Logobanner from '../components/logoBanner'
import Posts from '../components/posts'

function Home() {
  const user = useSelector(selectUser)
  const blogsdata = useSelector(selectAllBlogs)
//   const dispatch = useDispatch()
//   const {data,isFetching} =  useGetFetch('/api/users','64eadc2d3d971a2d40b6a734','_id')
//   const {blogs,isLoading} = useGetFetch('/api/blogs')
//  useEffect(()=>{
//   addToReducer(data)
//   dispatch(addPostList(blogs))
//  },[data,blogs])
  

//   const addToReducer =(data)=>{
//     dispatch(addUser(data[0]))
//   }

  return (
    <section className='h-[screen]'>
      <div className='lg:h-[450px] h-[400px] mt-[5px]'>
        <Carousel/>
      </div>
      <AboutUs/>
      <Logobanner/>
      <Headings title={'Health Events'}/>
     <div className='mt-3'>
     {
        blogsdata?blogsdata.map((m)=>{
          return(
            <Posts key={m._id} {...m}/>
          )
        }):''
      }
     </div>
      <div className='flex justify-center items-center flex-col'>
      <h1 className='text-2xl font-semibold text-blue-500'>Nameste,{user.firstname} </h1>
      <h1 className='text-3xl font-semibold'>We are the MERN Developers</h1>
      
    </div>
    </section>
  )
}

export default Home
