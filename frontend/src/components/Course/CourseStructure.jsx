import { useDispatch, useSelector } from "react-redux"
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { setCourse, setEditCourse, setStep } from "../../redux/Courseslice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PuffLoader } from "react-spinners";
import { apiconnector } from "../../services/apiconnector";
import { courseurl } from "../../services/apis";
import { setNumberOfSections } from "../../redux/Rightsideslice";
import { NoSectionYetCard } from "./NoSectionYetCard";
import { ShowSection } from "./ShowSection";
import { useState } from "react";

export const CourseStructure = () => {

    const dispatch = useDispatch();

    const token = useSelector((state)=>state.Auth.token);

    const[loading,setLoading] = useState(false);

    const course = useSelector((state)=>state.Course.course);

    const{register,setValue,getValues,handleSubmit,formState:{errors,isValid}} = useForm({mode:"onChange"});

    const handleback = () => {

        dispatch(setStep(1));

        dispatch(setEditCourse(true));

    }

    const secsubmit = async(data) => {

        const toastid = toast.loading("Please wait...");

        setLoading(true);

        try{

            const res = await apiconnector("POST",courseurl.createsection,{sectionname:data.sectionname,courseid:course._id},{

                "Authorization": `Bearer ${token}`

            });

            if(!res.data.success){

                throw new Error(res.data.message);

            }

            toast.success("Section created successfully");

            dispatch(setCourse(res.data.data));

            dispatch(setNumberOfSections(res.data.data.coursecontent.length));

            setValue("sectionname","");


        } catch(err){

            console.log("Error while creating section",err);

            toast.error(`${err.response.data.message}`);

        } finally{

            toast.dismiss(toastid);

            setLoading(false);

        }

    }

    const handlenext = () => {

        if(course.coursecontent.length === 0){

            toast.error("Please add a section to move forward.");

            return;
        }

        if(course.coursecontent.some((section) => section.subsection.length === 0)){

            toast.error("Please ensure every section has atleast one lecture.");

            return;

        }

        dispatch(setStep(3));

    }

    return(

        <div className="w-[100%] sm:w-[95%] md:w-[100%] lg:w-[89%] xl:w-[70%] bg-[#020813] rounded-xl border-2 border-[#303036] px-[17px] py-5 sm:px-[25px] sm:py-5">

            <h3 className="font-nuninto text-xl tracking-wide mb-5 font-medium text-center sm:text-left">Course Structure</h3>

            {
                loading ? <div className="h-[48vh] w-full flex flex-col justify-center items-center gap-4"><p className="text-[#dbdded] text-[28px] sm:text-4xl font-nuninto tracking-wide">Please wait...</p> <PuffLoader color="#5d6eee" size={200}></PuffLoader></div> : <>            

                    <form onSubmit={handleSubmit(secsubmit)}>

                        <div className="flex flex-col gap-1.5">

                            <label htmlFor="sectionname" className='text-[17px] sm:text-lg tracking-wide font-nuninto w-max'>Section Name <sup>*</sup></label>

                            <div className="flex items-center justify-between flex-col lg:flex-row gap-4 lg:gap-0">

                                <input type="text" id="sectionname" {...register("sectionname",{required:"Section name is required",pattern:{ value: /^[A-Za-z0-9\s]+$/, message: "No special character allowed" },maxLength: { value: 50, message: "Maximum 50 characters" }})} placeholder="Add a section to build your course" className='bg-[#17171b]/45 border transition-all duration-75 border-[#303036] rounded-lg outline-0 focus:border-[#eac754] p-2.5 font-nuninto w-full lg:w-[74%] self-start text-[15px] sm:text-base'/>

                                <button type="submit" disabled={!isValid || loading} className={`font-nuninto flex items-center gap-2 ${isValid ? "bg-[#eac754] text-black cursor-pointer":"bg-[#242428] text-gray-400 cursor-not-allowed"} pl-3 pr-3.5 py-2 sm:pl-3.5 sm:pr-4 sm:py-2.5 rounded-lg self-center sm:self-end`}>

                                    <FaPlus className="text-[15px] sm:text-base"></FaPlus>

                                    <span className="text-base sm:text-[17px] font-semibold tracking-wide">Add Section</span>

                                </button>

                            </div>

                            {
                                errors.sectionname && <span className="text-red-500 text-sm pt-1 italic font-rubik">{errors.sectionname.message}</span>
                            }

                        </div>

                    </form>

                    {
                            
                        course?.coursecontent?.length === 0 ? <NoSectionYetCard></NoSectionYetCard> : <ShowSection></ShowSection>
                            
                    }

                    <div className="flex items-center justify-between">

                        <button onClick={handleback} className="flex items-center gap-1">
                            
                            <IoIosArrowBack size={19}></IoIosArrowBack>
                            
                            <span className="text-base sm:text-lg tracking-wide font-rubik">Back</span>

                        </button>

                        <button className="flex items-center gap-1 bg-[#eac754] text-black pr-2 pl-3.5 py-1 rounded-md" onClick={handlenext}>

                            <span className="text-base sm:text-lg tracking-wide font-rubik">Next</span>

                            <IoIosArrowForward size={19}></IoIosArrowForward>

                        </button>
                    
                    </div>

                </>

            }

        </div>

    )

}