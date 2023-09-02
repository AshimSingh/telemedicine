import "./aboutUs.css";
import { useState,useEffect } from "react";
const AboutUs = () => {
  const [screenSize, setScreenSize] = useState('');

  const handleResize = () => {
    const width = window.innerWidth;

    if (width >= 992) {
      setScreenSize('lg');
    } else if (width >= 768) {
      setScreenSize('md');
    } else {
      setScreenSize('sm');
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  var content ='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id interdum odio, eget tincidunt libero. Nulla facilisi. Sed consectetur urna id tellus volutpat, nec eleifend urna varius. Sed euismod hendrerit cursus. Nullam nec justo ac libero ullamcorper hendrerit non ut libero. Vivamus nec risus id elit cursus vehicula. Vivamus quis nisi ligula. Ut ac scelerisque enim. Cras nec orci sed orci tincidunt ultricies at vel enim. Vivamus lacinia, leo eget volutpat convallis, massa leo interdum mi, a fringilla lectus ante ac nunc. Duis tincidunt in elit eget var'
  const getTextToShow = () => {
    switch (screenSize) {
      case 'lg':
        return content
      case 'md':
        return content.substring(0,400)
      case 'sm':
        return content.substring(0,300)
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[5%]">

      <Headings title={'Why Telemedicine'} subtitle={'it can help with'}/>
      <div className="background flex justify-center items-center lg:h-[500px] md:h-[400px] h-[350px]  w-[100%] mt-[2%]">
        <div className="h-[80%] sm:h-[90%] w-[80%] bg-white p-4 flex flex-col justify-center items-center ">
          <h1 className="font-poppins lg:text-4xl md:text-3xl text-xl text-grey-400 font-bold">
            Providing Care to all citizens
          </h1>
          <div className="horizontal-line mt-[10px] w-[80%] lg:w-[60%] md:wd-[70%] "></div>
          <p className="mt-[2%] lg:text-xl md:text-sm  text-sm overflow-hidden px-3">
            {getTextToShow()}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Headings =({title,subtitle})=>{
  return(
    <div className="flex flex-col justify-center items-center">
        <h1 className=" font-poppins lg:text-4xl md:text-3xl text-xl font-bold">
          {title}
        </h1>
        <span className="fonts-mont mt-[5px]">{subtitle}</span>
        <i className=" lg:mt-[15px] mt-[5px] lg:text-4xl md:text-3xl text-2xl fa-solid fa-arrow-down-long"></i>
      </div>
  )
}

export default AboutUs;
