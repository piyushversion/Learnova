import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { IoClose } from "react-icons/io5";
import { MdLanguage } from "react-icons/md";
import { apiconnector } from "../../services/apiconnector";
import { courseurl, ratingandreviewsurl } from "../../services/apis";
import { useEffect, useRef, useState } from "react";
import { setCourseCompletedlectures, setCourseFullData, setCourseSectionData, setTotalNumOfLectures } from "../../redux/ViewCourseslice";
import CourseSidebar from "./CourseSidebar";
import WatchCourseVideo from "./WatchCourseVideo";
import ReactStars from "react-stars";
import { BarLoader, PuffLoader } from "react-spinners";

export const ViewCourse = () => {

    const dispatch = useDispatch();

    const{courseid} = useParams();

    const token = useSelector((state)=> state.Auth.token);

    const {user} = useSelector((state)=>state.User);

    const[open,setOpen] = useState(true);

    const[loading,setLoading] = useState(true);

    const [showModal,setShowModal] = useState(false);

    const[ratingLoading,setRatingLoading] = useState(false);

    const[rating,setRating] = useState(null);

    const[reviews,setReviews] = useState("");

    const[percentage,setPercentage] = useState(null);

    const[sectionIndexx,setSectionIndexx] = useState(0);

    const[sectionIndex,setSectionIndex] = useState(0);

    const[subSectionIndex,setSubSectionIndex] = useState(0);

    const[activeSectionId,setActiveSectionId] = useState(null);

    const[activeSubSectionId,setActiveSubSectionId] = useState(null);

    const reff = useRef([]);

    const {coursefulldata,coursesectiondata,coursecompletedlectures,totalnumoflectures} = useSelector((state)=>state.ViewCourse);

    const getfulldetailsofcourse = async()=>{

        const toastid = toast.loading("Loading...");

        try{

            const res = await apiconnector("POST",courseurl.getfulldetailsofcourse,{courseid:courseid},{

                "Authorization": `Bearer ${token}`

            })

            if (!res?.data?.success) {
 
             throw new Error(res?.data?.message || "Unknown error");
 
            }
            
            dispatch(setCourseFullData(res.data.data));
                    
            dispatch(setCourseSectionData(res.data.data.coursecontent));
            
            dispatch(setCourseCompletedlectures(res.data.data.completedvideos));
            
            let totalnumoflecture = 0;
            
            for(let i=0;i<res.data.data.coursecontent.length;i++){
            
                for(let j=0;j<res.data.data.coursecontent[i].subsection.length;j++){
                        
                    totalnumoflecture += 1;
            
                }
            
            }

            const courseprogresspercentage = (res.data.data.courseprogress.completedvideos.length/totalnumoflecture)*100;
            
            setPercentage(courseprogresspercentage);
            
            dispatch(setTotalNumOfLectures(totalnumoflecture));

            setActiveSectionId(res.data.data.coursecontent[0]._id);

            setActiveSubSectionId(res.data.data.coursecontent[0].subsection[0]._id);

        } catch(err){

            console.log("Error in fetching course details: ",err);
     
            toast.error(err?.response?.data?.message || err.message);

        } finally{

            toast.dismiss(toastid);

            setLoading(false);

        }

    }

    const handlesubmit = async() => {

        if(!rating || !reviews){

            toast.error("All feilds are not present");

            return;

        }

        const toastid = toast.loading("Loading...");

        setRatingLoading(true);

        try{

            const res = await apiconnector("POST",ratingandreviewsurl.createrating,{courseid:courseid,rating:rating,review:reviews},{

                "Authorization": `Bearer ${token}`

            })

            if (!res?.data?.success) {
 
             throw new Error(res?.data?.message || "Unknown error");
 
            }

            toast.success("Experience Shared")

            setRating(null);

            setReviews(null);

        } catch(err){

            console.log("Error in given rating and reviews: ",err);
     
            toast.error(err?.response?.data?.message || err.message);

        } finally{

            toast.dismiss(toastid);

            setRatingLoading(false);

            setShowModal(false);

        }

    }

    const handlechange = (e) => {

        const inputtext = e.target.value;

        if(inputtext.length <= 100){

            setReviews(inputtext);

        } else{

            setReviews(inputtext.substr(0,100));

        }

    }

    useEffect(()=>{

        getfulldetailsofcourse();

    },[])

    useEffect(()=>{

        const handleresize = () => {

            if(window.innerWidth < 1280){

                setOpen(false);

            } else{

                setOpen(true);

            }

        }

        handleresize();

        window.addEventListener("resize",handleresize);

    },[])

    return(

        <>

            {

                loading ? <div className="h-screen flex justify-center items-center flex-col gap-5"><PuffLoader color="#5d6eee" size={200}></PuffLoader> <p className="text-5xl font-nuninto">Loading...</p></div> : <div className="flex h-screen overflow-hidden relative">

                    <CourseSidebar coursefulldata={coursefulldata} coursesectiondata={coursesectiondata} coursecompletedlectures={coursecompletedlectures} totalnumoflectures={totalnumoflectures} sectionIndex={sectionIndex} setSectionIndex={setSectionIndex} activeSectionId={activeSectionId} setActiveSectionId={setActiveSectionId} activeSubSectionId={activeSubSectionId} setActiveSubSectionId={setActiveSubSectionId} subSectionIndex={subSectionIndex} setSubSectionIndex={setSubSectionIndex} reff={reff} sectionIndexx={sectionIndexx} setSectionIndexx={setSectionIndexx} percentage={percentage} setPercentage={setPercentage} setShowModal={setShowModal} open={open} setOpen={setOpen}></CourseSidebar> 

                    <WatchCourseVideo coursefulldata={coursefulldata} coursesectiondata={coursesectiondata} coursecompletedlectures={coursecompletedlectures} totalnumoflectures={totalnumoflectures} sectionIndex={sectionIndex} setSectionIndex={setSectionIndex} activeSectionId={activeSectionId} setActiveSectionId={setActiveSectionId} activeSubSectionId={activeSubSectionId} setActiveSubSectionId={setActiveSubSectionId} subSectionIndex={subSectionIndex} setSubSectionIndex={setSubSectionIndex} sectionIndexx={sectionIndexx} setSectionIndexx={setSectionIndexx} percentage={percentage} setPercentage={setPercentage} open={open} setOpen={setOpen}></WatchCourseVideo>

                    { showModal &&

                    <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center z-10 gap-2">

                        <div className="bg-[#020813] text-white flex flex-col gap-4 py-4 rounded-lg w-[90%] sm:w-[70%] md:w-[65%] lg:w-[55%] xl:w-[45%] mt-16">

                            {
                                ratingLoading ? <div className="h-[30vh] flex flex-col justify-center items-center gap-10"><p className="text-[#dbdded] text-3xl text-center sm:text-[33px] font-rubik tracking-wide">Sharing your experience...</p> <BarLoader color="#5d6eee" height={4} width={300}></BarLoader></div> : <>
                                
                            <div className="flex items-center justify-between pl-[11px] pr-[2px] sm:pl-5 sm:pr-5">

                                <h3 className="font-nuninto text-xl sm:text-[22px] tracking-wide">Share Your Experience</h3>

                                <button onClick={()=>{setShowModal(false);setRating(null);setReviews("")}} className="hover:bg-[#181824] p-2 rounded-full"><IoClose size={20}></IoClose></button>

                            </div>

                            <div className="bg-gray-500 h-[1px] w-full"></div>

                            <div className="flex items-center gap-0 sm:gap-2.5 px-5 flex-col sm:flex-row">

                                <div className="w-[75px] h-[75px] rounded-full overflow-hidden border border-[#dbdded]/70">

                                <img src={user.image} alt="XXX" className="w-full h-full"/>

                            </div>

                                <div className="my-4 text-center sm:text-left">

                                    <h3 className="text-xl font-nuninto tracking-wide font-medium pb-1.5">{user.userinfo.firstname} {user.userinfo.lastname}</h3>

                                    <div className="flex items-center gap-1.5 font-lexend font-light">

                                        <MdLanguage size={18}></MdLanguage>

                                        <p className="tracking-wide">Visible To Everyone</p>

                                    </div>

                                </div>

                            </div>

                            <div className="flex flex-col px-5 text-center sm:text-left">

                                <p className="font-rubik tracking-wide">Rate this course <sup className="text-red-600">*</sup></p>

                                <ReactStars count={5} size={30} onChange={(e) => setRating(e)} className="self-center"></ReactStars>

                            </div>

                            <div className="flex flex-col px-5 text-center sm:text-left">

                                <p className="font-rubik tracking-wide pb-2.5">Your Experience <sup className="text-red-600">*</sup></p>

                                <textarea value={reviews} onChange={handlechange} className="bg-[#181824] outline-0 resize-none min-h-[120px] p-2"></textarea>

                                <div className="text-right text-sm text-gray-400">
                                    
                                    {reviews.length}/100 words

                                </div>

                            </div>

                            <button onClick={handlesubmit} disabled={ratingLoading} className="my-2 mx-5 px-5 bg-yellow-600 self-end font-rubik pt-1 pb-[5px] rounded-lg text-[15px] sm:text-base">Submit</button>

                            </>

                            }

                        </div>

                    </div>

                    }

                </div>

            }

        </>

    )

}

