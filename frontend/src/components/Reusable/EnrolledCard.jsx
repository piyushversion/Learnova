import { LuClock } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoCheckCircle } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCourseCompletedlectures, setCourseFullData, setCourseSectionData, setTotalNumOfLectures } from "../../redux/ViewCourseslice";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiconnector } from "../../services/apiconnector";
import { courseurl } from "../../services/apis";

export const EnrolledCard = ({item,getenrolledcourses}) => {

    const navi = useNavigate();

    const dispatch = useDispatch();

    const token = useSelector((state)=> state.Auth.token);

    const[showButton,setShowButton] = useState(false);

    const[showFullString,setShowFullString] = useState(false);

    const handleclick = () => {

        navi(`/course/viewcourse/${item._id}`);

    }

    const handlecompletecourse = async () => {

        const loading = toast.loading("Updating...");

        try{

            const res = await apiconnector("POST",courseurl.completefullcourse,{courseid:item._id},{

                "Authorization": `Bearer ${token}`

            })

            if (!res?.data?.success) {
 
             throw new Error(res?.data?.message || "Unknown error");
 
            }

        } catch(err){

            console.log("Error in completing course : ",err);
     
            toast.error(err?.response?.data?.message || err.message);

        } finally{

            toast.dismiss(loading);

            getenrolledcourses(token);

        }

    }

    return (

        <div className="flex text-white flex-col lg:flex-row bg-[#020813] rounded-2xl py-8 sm:py-5 px-4 sm:px-5 mb-5 group cursor-pointer gap-5 items-start" onClick={handleclick}>

            <div className="flex gap-7 flex-col sm:flex-row w-full lg:w-[90%] items-center justify-between">

                <div className='w-full sm:w-[45%] lg:w-[35%] xl:w-[21%] h-[110px]'>

                    <img src={item?.thumbnail} alt="XXX" className='h-full w-full object-contain' />
                                      
                </div>

                <div className="flex flex-col justify-between w-full sm:w-[75%] gap-2 sm:gap-1.5">

                    <div>

                        <h3 className="font-nuninto text-xl text-center sm:text-left tracking-wide text-white">{item?.coursename}</h3>

                        {
                            item?.coursedescription.length > 100 ? <div className="text-[#8f98ac] tracking-wide font-rubik text-[15px]">
        
                            {
                                showFullString ? <p className="text-center sm:text-left">{item.coursedescription.slice(0)} <span onClick={(e)=> {e.preventDefault();e.stopPropagation();setShowFullString(false)}} className="text-blue-500">Read less</span></p> : <p className="text-center sm:text-left">{item.coursedescription.slice(0,80)} <span onClick={(e)=> {e.stopPropagation();e.preventDefault();setShowFullString(true)}} className="text-blue-500">...Read more</span></p>
                            }
        
                            </div> : <p className="text-[#8f98ac] tracking-wide font-rubik text-[15px] text-center sm:text-left">{item.coursedescription}</p>
                        }

                    </div>

                    <div className="w-full sm:w-[90%] justify-between">

                        <div className="flex items-center justify-center sm:justify-start font-lexend font-light tracking-wide text-[#dbdded] gap-1.5">

                            <LuClock size={16}></LuClock>

                            <p>{item?.totaldur}</p>

                        </div>

                        <div className="flex items-center w-full sm:w-[85%] font-nuninto gap-2 mt-2 sm:mt-1 text-[#dbdded]">

                            <p className="pb-[3px]">Progress:</p>

                            <div className="h-2 bg-gray-600 rounded-full w-full relative">

                                <div className="h-2 bg-[#6870e6] absolute rounded-full" style={{width:`${Math.trunc(item.progresspercentage)}%`}}></div>

                            </div>

                            <span>{Math.trunc(item.progresspercentage)}%</span>

                        </div>

                    </div>

                </div>

            </div>

            <div className="flex flex-col sm:flex-row justify-between lg:flex-col w-full lg:w-[16%] items-center lg:items-end gap-6">

                <div className={`font-rubik ${item?.progresspercentage === 100 ? "text-green-500 bg-green-500/20 border-green-500/30" : "text-[#5d6eee] bg-[#5d6eee]/20 border-[#5d6eee]/30"} px-3 pt-1 pb-[5px] border-[1px] rounded-full text-sm`}>

                    {
                        item?.progresspercentage === 100 ? "Completed" : "In Progress"
                    }

                </div>

                {

                    item?.progresspercentage !== 100 && <>
                    
                    <div className={`transition-all duration-100 hidden sm:block self-end sm:self-center relative ${showButton ? "visible":"invisible group-hover:visible"}`} onClick={(e)=>{

                        e.preventDefault();
                        e.stopPropagation();
                        setShowButton(!showButton);

                    }}>

                        <BsThreeDotsVertical></BsThreeDotsVertical>

                        {
                            showButton && <button className="flex absolute right-7 lg:right-0 -top-2 lg:top-[25px] visible w-max items-center gap-1.5 bg-gray-500 font-lexend px-2.5 pt-1.5 pb-[7px] rounded-lg" onClick={handlecompletecourse}>

                                <div>

                                    <GoCheckCircle></GoCheckCircle>

                                </div>

                                <p className="text-sm">Mark as Completed</p>

                            </button>
                        }

                    </div>

                    <div className={`transition-all duration-100 block sm:hidden self-end sm:self-center relative ${showButton ? "visible":"invisible group-hover:visible"}`} onClick={(e)=>{

                        e.preventDefault();
                        e.stopPropagation();
                        setShowButton(!showButton);

                    }}>

                        <BsThreeDotsVertical></BsThreeDotsVertical>

                        {
                            showButton && <button className="flex absolute right-7 lg:right-0 -top-2 lg:top-[25px] visible w-max items-center gap-1.5 bg-gray-500 font-lexend px-2.5 pt-1.5 pb-[7px] rounded-lg" onClick={handlecompletecourse}>

                                <div>

                                    <GoCheckCircle></GoCheckCircle>

                                </div>

                                <p className="text-sm">Mark as Completed</p>

                            </button>
                        }

                    </div>

                    

                    </>
                }

            </div>

        </div>  
        
//         <div
//   className="flex flex-col lg:flex-row text-white bg-[#020813] rounded-2xl p-5 mb-5 group cursor-pointer gap-5"
//   onClick={handleclick}
// >

//   {/* LEFT & MID CONTENT */}
//   <div className="flex flex-col lg:flex-row gap-5 w-full lg:w-[85%] items-start lg:items-center justify-between">

//     {/* Thumbnail */}
//     <div className="w-full sm:w-[50%] md:w-[35%] lg:w-[22%] h-[110px] mx-auto lg:mx-0">
//       <img
//         src={item?.thumbnail}
//         alt="XXX"
//         className="h-full w-full object-contain"
//       />
//     </div>

//     {/* Course Info */}
//     <div className="flex flex-col justify-between w-full gap-3">

//       {/* Title + Description */}
//       <div>
//         <h3 className="font-nuninto text-xl tracking-wide text-white">
//           {item?.coursename}
//         </h3>

//         {item?.coursedescription.length > 100 ? (
//           <div className="text-[#8f98ac] tracking-wide font-rubik text-[15px]">
//             {showFullString ? (
//               <p>
//                 {item.coursedescription}
//                 <span
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     setShowFullString(false);
//                   }}
//                   className="text-blue-500 ml-1"
//                 >
//                   Read less
//                 </span>
//               </p>
//             ) : (
//               <p>
//                 {item.coursedescription.slice(0, 80)}
//                 <span
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     setShowFullString(true);
//                   }}
//                   className="text-blue-500 ml-1"
//                 >
//                   ...Read more
//                 </span>
//               </p>
//             )}
//           </div>
//         ) : (
//           <p className="text-[#8f98ac] tracking-wide font-rubik text-[15px]">
//             {item.coursedescription}
//           </p>
//         )}
//       </div>

//       {/* Duration + Progress */}
//       <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-6 sm:items-center">

//         {/* Duration */}
//         <div className="flex items-center font-lexend font-light tracking-wide text-[#dbdded] gap-1.5">
//           <LuClock size={16} />
//           <p>{item?.totaldur}</p>
//         </div>

//         {/* Progress Bar */}
//         <div className="flex items-center w-full sm:w-[70%] font-nuninto gap-2 text-[#dbdded]">
//           <p className="pb-[3px]">Progress:</p>
//           <div className="h-2 bg-gray-600 rounded-full w-full relative">
//             <div
//               className="h-2 bg-[#6870e6] absolute rounded-full"
//               style={{ width: `${Math.trunc(item.progresspercentage)}%` }}
//             ></div>
//           </div>
//           <span>{Math.trunc(item.progresspercentage)}%</span>
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* RIGHT SECTION - Progress & Menu */}
//   <div className="flex flex-row lg:flex-col justify-between w-full lg:w-[15%] items-end gap-4">

//     {/* Status */}
//     <div
//       className={`font-rubik ${
//         item?.progresspercentage === 100
//           ? "text-green-500 bg-green-500/20 border-green-500/30"
//           : "text-[#5d6eee] bg-[#5d6eee]/20 border-[#5d6eee]/30"
//       } px-3 pt-1 pb-[5px] border-[1px] rounded-full text-sm`}
//     >
//       {item?.progresspercentage === 100 ? "Completed" : "In Progress"}
//     </div>

//     {/* Three dots menu */}
//     {item?.progresspercentage !== 100 && (
//       <div
//         className={`transition-all duration-100 relative ${
//           showButton ? "visible" : "invisible group-hover:visible"
//         }`}
//         onClick={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           setShowButton(!showButton);
//         }}
//       >
//         <BsThreeDotsVertical />

//         {showButton && (
//           <button
//             className="flex absolute right-0 top-5 visible w-max items-center gap-1.5 bg-gray-500 font-lexend px-2.5 pt-1.5 pb-[7px] rounded-lg"
//             onClick={handlecompletecourse}
//           >
//             <GoCheckCircle />
//             <p className="text-sm">Mark as Completed</p>
//           </button>
//         )}
//       </div>
//     )}
//   </div>
//         </div>

    )

}

