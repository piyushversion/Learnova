import React, { useEffect } from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { SiReact } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiNodedotjs } from "react-icons/si";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { GoRocket } from "react-icons/go";
import { FaBookReader } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { BiSolidPurchaseTag } from "react-icons/bi";
import walmart from "../../assets/companies logo/walmart.png"
import tesla from "../../assets/companies logo/tesla-9.png"
import xiaomi from "../../assets/companies logo/xiaomi-4.png"
import openai from "../../assets/companies logo/openai-wordmark.png"
import paypal from "../../assets/companies logo/paypal-3.png"
import deloitte from "../../assets/companies logo/deloitte-1.png"
import microsoft from "../../assets/companies logo/microsoft-6.png"
import oracle from "../../assets/companies logo/oracle-6.png"
import qualcomm from "../../assets/companies logo/qualcomm-logo.png"
import coinbase from "../../assets/companies logo/coinbase-1.png"
import zcaler from "../../assets/companies logo/zscaler-logo.png";
import nutanix from "../../assets/companies logo/nutanix-logo.png";
import hyundai from "../../assets/companies logo/hyundai-motor-company-logo.png";
import google from "../../assets/companies logo/google-1-1.png";
import samsung from "../../assets/companies logo/samsung-8.png";
import shape10 from "../../assets/utilities image/shape-10.png";
import shape11 from "../../assets/utilities image/shape-11.png";
import shape05 from "../../assets/utilities image/shape-05.png";
import shape06 from "../../assets/utilities image/shape-06.png";
import shape07 from "../../assets/utilities image/shape-07.png";
import about01 from "../../assets/utilities image/about-01.png";
import about02 from "../../assets/utilities image/about-02.png";
import about03 from "../../assets/utilities image/about-03.png";
import shape006 from "../../assets/utilities image/shape-06 (1).png";
import illustration from "../../assets/utilities image/illustration-2.png";
import VerticalSlider from '../Reusable/VerticalSlider';
import one from "../../assets/utilities image/Animation - 1744371892494.json"
import Lottie from 'lottie-react';
import Footer from './Footer';
import ReviewSlider from "../Reusable/ReviewSlider";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-scroll";
import { loadcart } from '../../redux/Cartslice';

