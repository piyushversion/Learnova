import React, { useState } from 'react'
import OTPInput from 'otp-input-react';
import { RxCounterClockwiseClock } from "react-icons/rx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiconnector } from '../../services/apiconnector';
import { authenticationurl } from '../../services/apis';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { setToken } from '../../redux/Authslice';
import { setUser } from '../../redux/Userslice';

const Verifyemail = () => {

    const[otp,setOtp] = useState();

    const navi = useNavigate();

    const[loading,setLoading] = useState(false);

    const dispatch = useDispatch();

    const signupdata = useSelector(state => state.Auth.signupdata);

    const handlesubmit = async(e) => {

        e.preventDefault();

        const{firstname,lastname,email,password,confirmpassword,accounttype} = signupdata;

        setLoading(true);

        const id = toast.loading("Loading...");

        try{

            const res = await apiconnector("POST",authenticationurl.signup,{firstname,lastname,email,password,confirmpassword,accounttype,otp}); 

            if(res.data.success){

                toast.success("Signed Up Successfully");

                dispatch(setToken(res.data.token));

                const userimg = res.data.userentry.image;

                const user = {

                    userinfo:res.data.userentry,
                    image:userimg

                }

                dispatch(setUser(user));
                
                localStorage.setItem("token",res.data.token);

                localStorage.setItem("userdetails",JSON.stringify(user));

                localStorage.setItem("loginTime", Date.now());

            } else{

                toast.error(`${res.data.message}`);
            }

            navi("/");

        } catch(err){

            console.log("Error in Signing Up",err);
            
            toast.error("Error in Signing Up! Please try again");

            navi("/");

        } finally{

            toast.dismiss(id);

            setLoading(false);

        }

    }

    const resendfunc = async() => {

        const id = toast.loading("Sending OTP...")

        setLoading(true);

        try {

            const {email} = signupdata;
            
            const resp = await apiconnector("POST",authenticationurl.sendotpapi,{email});

            console.log(resp);

            if(!resp.data.success){

                throw new Error(resp.data.message);

            }

            toast.success("OTP sent successfully");

        } catch (error) {
            
            console.log("Error in sending otp",error);

            toast.error("Error in sending otp! Please try again");

        } finally{

            toast.dismiss(id);

            setLoading(false);

        }


    }

    useEffect(()=>{

        if(!signupdata){

            navi("/signup");

        }

    },[])

  return (

    <div className='bg-[#020813] h-screen flex items-center justify-center'>

        <div className='flex flex-col gap-3 w-[80%] sm:w-max'>

            <h1 className='text-white text-3xl font-nuninto text-center sm:text-left'>Email Confirmation</h1>
            <p className='text-[#79808a] font-lexend text-center sm:text-left'>A one-time code is on its way - enter it to complete verification.</p>

            <form onSubmit={handlesubmit} className='flex flex-col items-center gap-5'>

                <div className='ml-[20px]'>

                    <OTPInput value={otp} onChange={setOtp} OTPLength={6} otpType="number" autoFocus inputClassName=" focus:border outline-0 bg-[#a9a9a980] rounded-md text-white"></OTPInput>

                </div>

                <button className='bg-[#5d6eee] text-white px-5 py-2 text-lg font-rubik rounded-md w-full active:scale-95 transition-all duration-200' disabled={loading}>Validate</button>

            </form>

            <div className='flex items-center flex-col sm:flex-row justify-between'>

                <button onClick={()=>navi("/login")} className='text-white flex items-center gap-2 font-nuninto w-fit my-5'>
                
                    <FaArrowLeftLong></FaArrowLeftLong>
                
                    Head Back to Login
                
                </button>

                <button onClick={resendfunc} disabled={loading} className='text-white flex items-center gap-2 font-nuninto w-fit'>

                    <RxCounterClockwiseClock size={18}></RxCounterClockwiseClock>

                    Request New Code

                </button>

            </div>

        </div>

    </div>

  )

}

export default Verifyemail