
import './App.css'
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Navbar from './components/navbar'
import Signin from './pages/SignIn'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Register from './pages/Register'
import Error from './pages/404';
import Logout from './pages/Logout';
import BlogsList from './pages/BlogsList'
import Blog from './pages/Blog';
import {useDispatch} from 'react-redux'
import {useGetFetch} from './fetch/useGetFetch'
import { useEffect,useState } from 'react';
import {addUser} from './features/users/userSlice'
import {addPostList} from './features/blogs/blogsSlice'
import { useCookies } from 'react-cookie';
// import jwt_decode from 'jsonwebtoken';


function App() {
  
  const dispatch = useDispatch()
  const [userId, setUserId] = useState('1')
 
    const {data,isFetching} =  useGetFetch(`/api/users/${userId}`) 
  const {blogs,isLoading} = useGetFetch('/api/blogs')
 useEffect(()=>{
  console.log(blogs)
  console.log(data)
  dispatch(addUser(data))
  dispatch(addPostList(blogs))
 },[data,blogs])
  

  // const addToReducer =(data)=>{
  //   {data?dispatch(addUser(data[0])):''}
  //   dispatch(addPostList(blogs))
  // }

  return (
    <>
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path='/logout' element={<Logout/>}/>
        <Route path="/signup" element={<Register/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path='/blogs' element={<BlogsList/>}/>
        <Route path='/blogs/:blogId' element={<Blog/>}></Route>
        <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>      
    </>
  )
}

export default App