// {
//     "_id": "68d8fe8f5d51e74ea041f363",
//     "coursename": "Kotlin",
//     "coursedescription": "Learn about kotlin language make apps that help people in real life.",
//     "whatyouwilllearn": "Building Android applications using Kotlin, including UI design with XML or Jetpack Compose, handling user input, working with data, and navigating between screens.\r\nUsing frameworks like Ktor or Spring Boot with Kotlin for server-side applications.\r\nMultiplatform Development: Exploring Kotlin Multiplatform Mobile (KMM) for sharing code between Android and iOS.",
//     "courselanguage": "Hinglish",
//     "teacher": {
//         "_id": "68d8ef245d51e74ea041f2da",
//         "firstname": "Rahul",
//         "lastname": "Sharma",
//         "email": "medegi2451@mv6a.com",
//         "password": "$2b$10$lWbdB5eW2BDdrkGnAHKWweWQ.jcQAIsqE6ecT7DMUhUGKYUEULaTq",
//         "accounttype": "Instructor",
//         "additionaldetails": "68d8ef245d51e74ea041f2d8",
//         "courses": [
//             "68d8f4495d51e74ea041f2ef",
//             "68d8fc965d51e74ea041f325",
//             "68d8fe8f5d51e74ea041f363",
//             "68d902435d51e74ea041f3a6",
//             "68dba004ee1a02ee8a2c649b"
//         ],
//         "image": "https://api.dicebear.com/5.x/initials/svg?seed=RahulSharma&backgroundColor=714ada",
//         "courseprogress": [],
//         "joined": "2025-09-28T06:56:12.432Z",
//         "totallogins": 7,
//         "__v": 0
//     },
//     "coursecontent": [
//         {
//             "_id": "68d8fe955d51e74ea041f368",
//             "sectionname": "Section 1",
//             "subsection": [
//                 {
//                     "_id": "68d8ff995d51e74ea041f370",
//                     "title": "S1 T1",
//                     "timeduration": "5.525",
//                     "description": "S1 D1",
//                     "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1759051648/Learnova/aqmjbpkytaxmnkpscijj.mp4",
//                     "sectiontowhichitbelong": "68d8fe955d51e74ea041f368",
//                     "__v": 0
//                 }
//             ],
//             "__v": 0
//         }
//     ],
//     "ratingandreviews": [
//         {
//             "_id": "68e41379f02da239e1d0c132",
//             "userwhohasgivenrar": "68bc78bc556efb471b8ce1ac",
//             "rating": 3,
//             "reviews": "Holy",
//             "courseonwhichrargiven": "68d8fe8f5d51e74ea041f363",
//             "__v": 0
//         }
//     ],
//     "price": 1,
//     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759051383/Learnova/cm5nmor3i77f7paymame.jpg",
//     "createdat": "2025-09-28T09:23:27.311Z",
//     "category": "67bc8aa73ba49102ce51f788",
//     "studentenrolled": [
//         "68bc78bc556efb471b8ce1ac"
//     ],
//     "__v": 0,
//     "status": "Published",
//     "totalduration": "5secs",
//     "completedvideos": [
//         "68d8ff995d51e74ea041f370"
//     ],
//     "courseprogress": {
//         "_id": "68d96407c97a19ba2d46e30f",
//         "courseid": "68d8fe8f5d51e74ea041f363",
//         "userid": "68bc78bc556efb471b8ce1ac",
//         "completedvideos": [
//             "68d8ff995d51e74ea041f370"
//         ],
//         "__v": 1
//     }
// }



