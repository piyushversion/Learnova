import { useState } from "react"
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import { apiconnector } from "../../services/apiconnector";
import { authenticationurl } from "../../services/apis";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Updatepassword = () => {

    const [loading,setLoading] = useState(false);

    const navi = useNavigate();

    const{register,handleSubmit,getValues,setValue,formState:{errors,isSubmitting,isSubmitted}} = useForm();
    
    const[showpassword,setShowPassword] = useState(false);
    const[showconfirmpassword,setShowConfirmPassword] = useState(false);

    const loc = useLocation();

    const Submitform = async(data)=>{

        const password = data.password;
        const confirmpassword = data.confirmpassword;

        if(password !== confirmpassword){

            toast.error("Passwords do not match");

            return;
        }
        
        const code = loc.pathname.split("/").at(-1);

        setLoading(true);

        try {
            
            const response = await apiconnector("POST",authenticationurl.updatepassword,{password,confirmpassword,code})

            if(!response.data.success){
                
                throw new Error(response.data.message);
            }

            toast.success("Password updated successfully");

        } catch (error) {
            
            console.log("Error in updating password",error);
            toast.error("Error in updating the password! Please try again");
        }

        setLoading(false);

        navi("/");

    }

  return (

    <div className="bg-[#020813] h-screen flex items-center justify-center">

        {
            loading ? <div className='text-white text-4xl font-rubik'>Loading...</div> : <div className="w-[80%] sm:w-[50%] md:w-[43%] lg:w-[35%] xl:w-[30%]">

                <h1 className="text-white text-3xl font-nuninto text-center md:text-left">Time for a Fresh Password</h1>

                <p className="text-[#79808a] font-lexend my-4 text-center md:text-left">You're seconds away from being back in just enter a new password.</p>

                <form className="flex flex-col gap-[34px]" onSubmit={handleSubmit(Submitform)}>

                    <div className="flex flex-col">
                            
                        <label htmlFor="password" className="font-rubik mb-1.5 text-[#dbdded]">Your Fresh Start Password</label>
                            
                        <div className="relative">
                            
                            <input type={`${showpassword ? "text" : "password"}`} id="password" placeholder="XXXXXXX" className="text-white bg-transparent outline-0 border-2 border-[#79808a] py-3 px-5 rounded-md focus:border-[#5d6eee] transition-all duration-300 placeholder:text-gray-700 w-full" {...register("password",{required:"Password is required"})}/>
                    
                            {showpassword ? <FaRegEyeSlash size={20} className="absolute top-1/2 -translate-y-1/2 text-gray-400 right-3 cursor-pointer" onClick={()=>setShowPassword(false)}></FaRegEyeSlash> : <FaRegEye size={20} className="absolute top-1/2 -translate-y-1/2 text-gray-400 right-3 cursor-pointer" onClick={()=>setShowPassword(true)}></FaRegEye>}
                    
                            {errors.password && <span className='text-red-500 text-sm pt-1 absolute left-0 -bottom-[22px]'>{errors.password.message}</span>}
                            
                            
                        </div>
                            
                    </div>
                            
                    <div className="flex flex-col">
                            
                        <label htmlFor="confirmpassword" className="font-rubik mb-1.5 text-[#dbdded]">Repeat Password to Lock it in</label>
                            
                        <div className="relative">
                            
                            <input type={`${showconfirmpassword ? "text" : "password"}`} id="confirmpassword" placeholder="XXXXXXX" className="text-white bg-transparent outline-0 border-2 border-[#79808a] py-3 px-5 rounded-md focus:border-[#5d6eee] transition-all duration-300 placeholder:text-gray-700 w-full" {...register("confirmpassword",{required:"Password is required"})}/>
                    
                            {showconfirmpassword ? <FaRegEyeSlash size={20} className="absolute top-1/2 -translate-y-1/2 text-gray-400 right-3 cursor-pointer" onClick={()=>setShowConfirmPassword(false)}></FaRegEyeSlash> : <FaRegEye size={20} className="absolute top-1/2 -translate-y-1/2 text-gray-400 right-3 cursor-pointer" onClick={()=>setShowConfirmPassword(true)}></FaRegEye>}
                            
                            {errors.confirmpassword && <span className='text-red-500 text-sm pt-1 absolute left-0 -bottom-[22px]'>{errors.confirmpassword.message}</span>}

                        </div>
                            
                    </div>

                    <button className="bg-[#5d6eee] text-white px-5 py-2 text-lg font-rubik rounded-md w-full active:scale-95 transition-all duration-200">Update</button>

                </form>

            </div>
        }

     </div>

  )

}

export default Updatepassword