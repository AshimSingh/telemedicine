import axios from 'axios'
import { useState,useEffect } from 'react'

export const useGetFetch=(url)=>{
    const [data,setData] = useState([])
    const [blogs,setBlogs] = useState([])
    // const [blog,setBlog] = useState([])
    // const [blogLoading,setBlogLoading]=useState(true)
    const [isFetching,setFetch]=useState(true)
    const [isLoading,setLoading]=useState(true)
    const fetchApi =()=>{ 
        // console.log(url)
      axios.get(url,
        {
        // params:{
        //     search,
        //     searchby
        // }
    }
    )
    .then(function (response) {
        setData(response.data.data)
        setBlogs(response.data.data)
        setFetch(false)
        setLoading(false)
    })
    .catch(function (error) {
      console.log(error);
    })
}
    useEffect(()=>{
        fetchApi()
    },[url])
    if(url.includes('api/blogs')){
        return{blogs,isLoading}   
    }
    else{
        return {data,isFetching}
    }
}
export default useGetFetch