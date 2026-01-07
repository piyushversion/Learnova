import { LuClock } from "react-icons/lu";
import { BiRupee } from "react-icons/bi";
import { IoWarningOutline } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { courseurl } from "../../services/apis";
import { apiconnector } from "../../services/apiconnector";
import { useNavigate } from "react-router-dom";
import { sectodur } from "../../utils/duration";

export const InstructorCoursesCard = ({course,fetchcourses}) => {

    const navi = useNavigate();

    const[open,setOpen] = useState(false);

    const[loading,setLoading] = useState(false);

    const[showFullString,setShowFullString] = useState(false);

    const token = useSelector((state) => state.Auth.token);

    const dateformatter = (date) => {
    
        const newdate = new Date(date);
    
        const options = {
    
            year: "numeric",
            month: "long",
            day: "numeric",
    
        }
    
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(newdate);
    
        const parts = formattedDate.split(", ");
    
        const result = `${parts[0]}, ${parts[1]}`;
    
        return result
    
    }

    const handledelete = async(courseid) => {
    
        const toastid = toast.loading("Deleting...");

        setLoading(true);
    
        try{
    
            const res = await apiconnector("DELETE",courseurl.deletecourse,{courseid:courseid},{
    
                "Authorization": `Bearer ${token}`           
    
            })
    
            if (!res?.data?.success) {
    
                throw new Error(res?.data?.message || "Unknown error");
    
            }
    
            toast.success("Course deleted successfully");
    
        } catch(err){
    
            console.log("Error in deleting course : ",err);
    
            toast.error(err?.response?.data?.message || err.message);
    
        } finally{
    
            toast.dismiss(toastid);
    
            setOpen(false);

            setLoading(false);
    
            fetchcourses();
    
        }
    
    }

    function duration(course){

        let totaldur = 0;

        for(let i=0;i<course.coursecontent.length;i++){

            for(let j=0;j<course.coursecontent[i].subsection.length;j++){

                totaldur += parseInt(course.coursecontent[i].subsection[j].timeduration);

            }

        }

        return sectodur(totaldur);

    }

    return (

        <div className="rounded-xl bg-[#020813] group h-max">
        
            <div className="h-48 overflow-hidden rounded-t-lg">
        
                <img src={course.thumbnail} loading="lazy" alt="XXX" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"/>
        
            </div>
        
            <div className="p-4 text-white">
        
                <h3 className="text-[19px] text-white font-nuninto tracking-wide transition-all duration-200 group-hover:text-[#5d6eee] text-center md:text-left mt-1 mb-2">{course.coursename}</h3>
        
                {
                    course.coursedescription.length > 75 ? <div className="text-center md:text-left">
        
                        {
                            showFullString ? <p className="text-[#a1a1aa] tracking-wide font-nuninto mt-1">{course.coursedescription.slice(0)} <span onClick={()=> setShowFullString(false)} className="text-blue-500">Read less</span></p> : <p className="text-[#a1a1aa] tracking-wide font-nuninto mt-1">{course.coursedescription.slice(0,60)} <span onClick={()=> setShowFullString(true)} className="text-blue-500">...Read more</span></p>
                        }
        
                    </div> : <p className="text-[#a1a1aa] tracking-wide font-nuninto mt-1 text-center md:text-left">{course.coursedescription}</p>
                }
        
        
                <div className="flex text-[#a1a1aa] items-center font-rubik gap-2 md:gap-4 justify-between pt-2.5 flex-col md:flex-row">
        
                    <div className="flex items-center gap-1">
        
                        <LuClock></LuClock>
        
                        <p className="tracking-wide">{duration(course)}</p>
        
                    </div>
        
                    <div className="flex items-center pt-[1px]">
        
                        <BiRupee size={17}></BiRupee>
        
                        <p>{course.price}</p>
        
                    </div>
        
                </div>

                <div className={`${course.status === "Private" ? "bg-[#ef4343]":"bg-[#569f54]" } text-white font-nuninto tracking-wide px-3.5 py-[2px] rounded-full text-sm w-max my-3.5 mx-auto md:mx-0`}>
        
                    {course.status}
        
                </div>
        
                <div className="text-[#a1a1aa] font-rubik text-sm text-center md:text-left">Created : {dateformatter(course.createdat)}</div>
        
                <div className="flex items-center gap-5 mt-[18px] mb-1">
        
                    <button className="bg-[#181825] flex items-center text-[#a1a1aa] border border-[#2a2a31] rounded-full gap-2 justify-center font-lexend flex-1 hover:bg-[#5d6eee] hover:text-white transition-all duration-200 pt-1 pb-1.5" onClick={()=>navi(`/dashboard/edit-course/${course._id}`)}>
        
                        <TbEdit size={19}></TbEdit>
        
                        <span>Edit</span>
        
                    </button>
        
                    <button className="bg-[#181825] flex items-center text-[#a1a1aa] border border-[#2a2a31] rounded-full justify-center gap-2 font-lexend flex-1 hover:bg-[#ef4343] hover:text-white transition-all duration-200 pt-1 pb-1.5" onClick={()=> setOpen(true)}>
        
                        <RiDeleteBin6Line></RiDeleteBin6Line>
        
                        <span>Delete</span>
        
                    </button>
        
                </div>
        
            </div>
        
            {open &&
                                    
                <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
                                                                
                    <div className="bg-white rounded-lg shadow-lg sm:px-5 py-5 w-[80%] sm:w-[50%] md:w-[40%] lg:w-[32%] xl:w-[25%]">
                                                                
                        <IoWarningOutline size={60} className="mx-auto text-yellow-600"></IoWarningOutline>
                                                                
                        <h2 className="text-[22px] font-bold mb-1 mt-3 font-nuninto text-center text-gray-600">Are you sure?</h2>
                                                                
                        <p className="text-gray-600 mb-[18px] text-[19px] font-nuninto font-semibold text-center">This Course will be no more</p>
                                                                
                        <div className="flex justify-around text-white font-nuninto font-medium">
                                                                
                            <button className="px-5 py-2 rounded-lg bg-green-500" onClick={() =>setOpen(false)}>
                                                                
                                Go Back
                                                                
                            </button>
                                                                
                            <button disabled={loading} className="px-5 py-2 bg-red-500 rounded-lg" onClick={()=>handledelete(course._id)}>
                                                                
                                Drop Course
                            
                            </button>
                                                                
                        </div>
                                                        
                    </div>
                                                        
                </div>
            }
        
        </div>

    )

}