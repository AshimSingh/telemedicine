import { Banner } from "./BlogsList"
import {useGetFetch} from '../fetch/useGetFetch'
import { useParams } from "react-router-dom"
const Blog = () => {
    let id = useParams()
    console.log(id.blogId)
    const {blogs,isLoading} = useGetFetch(`/api/blogs/${id.blogId}`)
    
  return (
    <div>
        <Banner title={'Blog'} image={'https://images.unsplash.com/photo-1484639726803-f17534cedb15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJvb2slMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'} />
        {
            isLoading?<h1>Loading</h1>:
            <div className="w-[100%] flex justify-center items-center">
            <div className="w-[80%] bg-gray-100 my-3 rounded-md">
              <div className="flex justify-center items-center flex-col">
              {blogs[0]?.thumbnail?.image_url?<img className="lg:h-[400px] md:h-[300px] h-[200px] w-[80%] mt-5 rounded-md" src={blogs[0]?.thumbnail?.image_url}></img>:''}
              </div>
             <h1 className="my-8 text-3xl md:text-4xl lg:text-6xl p-3">{blogs[0].title}</h1>
             <p className="text-xl my-3 p-3" >{blogs[0].content}</p>
          </div>
            
          </div>
        }
      
    </div>
  )
}

export default Blog
