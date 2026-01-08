import { useSelector } from "react-redux"
import { Sidebar } from "../Reusable/Sidebar"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiconnector } from "../../services/apiconnector";
import { courseurl } from "../../services/apis";
import { InstructorCoursesCard } from "../Course/InstructorCoursesCard";
import { PuffLoader } from "react-spinners";

export const MyClassroom = () =>{

    const token = useSelector((state) => state.Auth.token);

    const navi = useNavigate();

    const[loading,setLoading] = useState(true);

    const[instructorCourses,setInstructorCourses] = useState([]);

    const[publishedCourses,setPublishedCourses] = useState(0);

    const[privateCourses,setPrivateCourses] = useState(0);

    const fetchcourses = async() => {

        const toastid = toast.loading("Fetching...");

        setLoading(true);

        try{

            const res = await apiconnector("GET",courseurl.getallcoursesofinstructor,null,{

                "Authorization": `Bearer ${token}`

            })

            if (!res?.data?.success) {

                throw new Error(res?.data?.message || "Unknown error");

            }

            toast.success("Fetched Successfully");

            if(res.data.data.length > 0){

                const cs = res.data.data.filter((course)=>{

                    return course.coursecontent.length !== 0;

                })

                const publishedcourses = cs.filter((course) => {
                    
                    return course.status === "Published"
                    
                })

                const privatecourses = cs.filter((course) => {
                    
                    return course.status === "Private"
                    
                })


                setInstructorCourses(cs);

                setPublishedCourses(publishedcourses.length);

                setPrivateCourses(privatecourses.length);

            } else{

                setInstructorCourses([]);

                setPublishedCourses(0);

                setPrivateCourses(0);

            }

        } catch(err){

            console.log("Error in fetching courses : ",err);

            toast.error(err?.response?.data?.message || err.message);

        } finally{

            setLoading(false);

            toast.dismiss(toastid);

        }

    }
  
    useEffect(() => {

        fetchcourses();

    },[])

    return (

        <div className="flex flex-col-reverse md:flex-row bg-[#181825] h-screen overflow-hidden">

            <Sidebar></Sidebar>

            <div className='pt-[90px] pb-[90px] md:pb-5 px-4 sm:px-[20px] xl:px-[26px] w-full md:w-[69%] lg:w-[76%] xl:w-[81%] overflow-y-scroll no-scrollbar'>

                <h3 className='text-[#dbdded] font-lexend text-[26px] mb-[1px] tracking-wide text-center sm:text-left'>My Classroom</h3>

                <p className='text-[#79808a] text-lg text-center sm:text-left'>Manage and organize your course content.</p>

                {
                    loading ? <div className="h-[70vh] flex flex-col justify-center items-center gap-4"><p className="text-[#dbdded] text-4xl font-rubik tracking-wide">Loading...</p> <PuffLoader color="#5d6eee" size={200}></PuffLoader></div> : instructorCourses.length > 0 ?

                    <div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 mb-10">

                            <div className="bg-[#020813] py-5 px-6 rounded-lg font-nuninto flex-1 text-center sm:text-left">

                                <h3 className="text-white tracking-wide text-xl">Total Courses</h3>

                                <p className="text-[#7c3bed] text-[19px] mt-1.5">{instructorCourses.length}</p>

                            </div>

                            <div className="bg-[#020813] py-5 px-6 rounded-lg font-nuninto flex-1 text-center sm:text-left">

                                <h3 className="text-white tracking-wide text-xl">Published</h3>

                                <p className="text-[#569f54] text-[19px] mt-1.5">{publishedCourses}</p>

                            </div>

                            <div className="bg-[#020813] py-5 px-6 rounded-lg font-nuninto flex-1 text-center sm:text-left">

                                <h3 className="text-white tracking-wide text-xl">Private</h3>

                                <p className="text-[#c67c2f] text-[19px] mt-1.5">{privateCourses}</p>

                            </div>

                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-8">

                            {
                                instructorCourses.map((course,index)=>{

                                    return <InstructorCoursesCard fetchcourses={fetchcourses} course={course} key={index}></InstructorCoursesCard>

                                })
                            }

                        </div>

                    </div> : <div className="text-white">No Courses Found</div>

                }

            </div>

        </div>

    )

}

