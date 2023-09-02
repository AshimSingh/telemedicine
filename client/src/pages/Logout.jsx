import {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeUser } from '../features/users/userSlice'

const Logout = () => {
  const dispatch = useDispatch()
  const fetch_log =async ()=>{
    const res =await fetch('/api/users/logout',{
      method:"GET",
      Headers:{
        Accept:'application/json',
        "Content-Type":"application/json"
      }
    })
    console.log(res)
    if(res.status ==200){
      {
        // dispatch({type:"User",pay})
        dispatch(removeUser())
        setTimeout(()=>{
          navigate('/')
        },2000)
      }
    }
   
  }
  useEffect(()=>{
    fetch_log()
  },[])
  const navigate =useNavigate()
  return (

    <div className='h-screen justify-center items-center flex'>

      <h1>Loging out...</h1>
      
    </div>
  )
}

export default Logout
