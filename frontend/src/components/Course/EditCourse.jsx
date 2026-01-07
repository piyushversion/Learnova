import { useParams } from "react-router-dom"
import { Sidebar } from "../Reusable/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Steps } from "./Steps";
import { CourseSetup } from "./CourseSetup";
import { CourseStructure } from "./CourseStructure";
import { Finalize } from "./Finalize";
import { RightSideCard } from './RightSideCard'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiconnector } from "../../services/apiconnector";
import { courseurl } from "../../services/apis";
import { setCourse, setEditCourse } from "../../redux/Courseslice";
import { setDescription, setEstimatedDuration, setImagee, setNumberOfLectures, setNumberOfSections, setTitle } from "../../redux/Rightsideslice";
import { sectomin } from "../../utils/duration";
import { ClimbingBoxLoader, MoonLoader, PuffLoader } from "react-spinners";


const EditCourse = () => {
    
  const {courseid} = useParams();

  const dispatch = useDispatch();

  const step = useSelector((state)=> state.Course.step);

  const course = useSelector((state)=> state.Course.course);

  const token = useSelector((state)=> state.Auth.token);

  const [loading, setLoading] = useState(true);

  const getdetailsofcourse = async(courseid) => {

    const toastid = toast.loading("Fetching...");

    setLoading(true);

    try{

        const res = await apiconnector("POST",courseurl.getdetailsofparticularcourse,{courseid:courseid});

        if (!res?.data?.success) {

            throw new Error(res?.data?.message || "Unknown error");

        }

//         {
//     "_id": "68cd599245149e4baf21134f",
//     "coursename": "Complete JavaScript Mastery",
//     "coursedescription": "Master JavaScript from basics to advanced concepts including ES6+, async programming, and modern frameworks.",
//     "whatyouwilllearn": "Everything about JavaScript",
//     "teacher": {
//         "_id": "68bc7758556efb471b8ce19b",
//         "firstname": "Rubel",
//         "lastname": "Maratha",
//         "email": "rubelmaratha910@gmail.com",
//         "password": "$2b$10$OeY6Zoz286siHaMye9Kbruz8bIHtx8uUIyE9wySAhKm5713HeOtsG",
//         "accounttype": "Instructor",
//         "additionaldetails": {
//             "_id": "68bc7758556efb471b8ce199",
//             "gender": null,
//             "dateofbirth": null,
//             "about": null,
//             "contactnumber": null,
//             "__v": 0
//         },
//         "courses": [
//             "68cd592145149e4baf211335",
//             "68cd599245149e4baf21134f"
//         ],
//         "image": "https://api.dicebear.com/5.x/initials/svg?seed=RubelMaratha&backgroundColor=714ada",
//         "courseprogress": [],
//         "joined": "2025-09-06T17:36:05.205Z",
//         "totallogins": 59,
//         "__v": 0
//     },
//     "coursecontent": [
//         {
//             "_id": "68cd599745149e4baf211354",
//             "sectionname": "Section 1",
//             "subsection": [
//                 {
//                     "_id": "68cd59a945149e4baf21135a",
//                     "title": "S1 T1",
//                     "timeduration": "14.202667",
//                     "description": "S1 D1",
//                     "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1758288278/Learnova/hubv6lizl7c7s1qwxgab.mp4",
//                     "sectiontowhichitbelong": "68cd599745149e4baf211354",
//                     "__v": 0
//                 }
//             ],
//             "__v": 0
//         }
//     ],
//     "ratingandreviews": [],
//     "price": 345,
//     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1758288255/Learnova/novdogabxoqs3axdfmif.jpg",
//     "createdat": "2025-09-19T13:24:34.274Z",
//     "category": "67bc8af73ba49102ce51f78c",
//     "studentenrolled": [],
//     "__v": 0,
//     "status": "Private"
// }

        let sum = 0;
        
        let totaldur = 0;
        
        for(let i=0;i<res.data.data.coursecontent.length;i++){
        
            sum = sum + res.data.data.coursecontent[i].subsection.length;
        
            for(let j=0;j<res.data.data.coursecontent[i].subsection.length;j++){
        
                totaldur += parseInt(res.data.data.coursecontent[i].subsection[j].timeduration);
        
            }
        
        }

        dispatch(setImagee(res.data.data.thumbnail));

        dispatch(setTitle(res.data.data.coursename));

        dispatch(setDescription(res.data.data.coursedescription));

        dispatch(setNumberOfSections(res.data.data.coursecontent.length));

        dispatch(setEstimatedDuration(sectomin(totaldur)));
        
        dispatch(setNumberOfLectures(sum));

        dispatch(setEditCourse(true));

        dispatch(setCourse(res.data.data));


    } catch(err){

        console.log("Error in fetching course : ",err);
    
        toast.error(err?.response?.data?.message || err.message);

    } finally{

      toast.dismiss(toastid);

      setLoading(false);

    }


  }

  useEffect(()=>{

    getdetailsofcourse(courseid);

  },[]);


  return (

    <div className="flex h-screen bg-[#181825]">
        
        <Sidebar></Sidebar>

        <div className='pt-[90px] pb-5 px-3 sm:px-[20px] xl:px-[26px] w-full md:w-[69%] lg:w-[76%] xl:w-[81%] overflow-y-scroll no-scrollbar'>

            <h3 className='text-[#dbdded] font-lexend text-[26px] mb-[1px] tracking-wide text-center sm:text-left'>Edit Course</h3>

            <p className='text-[#79808a] text-lg tracking-wide text-center sm:text-left'>Manage your course curriculum</p>

            {
                loading ? <div className="h-[70vh] w-full flex flex-col justify-center items-center gap-5"><p className="text-[#dbdded] text-4xl font-nuninto tracking-wide">Please wait...</p> <MoonLoader color="#5d6eee" size={170}></MoonLoader></div> :

                <div>

                    <Steps></Steps>

                    <div className='text-white flex gap-7 mt-4 items-center xl:items-start xl:flex-row flex-col'>
                    
                        {
                    
                        step === 1 && <CourseSetup></CourseSetup>
                    
                        }
                    
                        {
                    
                        step === 2 && <CourseStructure></CourseStructure>
                                    
                        }   
                    
                        {
                    
                        step === 3 && <Finalize></Finalize>
                    
                        }
                    
                        <RightSideCard></RightSideCard>
                    
                    </div>

                </div>

            }

        </div>

    </div>

  )

}

export default EditCourse