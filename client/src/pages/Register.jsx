
import './Register.css'
import { useState} from 'react'
// import {useHistory} from 'react-router-dom'
import { useNavigate } from "react-router-dom"
const Register = () => {
  const history =useNavigate()
  const [form,setfrom]=useState({
    firstname:"",
    lastname:"",
    email:"",
    role:"User",
    phone:"",
    password:"",
  })
  const handelChange=(e)=>{
    e.preventDefault();
    const name=e.target.name
    const value=e.target.value
    setfrom({...form,[name]:value})
  }
  
  const PostData =async (e)=>{

    e.preventDefault()
    console.log(form)
    const {firstname,lastname,email,role,phone,password,}=form
    const res = await fetch("/api/users",{
    
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        firstname,lastname,email,role,phone,password
      })
})
console.log(res,res.status)

const data =await res.json()

if(data.status == 201){
  alert("successfull")
  setfrom({
    firstname:"",
    lastname:"",
    email:"",
    role:"User",
    phone:"",
    password:"",
  })
}
else{
 window.alert("Inv Reg")
  console.log("Inc reg")
}
  }
  

  return (
    <div className=' h-screen flex justify-center items-center bg-gray-200'>
       <div className='bg-white md:w-[70%] w-[90%] flex justify-center items-center shadow-md rounded-md md:mt-0 mt-5'>
        <form className='flex flex-col md:w-[40%] w-full m-5' method='POST'>
          <h3 className='font-bold text-2xl p-2 '>Sign In</h3>
          
          <input type='text' name='firstname' value={form.firstname} onChange={handelChange} className=' border-b-[3px]  border-grey-400 p-2 my-2 fonz' placeholder=" &#xf007; First Name"></input>
          <input type='text' name='lastname' value={form.lastname} onChange={handelChange} className=' border-b-[3px]  border-grey-400 p-2 my-2 fonz' placeholder=" &#xf007; Last Name"></input>
        {/* <div className='flex'>
          <i className="fa-solid fa-user absolute pt-5"></i>
          <input type='text' name='name' classNa3e=' outline-grey-400 p-2 my-2' placeholder=' Name'></input>
        </div> */}
         
          <input value={form.email} onChange={handelChange} type='text' name='email'  className=' border-b-[3px]  border-grey-400 p-2 my-3 fonz' placeholder=" &#xf0e0; Email"></input>


          {/* <input value={form.work} onChange={handelChange} type='text' name='work' className=' border-b-[3px]  border-grey-400 p-2 my-3 fonz' placeholder=" &#xf0e0; work"></input> */}
          <label className='text-gray-400 fonz'>Select Profession</label>
          <select value={form.role} name='profession'  className='text-gray-400 border-[3px]  border-grey-400 p-2 my-3 text-xl' onChange={handelChange}>
            <option value='User' >User</option>
            <option value='Doctor'>Doctor</option>
          </select>
          
          <input value={form.phone} onChange={handelChange} type='tel' name='phone' className=' border-b-[3px]  border-grey-400 p-2 my-3 fonz' placeholder=" &#xf0e0; Phone"></input>

          <input value={form.password} onChange={handelChange} type='password' name='password' className=' border-b-[3px]  border-grey-400 p-2 my-3 fonz' placeholder=" &#xf0e0; Password"></input>

          <button className='bg-blue-300 w-[150px] p-3 font-semibold text-white' type='submit' onClick={PostData}>Register</button>
        </form>
        <img src='https://cdn.dribbble.com/users/4781516/screenshots/10796279/media/04eb24250e23400dc0162080a231b70c.gif' className='w-[40%] h-[60%] md:flex hidden'></img>
       </div>
    </div>
  )
}

export default Register