// [
//     {
//         "_id": "68ceacb4fe4461824759d765",
//         "coursename": "fgfg",
//         "coursedescription": "gghg",
//         "whatyouwilllearn": "7878",
//         "teacher": "68bc7758556efb471b8ce19b",
//         "coursecontent": [],
//         "ratingandreviews": [],
//         "price": 878,
//         "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1758375072/Learnova/e0vruomd9lggoev9ac5x.png",
//         "createdat": "2025-09-20T13:31:32.217Z",
//         "category": "67bc8aa73ba49102ce51f788",
//         "studentenrolled": [],
//         "__v": 0
//     },
//     {
//         "_id": "68ceab92fe4461824759d715",
//         "coursename": "UI/UX Design Principles",
//         "coursedescription": "Comprehensive course covering design thinking, user research, wireframing, prototyping, and modern design tools.",
//         "whatyouwilllearn": "Everything about design principles",
//         "teacher": "68bc7758556efb471b8ce19b",
//         "coursecontent": [
//             {
//                 "_id": "68ceab9ffe4461824759d71a",
//                 "sectionname": "Section 1",
//                 "subsection": [
//                     {
//                         "_id": "68ceabbdfe4461824759d720",
//                         "title": "S1 T1",
//                         "timeduration": "75.84",
//                         "description": "S1 D1",
//                         "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1758374824/Learnova/m5z25b1ik0mshu8pgrth.mp4",
//                         "sectiontowhichitbelong": "68ceab9ffe4461824759d71a",
//                         "__v": 0
//                     },
//                     {
//                         "_id": "68ceac5bfe4461824759d754",
//                         "title": "S1 T2",
//                         "timeduration": "14.202667",
//                         "description": "S1 D2",
//                         "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1758374983/Learnova/bz5d8tdvucqqwrp4hdnm.mp4",
//                         "sectiontowhichitbelong": "68ceab9ffe4461824759d71a",
//                         "__v": 0
//                     }
//                 ],
//                 "__v": 0
//             }
//         ],
//         "ratingandreviews": [],
//         "price": 100,
//         "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1758374781/Learnova/ffd9nijfiqfcjvpfh6yz.webp",
//         "createdat": "2025-09-20T13:26:42.008Z",
//         "category": "67bc8ac03ba49102ce51f78a",
//         "studentenrolled": [],
//         "__v": 0,
//         "status": "Private"
//     },
//     {
//         "_id": "68ce71fcf5da34f30ee22e85",
//         "coursename": "Digital Marketing Fundamental",
//         "coursedescription": "Learn the essentials digital marketing strategies including SEO, social media marketing, content marketing, and paid.",
//         "whatyouwilllearn": "Everything about Digital Marketing",
//         "teacher": "68bc7758556efb471b8ce19b",
//         "coursecontent": [
//             {
//                 "_id": "68ce728bf5da34f30ee22e91",
//                 "sectionname": "Section 1",
//                 "subsection": [
//                     {
//                         "_id": "68ce72a7f5da34f30ee22e97",
//                         "title": "S1 T1",
//                         "timeduration": "75.84",
//                         "description": "S1 D1",
//                         "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1758360211/Learnova/huv5opsn3fiop0p1ozab.mp4",
//                         "sectiontowhichitbelong": "68ce728bf5da34f30ee22e91",
//                         "__v": 0
//                     }
//                 ],
//                 "__v": 0
//             }
//         ],
//         "ratingandreviews": [],
//         "price": 5,
//         "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1758360099/Learnova/jfgaolw7u6yic3iv2rlc.png",
//         "createdat": "2025-09-20T09:21:00.510Z",
//         "category": "67bc8aa73ba49102ce51f788",
//         "studentenrolled": [],
//         "__v": 0,
//         "status": "Published"
//     },
//     {
//         "_id": "68cd599245149e4baf21134f",
//         "coursename": "Complete JavaScript Mastery",
//         "coursedescription": "Master JavaScript from basics to advanced concepts including ES6+, async programming, and modern frameworks.",
//         "whatyouwilllearn": "Everything about JavaScript",
//         "teacher": "68bc7758556efb471b8ce19b",
//         "coursecontent": [
//             {
//                 "_id": "68cd599745149e4baf211354",
//                 "sectionname": "Section 1",
//                 "subsection": [
//                     {
//                         "_id": "68cd59a945149e4baf21135a",
//                         "title": "S1 T1",
//                         "timeduration": "14.202667",
//                         "description": "S1 D1",
//                         "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1758288278/Learnova/hubv6lizl7c7s1qwxgab.mp4",
//                         "sectiontowhichitbelong": "68cd599745149e4baf211354",
//                         "__v": 0
//                     }
//                 ],
//                 "__v": 0
//             }
//         ],
//         "ratingandreviews": [],
//         "price": 345,
//         "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1758288255/Learnova/novdogabxoqs3axdfmif.jpg",
//         "createdat": "2025-09-19T13:24:34.274Z",
//         "category": "67bc8af73ba49102ce51f78c",
//         "studentenrolled": [],
//         "__v": 0,
//         "status": "Private"
//     },
//     {
//         "_id": "68cd592145149e4baf211335",
//         "coursename": "Deep Learning",
//         "coursedescription": "Learn about deep learning and machine learning in details and gain hands on experience in generating Ai models.",
//         "whatyouwilllearn": "Everything about Deep Learning",
//         "teacher": "68bc7758556efb471b8ce19b",
//         "coursecontent": [
//             {
//                 "_id": "68cd592745149e4baf21133a",
//                 "sectionname": "Section 1",
//                 "subsection": [
//                     {
//                         "_id": "68cd593d45149e4baf211340",
//                         "title": "S1 T1",
//                         "timeduration": "75.84",
//                         "description": "S1 D1",
//                         "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1758308740/Learnova/bo1vsfuuktcwhdd6xndx.mp4",
//                         "sectiontowhichitbelong": "68cd592745149e4baf21133a",
//                         "__v": 0
//                     }
//                 ],
//                 "__v": 0
//             }
//         ],
//         "ratingandreviews": [],
//         "price": 3000,
//         "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1758374501/Learnova/qvhfoanfdz69fl4i2r8s.png",
//         "createdat": "2025-09-19T13:22:41.977Z",
//         "category": "67bc8a6d3ba49102ce51f784",
//         "studentenrolled": [],
//         "__v": 0,
//         "status": "Private"
//     }
// ]