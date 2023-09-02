import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const Posts = ({title,excerpt,thumbnail,_id}) => {
  return (
    <div className="w-[100%] flex justify-center items-center">
      
      <div className="w-[80%] bg-gray-100 my-3 rounded-md">
        <Link to={`/blogs/${_id}`}>
        <div className="flex justify-center items-center flex-col">
        {thumbnail?.image_url?<img className="lg:h-[400px] md:h-[300px] h-[200px] w-[80%] mt-5 rounded-md" src={thumbnail?.image_url}></img>:''}
        </div>
       <h1 className="my-8 text-3xl md:text-4xl lg:text-6xl p-3">{title}</h1>
       <p className="text-xl my-3 p-3" >{excerpt} <Link to={`/blogs/${_id}`}>...seemore</Link></p>
    </Link>
    </div>  
    </div>
  )
}

export default Posts
