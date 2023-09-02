/* eslint-disable react/display-name */
/* eslint-disable react-refresh/only-export-components */
import { Navigation, Pagination,Mousewheel, Keyboard,Autoplay} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import './carousel.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default () => {
  
  // const images=[
  //   "http://localhost:3000/myUploads/1693256908632-436326158m028t0135_e_medical_icon_24aug22.jpg"
  // ]
  return (
    <Swiper
    cssMode={true}
    navigation={true}
    pagination={true}
    mousewheel={true}
    keyboard={true}
    // autoplay={
    //   {
    //     delay: 2500,
    //     disableOnInteraction: false,
    //   }
    // }
    modules={[Navigation, Pagination, Mousewheel, Keyboard,Autoplay]}
    className="mySwiper h-[100%] bg-green-500"
  >
    <SwiperSlide><div className='carousel-background h-[100%]'>he</div></SwiperSlide>
    <SwiperSlide><div>hello</div></SwiperSlide>
    <SwiperSlide><div>hello</div></SwiperSlide>
    {/* <SwiperSlide>Slide 1</SwiperSlide>
    <SwiperSlide>Slide 2</SwiperSlide>
    <SwiperSlide>Slide 3</SwiperSlide>
    <SwiperSlide>Slide 4</SwiperSlide>
    <SwiperSlide>Slide 5</SwiperSlide>
    <SwiperSlide>Slide 6</SwiperSlide>
    <SwiperSlide>Slide 7</SwiperSlide>
    <SwiperSlide>Slide 8</SwiperSlide>
    <SwiperSlide>Slide 9</SwiperSlide> */}
  </Swiper>
  );
};
