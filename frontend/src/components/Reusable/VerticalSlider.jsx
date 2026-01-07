import React from 'react'
import { FaRocket } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa6";
import { FaStairs } from "react-icons/fa6";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Autoplay } from "swiper/modules";

const VerticalSlider = () => {

    const cards = [
    
        { id: 1, heading: "Hands-On Learning Experience",text:"Emphasize that your courses are crafted by industry experts to ensure high-quality content.",icon:<FaRocket className='text-[#ef476f]' size={22}></FaRocket> },
        { id: 2, heading: "Apply: Build, Play, Create",text:"Climb with Learnova Grow. Upskill through Learnova and achieve career success.",icon:<FaCalendar className='text-[#6bc069]' size={22}></FaCalendar> },
        { id: 3, heading: "Grow: Elevate Your Career",text:"Bring ideas to life in Learnova Apply. Giving you the competitive edge in your learning endeavors.",icon:<FaStairs className='text-[#fb9014]' size={22}></FaStairs> },
    
      ];

  return (

    <div className="w-[80%] xl:w-[450px] h-[450px] xl:h-[350px] overflow-hidden text-center xl:text-left">

        <Swiper direction="vertical" slidesPerView={2} spaceBetween={0} loop={true} autoplay={{ delay: 2000,
                disableOnInteraction: false, }} speed={700} modules={[Autoplay]} className="h-full" >

              {cards.map((card) => (

                <SwiperSlide key={card.id}>

                  <div className={`flex flex-col items-center xl:items-start font-nuninto gap-2.5`}>

                    <span className='border w-min rounded-full p-4'>{card.icon}</span>
                    <p className='text-white text-xl'>{card.heading}</p>
                    <p className='text-[#79808a] text-base'>{card.text}</p>

                  </div>

                </SwiperSlide>
              ))}
        </Swiper>
            
    </div>

  )
}

export default VerticalSlider