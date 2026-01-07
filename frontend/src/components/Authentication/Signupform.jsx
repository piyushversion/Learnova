import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { setSignupData } from "../../redux/Authslice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { apiconnector } from "../../services/apiconnector";
import {authenticationurl} from "../../services/apis";

function Signupform(){

    const navi = useNavigate();

    const dispatch = useDispatch();

    const[showpassword,setShowPassword] = useState(false);

    const[showconfirmpassword,setShowConfirmPassword] = useState(false);

    const[loading,setLoading] = useState(false);
    
    function movetosignin(){

        navi("/login")

    }

    const{register,handleSubmit,getValues,setValue,formState:{errors,isSubmitting,isSubmitted}} = useForm();
    
    const Submitform = async(data) => {
        
        if(data.password !== data.confirmpassword){
            
            toast.error("Password Not Matching");
            
            return
            
        }

        dispatch(setSignupData(data));

        let toastid = toast.loading("Loading...");

        setLoading(true);

        try {
            
            const email = data.email;

            const response = await apiconnector("POST",authenticationurl.sendotpapi,{email});

            console.log(response);

            if(!response.data.success){

                throw new Error(response.data.message);

            }

            toast.success("OTP sent successfully");

            navi("/verifyemail");

        } catch (error) {
            
            console.log("Error in sending otp",error);

            toast.error("Error in sending otp! Please try again");

        } finally{

            setLoading(false);

            toast.dismiss(toastid);

        }

    }

    return (

        <div className="bg-white text-black px-5 py-6 sm:p-[20px] xl:p-8 rounded-xl shadow-xl">
        
            <h1 className="text-[28px] font-rubik mb-1 text-center">Create an account</h1>
        
            <p className="text-gray-600 font-rubik text-center mb-6">Join <span className="text-[#a855f7]">learnova</span> today</p>
        
            <form className="flex flex-col gap-[26px]" onSubmit={handleSubmit(Submitform)} noValidate>
        
                <div className="flex flex-col sm:flex-row gap-5">
        
                    <div className="flex flex-col">
        
                        <label htmlFor="firstname" className="font-rubik mb-1.5">First Name</label>
        
                        <div className="relative">
        
                            <input type="text" id="firstname" placeholder="David" className="outline-none border border-[#e2e8f0] pl-12 lg:pl-[45px] xl:pl-12 py-2 rounded-md w-full focus:border-purple-400" {...register("firstname",{required:"First name is required",pattern:{ value: /^[A-Za-z]+$/, message: "Only alphabets allowed"},maxLength: { value: 20, message: "Maximum 20 characters" }})}></input>
        
                            <LuUserRound size={23} className="absolute top-1/2 -translate-y-1/2 text-gray-400 left-3"></LuUserRound>
        
                            
                        </div>
                            {errors.firstname && <span className='text-red-500 text-sm pt-1'>{errors.firstname.message}</span>}

        
                    </div>
        
                    <div className="flex flex-col">
        
                        <label htmlFor="lastname" className="font-rubik mb-1.5">Last Name</label>
        
                        <div className="relative">
        
                            <input type="text" id="lastname" placeholder="Wonder" className="outline-none border border-[#e2e8f0] pl-12 lg:pl-[45px] xl:pl-12 py-2 rounded-md w-full focus:border-purple-400" {...register("lastname",{pattern:{ value: /^[A-Za-z]+$/, message: "Only alphabets allowed"},maxLength: { value: 20, message: "Maximum 20 characters" }})}></input>
        
                            <LuUserRound size={23} className="absolute top-1/2 -translate-y-1/2 text-gray-400 left-3"></LuUserRound>

        
                        </div>

                        {errors.lastname && <span className='text-red-500 text-sm pt-1'>{errors.lastname.message}</span>}
        
                    </div>
        
                </div>
        
                <div className="flex flex-col">
        
                    <label htmlFor="email" className="font-rubik mb-1.5">Email</label>
        
                    <div className="relative">
        
                        <input type="email" id="email" placeholder="example@gmail.com" className="outline-none border border-[#e2e8f0] pl-12 lg:pl-[45px] xl:pl-12 py-2 rounded-md w-full focus:border-purple-400" {...register("email",{required:"Email is required",pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,message: "Enter a valid email"}})}></input>
        
                        <MdOutlineMail size={23} className="absolute top-1/2 -translate-y-1/2 text-gray-400 left-3"></MdOutlineMail>

                    </div>

                    { errors.email && <span className='text-red-500 text-sm pt-1'>{errors.email.message}</span>}
        
        
                </div>
        
                <div className="flex flex-col sm:flex-row gap-5">
        
                    <div className="flex flex-col">
        
                        <label htmlFor="password" className="font-rubik mb-1.5">Password</label>
        
                        <div className="relative">
        
                            <input type={`${showpassword ? "text" : "password"}`} id="password" placeholder="XXXX" className="outline-none border border-[#e2e8f0] pl-12 lg:pl-[45px] xl:pl-12 py-2 rounded-md w-full focus:border-purple-400" {...register("password",{required:"Password is required"})}/>
        
                            <MdOutlineLock size={23} className="absolute top-1/2 -translate-y-1/2 text-gray-400 left-3"></MdOutlineLock>

                            {showpassword ? <FaRegEyeSlash size={20} className="absolute top-1/2 -translate-y-1/2 text-gray-400 right-3 cursor-pointer" onClick={()=>setShowPassword(false)}></FaRegEyeSlash> : <FaRegEye size={20} className="absolute top-1/2 -translate-y-1/2 text-gray-400 right-3 cursor-pointer" onClick={()=>setShowPassword(true)}></FaRegEye>}

        
        
                        </div>
                        
                        {errors.password && <span className='text-red-500 text-sm pt-1'>{errors.password.message}</span>}
        
                    </div>
        
                    <div className="flex flex-col">
        
                        <label htmlFor="confirmpassword" className="font-rubik mb-1.5">Confirm Password</label>
        
                        <div className="relative">
        
                            <input type={`${showconfirmpassword ? "text" : "password"}`} id="confirmpassword" placeholder="XXXX" className="outline-none border border-[#e2e8f0] pl-12 lg:pl-[45px] xl:pl-12 py-2 rounded-md w-full focus:border-purple-400" {...register("confirmpassword",{required:"Password is required"})}/>
        
                            <MdOutlineLock size={23} className="absolute top-1/2 -translate-y-1/2 text-gray-400 left-3"></MdOutlineLock>

                            {showconfirmpassword ? <FaRegEyeSlash size={20} className="absolute top-1/2 -translate-y-1/2 text-gray-400 right-3 cursor-pointer" onClick={()=>setShowConfirmPassword(false)}></FaRegEyeSlash> : <FaRegEye size={20} className="absolute top-1/2 -translate-y-1/2 text-gray-400 right-3 cursor-pointer" onClick={()=>setShowConfirmPassword(true)}></FaRegEye>}
        
                        </div>

                        {errors.confirmpassword && <span className='text-red-500 text-sm pt-1'>{errors.confirmpassword.message}</span>}
        
                    </div>
        
                </div>
        
                <div>
        
                    <label htmlFor="accounttype" className="font-rubik">Account Type</label>
        
                    <div className="flex items-center gap-6 mt-1">
        
                        <div className="flex gap-1.5">
        
                            <input type="radio" name="accounttype" id="student" value="Student" defaultChecked {...register("accounttype")}></input>
                            <label htmlFor="student" className="font-rubik">Student</label>
        
        
                        </div>
        
                        <div className="flex gap-1.5">
        
                            <input type="radio" name="accounttype" id="instructor" value="Instructor" {...register("accounttype")}></input>
                            <label htmlFor="instructor" className="font-rubik">Instructor</label>
        
                        </div>
        
                    </div>
        
                </div>
        
                <button className="text-lg bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-nuninto font-semibold transition-all duration-200 active:scale-95" disabled={loading}>Sign Up</button>
        
            </form>
        
            <p className="mt-5 text-center font-rubik">Already have an account? <button className="text-[#a855f7]" onClick={movetosignin}>Sign In</button></p>
        
        </div>

    )
}

export default Signupform;