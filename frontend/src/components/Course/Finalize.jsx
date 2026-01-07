import { useDispatch, useSelector } from "react-redux"
import { resetCourseState, setStep } from "../../redux/Courseslice"
import { LuCheck } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiconnector } from "../../services/apiconnector";
import { courseurl } from "../../services/apis";
import { Resetstate } from "../../redux/Rightsideslice";
import { useNavigate } from "react-router-dom"
import {BeatLoader, ClimbingBoxLoader, PacmanLoader, PropagateLoader} from "react-spinners";


export const Finalize = () => {

    const dispatch = useDispatch();

    const navi = useNavigate();

    const[loading,setLoading] = useState(false);

    const token = useSelector((state) => state.Auth.token);

    const course = useSelector((state)=> state.Course.course);

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {

        setIsChecked(!isChecked);

    }

    const handleSubmit = async(e) => {

        e.preventDefault();

        if (isChecked) {

            var statuss = "Published";

        } else {

            var statuss = "Private";

        }

        const toastid = toast.loading("Please wait...");

        setLoading(true);

        try{

            const res = await apiconnector("POST",courseurl.editcourse,{status:statuss,courseid:course._id},{

                "Authorization": `Bearer ${token}`

            })

            if (!res?.data?.success) {

                throw new Error(res?.data?.message || "Unknown error");

            }

            if(res.data.data.status === "Published"){

                toast.success('Congratulations! Course has been published successfully.', {

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

            } else{

                toast.success('Course made as private successfully.', {

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

            }

            dispatch(resetCourseState());

            dispatch(Resetstate());

            navi("/dashboard/classroom");

        } catch(err){

            console.log("Error in applying changes : ",err);

            toast.error(err?.response?.data?.message || err.message);

        } finally{

            toast.dismiss(toastid);

            setLoading(false);

        }

    
    }

    return(

        <div className="w-full lg:w-[75%] xl:w-[70%] bg-[#020813] rounded-xl border-2 border-[#303036] px-[25px] py-5">

            <h3 className="font-nuninto text-[22px] tracking-wide mb-6 font-medium text-center sm:text-left">Release Settings</h3>

            {

                loading ? <div className="h-[30vh] w-full flex flex-col gap-[50px] items-center"><p className="text-[#dbdded] text-3xl sm:text-[35px] font-nuninto tracking-wide">Finalizing...</p><PacmanLoader color="#5d6eee" size={30}></PacmanLoader></div> : 

                <form onSubmit={handleSubmit} className="flex flex-col gap-8 sm:gap-6">

                <div className="flex gap-3">

                    <div className="flex items-start">

                        <input type="checkbox" id="publish" className="hidden" checked={isChecked} onChange={handleCheckboxChange}/>

                        <label htmlFor="publish" className="flex items-center cursor-pointer pt-1">

                            <div className="w-5 h-5 border-2 border-[#eac754] rounded-sm flex justify-center items-center transition-all duration-200 peer-checked:bg-[#eac754] peer-checked:border-[#eac754]">

                                {isChecked && <LuCheck className="text-white" />}

                            </div>
                            
                        </label>

                    </div>

                    <div className="flex flex-col gap-1">

                        <label htmlFor="publish" className="font-rubik tracking-wide text-lg">Make this course visible to the public</label>

                        <p className="font-rubik text-[#79808a]">Public courses are visible to all users and can be purchased. Private courses are only visible to you only.</p>

                    </div>

                </div>

                <div className="flex items-center justify-between">

                    <button className="flex items-center gap-1" onClick={() => dispatch(setStep(2))}>
                        
                        <IoIosArrowBack size={19}></IoIosArrowBack>

                        <span className="text-base sm:text-lg tracking-wide font-rubik">Back</span>  

                    </button>
                    
                    <button type="submit" className="bg-[#eac754] text-black px-3 py-1 rounded-md text-base sm:text-lg tracking-wide font-nuninto font-semibold"> Final Click </button>

                </div>

                </form>

            }

        </div>

    )

}