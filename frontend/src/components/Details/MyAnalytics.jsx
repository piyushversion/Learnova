import { useEffect, useState } from "react";
import { Sidebar } from "../Reusable/Sidebar";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { LuBookOpen } from "react-icons/lu";
import { LuStar } from "react-icons/lu";
import { LuDollarSign } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { apiconnector } from "../../services/apiconnector";
import { profileurl } from "../../services/apis";
import { useSelector } from "react-redux";
import { DashboardChart } from "./DashboardChart";
import ReactStars from "react-stars";
import { getTimeAgo } from "../../utils/duration";
import { PuffLoader } from "react-spinners";

function MyAnalytics(){

    const[loading,setLoading] = useState(true);

    const[instructorStats,setInstructorStats] = useState(null);

    const[showButton,setShowButton] = useState(false);

    const[courseArray,setCourseArray] = useState([]);

    const[reviewsArray,setReviewsArray] = useState([]);

    const token = useSelector((state)=> state.Auth.token);

    const user = useSelector((state)=>state.User.user);

    const getstats = async() => {

        const toastid = toast.loading("Loading...");

        try{

            const statres = await apiconnector("GET",profileurl.getinstructorstats,null,{

                "Authorization": `Bearer ${token}`

            })

            if (!statres?.data?.success) {
 
             throw new Error(statres?.data?.message || "Unknown error");
 
            }

            if(statres.data.data.courseStats.length > 0){

                setCourseArray(statres.data.data.courseStats.slice(0,3));

            }

            if(statres.data.data.allReviews.length > 0){

                setReviewsArray(statres.data.data.allReviews.slice(0,3));

            }

            setInstructorStats(statres.data.data);

        } catch(err){

            console.log("Error in fetching stats : ",err);
     
            toast.error(err?.response?.data?.message || err.message);

        } finally{

            setLoading(false);

            toast.dismiss(toastid);

        }

    }

    useEffect(()=>{

        getstats();

    },[])

    return (

        <div className="flex flex-col-reverse md:flex-row bg-[#181825] h-screen overflow-hidden">

            <Sidebar></Sidebar>
  
            <div className='pt-[90px] pb-[90px] md:pb-8 px-4 sm:px-[20px] xl:px-[26px] w-full md:w-[69%] lg:w-[76%] xl:w-[81%] overflow-y-scroll no-scrollbar'>

                <h3 className='text-[#dbdded] font-lexend text-[26px] mb-[5px] tracking-wider text-center sm:text-left'>Statistics</h3>

                <h3 className='font-nuninto text-white tracking-wide text-[22px] text-center sm:text-left'>Welcome {user.userinfo.firstname} 👋</h3>

                {

                    loading ? <div className="h-[70vh] flex flex-col justify-center items-center gap-4"><p className="text-[#dbdded] text-4xl font-rubik tracking-wide">Loading...</p> <PuffLoader color="#5d6eee" size={200}></PuffLoader></div> : <>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-3.5 gap-y-6 my-8">

                            <div className="flex items-start text-white flex-1 rounded-lg border border-[#303036] px-5 pt-[19px] pb-[25px] justify-between bg-[#020813]/45">

                                <div className="flex flex-col gap-1.5">

                                    <h1 className="text-[#a1a1aa] font-nuninto tracking-wide text-lg">Total Courses</h1>

                                    <p className="text-2xl font-lexend">{instructorStats?.totalCourses}</p>

                                </div>

                                <div className="rounded-full p-3 bg-gradient-to-br from-[#6b26d9] to-[#b152e0] text-white self-start">

                                    <LuBookOpen className="text-lg sm:text-[21px]"></LuBookOpen>

                                </div>

                            </div>

                            <div className="flex items-start text-white flex-1 rounded-lg border border-[#303036] px-5 pt-[19px] pb-[25px] justify-between bg-[#020813]/45">

                                <div className="flex flex-col gap-1.5">

                                    <h1 className="text-[#a1a1aa] font-nuninto tracking-wide text-lg">Total Revenue</h1>

                                    <div className="flex items-center">

                                        <BiRupee size={24}></BiRupee>

                                        <p className="text-2xl font-lexend">{instructorStats.totalRevenue}</p>

                                    </div>

                                </div>

                                <div className="rounded-full p-3 bg-gradient-to-br from-[#6b26d9] to-[#b152e0] text-white self-start">

                                    <LuDollarSign className="text-lg sm:text-[21px]"></LuDollarSign>

                                </div>

                            </div>

                            <div className="flex items-start text-white flex-1 rounded-lg border border-[#303036] px-5 pt-[19px] pb-[25px] justify-between bg-[#020813]/45">

                                <div className="flex flex-col gap-1.5">

                                    <h1 className="text-[#a1a1aa] font-nuninto tracking-wide text-lg">Total Students</h1>

                                    <p className="text-2xl font-lexend">{instructorStats.totalStudents}</p>

                                </div>

                                <div className="rounded-full p-3 bg-gradient-to-br from-[#6b26d9] to-[#b152e0] text-white self-start">

                                    <LuUsers className="text-lg sm:text-[21px]"></LuUsers>

                                </div>

                            </div>

                            <div className="flex items-start text-white flex-1 rounded-lg border border-[#303036] px-5 pt-[19px] pb-[25px] justify-between bg-[#020813]/45">

                                <div className="flex flex-col gap-1.5">

                                    <h1 className="text-[#a1a1aa] font-nuninto tracking-wide text-lg">Average Rating</h1>

                                    <p className="text-2xl font-lexend">{instructorStats.instructorOverallRating}</p>

                                </div>

                                <div className="rounded-full p-3 bg-gradient-to-br from-[#6b26d9] to-[#b152e0] text-white self-start">

                                    <LuStar className="text-lg sm:text-[21px]"></LuStar>

                                </div>

                            </div>

                        </div>

                        <DashboardChart stats={instructorStats}></DashboardChart>

                        <div className="text-white">

                        <div className="flex items-center justify-between mb-5 sm:flex-row flex-col gap-2.5">

                            <h1 className="font-lexend tracking-wide font-light text-2xl">Your Courses</h1>

                            { instructorStats.courseStats.length > 3 && <div>

                                {

                                   !showButton ? <button onClick={()=>{setCourseArray(instructorStats.courseStats);setShowButton(true)}} className="font-lexend pr-[3px] tracking-wider text-[#5d6eee]">View All</button> :

                                    <button onClick={()=>{setCourseArray(instructorStats.courseStats.slice(0,3));setShowButton(false)}} className="font-lexend pr-[3px] tracking-wider text-[#5d6eee]">View Less</button>

                                }

                                </div>

                            }

                        </div>

                        {
                            instructorStats.courseStats.length === 0 ? <div>You have not created any course yet</div> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-8">

                                {
                                    courseArray.map((course,index)=>(

                                        <div key={index} className="rounded-xl bg-[#020813]/65 group h-max border border-[#303036]">
                                                
                                            <div className="h-48 overflow-hidden rounded-t-xl">
                                                
                                                <img src={course.courseimage} loading="lazy" alt="XXX" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"/>
                                                
                                            </div>
                                                
                                            <div className="py-5 px-4 text-white flex flex-col gap-[10px]">
                                                
                                                <h3 className="text-[20px] text-white font-nuninto tracking-wide transition-all duration-200 group-hover:text-[#5d6eee]">{course.coursename}</h3>
                                                
                                                <div className="flex items-start md:items-center justify-between text-[#a1a1aa] font-rubik md:flex-row flex-col gap-2.5">

                                                    <div className="flex items-center gap-1.5">

                                                        <LuUsers size={19}></LuUsers>

                                                        <p className="tracking-wide">{course.students} students</p>

                                                    </div>

                                                    <div className="flex items-center gap-1.5">

                                                        <LuStar size={19} color="#5d6eee"></LuStar>

                                                        <p className="tracking-wide">{course.avgRating}</p>

                                                    </div>

                                                </div>
                                                
                                                <div className="text-[#a1a1aa] font-lexend tracking-wide"> Completion rate: {course.completionRate}% </div>

                                                <div className="flex items-center text-[#a1a1aa] font-rubik tracking-wide gap-[4px]"> 
                                                    
                                                    <p>Total Revenue:</p>

                                                    <div className="flex items-center pt-[1px]">

                                                        <span>{course.revenue}</span>

                                                        <BiRupee size={18}></BiRupee>
                                                    
                                                    </div>
                                                    

                                                </div>

                                            </div>
                                                
                                        </div>

                                    ))
                                }
                                
                            </div>
                        }

                        </div>

                        <div className="text-white">

                        <h1 className="font-lexend tracking-wide font-light text-2xl mt-10 mb-5 pl-1 text-center sm:text-left">Recent Reviews</h1>

                        {
                            instructorStats.allReviews.length === 0 ? <div>You don't have any reviews yet</div> : <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-8">

                                {
                                    reviewsArray.map((review,index)=>(

                                        <div key={index} className="rounded-xl bg-[#020813]/60 group h-max border border-[#303036] px-5 pt-2 pb-4 flex flex-col flex-1 items-center sm:items-stretch">
                                                
                                            <div className="flex items-center justify-between sm:flex-row flex-col py-2 sm:py-0">

                                                <h1 className="font-rubik text-[19px] tracking-wide">{review.userwhohasgivenrar.firstname} {review.userwhohasgivenrar.lastname}</h1>

                                                <ReactStars className="pb-1" count={5} value={review.rating} edit={false} size={24}></ReactStars>

                                            </div>

                                            <p className="text-[#a1a1aa] font-nuninto tracking-wider leading-[10px]">{review.courseonwhichrargiven.coursename}</p>

                                            <p className="text-[#a1a1aa] font-nuninto tracking-wider text-lg pt-3.5 pb-2 text-center sm:text-left">{review.reviews}</p>

                                            <p className="text-[#a1a1aa] font-rubik tracking-wider text-[15px]">{getTimeAgo(review.createdat)}</p>
                                                
                                        </div>

                                    ))
                                }
                                
                            </div>
                        }

                        </div>

                    </>

                }

            </div>

        </div>

    )

}

