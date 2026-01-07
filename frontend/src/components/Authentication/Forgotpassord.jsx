import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {toast} from "react-hot-toast";
import { apiconnector } from '../../services/apiconnector';
import { authenticationurl } from '../../services/apis';

const Forgotpassord = () => {

  const[loading,setLoading] = useState(false);

  const[emailsent,setEmailSent] = useState(false);

  const[email,setEmail] = useState("");

  const navi = useNavigate();

  const dispatch = useDispatch();

  const handlesubmit = async(e) =>{

    e.preventDefault();

    const toastid = toast.loading("Loading...")

    setLoading(true);

    try {
      
      const response = await apiconnector("POST",authenticationurl.getresetpasswordtoken,{email})

      if(!response.data.success){

          throw new Error(response.data.message);
      }

      toast.success("Email sent successfully! Please check your inbox");

      setEmailSent(true);

    } catch (error) {
      
      console.log("Error in resetting password",error);

      toast.error("Error in resetting the password! Please refresh the page");

    } finally{

      toast.dismiss(toastid);

      setLoading(false); 

    }

  }

  return (

    <div className='bg-[#020813] h-screen flex pt-32 sm:pt-0 items-start sm:items-center justify-center'>

        {
            <div className='w-[85%] sm:w-[60%] md:w-[50%] lg:w-[42%] xl:w-[36%] flex flex-col gap-4'>

                <h1 className='text-white text-3xl font-nuninto text-center md:text-left'>{ emailsent ? "Check Your Email":"Forgot Your Password? Let’s Fix That" }</h1>

                <p className='text-[#79808a] font-lexend text-center md:text-left'>{emailsent ? `We have sent the link to reset password to ${email}.`:"Enter your email address and we’ll send you a link to create a new password. It’s quick, secure, and helps you get back into your account with ease."}</p>

                <form onSubmit={handlesubmit}>

                  {
                    !emailsent && <div className='flex flex-col font-rubik gap-1.5'>

                      <label htmlFor="email" className='text-[#dbdded]'>Email Address</label>

                      <input type="email" name='email' id="email" className='text-white bg-transparent outline-0 border-2 border-[#79808a] py-3 px-5 rounded-md focus:border-[#5d6eee] transition-all duration-300 placeholder:text-gray-700' placeholder='Enter your email address' required onChange={(e)=>setEmail(e.target.value)}/>

                    </div>
                  }

                  <button disabled={loading} type='Submit' className={`bg-[#5d6eee] text-white px-5 py-2 text-lg font-rubik rounded-md w-full active:scale-95 transition-all duration-200 ${emailsent ? "mt-0":"mt-6"}`}>{ emailsent ? "Resend Email":"Send"}</button>

                </form>

                <button onClick={()=>navi("/login")} className='text-white flex items-center gap-2 font-nuninto w-fit'>

                  <FaArrowLeftLong></FaArrowLeftLong>

                  Head Back to Login

                </button>

            </div>
        }

    </div>

  )

}

export default Forgotpassord