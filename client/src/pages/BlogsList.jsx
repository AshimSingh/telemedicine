import {selectAllBlogs} from '../features/blogs/blogsSlice'
import Posts from '../components/posts'
import {useSelector} from 'react-redux'
import { useEffect } from 'react'

const BlogsList = () => {
    const blogsdata = useSelector(selectAllBlogs)
  return (
    <div >
      <Banner image={'https://plus.unsplash.com/premium_photo-1682125776589-e899882259c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1942&q=80'} title={'Blogs'}></Banner>
      {
        blogsdata.map((m)=>{
            console.log(m.id)
            return(
                <Posts key={m.id} {...m}/>
            )
        })
      }
    </div>
  )
}

export const Banner =({image,title})=>{
  console.log(image)
    return(
    <div className={`flex justify-center items-center lg:h-[300px] md:h-[250px] h-[200px] font-poppoins font-bold w-[100%] bg-cover backdrop-blur-sm opacity-80 bg-no-repeat ]`} style={{ backgroundImage: `url(${image})`,backgroundPosition: 'center', }}>
        <h1 className="text-white text-3xl md:text-4xl lg:text-6xl ">{title}</h1>
    </div>
    )
}

export default BlogsList