export default MyAnalytics;


// {
//     "courseStats": [
//         {
//             "coursename": "Gen AI",
//             "courseimage": "https://res.cloudinary.com/doeclcssz/image/upload/v1759838818/Learnova/eje6bcyvorvjym8z0vtb.webp",
//             "students": 1,
//             "revenue": 1,
//             "avgRating": "0.5",
//             "totalreviewsofcourse": 1,
//             "completionRate": 100
//         },
//         {
//             "coursename": "Python",
//             "courseimage": "https://res.cloudinary.com/doeclcssz/image/upload/v1759228226/Learnova/fvuo7kjw8y1srmxeiyf2.jpg",
//             "students": 1,
//             "revenue": 3,
//             "avgRating": "5.0",
//             "totalreviewsofcourse": 1,
//             "completionRate": 100
//         },
//         {
//             "coursename": "React JS",
//             "courseimage": "https://res.cloudinary.com/doeclcssz/image/upload/v1759052331/Learnova/rlwpbdrypvbcqbl5k3xk.png",
//             "students": 1,
//             "revenue": 2,
//             "avgRating": "2.5",
//             "totalreviewsofcourse": 1,
//             "completionRate": 100
//         },
//         {
//             "coursename": "Kotlin",
//             "courseimage": "https://res.cloudinary.com/doeclcssz/image/upload/v1759051383/Learnova/cm5nmor3i77f7paymame.jpg",
//             "students": 1,
//             "revenue": 1,
//             "avgRating": "3.0",
//             "totalreviewsofcourse": 1,
//             "completionRate": 100
//         },
//         {
//             "coursename": "Java",
//             "courseimage": "https://res.cloudinary.com/doeclcssz/image/upload/v1759050878/Learnova/bnxytfus1dhheevvdklm.jpg",
//             "students": 2,
//             "revenue": 4,
//             "avgRating": "2.0",
//             "totalreviewsofcourse": 2,
//             "completionRate": 50
//         },
//         {
//             "coursename": "C++",
//             "courseimage": "https://res.cloudinary.com/doeclcssz/image/upload/v1759051146/Learnova/iyjear5acols8cwgxci5.jpg",
//             "students": 0,
//             "revenue": 0,
//             "avgRating": "0.0",
//             "totalreviewsofcourse": 0,
//             "completionRate": 0
//         }
//     ],
//     "totalCourses": 6,
//     "totalStudents": 6,
//     "totalRevenue": 11,
//     "reviewsSentiment": {
//         "positive": 1,
//         "negative": 2
//     },
//     "instructorOverallRating": "2.5",
//     "allReviews": [
//         {
//             "createdat": "2025-10-12T08:20:47.351Z",
//             "_id": "68e412a1f02da239e1d0c0a4",
//             "userwhohasgivenrar": "68d8f0005d51e74ea041f2e4",
//             "rating": 2.5,
//             "reviews": "Very Bad",
//             "courseonwhichrargiven": "68d902435d51e74ea041f3a6",
//             "__v": 0
//         },
//         {
//             "createdat": "2025-10-12T08:20:47.351Z",
//             "_id": "68e41307f02da239e1d0c0da",
//             "userwhohasgivenrar": "68d8f0005d51e74ea041f2e4",
//             "rating": 0.5,
//             "reviews": "Average",
//             "courseonwhichrargiven": "68d8fc965d51e74ea041f325",
//             "__v": 0
//         },
//         {
//             "createdat": "2025-10-12T08:20:47.351Z",
//             "_id": "68e41379f02da239e1d0c132",
//             "userwhohasgivenrar": "68bc78bc556efb471b8ce1ac",
//             "rating": 3,
//             "reviews": "Holy",
//             "courseonwhichrargiven": "68d8fe8f5d51e74ea041f363",
//             "__v": 0
//         },
//         {
//             "createdat": "2025-10-12T08:20:47.351Z",
//             "_id": "68e5005bd589bb0e2b98b392",
//             "userwhohasgivenrar": "68bc78bc556efb471b8ce1ac",
//             "rating": 5,
//             "reviews": "Very Good Course",
//             "courseonwhichrargiven": "68dba004ee1a02ee8a2c649b",
//             "__v": 0
//         },
//         {
//             "createdat": "2025-10-12T08:20:47.351Z",
//             "_id": "68e792526b7edb5522b915f4",
//             "userwhohasgivenrar": "68d8f0005d51e74ea041f2e4",
//             "rating": 0.5,
//             "reviews": "Very Bad Course from Future",
//             "courseonwhichrargiven": "68e50281d589bb0e2b98b3a5",
//             "__v": 0
//         },
//         {
//             "createdat": "2025-10-12T08:20:47.351Z",
//             "_id": "68e7d67bdbf9608456b24d21",
//             "userwhohasgivenrar": "68bc78bc556efb471b8ce1ac",
//             "rating": 3.5,
//             "reviews": "Java is Good Programming Language",
//             "courseonwhichrargiven": "68d8fc965d51e74ea041f325",
//             "__v": 0
//         }
//     ]
// }

// {
//     "createdat": "2025-10-12T08:54:00.983Z",
//     "_id": "68e41379f02da239e1d0c132",
//     "userwhohasgivenrar": {
//         "_id": "68bc78bc556efb471b8ce1ac",
//         "firstname": "Piyush",
//         "lastname": "Dhote"
//     },
//     "rating": 3,
//     "reviews": "Holy",
//     "courseonwhichrargiven": {
//         "_id": "68d8fe8f5d51e74ea041f363",
//         "coursename": "Kotlin"
//     },
//     "__v": 0
// }