const Home = () => {

  const navi = useNavigate();

  const token = useSelector(state => state.Auth.token);

  const img = [

      {
        logo:tesla
      },
      {
        logo:microsoft
      },
      {
        logo:paypal
      },
      {
        logo:coinbase
      },
      {
        logo:deloitte
      },
      {
        logo:nutanix
      },
      {
        logo:samsung
      },
      {
        logo:qualcomm
      },
      {
        logo:openai
      },
      {
        logo:walmart
      },
      {
        logo:oracle
      },
      {
        logo:xiaomi
      },
      {
        logo:zcaler
      },
      {
        logo:hyundai
      },
      {
        logo:google
      }
  ]

  return (


    <div>

      <section className={`bg-[#020813] flex flex-col justify-center items-center gap-9 relative`}>

        <svg className='absolute -left-6 bottom-[0px] w-[370px] sm:w-[364px]' viewBox="0 0 364 201" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24" stroke="url(#paint0_linear_25:218)"></path><path d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24" stroke="url(#paint1_linear_25:218)"></path><path d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24" stroke="url(#paint2_linear_25:218)"></path><path d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481" stroke="url(#paint3_linear_25:218)"></path><defs><linearGradient id="paint0_linear_25:218" x1="184.389" y1="69.2405" x2="184.389" y2="212.24" gradientUnits="userSpaceOnUse"><stop stopColor="#4A6CF7" stopOpacity="0"></stop><stop offset="1" stopColor="#4A6CF7"></stop></linearGradient><linearGradient id="paint1_linear_25:218" x1="156.389" y1="69.2405" x2="156.389" y2="212.24" gradientUnits="userSpaceOnUse"><stop stopColor="#4A6CF7" stopOpacity="0"></stop><stop offset="1" stopColor="#4A6CF7"></stop></linearGradient><linearGradient id="paint2_linear_25:218" x1="125.389" y1="69.2405" x2="125.389" y2="212.24" gradientUnits="userSpaceOnUse"><stop stopColor="#4A6CF7" stopOpacity="0"></stop><stop offset="1" stopColor="#4A6CF7"></stop></linearGradient><linearGradient id="paint3_linear_25:218" x1="93.8507" y1="67.2674" x2="89.9278" y2="210.214" gradientUnits="userSpaceOnUse"><stop stopColor="#4A6CF7" stopOpacity="0"></stop><stop offset="1" stopColor="#4A6CF7"></stop></linearGradient><linearGradient id="paint4_linear_25:218" x1="214.505" y1="10.2849" x2="212.684" y2="99.5816" gradientUnits="userSpaceOnUse"><stop stopColor="#4A6CF7"></stop><stop offset="1" stopColor="#4A6CF7" stopOpacity="0"></stop></linearGradient><radialGradient id="paint5_radial_25:218" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(220 63) rotate(90) scale(43)"><stop offset="0.145833" stopColor="white" stopOpacity="0"></stop><stop offset="1" stopColor="white" stopOpacity="0.08"></stop></radialGradient></defs></svg>

        <div className='text-white tracking-wide font-lexend border-b-2 border-[#2c333f] rounded-full px-6 py-2 mt-[110px] sm:mt-[117px] text-[15px] sm:text-base'>Your Ultimate Learning Companion !</div>

        <h1 className='text-[#DBDDED] text-[40px] sm:text-[50px] lg:text-6xl font-nuninto w-[90%] sm:w-[85%] lg:w-[80%] text-center leading-[50px] sm:leading-[55px] lg:leading-[70px] tracking-wide'>Elevate your learning with <span className='text-[#5d6eee]'>Learnova</span> gateway to smarter learning.</h1>

        <p className='text-[#79808a] w-[80%] sm:w-[75%] lg:w-[53%] text-center font-lexend text-[17px]'>At learnova, we believe that education should be accessible, engaging and tranformative. Our innovative Learning Management System is designed to provide seamless learning experience for students, educatores and professionals.</p>

        <div className='flex flex-col items-center gap-8 mb-[33px] mt-[15px]'>

          <h1 className='text-[#DBDDED] font-rubik'>Build with latest technology</h1>
          
          <div className='flex justify-center gap-7'>

              <SiReact size={40} className='text-[#79808a] cursor-pointer hover:text-white transition-all duration-300'></SiReact>
              <SiTailwindcss size={40} className='text-[#79808a] cursor-pointer hover:text-white transition-all duration-300'></SiTailwindcss>
              <SiMongodb size={40} className='text-[#79808a] cursor-pointer hover:text-white transition-all duration-300'></SiMongodb>
              <SiJavascript size={40} className='text-[#79808a] cursor-pointer hover:text-white transition-all duration-300'></SiJavascript>
              <SiNodedotjs size={40} className='text-[#79808a] cursor-pointer hover:text-white transition-all duration-300'></SiNodedotjs>

          </div>

        </div>

        <Link to='whychooseus' smooth>

          <div className='text-[#dbdded] font-nuninto font-semibold flex items-center gap-1.5 justify-center rounded-full flex-col cursor-pointer mb-[11px] relative'>

            <p>Explore Features</p>

            <IoIosArrowDown size={18} className='animate-bounce'></IoIosArrowDown>

          </div>

        </Link>

      </section>

      <section className='bg-[#DBDDED] flex flex-col items-center'>

        <h1 className='text-black font-nuninto text-lg sm:text-xl my-8 font-semibold'>Trusted by learners from</h1>

        <div className='flex justify-center items-center flex-wrap gap-x-[90px] sm:gap-x-[70px] md:gap-x-[55px] gap-y-10 w-[80%] relative'>

          <img src={shape10} alt="XXX" className='absolute -top-3 sm:top-0 left-[78px] sm:left-16 lg:left-0 -translate-x-24 -translate-y-16 w-[14%] sm:w-[10%] md:w-max'/>

          {
            img.map((item, index) => {

              return (

                <img src={item.logo} alt="Walmart" loading='lazy' className='scale-125 sm:scale-100 w-[30%] sm:w-[20%] md:w-[18%] lg:w-[15%]' key={index}/>

              )

            })

          }

          <img src={shape11} alt="XXX" className='absolute -bottom-3 sm:bottom-0 right-[78px] sm:right-16 lg:right-0 translate-x-24 translate-y-10 w-[15%] sm:w-[11%] md:w-max'/>

        </div>

        <h1 className='font-rubik text-base sm:text-lg my-5'> + many more</h1>

      </section>

      <section className='bg-[#020813] px-[25px] sm:px-20 pb-28 pt-14 relative' name="whychooseus">

        <div className='text-[#DBDDED] font-nuninto pb-20 text-center'>

          <h1 className='text-[34px] lg:text-[40px] text-[#5d6eee] pb-2'>Why Choose Us</h1>

          <p className='w-full md:w-[65%] mx-auto text-[17px]'>Experience quality education with Learnova’s intuitive platform and Join thousands of learners on Learnova for engaging courses and seamless access to quality education anytime, anywhere.</p>

        </div>

        <div className='flex flex-col xl:flex-row justify-around items-center shadow-[0px_4px_10px_-2px_#60a5fa] rounded-2xl pt-[75px] pb-12 xl:pt-10 xl:pb-5 mb-28 relative gap-[40px] xl:gap-0 w-full'>

          <VerticalSlider></VerticalSlider>

          <div className='font-nuninto flex items-center xl:items-start text-center xl:text-left flex-col gap-[23px] w-[80%] xl:w-[465px]'>

              <h1 className='text-[#ef476f] text-xl'>Why We're Your</h1>

              <p className='text-white text-[32px] sm:text-4xl'>Best Of All Learning Choice</p>

              <p className='text-[#79808a] text-lg'>Choose Learnova for an unparalleled learning experience. And gain valuable knowledge for secure future. Explore the unique benefits that set Learnova apart.</p>
              <button className='bg-[#6e75c6] rounded-full text-white px-5 py-2 self-center xl:self-start transition-all duration-200 active:scale-95' onClick={()=>navi("/contact")}>Let's Connect</button>

          </div>

          <div className='absolute top-0 left-0 -translate-y-10 translate-x-6 rounded-full p-5 border border-[#60a5fa] bg-[#111722] shadow-[0px_0px_10px_0px_#60a5fa]'><FaArrowTrendUp color='#60a5fa' size={30}></FaArrowTrendUp></div>

        </div>

        <div className='flex flex-col xl:flex-row justify-around items-center shadow-[0px_4px_10px_-2px_#23c45c] rounded-2xl pt-[65px] pb-10 xl:pt-10 xl:pb-5 relative gap-16 xl:gap-0 w-full'>

          <div className='font-nuninto flex flex-col gap-[23px] w-[80%] xl:w-[465px] items-center xl:items-start text-center xl:text-left'>

              <h1 className='text-[#23c45c] text-xl'>Who are We</h1>

              <p className='text-white text-[32px] sm:text-4xl'>Empowering Learning</p>

              <p className='text-[#79808a] text-lg'>Unveil the essence of learning: a community-driven platform dedicated to empowering learners of all levels. Discover who we are and how we're shaping the future of education.</p>
              
              <button className='bg-[#6e75c6] rounded-full text-white px-5 py-2 transition-all duration-200 active:scale-95 self-center xl:self-start' onClick={()=>navi("/contact")}>Let's Connect</button>

          </div>

          <VerticalSlider></VerticalSlider>

          <div className='absolute top-0 right-0 -translate-y-10 -translate-x-6 rounded-full p-5 border border-[#23c45c] bg-[#111722] shadow-[0px_0px_10px_0px_#23c45c]'><GoRocket color='#23c45c' size={30}></GoRocket></div>

        </div>

      </section>

      <section className='bg-[#020813] pb-80 relative'>

          <img src={illustration} alt="XXX" className='mx-auto w-[80%] md:w-max'/>

          <div className='text-center pt-20 pb-24'>

            <h1 className='text-[34px] lg:text-[40px] text-[#5d6eee] pb-2'>How it Works?</h1>

            <p className='w-[80%] lg:w-[50%] mx-auto text-[17px] text-[#DBDDED]'>Join Learnova, start learning with expert content, explore learning paths, access engaging content, complete video lessons and achieve learning goals.</p>

          </div>

          <div className='flex flex-col xl:flex-row justify-around items-center gap-28 xl:gap-0'>

            <div className='flex gap-8 flex-col sm:flex-row'>

              <div className='relative'>

                <img src={shape05} alt="XXX" className='absolute top-0 -translate-x-5 translate-y-5'/>
                <img src={about01} alt="XXX" className='mb-8'/>
                <img src={about02} alt="XXX" />

              </div>

              <div>

                <img src={shape06} alt="XXX" />
                <img src={about03} alt="XXX" className='my-6'/>
                <img src={shape07} alt="XXX" className='mx-auto'/>

              </div>

            </div>

            <div className='w-[85%] sm:w-[75%] xl:w-[40%]'>

              <div className='text-white flex gap-5 relative'>

                <div className='bg-[#dbdded] rounded-full h-min p-4 text-[#6e75c6] hover:bg-[#6e75c6] hover:text-[#dbdded] transition-all duration-200 z-10'>

                  <FaSignInAlt className='text-[30px]'></FaSignInAlt>

                </div>

                <div className='bg-[#dbdded] w-[2px] absolute left-0 top-0 bottom-0 translate-x-[31px] translate-y-[30px]'></div>

                <div className='mb-20 font-nuninto'>

                  <h1 className='text-3xl mb-3'>Sign Up</h1>
                  <p className='text-[#79808a]'>Start by signing up with your details to unlock expert-led courses and personalized learning features.</p>

                </div>

              </div>

              <div className='text-white flex gap-5 relative'>

                <div className='bg-[#dbdded] rounded-full h-min p-4 text-[#6e75c6] hover:bg-[#6e75c6] hover:text-[#dbdded] transition-all duration-200 z-10'>
                  <BiSolidPurchaseTag className='text-[30px]'></BiSolidPurchaseTag>
                </div>

                <div className='bg-[#dbdded] w-[2px] absolute left-0 top-0 bottom-0 translate-x-[31px] translate-y-[30px]'></div>

                <div className='mb-20 font-nuninto'>

                  <h1 className='text-3xl mb-3'>Purchase Course</h1>
                  <p className='text-[#79808a]'>Pick your course, pay securely using multiple options, and start learning without any delays or complications.</p>

                </div>

              </div>

              <div className='text-white flex gap-5'>

                <div className='bg-[#dbdded] rounded-full h-min p-4 text-[#6e75c6] hover:bg-[#6e75c6] hover:text-[#dbdded] transition-all duration-200 z-10'>
                  <FaBookReader className='text-[30px]'></FaBookReader>
                </div>

                <div className='font-nuninto'>

                  <h1 className='text-3xl mb-3'>Start Learning</h1>
                  <p className='text-[#79808a]'>Begin learning through engaging videos and structured lessons designed to boost your skills and knowledge effectively.</p>

                </div>

              </div>

            </div>

          </div>
          
          <img src={shape11} alt="XXX" className='absolute hidden sm:block right-24 bottom-56 xl:bottom-64 animate-slow-spin'/>

          <div className='bg-[#0e131c] flex items-center flex-col sm:flex-row px-10 justify-between md:justify-around lg:justify-evenly w-[95%] rounded-lg absolute left-1/2 -translate-x-[50%] -bottom-[7%] md:-bottom-[5%] lg:-bottom-[7%] xl:-bottom-[10%] py-9 lg:py-0 gap-10 lg:gap-0'>

            <div className='w-[90%] font-nuninto'>

              <h1 className='text-white text-3xl xl:text-4xl mb-4 font-medium'>Unlock your coding potential with our online courses.</h1>

              <p className='text-[#757693] text-base'>Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</p>

            </div>

            <img src={shape006} alt="XXX" className='hidden lg:block'/>

            {

              !token ? <button className='bg-white px-5 py-2 rounded-full flex items-center font-rubik gap-2 font-medium transition-all duration-200 active:scale-95 tracking-wide text-sm xl:text-base w-[50%] sm:w-[27%] justify-center' onClick={()=>navi("/signup")}>Sign Up<FaArrowRight></FaArrowRight></button> : <button className='bg-white px-5 py-2 rounded-full flex items-center font-rubik gap-2 font-medium transition-all duration-200 active:scale-95 tracking-wider text-sm xl:text-base w-[68%] sm:w-[45%] md:w-[33%] lg:w-[32%] xl:w-[24%] justify-center' onClick={()=>navi("/dashboard/learnings")}>Start Learning <FaArrowRight className='shrink-0'></FaArrowRight></button>

            }

          </div>

      </section>

      <section className='bg-[#D9D9FF]/60'>

        <div className='flex items-center gap-10 sm:gap-0 flex-col sm:flex-row justify-around pt-[75%] sm:pt-[27%] pb-[12%] md:pt-[18%] md:pb-[8%]'>

          <Lottie animationData={one} className=' sm:w-1/2'></Lottie>

          <div className='font-nuninto w-[75%] text-center sm:text-left sm:w-[40%]'>

            <h1 className='text-[40px]'>Become an Educator</h1>

            <p className='mt-3 mb-4 font-medium'>Educator from around the world teach millions of students on Learnova. We provide the tools and skills to teach what you love.</p>

            <button className='flex items-center justify-self-center sm:justify-self-start gap-2 font-medium font-rubik bg-[#6e75c6] text-white rounded-full px-5 py-2 transition-all duration-200 active:scale-95' onClick={()=>navi("/dashboard/create-course")}>Start Teaching Today <FaArrowRight></FaArrowRight></button>

          </div>

        </div>

      </section>

      <ReviewSlider></ReviewSlider>

      <Footer></Footer>

    </div>
  )
}

export default Home