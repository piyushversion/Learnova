import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { apiconnector } from "../../services/apiconnector";
import { categoriesurl } from "../../services/apis";
import Footer from "../Details/Footer";
import { CategoryCourseCard } from "./CategoryCourseCard";
import { MoonLoader } from "react-spinners";

export const CategoryPage = () => {

    const{categoryid} = useParams();

    const[loading,setLoading] = useState(true);

    const[categoryData,setCategoryData] = useState(null);

    const[randomData,setRandomData] = useState(null);

    const getcategorypagedetails = async() => {

        const toastid = toast.loading("Fetching...");

        setLoading(true);

        try{

            const res = await apiconnector("POST",categoriesurl.categorypagedetails,{categoryid:categoryid});

            if (!res?.data?.success) {

                throw new Error(res?.data?.message || "Unknown error");

            }

            console.log(res.data.data);

            setCategoryData(res.data.data.allcourses);

            setRandomData(res.data.data.randomCategory);

        } catch(err){

            console.log("Error in fetching : ",err);
            
            toast.error(err?.response?.data?.message || err.message);

        } finally{

            toast.dismiss(toastid);

            setLoading(false);

        }

    }

    useEffect(()=>{

        getcategorypagedetails();

    },[categoryid])

    return (
    
        <div className="bg-[#0b101f]">

            {
                loading ? <div className="h-screen w-full flex flex-col justify-center items-center gap-5"><p className="text-[#dbdded] text-4xl font-nuninto tracking-wide">Loading...</p> <MoonLoader color="#5d6eee" size={170}></MoonLoader></div> :

                <div className="w-[85%] md:w-[90%] lg:w-[85%] mx-auto pt-24 mb-7">

                    <div className="w-full sm:w-1/2 pb-10 text-center sm:text-left">

                        <h1 className="text-[35px] text-[#7888f7] font-nuninto tracking-wide font-semibold">{categoryData?.name}</h1>

                        <p className="text-[#8f98ac] text-lg font-nuninto mb-4">{categoryData?.description}</p>

                        <span className="bg-[#020813] px-4 pt-2 pb-2.5 border border-[#a59e7d] rounded-full text-[#dbdded] font-lexend tracking-wide">{categoryData?.courseswithparticularcategory?.length} Courses Available</span>

                    </div>

                    <div>

                        <h1 className="bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent font-nuninto text-3xl tracking-wide mb-8 mt-1 text-center sm:text-left">Getting started courses</h1>

                        {
                            categoryData?.courseswithparticularcategory?.length === 0 ? <p className="text-[#8f98ac] text-lg font-nuninto mb-4">No courses available in this category.</p> :

                            <div className="flex gap-5 flex-wrap justify-center sm:justify-start">

                                {
                                    categoryData?.courseswithparticularcategory?.map((course,index)=>{

                                        return <CategoryCourseCard key={index} course={course}></CategoryCourseCard>

                                    })
                                }

                            </div>

                        }

                    </div>

                    <div>

                        <h1 className="bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent font-nuninto text-3xl tracking-wide my-10 text-center sm:text-left">Best in {randomData?.name}</h1>

                        <div className="flex gap-5 flex-wrap justify-center sm:justify-start">  

                            {
                                randomData?.courseswithparticularcategory?.map((course,index)=>{

                                    return <CategoryCourseCard key={index} course={course}></CategoryCourseCard>

                                })
                            }

                        </div>

                    </div>
                
                </div>


            }

            <Footer></Footer>

        </div>
    )
}

