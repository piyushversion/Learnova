import { useDispatch, useSelector } from "react-redux"
import { PiNumberOneBold } from "react-icons/pi";
import { PiNumberTwoBold } from "react-icons/pi";
import { PiNumberThreeBold } from "react-icons/pi";
import { FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";
import { setEditCourse } from "../../redux/Courseslice";
import { useEffect } from "react";

export const Steps = () => {

    const step = useSelector((state)=>state.Course.step);

    const {editcourse} = useSelector(state => state.Course);

    const dispatch = useDispatch();

    const steps = [

        {
            number: 1,
            title: "Course Setup",
            smalldescription:"Basic course details",
            icon:<PiNumberOneBold size={20}></PiNumberOneBold>
        },
        {
            number: 2,
            title: "Course Structure",
            smalldescription:"Add Sections & Lectures",
            icon:<PiNumberTwoBold size={20}></PiNumberTwoBold>
        },
        {
            number: 3,
            title: "Finalize",
            smalldescription:"Final setup",
            icon:<PiNumberThreeBold size={20}></PiNumberThreeBold>
        }

    ]

    return (

        <div className="w-[93%] mx-auto py-9 rounded-lg text-white">

            <div className="flex justify-center sm:justify-between items-center">

                {
                    steps.map((item,index)=>{

                        return <> <div className={`flex items-center gap-2 flex-col xl:flex-row text-center xl:text-left ${item.number === step ? "flex":"hidden"} sm:flex`} key={index}>

                            <span className={`border-2 border-[#eac754] rounded-full p-3 ${item.number === step ? "animate-pulse-glow":"animate-none"} ${item.number < step ? "bg-[#eac754]":"bg-none"}`}>
                                
                                {item.number < step ? <FiCheck size={20} color="black"></FiCheck> : item.icon}
                                
                            </span>

                            <div className="font-lexend">

                                <h3 className="text-[18px]">{item.title}</h3>

                                <p className="text-[#79808a]">{item.smalldescription}</p>

                            </div>

                        </div> 
                        
                        <div className={`rounded-full h-[2px] w-[110px] ${item.number < step ? "bg-[#eac754]":"bg-[#79808a]"} ${item.number === 3 ? "hidden":"hidden xl:block"}`}></div>

                        </>

                    })
                }

            </div>   

        </div>

    )

}