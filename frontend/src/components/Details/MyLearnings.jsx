import { useSelector } from "react-redux"
import { Sidebar } from "../Reusable/Sidebar"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PuffLoader } from "react-spinners";
import { apiconnector } from "../../services/apiconnector";
import { profileurl } from "../../services/apis";
import { EnrolledCard } from "../Reusable/EnrolledCard";

export const MyLearnings = () => {

    const token = useSelector((state)=>state.Auth.token);

    const[courses,setCourses] = useState();

    const [loading,setLoading] = useState(true);

    const[showFullString,setShowFullString] = useState(false);

    // const cour = [

    //     {
    //         id:1,
    //         title:"Complete React Developer in 2023",
    //         description:"Master React.js and become a professional React Developer with this comprehensive course",
    //         image:"https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    //         time:"20hr 30mins",
    //         progress:75,            
    //     },
    //     {
    //         id:2,
    //         title:"Complete React Developer in 2023",
    //         description:"Master React.js and become a professional React Developer with this comprehensive course",
    //         image:"https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    //         time:"20hr 30mins",
    //         progress:35,            
    //     },
    //     {
    //         id:3,
    //         title:"Complete React Developer in 2023",
    //         description:"Master React.js and become a professional React Developer with this comprehensive course",
    //         image:"https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    //         time:"20hr 30mins",
    //         progress:100,            
    //     },
    //     {
    //         id:4,
    //         title:"Complete React Developer in 2023",
    //         description:"Master React.js and become a professional React Developer with this comprehensive course",
    //         image:"https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    //         time:"20hr 30mins",
    //         progress:50,            
    //     },

    // ]

    const getenrolledcourses = async(token)=>{

        // const id = toast.loading("Loading...");

        try{

            const res = await apiconnector("GET",profileurl.enrolledcourses,null,{

                "Authorization": `Bearer ${token}`

            })

            if(!res.data.success){

                throw new Error(res.data.message);

            }

            setCourses(res.data.data.courses);

        //     toast.success('Fetched Enrolled Courses', {

        //         style: {
        //             border: '1px solid #713200',
        //             padding: '16px',
        //             color: '#713200',
        //         },
        //         iconTheme: {
        //             primary: '#713200',
        //             secondary: '#FFFAEE',
        //         },

        //   });

        } catch(err){

            console.log("Error in fetching enrolled courses : ",err);

            toast.error('Error in fetching enrolled courses', {

            style: {
                border: '1px solid #713200',
                padding: '16px',
                color: '#713200',
            },
            iconTheme: {
                primary: '#713200',
                secondary: '#FFFAEE',
            },
            });

        } finally{

            setLoading(false);

            // toast.dismiss(id);
        }



    }

    useEffect(()=>{

        getenrolledcourses(token);

    },[])

    return (

        <div className="flex flex-col-reverse md:flex-row bg-[#181825] h-screen overflow-hidden">

            <Sidebar></Sidebar>

            <div className="pt-[90px] px-4 sm:px-[20px] xl:px-[26px] w-full md:w-[69%] lg:w-[76%] xl:w-[81%] overflow-y-scroll no-scrollbar">

                <h3 className='text-[#dbdded] font-lexend text-2xl sm:text-[26px] mb-[5px] text-center sm:text-left'>My Enrollments</h3>

                <p className="text-[#79808a] text-lg font-nuninto mb-5 text-center sm:text-left">Continue your learning journey</p>

                <div>

                    {
                        loading ? <div className="h-[65vh] flex flex-col justify-center items-center gap-4"><p className="text-[#dbdded] text-4xl font-rubik tracking-wide">Loading...</p> <PuffLoader color="#5d6eee" size={200}></PuffLoader></div> : <div>

                        {
                            courses && courses.length > 0 ? <div>

                                {
                                    courses.map((item,index)=>{

                                        return <EnrolledCard key={index} item={item} getenrolledcourses={getenrolledcourses}></EnrolledCard>

                                    })
                                }

                            </div> : <div className="h-[55vh] flex justify-center items-center flex-col">

                                <p className="text-white font-nunito mt-5 font-nuninto tracking-wide text-3xl text-center">You have not enrolled in any courses yet !</p>

                            </div>
                        }

                        </div>
                    }

                </div>

            </div>

        </div>

    )

}