// {
//     "allcourses": {
//         "_id": "67bc8a863ba49102ce51f786",
//         "name": "Java",
//         "description": "This is Java category",
//         "courseswithparticularcategory": [
//             {
//                 "_id": "68d6cee3e39a42667a27e3fd",
//                 "coursename": "Course 2",
//                 "coursedescription": "About course 2 and its details.",
//                 "whatyouwilllearn": "Point 1 in details",
//                 "courselanguage": "Spanish",
//                 "teacher": {
//                     "_id": "68bc7758556efb471b8ce19b",
//                     "firstname": "Rubel",
//                     "lastname": "Maratha"
//                 },
//                 "coursecontent": [
//                     {
//                         "_id": "68d6cee9e39a42667a27e402",
//                         "sectionname": "Section 1",
//                         "subsection": [
//                             {
//                                 "_id": "68d6cf01e39a42667a27e408",
//                                 "title": "S1 T1",
//                                 "timeduration": "75.84",
//                                 "description": "S1 D1",
//                                 "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1758908136/Learnova/badsqjfpf1ff4rnyz3fi.mp4",
//                                 "sectiontowhichitbelong": "68d6cee9e39a42667a27e402",
//                                 "__v": 0
//                             }
//                         ],
//                         "__v": 0
//                     }
//                 ],
//                 "ratingandreviews": [],
//                 "price": 1,
//                 "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1758908107/Learnova/srokqebeuhh7spbvyjpx.jpg",
//                 "createdat": "2025-09-26T17:35:31.769Z",
//                 "category": "67bc8a863ba49102ce51f786",
//                 "studentenrolled": [
//                     "68bc78bc556efb471b8ce1ac"
//                 ],
//                 "__v": 0,
//                 "status": "Published"
//             },
//             {
//                 "_id": "68d7b51e30d3fcda08f02f2f",
//                 "coursename": "jk",
//                 "coursedescription": "kkj",
//                 "whatyouwilllearn": "Point 1 in details",
//                 "courselanguage": "English",
//                 "teacher": {
//                     "_id": "68bc7758556efb471b8ce19b",
//                     "firstname": "Rubel",
//                     "lastname": "Maratha"
//                 },
//                 "coursecontent": [
//                     {
//                         "_id": "68d7b52430d3fcda08f02f34",
//                         "sectionname": "Section 1",
//                         "subsection": [
//                             {
//                                 "_id": "68d7b5af30d3fcda08f02f41",
//                                 "title": "S1 T1",
//                                 "timeduration": "75.84",
//                                 "description": "S1 D1",
//                                 "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1758967190/Learnova/r7ulxs36vswem0bqwwyl.mp4",
//                                 "sectiontowhichitbelong": "68d7b52430d3fcda08f02f34",
//                                 "__v": 0
//                             }
//                         ],
//                         "__v": 0
//                     }
//                 ],
//                 "ratingandreviews": [],
//                 "price": 1,
//                 "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1758967046/Learnova/zu3drtrdefkeumzig68p.png",
//                 "createdat": "2025-09-27T09:57:50.867Z",
//                 "category": "67bc8a863ba49102ce51f786",
//                 "studentenrolled": [
//                     "68bc78bc556efb471b8ce1ac"
//                 ],
//                 "__v": 0,
//                 "status": "Published"
//             },
//             {
//                 "_id": "68d7b5f330d3fcda08f02f4a",
//                 "coursename": "Live course",
//                 "coursedescription": "I am testing live payment in this course.",
//                 "whatyouwilllearn": "Point 1 in details",
//                 "courselanguage": "Hinglish",
//                 "teacher": {
//                     "_id": "68bc7758556efb471b8ce19b",
//                     "firstname": "Rubel",
//                     "lastname": "Maratha"
//                 },
//                 "coursecontent": [
//                     {
//                         "_id": "68d7b5f830d3fcda08f02f4f",
//                         "sectionname": "Section 1",
//                         "subsection": [
//                             {
//                                 "_id": "68d7b68930d3fcda08f02f55",
//                                 "title": "S1 T1",
//                                 "timeduration": "14.202667",
//                                 "description": "S1 D1",
//                                 "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1758967407/Learnova/cl1qi2fodigjcka4sq1s.mp4",
//                                 "sectiontowhichitbelong": "68d7b5f830d3fcda08f02f4f",
//                                 "__v": 0
//                             }
//                         ],
//                         "__v": 0
//                     }
//                 ],
//                 "ratingandreviews": [],
//                 "price": 1,
//                 "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1758967258/Learnova/ykwi4zx35xjkdzc4za7l.png",
//                 "createdat": "2025-09-27T10:01:23.041Z",
//                 "category": "67bc8a863ba49102ce51f786",
//                 "studentenrolled": [
//                     "68bc78bc556efb471b8ce1ac"
//                 ],
//                 "__v": 0,
//                 "status": "Published"
//             }
//         ],
//         "__v": 0
//     },
//     "randomCategory": {
//         "_id": "67bc8af73ba49102ce51f78c",
//         "name": "Web Development",
//         "description": "This is Web Development category",
//         "courseswithparticularcategory": [
//             {
//                 "_id": "68d6d071e39a42667a27e473",
//                 "coursename": "Course 5",
//                 "coursedescription": "About course 5 and its details.",
//                 "whatyouwilllearn": "Point 1 details\r\nPoint 2 details",
//                 "courselanguage": "Hindi",
//                 "teacher": {
//                     "_id": "68bc7758556efb471b8ce19b",
//                     "firstname": "Rubel",
//                     "lastname": "Maratha"
//                 },
//                 "coursecontent": [
//                     {
//                         "_id": "68d6d0e7e39a42667a27e478",
//                         "sectionname": "Section 1",
//                         "subsection": [
//                             {
//                                 "_id": "68d6d0fae39a42667a27e47e",
//                                 "title": "S1 T1",
//                                 "timeduration": "14.202667",
//                                 "description": "S1 D1",
//                                 "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1758908641/Learnova/zskpbbakcm2gkgptupyu.mp4",
//                                 "sectiontowhichitbelong": "68d6d0e7e39a42667a27e478",
//                                 "__v": 0
//                             }
//                         ],
//                         "__v": 0
//                     }
//                 ],
//                 "ratingandreviews": [],
//                 "price": 1,
//                 "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1758908506/Learnova/srvmajpb8ruyz6qssedp.webp",
//                 "createdat": "2025-09-26T17:42:09.669Z",
//                 "category": "67bc8af73ba49102ce51f78c",
//                 "studentenrolled": [
//                     "68bc78bc556efb471b8ce1ac"
//                 ],
//                 "__v": 0,
//                 "status": "Published"
//             }
//         ],
//         "__v": 0
//     }
// }