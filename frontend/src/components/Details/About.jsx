import image1 from "../../assets/utilities image/image-1.jpg";
import image2 from "../../assets/utilities image/image-2.jpg";
import image10 from "../../assets/utilities image/timeline-1.png"
import image11 from "../../assets/utilities image/timeline-2.png"
import image12 from "../../assets/utilities image/timeline-3.png"
import image13 from "../../assets/utilities image/timeline-4.png"
import { FaRoad } from "react-icons/fa";
import { IoTodaySharp } from "react-icons/io5";
import { IoToday } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaFlagCheckered } from "react-icons/fa";
import Footer from "./Footer";
import ReviewSlider from "../Reusable/ReviewSlider";

function About(){

    const data = [

        {
            heading:"Journey",
            description:"From a small idea to a growing platform, our journey is shaped by dedication, innovation, and the success stories of our global learning community.",
            imageurl:image10,
            icon:<FaRoad size={26}></FaRoad>
        },
        {
            heading:"Today",
            description:"Learnova currently serves thousands of learners with cutting-edge content and real-world projects tailored to boost skills in tech, business, design, and more.",
            imageurl:image11,
            icon:<IoTodaySharp size={26}></IoTodaySharp>
        },
        {
            heading:"Vision",
            description:"We envision a world where anyone, anywhere, can learn anything. Learnova aims to become a global hub for future-ready, practical, and inclusive education for all.",
            imageurl:image12,
            icon:<FaEye size={26}></FaEye>
        },
        {
            heading:"Mission",
            description:"Our mission is to deliver high-quality and personalized learning experiences that empower individuals to gain skills and unlock lifelong opportunities in a fast-changing world.",
            imageurl:image13,
            icon:<FaFlagCheckered size={26}></FaFlagCheckered>
        }
    ]

    return(

        <div className="relative">

            <svg className='absolute right-0 -top-[50px]' width="238" height="531" viewBox="0 0 238 531" fill="none" xmlns="http://www.w3.org/2000/svg"><rect opacity="0.3" x="422.819" y="-70.8145" width="196" height="541.607" rx="2" transform="rotate(51.2997 422.819 -70.8145)" fill="url(#paint0_linear_83:2)"></rect><rect opacity="0.2" x="426.568" y="144.886" width="59.7544" height="541.607" rx="2" transform="rotate(51.2997 426.568 144.886)" fill="url(#paint1_linear_83:2)"></rect><defs><linearGradient id="paint0_linear_83:2" x1="517.152" y1="-251.373" x2="517.152" y2="459.865" gradientUnits="userSpaceOnUse"><stop stopColor="#4A6CF7"></stop><stop offset="1" stopColor="#4A6CF7" stopOpacity="0"></stop></linearGradient><linearGradient id="paint1_linear_83:2" x1="455.327" y1="-35.673" x2="455.327" y2="675.565" gradientUnits="userSpaceOnUse"><stop stopColor="#4A6CF7"></stop><stop offset="1" stopColor="#4A6CF7" stopOpacity="0"></stop></linearGradient></defs></svg>

            <section className="bg-[#020813] flex flex-col-reverse lg:flex-row pt-32 sm:pt-40 pb-[78px] justify-around gap-20 items-center">

                <div className="relative">

                    <img src={image1} alt="XXX" className="w-[80%] mx-auto mb-20 sm:mb-0 sm:mx-0 sm:w-max shadow-[0px_0px_10px_0px_#dbdded] rounded-xl sm:-translate-x-12 lg:-translate-x-0"/>
                    
                    <img src={image2} alt="XXX" className="w-[80%] mx-auto sm:mx-0 sm:w-max static sm:absolute top-[45px] left-44 sm:-translate-x-12 lg:-translate-x-0 shadow-[0px_0px_10px_0px_#dbdded] rounded-xl"/>

                </div>

                <div className="text-[#dbdded] text-center lg:text-left w-[80%] sm:w-[70%] lg:w-[40%] font-nuninto">

                    <h1 className="text-[45px] leading-[55px] mb-10">Driven by Passion for Quality <span className="text-[#5d6eee]">Education</span></h1>

                    <p className="text-[17px] tracking-wide">Learnova is at the forefront of driving innovation in online education. Our mission is to make learning easy, affordable and effective through expert instruction, interactive content and learner support.</p>

                    <p className="text-[17px] my-5 tracking-wide">Learnova began as a mission to bridge education gaps by combining expert teaching with modern technology for accessible, flexible online learning worldwide.</p>

                    <p className="text-[17px] tracking-wide hidden sm:block">Learnova was born from a belief that everyone deserves personalized, expert-led learning—anytime, anywhere, on any device.</p>
                    
                </div>

            </section>

            <section className="bg-[#020813]">

                <div>

                    <div className="font-nuninto w-[70%] sm:w-[65%] md:w-[50%] lg:w-[40%] mx-auto text-center pb-16">

                        <h1 className="text-white text-4xl mb-3 tracking-wide">Strategy</h1>

                        <p className="text-[#79808a]">Our long-term strategy is to create a learning ecosystem that nurtures curiosity, boosts careers, and supports lifelong learning journeys.</p>

                    </div>

                    <div className="relative py-0 md:py-14">

                        <div className="hidden md:block w-[2px] bg-white absolute top-0 bottom-0 left-1/2 -translate-x-1/2"></div>

                        <div className="hidden md:block w-[12px] h-[12px] bg-[#dbdded] absolute top-0 left-1/2 -translate-x-1/2 rounded-full"></div>

                        <div className="hidden md:block w-[12px] h-[12px] bg-[#dbdded] absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"></div>

                        {
                            data.map((item,index)=>{

                                return <div key={index} className={`flex ${index % 2 === 0 ? "md:flex-row-reverse":"md:flex-row"} flex-col-reverse items-center justify-around gap-10 relative pt-0 pb-[90px] md:py-5`}>

                                    <img src={item.imageurl} className="w-[80%] md:w-[35%] xl:w-[40%]" alt="XXX" />

                                    <div className="w-[80%] sm:w-[70%] text-center md:text-left md:w-[35%]">

                                        <h1 className="text-[#5d6eee] text-[35px] mb-2.5">{item.heading}</h1>

                                        <p className="text-[#dbdded] tracking-wide">{item.description}</p>

                                    </div>

                                    <span className="hidden md:block absolute top-1/2 -translate-y-1/2 text-[#6e75c6] hover:text-[#dbdded] bg-[#dbdded] hover:bg-[#6e75c6] rounded-full p-[18px] transition-all duration-200">{item.icon}</span>

                                </div>

                            })
                        }

                    </div>

                </div>

            </section>

            <ReviewSlider></ReviewSlider>

            <Footer></Footer>

        </div>
    )
}

export default About