// {
//     "_id": "68d90f1c1a97011b7d268054",
//     "coursename": "Spring Boot",
//     "coursedescription": "Learn about java spring boot in detail and make robust server side backend for scalable applications.",
//     "whatyouwilllearn": "Understanding auto-configuration and how Spring Boot simplifies project setup.\r\nHandling HTTP requests and responses.\r\nConnecting applications to relational databases (e.g., PostgreSQL, MySQL) using Spring Data JPA.\r\nImplementing authentication and authorization using Spring Security.\r\nWorking with JWT tokens or OAuth2 for secure applications.",
//     "courselanguage": "Spanish",
//     "teacher": "68bc7758556efb471b8ce19b",
//     "coursecontent": [
//         {
//             "_id": "68d90f211a97011b7d268059",
//             "sectionname": "Section 1",
//             "subsection": [
//                 {
//                     "_id": "68d90f331a97011b7d26805f",
//                     "title": "S1 T1",
//                     "timeduration": "5.525",
//                     "description": "S1 D1",
//                     "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1759055642/Learnova/jkfdcljkshwqclpvl4vs.mp4",
//                     "sectiontowhichitbelong": "68d90f211a97011b7d268059",
//                     "__v": 0
//                 },
//                 {
//                     "_id": "68d90f521a97011b7d268068",
//                     "title": "S1 T2",
//                     "timeduration": "75.84",
//                     "description": "S1 D2",
//                     "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1759055673/Learnova/hgvzc3gqwccueq5l2m3o.mp4",
//                     "sectiontowhichitbelong": "68d90f211a97011b7d268059",
//                     "__v": 0
//                 }
//             ],
//             "__v": 0
//         },
//         {
//             "_id": "68d90f5e1a97011b7d268070",
//             "sectionname": "Section 2",
//             "subsection": [
//                 {
//                     "_id": "68d90f751a97011b7d268077",
//                     "title": "S2 T1",
//                     "timeduration": "14.202667",
//                     "description": "S2 D1",
//                     "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1759055708/Learnova/cv8u2wcsvhrjhithuprb.mp4",
//                     "sectiontowhichitbelong": "68d90f5e1a97011b7d268070",
//                     "__v": 0
//                 }
//             ],
//             "__v": 0
//         }
//     ],
//     "ratingandreviews": [],
//     "price": 1,
//     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759055620/Learnova/qdzq6wefg4bv5tidgt4g.jpg",
//     "createdat": "2025-09-28T10:34:04.267Z",
//     "category": "67bc8a863ba49102ce51f786",
//     "studentenrolled": [
//         "68d8f0005d51e74ea041f2e4"
//     ],
//     "__v": 0,
//     "status": "Published",
//     "totaldur": "1mins 34secs",
//     "progresspercentage": 100,
//     "completedvideos": [
//         "68d90f331a97011b7d26805f",
//         "68d90f521a97011b7d268068",
//         "68d90f751a97011b7d268077"
//     ]
// }