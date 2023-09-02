import './logobanner.css'
import pre from '../assets/logo1.jpg'
import house from '../assets/logo2.jpg'
import stars from '../assets/logo3.jpg'
import employee from '../assets/logo4.jpg'
function Logobanner() {
    const data =[
        {
            img:pre,
            des:"Same Day Service",
        },
        {
            img:house,
            des:"1000+ Bookings",
        },
        {
            img:stars,
            des:"4.3ratings Google",
        },
        {
            img:employee,
            des:"3000+ Professionals",
        },
    ]
  return (
    <div className='container flex bg-gray-100 items-center justify-center'>
      <div className='banner flex justify-center flex-wrap items-center '>
        {
            data.map((m,index)=>{
                return(
                    <>
                        <div key={index} className='banner__card m-2'>
                            <div className='banner__img flex items-center'>
                                <img src={m.img}></img>
                                <h5 className='ml-4 text-xl text-blue-500 font-medium'>{m.des}</h5>
                            </div>
                        </div>
                    </>
                )
            })
        }
      </div>
    </div>
  )
}

export default Logobanner