// {
//     "userinfo": {
//         "_id": "68d8f0005d51e74ea041f2e4",
//         "firstname": "Karan",
//         "lastname": "Aujla",
//         "email": "piyushdhote966@gmail.com",
//         "password": null,
//         "accounttype": "Student",
//         "additionaldetails": {
//             "_id": "68d8f0005d51e74ea041f2e2",
//             "gender": null,
//             "dateofbirth": null,
//             "about": null,
//             "contactnumber": null,
//             "__v": 0
//         },
//         "courses": [
//             "68d912b31a97011b7d2680cf",
//             "68d90f1c1a97011b7d268054",
//             "68d902435d51e74ea041f3a6",
//             "68d8fc965d51e74ea041f325"
//         ],
//         "image": "https://api.dicebear.com/5.x/initials/svg?seed=KaranAujla&backgroundColor=714ada",
//         "courseprogress": [
//             "68d95333ca6528a8d656a76f",
//             "68d95337ca6528a8d656a773",
//             "68e2a2afca7345003994d850",
//             "68e2a763c971fddb126cf2d6"
//         ],
//         "joined": "2025-09-28T06:56:12.432Z",
//         "totallogins": 29,
//         "__v": 0,
//         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpeXVzaGRob3RlOTY2QGdtYWlsLmNvbSIsImlkIjoiNjhkOGYwMDA1ZDUxZTc0ZWEwNDFmMmU0IiwiYWNjb3VudHR5cGUiOiJTdHVkZW50IiwiaWF0IjoxNzU5NzU0ODYxLCJleHAiOjE3NTk3NjIwNjF9.RtZQmfP9l1wEGoIY60xFMQVJDQW-5aSP81pTJ1QT3io"
//     },
//     "image": "https://api.dicebear.com/5.x/initials/svg?seed=KaranAujla&backgroundColor=714ada"
// }