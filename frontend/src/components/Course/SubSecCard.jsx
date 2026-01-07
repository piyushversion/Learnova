import { PiDotsSixVerticalBold } from "react-icons/pi";
import { IoPlayOutline } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";
import { LuUpload } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { IoWarningOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import {toast} from "react-hot-toast";
import { apiconnector } from "../../services/apiconnector";
import { courseurl } from "../../services/apis";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../redux/Courseslice";
import { useState } from "react";
import { HashLoader } from "react-spinners";
import { Controller, useForm } from "react-hook-form";
import ReactPlayer from 'react-player'
import { setEstimatedDuration, setNumberOfLectures } from "../../redux/Rightsideslice";
import { sectomin } from "../../utils/duration";

const SubSecCard = ({subsecdata}) => {

  const dispatch = useDispatch();

  const{register,setValue,getValues,control,reset,handleSubmit,formState:{errors,isValid}} = useForm();

  const course = useSelector((state)=>state.Course.course);

  const token = useSelector((state)=>state.Auth.token);

  const[loading,setLoading] = useState(false);

  const[showEditModal,setShowEditModal] = useState(false);

  const[open,setOpen] = useState(false);

  const[preview,setPreview] = useState(null);


//   {
//     "_id": "68c529a850d010a736a1e405",
//     "title": "fdf",
//     "timeduration": "39.199244",
//     "description": "fdf",
//     "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1757751702/Learnova/yrtdd2ho4f2xx2q7lfdl.mp4",
//     "sectiontowhichitbelong": "68c5290550d010a736a1e400",
//     "__v": 0
// }

const handledelete = async() => {

    const toastid = toast.loading("Deleting...");

    try{

      const res = await apiconnector("DELETE",courseurl.deletesubsection,{subsectionid:subsecdata._id,sectionid:subsecdata.sectiontowhichitbelong,courseid:course._id},{

          "Authorization": `Bearer ${token}`

      });

      if (!res?.data?.success) {

        throw new Error(res?.data?.message || "Unknown error");

      }

      toast.success("Lecture deleted successfully");

      let sum = 0;
      
      let totaldur = 0;

      for(let i=0;i<res.data.data.coursecontent.length;i++){

          sum = sum + res.data.data.coursecontent[i].subsection.length;

          for(let j=0;j<res.data.data.coursecontent[i].subsection.length;j++){

            totaldur += parseInt(res.data.data.coursecontent[i].subsection[j].timeduration);

          }

      }
      
      dispatch(setCourse(res.data.data));
      
      dispatch(setNumberOfLectures(sum));

      dispatch(setEstimatedDuration(sectomin(totaldur)));

    } catch(err){

      console.log("Error in deleting subsection : ",err);

      toast.error(err?.response?.data?.message || err.message);

    }

    toast.dismiss(toastid);

}

const handleupdate = () => {

    setPreview(subsecdata.videourl);

    setValue("lecturetitle",subsecdata.title);

    setValue("lecturedesc",subsecdata.description);

    setValue("subsecvideo",subsecdata.videourl);

    setShowEditModal(true);

}

const isformupdated = () => {

    const currentvalues = getValues();

    if(currentvalues.lecturetitle !== subsecdata.title || currentvalues.lecturedesc !== subsecdata.description || currentvalues.subsecvideo !== subsecdata.videourl){

        return true

    } else{

        return false;

    }

}

const subsecsubmit = async (data) => {

    if(isformupdated()){

        const currentvalues = getValues();

        const formdata = new FormData();

        formdata.append("sectionid",subsecdata.sectiontowhichitbelong);

        formdata.append("subsectionid",subsecdata._id);

        formdata.append("courseid",course._id);

        if(currentvalues.lecturetitle !== subsecdata.title){

            formdata.append("subsectionname",data.lecturetitle);

        }

        if(currentvalues.lecturedesc !== subsecdata.description){

            formdata.append("subsectiondescription",data.lecturedesc);

        }

        if(currentvalues.subsecvideo !== subsecdata.videourl){

            formdata.append("video",data.subsecvideo);

        }

        const toastid = toast.loading("Please wait...");

        setLoading(true);

        try{

            const res = await apiconnector("PUT",courseurl.editsubsection,formdata,{

                "Authorization": `Bearer ${token}`

            })

            if (!res?.data?.success) {

                throw new Error(res?.data?.message || "Unknown error");

            }

            toast.success("Lecture updated successfully");

            let totaldur = 0;

            for(let i=0;i<res.data.data.coursecontent.length;i++){

                for(let j=0;j<res.data.data.coursecontent[i].subsection.length;j++){

                    totaldur += parseInt(res.data.data.coursecontent[i].subsection[j].timeduration);

                }

            }

            dispatch(setCourse(res.data.data));

            dispatch(setEstimatedDuration(sectomin(totaldur)));

            toast.success("Section updated successfully!");


        } catch(err){

            console.log("Error in updating subsection : ",err);

            toast.error(err?.response?.data?.message || err.message);

        } finally{
   
            setShowEditModal(false);
            
            toast.dismiss(toastid);

            setLoading(false);
            
        }

    } else{

        toast.error("No changes were made");

    }

}

  return (

    <div className="border-2 border-[#303036] rounded-lg flex justify-between py-3.5 px-3.5 items-start flex-col lg:flex-row gap-4 lg:gap-2">
        
        <div className="flex gap-4 sm:gap-[7px] flex-col sm:flex-row">

        <div className="flex gap-[7px]">

          <div>

            <PiDotsSixVerticalBold size={20} className="text-gray-300"></PiDotsSixVerticalBold>

          </div>

          <div>

            <IoPlayOutline size={20} color="#eac754"></IoPlayOutline>

          </div>
          
        </div>
            
          <div className="font-nuninto">

            <h3 className="font-medium text-[17px]">{subsecdata.title}</h3>

            <p className="text-gray-400">{subsecdata.description}</p>

          </div>

        </div>

        <div className="flex items-center gap-2 self-end lg:self-start">

            <button onClick={handleupdate}>
            
                <FiEdit3 size={18}></FiEdit3>
            
            </button>
            
            <button className="px-3.5 py-1 rounded-lg hover:bg-[#18181b] transition-all duration-200" onClick={()=> setOpen(true)}>
            
              <RiDeleteBin6Line color="#d2514b" size={18}></RiDeleteBin6Line>
            
            </button>

        </div>

         {showEditModal && 
        
            <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
        
                <div className="bg-[#0e0e11] px-5 pb-5 pt-4 border border-[#303036] w-[93%] sm:w-[73%] md:w-[65%] lg:w-[53%] xl:w-[45%] flex flex-col gap-4">

                    { 
                        loading ? <div className="h-[35vh] w-full flex flex-col justify-center gap-[50px] items-center"><p className="text-[#dbdded] text-3xl sm:text-[35px] font-nuninto tracking-wide">Making changes...</p><HashLoader color="#5d6eee" size={100}></HashLoader></div>: <>
                        
                    <div className="flex items-center justify-between">

                        <span className="text-xl font-semibold">Editing Lecture</span>

                        <button onClick={() => { 
                          
                          setPreview(null);

                          reset();

                          setShowEditModal(false) 
                          
                        }}>

                        <IoClose size={23}></IoClose>

                        </button>

                    </div>

                    <div className="h-[2px] bg-[#303036] rounded-full"></div>
                    
                    <form onSubmit={handleSubmit(subsecsubmit)} className="flex flex-col gap-5">

                        <div className="flex flex-col gap-1.5">

                            <label htmlFor="subsecvideo" className="font-nuninto text-[17px] tracking-wide font-medium">Lecture Video <sup>*</sup></label>

                            <Controller name="subsecvideo" control={control} rules={{ required: "Lecture Video is required"}} render={({field})=>{

                                return <div className="border-2 border-dashed rounded-lg w-full h-56 sm:h-80 cursor-pointer hover:border-[#eac754] hover:bg-[#eac754]/5 transition-all duration-300">

                                    {
                                        preview ? <div className="w-full h-full p-3 flex flex-col gap-[2px]">

                                            <div className="w-full h-[93%]">

                                                <ReactPlayer src={preview} controls playing={false} muted style={{height:"100%",width:"100%",objectFit:"contain"}}></ReactPlayer>

                                            </div>

                                            <button type="button" className="font-nuninto underline w-max mx-auto" onClick={()=>{
                                                
                                                setPreview(null);
                                                field.onChange(null);

                                            }}>Cancel</button>

                                        </div> : <div onClick={() => document.getElementById("subsecvideo").click()} className="w-full h-full flex flex-col items-center justify-center gap-5">

                                                <LuUpload size={45} ></LuUpload>

                                                <p><span className="text-[#eac754]">Browse</span> a file to select video</p>

                                                <input type="file" id="subsecvideo" accept="video/*" className="hidden" onChange={(e)=>{

                                                    const file = e.target.files[0];

                                                    if (file) {

                                                        setPreview(URL.createObjectURL(file));

                                                        field.onChange(e.target.files[0]);
                                                    }

                                                }}/>
                                        </div>
                                    }


                                </div>

                                }}>

                            </Controller>

                            {errors.subsecvideo && <p className="text-red-500 text-sm italic font-rubik">{errors.subsecvideo.message}</p>}

                        </div>
                        

                        <div className="flex flex-col gap-1.5">
                        
                            <label htmlFor="lecturetitle" className="font-nuninto text-[17px] tracking-wide font-medium">Lecture Title <sup>*</sup></label>
                        
                            <input type="text" id="lecturetitle" {...register("lecturetitle",{required:"Lecture Title is required",pattern:{ value: /^[A-Za-z0-9\s]+$/, message: "No special character allowed" },maxLength:{ value: 40, message: "Maximum 40 characters" }})} placeholder="Enter Lecture Title" className='bg-[#17171b]/45 border transition-all duration-75 border-[#303036] rounded-lg outline-0 focus:border-[#eac754] p-2.5 font-nuninto w-full'/>
                        
                            {
                                errors.lecturetitle && <span className="text-red-500 text-sm italic font-rubik">{errors.lecturetitle.message}</span>
                            }
                        
                        </div>

                        <div className="flex flex-col gap-1.5">
                        
                            <label htmlFor="lecturedesc" className="font-nuninto text-[17px] tracking-wide  font-medium">Lecture Description <sup>*</sup></label>
                        
                            <input type="text" id="lecturedesc" {...register("lecturedesc",{required:"Lecture Description is required",pattern:{ value: /^[A-Za-z0-9\s]+$/, message: "No special character allowed" },maxLength:{ value: 100, message: "Maximum 100 characters"}})} placeholder="Enter Lecture Description" className='bg-[#17171b]/45 border transition-all duration-75 border-[#303036] rounded-lg outline-0 focus:border-[#eac754] p-2.5 font-nuninto w-full'/>
                        
                            {
                                errors.lecturedesc && <span className="text-red-500 text-sm italic font-rubik">{errors.lecturedesc.message}</span>
                            }
                        
                        </div>

                        <button className="bg-[#eac754] self-end text-black font-rubik px-3 pt-1 pb-[5px] rounded-md text-[17px]">Make Lecture</button>

                    </form>

                    </>
                    }

                </div>

            </div>
        }

        {open && (
                
                    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
                
                        <div className="bg-white rounded-lg shadow-lg sm:px-5 py-5 w-[80%] sm:w-max">
                
                            <IoWarningOutline size={60} className="mx-auto text-yellow-600"></IoWarningOutline>
                
                            <h2 className="text-[22px] font-bold mb-1 mt-3 font-nuninto text-center text-gray-600">Are you sure?</h2>
                
                            <p className="text-gray-600 mb-[18px] text-[19px] font-nuninto font-semibold text-center">This lecture will be no more</p>
                
                            <div className="flex justify-around text-white font-nuninto font-medium gap-0 sm:gap-6">
                
                                <button className="px-5 py-2 rounded-lg bg-green-500" onClick={() =>setOpen(false)}>
                
                                    Go Back
                
                                </button>
                
                                <button className="px-5 py-2 bg-red-500 rounded-lg" onClick={handledelete}>
                
                                    Drop Lecture
                
                                </button>
                
                            </div>
        
                        </div>
        
                    </div>
        )}

    </div>

  )

}

export default SubSecCard