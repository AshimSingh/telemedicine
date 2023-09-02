import React from 'react'
// import { useDispatch } from 'react-redux';
import { useState,useEffect } from 'react';
const Contact = () => {
  
  const fetchapi =async()=>{
    const req= await fetch('/api/getdata',{
      method:'GET',
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
    })
    const data = await req.json()
    setDetail({...contact_detail,name:data.name,email:data.email,phone:data.phone})
  }
  useEffect(()=>{
    fetchapi()
    
  },[])
    // const dispatch =useDispatch();
  const [error,setError]=useState(false)
  const [numerror,setnumerror]=useState(false)
  const [contact_detail,setDetail]=useState({
    name:"",
    email:"",
    phone:"",
    message:'',
  })
  const handleChange = (event) => {
    const name=event.target.name
    const value=event.target.value
    
    setDetail({...contact_detail,[name]:value}) 
  }
    const handleSub =async () => {
        setError(true)
        // const validPhoneNumber = /^[0-9]{10}$/;
        // if (validPhoneNumber.test(contact_detail.phone)) {
          
        // }
        // else{
        //   setnumerror(true)
        // }
        
        if(numerror==false && contact_detail.name.length>0  && contact_detail.email.length >0 && contact_detail.message.length>0)
        {
          // console.log("dispatch it")
          // dispatch({type:'PERSONAL_DETAIL',payload:{
          //   name:"contact",
          //   detail:contact_detail
          // }})
          const {name,phone,email,message}=contact_detail
          const res = await fetch('/api/contact',{
            method:'POST',
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              name,phone,email,message
            })
          })
          const data = await res.body
          if(!data){
            console.log("Message not send")
          }
          else{
            console.log("message sent successfully"),
            setDetail({...contact_detail,message:""})
          }
          setError(false)
        }
        
      };
  return (
    <div className='pt-20  flex justify-center mt-5'>
      <div className='bg-gray-200 lg:w-[80%] md:w-[90%] w-[98%] grid lg:grid-cols-3 md:grid-cols-1'>
        <div className=' lg:col-span-2 '>
            {/* <form onSubmit={()=>{}}> */}
        <div className='flex flex-col px-4 mt-2'>
          <label className='my-3' name='name'>Full Name</label>
          <input className='h-10 rounded-sm' type='text' value={contact_detail.name} onChange={handleChange} name='name' id='username'></input>
        </div>
        {error==true && contact_detail.name.length<=0?<h1 className='text-red-400 px-4'>Please enter full name</h1>:""}
        <div className='flex flex-col px-4 mt-2'>
          <label className='my-3' name='email'>Email</label>
          <input className='h-10 rounded-sm' type='email' name='email' id='email' value={contact_detail.email} onChange={handleChange}></input>
        </div>
        {error==true && contact_detail.email.length<=0?<h1 className='text-red-400 px-4'>Please enter email</h1>:""}
        <div className="flex flex-col px-4 mt-2">
          <label className='my-3' name='phone'>Phone Number</label>
          <input className='h-10 rounded-sm' type='tel' value={contact_detail.phone} onChange={handleChange} name='phone' id='phonenumber'></input>
        </div>
        {error==true && numerror==true ?<h1 className='text-red-400 px-4'>Please valid Phone Number</h1>:""}
        <div className="flex flex-col px-4 mt-2">
          <label className='my-3' name='message'>Message</label>
          <textarea className='h-20 rounded-sm'  type='text-area' value={contact_detail.message} onChange={handleChange} name='message' id='address'></textarea>
        </div>
        {error==true && contact_detail.message.length<=0?<h1 className='text-red-400 px-4'>Please enter your message</h1>:""}
        
        <button className='h-12 mt-4  bg-blue-400 mb-8 px-4 text-xl mx-4 ' type='button' onClick={()=>handleSub()}>Submit</button>
      {/* </form> */}
        </div>
        <div >
          <h1 className='text-2xl text-gray-600 px-2 mt-4'>Contact us: </h1>
          <div className='grid grid-cols-2 gap-3 px-2 mt-3'>
            <a href="tel:5551234567">
              <div className='flex flex-col justify-center items-center bg-gray-100 hover:border-blue-500 hover:border-2 h-32'>
              <i class="fa-solid fa-phone text-4xl text-blue-500"></i>
              <h1 className='text-2xl mt-2 text-gray-600 font-medium'>Call Now</h1>
            </div>
            </a>

            <a href="tel:5551234567">
              <div className='flex flex-col justify-center items-center bg-gray-100 hover:border-blue-500 hover:border-2 h-32'>
              <i class="fa-solid fa-envelope text-4xl text-blue-500"></i>
              <h1 className='text-2xl mt-2 text-gray-600 font-medium'>Mail</h1>
            </div>
            </a>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
