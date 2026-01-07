import { PiDotsSixVerticalBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoWarningOutline } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { apiconnector } from "../../services/apiconnector";
import { useState } from "react";
import {toast} from "react-hot-toast";
import { HashLoader } from "react-spinners";
import { courseurl } from "../../services/apis";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../redux/Courseslice";
import { setEstimatedDuration, setNumberOfLectures, setNumberOfSections } from "../../redux/Rightsideslice";
import { useForm,Controller } from "react-hook-form";
import ReactPlayer from 'react-player'
import SubSecCard from "./SubSecCard";
import { sectomin } from "../../utils/duration";

const SectionCard = ({section}) => {

//   {
//     "_id": "68c2b87577ceaba78b1d89d2",
//     "sectionname": "Section 1",
//     "subsection": [],
//     "__v": 0
// }

  const dispatch = useDispatch();

  const{register,setValue,getValues,reset,handleSubmit,control,formState:{errors,isValid}} = useForm();

  const[editSection,showEditSection] = useState(false);

  const [preview,setPreview] = useState(null);

  const[loading,setLoading] = useState(false);

  const[sectionName,setSectionName] = useState(null);

  const[open,setOpen] = useState(false);

  const[showSubSecModal,setShowSubSecModal] = useState(false);

  const course = useSelector((state)=>state.Course.course);

  const token = useSelector((state)=>state.Auth.token);

  const submitHandler = async(e) => {

      e.preventDefault();

      if(sectionName === null || sectionName === section.sectionname){

          toast.error("No changes were made!");

          return;

      }

      if(sectionName.length > 50){

        toast.error("Section name should be less than 50 characters");

        return;

      }

      const toastid = toast.loading("Please wait...");

      try{

          const res = await apiconnector("PUT",courseurl.updatesection,{updatedsectionname:sectionName,sectionid:section._id,courseid:course._id},{

              "Authorization": `Bearer ${token}`

          });

          if(!res.data.success){

            throw new Error(res.data.message);

          }

          toast.success("Changes applyed successfully");

          dispatch(setCourse(res.data.data));

          showEditSection(false);

      } catch(err){

          console.log("Error while updating section",err);

          toast.error(`${err.response.data.message}`);

      }

      toast.dismiss(toastid);
  }

  const handleCancel = () => {

      showEditSection(false);

      setSectionName(null);

  }

  const deletesection = async() => {

      const toastid = toast.loading("Deleting...");

      try{

          const res = await apiconnector("DELETE",courseurl.deletesection,{courseid:course._id,sectionid:section._id},{

              "Authorization": `Bearer ${token}`

          })

          if(!res.data.success){

            throw new Error(res.data.message);

          }

          toast.success("Section deleted successfully");

          let sum = 0;

          let totaldur = 0;

          for(let i=0;i<res.data.data.coursecontent.length;i++){

              sum = sum + res.data.data.coursecontent[i].subsection.length;

              for(let j=0;j<res.data.data.coursecontent[i].subsection.length;j++){


                totaldur += parseInt(res.data.data.coursecontent[i].subsection[j].timeduration);

              }

          }


          dispatch(setNumberOfLectures(sum));

          dispatch(setCourse(res.data.data));

          dispatch(setNumberOfSections(res.data.data.coursecontent.length));

          dispatch(setEstimatedDuration(sectomin(totaldur)));


      } catch(err){

          console.log("Error while deleting section",err);

          toast.error(`${err.response.data.message}`);

      }

      setOpen(false);

      toast.dismiss(toastid);

  }

  const subsecsubmit = async(data) => {

      const formdata = new FormData();

      formdata.append("sectionid",section._id);
      formdata.append("courseid",course._id);
      formdata.append("subsectionname",data.lecturetitle);
      formdata.append("subsectiondescription",data.lecturedesc);
      formdata.append("videofiles",data.subsecvideo[0]);

      const toastid = toast.loading("Please wait...");

      setLoading(true);

      try{

            const res = await apiconnector("POST",courseurl.createsubsection,formdata,{

            "Authorization": `Bearer ${token}`

            })

            if(!res.data.success){

                throw new Error(res.data.message);

            }

            toast.success("Lecture added successfully");

            dispatch(setCourse(res.data.data));

            let sum = 0;

            let totaldur = 0;

            for(let i=0;i<res.data.data.coursecontent.length;i++){

                sum = sum + res.data.data.coursecontent[i].subsection.length;

                for(let j=0;j<res.data.data.coursecontent[i].subsection.length;j++){

                    totaldur += parseInt(res.data.data.coursecontent[i].subsection[j].timeduration);

                }

            }


            dispatch(setEstimatedDuration(sectomin(totaldur)));

            dispatch(setNumberOfLectures(sum));

//             {
//     "_id": "68c587bab3bc564bc0173a95",
//     "coursename": "gf",
//     "coursedescription": "yty",
//     "whatyouwilllearn": "hjhj",
//     "teacher": "68bc7758556efb471b8ce19b",
//     "coursecontent": [
//         {
//             "_id": "68c587bdb3bc564bc0173a9a",
//             "sectionname": "cvc",
//             "subsection": [
//                 {
//                     "_id": "68c587cdb3bc564bc0173aa0",
//                     "title": "cvc",
//                     "timeduration": "14.202667",
//                     "description": "yty",
//                     "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1757775805/Learnova/gxn94gdtsankfcfv0s4s.mp4",
//                     "sectiontowhichitbelong": "68c587bdb3bc564bc0173a9a",
//                     "__v": 0
//                 },
//                 {
//                     "_id": "68c58849b3bc564bc0173aa9",
//                     "title": "iki",
//                     "timeduration": "14.202667",
//                     "description": "bnb",
//                     "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1757775930/Learnova/mnkvexmtt6mnoa5bnzsq.mp4",
//                     "sectiontowhichitbelong": "68c587bdb3bc564bc0173a9a",
//                     "__v": 0
//                 }
//             ],
//             "__v": 0
//         }
//     ],
//     "ratingandreviews": [],
//     "price": 787,
//     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1757775787/Learnova/erltg8rzb1psqrvwu1jk.png",
//     "createdat": "2025-09-13T15:03:22.634Z",
//     "category": "67bc8a6d3ba49102ce51f784",
//     "studentenrolled": [],
//     "__v": 0
// }

            // const index = course.coursecontent.findIndex((section) => section._id === res.data.data._id)

            // if(index !== -1){

            //     const updatedCourseContent = [...course.coursecontent];

            //     updatedCourseContent[index] = res.data.data;

            //     dispatch(setCourse({...course,coursecontent:updatedCourseContent}));

            //     // dispatch(setNumberOfLectures());

            //     toast.success("Course updated successfully");

            // } else{

            //     toast.error("Section not found");

            // }

      } catch(err){

            console.log("Error while creating subsection",err);

            toast.error(`${err.response.data.message}`);

      } finally{

            toast.dismiss(toastid);

            setPreview(null);

            setLoading(false);

            reset();

            setShowSubSecModal(false);

      }

  }

  return (

    <div className='border-2 border-[#303036] rounded-lg pt-4 pb-4 px-3.5 flex flex-col gap-5'>

        <div className="flex items-baseline lg:items-center justify-between flex-col lg:flex-row gap-2 lg:gap-0">

          {   !editSection && <div className="flex items-center gap-2">

                {!editSection && <div> <PiDotsSixVerticalBold size={20} className="text-gray-300"></PiDotsSixVerticalBold> </div>}

                {

                !editSection && <span className="font-rubik text-[17px]">{section.sectionname}</span>
                
                }

                </div>
          }   
          {
            
            editSection && <form className="flex items-center gap-3.5 w-full lg:w-[85%] flex-col lg:flex-row" onSubmit={submitHandler}>

                <input type="text" defaultValue={section.sectionname} onChange={(e)=>setSectionName(e.target.value)} className="bg-[#17171b]/45 border transition-all duration-75 border-[#303036] rounded-lg outline-0 focus:border-[#eac754] px-2.5 py-2 font-rubik w-full tracking-wide"/>

                <div className="flex gap-3.5 self-end lg:self-center">

                    <button type="submit" className="bg-[#eac754] text-black font-nuninto px-2.5 py-1 rounded-lg font-semibold">Save</button>

                    <button className="bg-[#18181b] px-2.5 py-1 rounded-lg font-nuninto font-semibold" onClick={handleCancel}>Cancel</button>

                </div>

              </form>

          }

          <div className="flex items-center gap-2 self-end lg:self-center">

            <button onClick={()=> showEditSection(true)}>

                <FiEdit3 size={18}></FiEdit3>

            </button>
              
            <button className="p-2 lg:p-3.5 rounded-lg hover:bg-[#18181b] transition-all duration-200" onClick={()=>setOpen(true)}>

                <RiDeleteBin6Line color="#d2514b" size={18}></RiDeleteBin6Line>

            </button>

          </div>

        </div>

        <div className="h-[2px] bg-gray-800 rounded-full"></div>

        {

            section.subsection.length > 0 && <div className="flex flex-col gap-3.5">

                {
                    section.subsection.map((subsec,index)=>{

                        return <SubSecCard subsecdata={subsec} key={index}></SubSecCard>

                    })
                }

            </div>

        }
        
        <button onClick={()=>setShowSubSecModal(true)} className="flex items-center gap-2 border-[2px] border-dashed border-gray-600 w-full rounded-[3px] justify-center pt-1.5 pb-2 text-[#eac754] hover:border-[#eac754]/60 hover:bg-[#eac754]/5 transition-all duration-200">

            <FaPlus></FaPlus>

            <span className="font-lexend">Add Lecture</span>

        </button>

        {open && (
        
            <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
        
                <div className="bg-white rounded-lg shadow-lg p-5 w-[85%] sm:w-[55%] md:w-[45%] lg:w-[35%] xl:w-[27%]">
        
                    <IoWarningOutline size={60} className="mx-auto text-yellow-600"></IoWarningOutline>
        
                    <h2 className="text-[22px] font-bold mb-1 mt-3 font-nuninto text-center text-gray-600">Are you sure?</h2>
        
                    <p className="text-gray-600 mb-[18px] text-[19px] font-nuninto font-semibold text-center">All the lectures in this section and section will be deleted</p>
        
                    <div className="flex justify-around text-white font-nuninto font-medium">
        
                        <button className="px-5 py-2 rounded-lg bg-green-500" onClick={() =>setOpen(false)}>
        
                            Go Back
        
                        </button>
        
                        <button className="px-5 py-2 bg-red-500 rounded-lg" onClick={deletesection}>
        
                            Drop Section
        
                        </button>
        
                    </div>

                </div>

            </div>
        )}


        {showSubSecModal && 
        
            <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
        
                <div className="bg-[#0e0e11] px-5 pb-5 pt-4 border border-[#303036] w-[93%] sm:w-[73%] md:w-[65%] lg:w-[53%] xl:w-[45%] flex flex-col gap-4">
        
                    {
                        loading ? <div className="h-[35vh] w-full flex flex-col justify-center gap-[50px] items-center"><p className="text-[#dbdded] text-3xl sm:text-[35px] font-nuninto tracking-wide">Creating lecture...</p><HashLoader color="#5d6eee" size={100}></HashLoader></div>: <>
                    
                    <div className="flex items-center justify-between">

                        <span className="text-xl font-semibold">Adding Lecture</span>

                        <button onClick={() => {
                            
                            setPreview(null);

                            reset();

                            setShowSubSecModal(false);
                        
                        }
                            
                        }>

                            <IoClose size={23}></IoClose>

                        </button>

                    </div>

                    <div className="h-[2px] bg-[#303036] rounded-full"></div>
                    
                    <form onSubmit={handleSubmit(subsecsubmit)} className="flex flex-col gap-5">

                        <div  className="flex flex-col gap-1.5">

                            <label htmlFor="subsecvideo" className="font-nuninto text-[17px] tracking-wide font-medium">Lecture Video <sup>*</sup></label>

                            <Controller name="subsecvideo" control={control} rules={{ required: "Lecture Video is required" }} render={({field})=>{

                                return <div className="border-2 border-dashed rounded-lg w-full h-56 sm:h-80 cursor-pointer hover:border-[#eac754] hover:bg-[#eac754]/5 transition-all duration-300">   

                                    {
                                        preview ? <div className="w-full h-full p-3 flex flex-col gap-[2px]">

                                            <div className="w-full h-[93%]">

                                                <ReactPlayer src={preview} controls playing={false} muted style={{height:"100%",width:"100%",objectFit:"contain"}}></ReactPlayer>

                                            </div>

                                            <button type="button" className="font-nuninto underline w-max mx-auto" onClick={() => { 
                                                
                                                setPreview(null);

                                                field.onChange(null);

                                            }}>

                                                Cancel

                                            </button>

                                        </div> : <div onClick={() => document.getElementById("subsecvideo").click()} className="w-full h-full flex flex-col items-center justify-center gap-5">


                                            <LuUpload size={45} />

                                            <p><span className="text-[#eac754]">Browse</span> a file to select video</p>


                                            <input type="file" className="hidden" id="subsecvideo" accept="video/*" 
                                            
                                            onChange={(e) => {
                                                    
                                                const file = e.target.files[0];

                                                if (file) {

                                                    setPreview(URL.createObjectURL(file));

                                                    field.onChange(e.target.files);

                                                }
                                            }}
                            
                                            />

                                        </div>
                                    }

                                </div>

                            }}>

                            </Controller>

                            {errors.subsecvideo && <span className="text-red-500 text-sm italic font-rubik">{errors.subsecvideo.message}</span>}

                        </div>
                        

                        <div className="flex flex-col gap-1.5">
                        
                            <label htmlFor="lecturetitle" className="font-nuninto text-[17px] tracking-wide font-medium">Lecture Title <sup>*</sup></label>
                        
                            <input type="text" id="lecturetitle" {...register("lecturetitle",{required:"Lecture Title is required",pattern:{ value: /^[A-Za-z0-9\s]+$/, message: "No special character allowed" },maxLength:{ value: 40, message: "Maximum 40 characters" }})} placeholder="Enter Lecture Title" className='bg-[#17171b]/45 border transition-all duration-75 border-[#303036] rounded-lg outline-0 focus:border-[#eac754] p-2.5 font-nuninto w-full'/>
                        
                            {
                                errors.lecturetitle && <span className="text-red-500 text-sm italic font-rubik">{errors.lecturetitle.message}</span>
                            }
                        
                        </div>

                        <div className="flex flex-col gap-1.5">
                        
                            <label htmlFor="lecturedesc" className="font-nuninto text-[17px] tracking-wide font-medium">Lecture Description <sup>*</sup></label>
                        
                            <input type="text" id="lecturedesc" {...register("lecturedesc",{required:"Lecture Description is required",pattern:{ value: /^[A-Za-z0-9\s]+$/, message: "No special character allowed" },maxLength:{ value: 100, message: "Maximum 100 characters" }})} placeholder="Enter Lecture Description" className='bg-[#17171b]/45 border transition-all duration-75 border-[#303036] rounded-lg outline-0 focus:border-[#eac754] p-2.5 font-nuninto w-full'/>
                        
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

    </div>

  )

}

export default SectionCard



// {
//     "_id": "68c43d1b6bfec3ef77589fa2",
//     "coursename": "sas",
//     "coursedescription": "sas",
//     "whatyouwilllearn": "sas",
//     "teacher": "68bc7758556efb471b8ce19b",
//     "coursecontent": [
//         {
//             "_id": "68c43d206bfec3ef77589fa7",
//             "sectionname": "sas",
//             "subsection": [],
//             "__v": 0
//         },
//         {
//             "_id": "68c43d226bfec3ef77589fac",
//             "sectionname": "sas",
//             "subsection": [],
//             "__v": 0
//         }
//     ],
//     "ratingandreviews": [],
//     "price": 23,
//     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1757691149/Learnova/hmznb5b2dmjeriiccbte.jpg",
//     "createdat": "2025-09-12T15:32:43.115Z",
//     "category": "67bc8a6d3ba49102ce51f784",
//     "studentenrolled": [],
//     "__v": 0
// }


// {
//     "_id": "68c43d1b6bfec3ef77589fa2",
//     "coursename": "sas",
//     "coursedescription": "sas",
//     "whatyouwilllearn": "sas",
//     "teacher": "68bc7758556efb471b8ce19b",
//     "coursecontent": [
//         {
//             "_id": "68c43d206bfec3ef77589fa7",
//             "sectionname": "sas",
//             "subsection": [],
//             "__v": 0
//         },
//         {
//             "_id": "68c43d226bfec3ef77589fac",
//             "sectionname": "sas",
//             "subsection": [
//                 {
//                     "_id": "68c43d3b6bfec3ef77589fb1",
//                     "title": "sas",
//                     "timeduration": "13.331322",
//                     "description": "sas",
//                     "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1757691179/Learnova/trvqhyvdsi6s3jogcuvj.mp4",
//                     "sectiontowhichitbelong": "68c43d226bfec3ef77589fac",
//                     "__v": 0
//                 }
//             ],
//             "__v": 0
//         }
//     ],
//     "ratingandreviews": [],
//     "price": 23,
//     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1757691149/Learnova/hmznb5b2dmjeriiccbte.jpg",
//     "createdat": "2025-09-12T15:32:43.115Z",
//     "category": "67bc8a6d3ba49102ce51f784",
//     "studentenrolled": [],
//     "__v": 0
// }


// {
//     "_id": "68c463526bfec3ef77589fd4",
//     "sectionname": "gj",
//     "subsection": [
//         {
//             "_id": "68c463886bfec3ef77589fd9",
//             "title": "sds",
//             "timeduration": "10.008563",
//             "description": "df",
//             "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1757700983/Learnova/ulajomp95kzqsdp4rwzu.mp4",
//             "sectiontowhichitbelong": "68c463526bfec3ef77589fd4",
//             "__v": 0
//         }
//     ],
//     "__v": 0
// }