import { useForm } from "react-hook-form";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiconnector } from "../../services/apiconnector";
import { authenticationurl } from "../../services/apis";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/Authslice";
import { setUser } from "../../redux/Userslice";
import { loadcart } from "../../redux/Cartslice";

function Loginform(){

    const navi = useNavigate();

    const dispatch = useDispatch();

    const[showpassword,setShowPassword] = useState(false);

    const[loading,setLoading] = useState(false);

    function movetosignup(){

        navi("/signup");

    }

    const{register,handleSubmit,getValues,setValue,formState:{errors,isSubmitting,isSubmitted}} = useForm();

    const Submitform = async(data) => {

        const email = data.email;

        const password = data.password;

        setLoading(true);

        const toastid = toast.loading("Loading...");

        try{

            const res = await apiconnector("POST",authenticationurl.login,{email,password});

            if(res.data.success){

                toast.success("Logged In Successfully");

                dispatch(setToken(res.data.token));

                let userimg;

                if(res.data.finduser.image.includes("cloudinary")){

                    userimg = res.data.finduser.image;

                } else{

                    userimg = `https://api.dicebear.com/5.x/initials/svg?seed=${res.data.finduser.firstname} ${res.data.finduser.lastname}&backgroundColor=714ada`

                }

                const user = {

                    userinfo:res.data.finduser,
                    image:userimg

                }

                dispatch(setUser(user));

                localStorage.setItem("token",res.data.token);

                localStorage.setItem("userdetails",JSON.stringify(user));

                localStorage.setItem("loginTime", Date.now());

                // dispatch(loadcart(res.data.finduser._id));

            } else{

                toast.error("Login Failed");

            }

            navi("/");

        } catch(err){

            console.log("Error in Signing Up",err);
            toast.error("Error in Signing Up! Please try again");
            navi("/");

        } finally{

            toast.dismiss(toastid);

            setLoading(false);
        }


    }

    return (

        <div className="bg-white text-black px-3 py-6 sm:p-[25px] xl:p-8 rounded-xl shadow-xl">
        
            <h1 className="text-[28px] font-rubik mb-1 text-center">Sign in to <span className="text-[#a855f7]">Learnova</span></h1>
        
            <p className="text-gray-600 font-rubik text-center mb-6">Please enter your credentials</p>
        
            <form className="flex flex-col gap-8" onSubmit={handleSubmit(Submitform)} noValidate>
        
                <div className="flex flex-col">
        
                    <label htmlFor="email" className="font-rubik mb-1.5">Email</label>
        
                    <div className="relative">
        
                        <input type="email" id="email" placeholder="Enter your email" className="text-[15px] sm:text-base outline-none border border-[#e2e8f0] pl-12 py-2 rounded-md w-full focus:border-purple-400" {...register("email",{required:"Email is required",pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,message: "Enter a valid email"}})}></input>

        
                        <MdOutlineMail size={23} className="absolute top-1/2 -translate-y-1/2 text-gray-400 left-3"></MdOutlineMail>

                        { errors.email && <span className='text-red-500 text-sm pt-1 absolute left-0 -bottom-[22px]'>{errors.email.message}</span>}
        
                    </div>
        

                </div>
        
                <div className="flex flex-col">
        
                    <label htmlFor="password" className="font-rubik mb-1.5">Password</label>
        
                    <div className="relative">
        
                        <input type={`${showpassword ? "text" : "password"}`} id="password" placeholder="Enter your password" className="text-[15px] sm:text-base outline-none border border-[#e2e8f0] pl-12 py-2 rounded-md w-full focus:border-purple-400" {...register("password",{required:"Password is required"})}/>
        
                        <MdOutlineLock size={23} className="absolute top-1/2 -translate-y-1/2 text-gray-400 left-3"></MdOutlineLock>

                        {showpassword ? <FaRegEyeSlash size={20} className="absolute top-1/2 -translate-y-1/2 text-gray-400 right-3 cursor-pointer" onClick={()=>setShowPassword(false)}></FaRegEyeSlash> : <FaRegEye size={20} className="absolute top-1/2 -translate-y-1/2 text-gray-400 right-3 cursor-pointer" onClick={()=>setShowPassword(true)}></FaRegEye>}
        
                        { errors.password && <span className='text-red-500 text-sm pt-1 absolute left-0 -bottom-[22px]'>{errors.password.message}</span>}
                    </div>

        
                    <button className="place-self-end italic text-[#4169e1] font-nuninto pt-1" onClick={()=>navi("/forgot-password")} type="Button">Forgot Password</button>
        
                </div>
        
                <button disabled={loading} className="text-lg bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-nuninto font-semibold transition-all duration-200 active:scale-95" type="submit">Sign In</button>
        
            </form>
        
            <p className="mt-5 text-center font-rubik">Don't have an account? <button className="text-[#a855f7]" onClick={movetosignup}>Sign Up</button></p>
        
        </div>
    )

}

export default Loginform;