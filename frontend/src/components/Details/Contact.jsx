import React, { useState } from 'react'
import { IoCall } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";
import { IoTime } from "react-icons/io5";
import { IoTimeSharp } from "react-icons/io5";
import Footer from './Footer';
import {useForm} from "react-hook-form";
import { apiconnector } from '../../services/apiconnector';
import { contactusurl } from '../../services/apis';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ReviewSlider from '../Reusable/ReviewSlider';

const Contact = () => {

    const navi = useNavigate();

    const[loading,setLoading] = useState(false);

    const {register,handleSubmit,getValues,setValue,formState:{errors,isSubmitSuccessful,isSubmitting}} = useForm();

    const Submitform = async (data) => {

        setLoading(true);

        const toastid = toast.loading('Submitting...', {

                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#713200',
                    },
                    iconTheme: {
                        primary: '#713200',
                        secondary: '#FFFAEE',
                    },
                    duration:5000
                });

        try{

            const r = await apiconnector("POST",contactusurl,data);

            if(r.data.success){

                toast.success('Thanks for getting in touch with us, We will get back to you soon.', {

                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#713200',
                    },
                    iconTheme: {
                        primary: '#713200',
                        secondary: '#FFFAEE',
                    },
                    duration:5000
                });

                navi("/");

            } else{

                toast.error('Error in submitting the form! Please try again later', {

                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#713200',
                    },
                    iconTheme: {
                        primary: '#713200',
                        secondary: '#FFFAEE',
                    },
                    duration:5000
                });

                throw new Error(r.data.message);

            }
        
        } catch(err){

            console.log("Error in contact us form submission",err);

            toast.error("Error in submitting the form!");

        } finally{

            setValue("firstname","");
            setValue("lastname","");
            setValue("email","");
            setValue("phonenumber","");
            setValue("message","");
            setLoading(false);
            toast.dismiss(toastid);

        }

    }

  return (

    <div>

        <section className='bg-[#020813] relative'>

            <svg className='absolute top-[200px]' width="239" height="601" viewBox="0 0 239 601" fill="none" xmlns="http://www.w3.org/2000/svg"><rect opacity="0.2" x="-184.451" y="600.973" width="196" height="541.607" rx="2" transform="rotate(-128.7 -184.451 600.973)" fill="url(#paint0_linear_93:235)"></rect><rect opacity="0.2" x="-188.201" y="385.272" width="59.7544" height="541.607" rx="2" transform="rotate(-128.7 -188.201 385.272)" fill="url(#paint1_linear_93:235)"></rect><defs><linearGradient id="paint0_linear_93:235" x1="-90.1184" y1="420.414" x2="-90.1184" y2="1131.65" gradientUnits="userSpaceOnUse"><stop stopColor="#4A6CF7"></stop><stop offset="1" stopColor="#4A6CF7" stopOpacity="0"></stop></linearGradient><linearGradient id="paint1_linear_93:235" x1="-159.441" y1="204.714" x2="-159.441" y2="915.952" gradientUnits="userSpaceOnUse"><stop stopColor="#4A6CF7"></stop><stop offset="1" stopColor="#4A6CF7" stopOpacity="0"></stop></linearGradient></defs></svg>

            <svg className='absolute top-[495px]' width="239" height="601" viewBox="0 0 239 601" fill="none" xmlns="http://www.w3.org/2000/svg"><rect opacity="0.2" x="-184.451" y="600.973" width="196" height="541.607" rx="2" transform="rotate(-128.7 -184.451 600.973)" fill="url(#paint0_linear_93:235)"></rect><rect opacity="0.2" x="-188.201" y="385.272" width="59.7544" height="541.607" rx="2" transform="rotate(-128.7 -188.201 385.272)" fill="url(#paint1_linear_93:235)"></rect><defs><linearGradient id="paint0_linear_93:235" x1="-90.1184" y1="420.414" x2="-90.1184" y2="1131.65" gradientUnits="userSpaceOnUse"><stop stopColor="#4A6CF7"></stop><stop offset="1" stopColor="#4A6CF7" stopOpacity="0"></stop></linearGradient><linearGradient id="paint1_linear_93:235" x1="-159.441" y1="204.714" x2="-159.441" y2="915.952" gradientUnits="userSpaceOnUse"><stop stopColor="#4A6CF7"></stop><stop offset="1" stopColor="#4A6CF7" stopOpacity="0"></stop></linearGradient></defs></svg>

            <div className='font-nuninto w-[75%] sm:w-[60%] md:w-[50%] lg:w-[40%] mx-auto text-center pt-32 pb-20'>

                <h1 className='text-[#dbdded] text-4xl mb-3.5'>Let’s Stay Connected</h1>

                <p className='text-[#79808a] text-lg'>Have questions or need support? Reach out to our team anytime we’re here to help you on your learning journey.</p>

            </div>

            <div className='text-white flex justify-center gap-20 xl:gap-10 pb-8 flex-col-reverse items-center xl:items-start xl:flex-row'>

                <div className='w-[90%] sm:w-max'>

                    <div className='flex gap-5 border border-gray-700 items-start px-8 py-6 mb-5 rounded-md bg-[#020813] relative z-10'>

                        <span className='text-[#6e75c6] hover:text-[#dbdded] bg-[#dbdded] hover:bg-[#6e75c6] rounded-full p-[12px] transition-all duration-200'><IoCall size={25}></IoCall></span>

                        <div>

                            <h1 className='font-rubik text-2xl mb-1.5'>Contact</h1>

                            <p className='text-[#7b8089] font-nuninto'>8305766456 <br/> piyushdhote966@gmail.com</p>

                        </div>

                    </div>

                    <div className='flex gap-5 border border-gray-700 items-start px-8 py-6 mb-5 rounded-md bg-[#020813] relative z-10'>

                        <span className='text-[#6e75c6] hover:text-[#dbdded] bg-[#dbdded] hover:bg-[#6e75c6] rounded-full p-[12px] transition-all duration-200'><IoLocationSharp size={25}></IoLocationSharp></span>

                        <div>

                            <h1 className='font-rubik text-2xl mb-1.5'>Location</h1>

                            <p className='text-[#7b8089] font-nuninto'>Flat No. 203, Shanti Residency, VIP Road, <br/> Raipur – 492001, Chhattisgarh, India</p>

                        </div>

                    </div>

                    <div className='flex gap-5 border border-gray-700 items-start px-8 py-6 rounded-md bg-[#020813] relative z-10'>
                        
                        <span className='text-[#6e75c6] hover:text-[#dbdded] bg-[#dbdded] hover:bg-[#6e75c6] rounded-full p-[12px] transition-all duration-200'><IoTimeSharp size={25}></IoTimeSharp></span>

                        <div>

                            <h1 className='font-rubik text-2xl mb-1.5'>Schedule</h1>

                            <p className='text-[#7b8089] font-nuninto'>24 Hours / 7 Days Open <br/> Office time : 10 AM - 4:00 PM</p>

                        </div>

                    </div>

                </div>

                <div className='px-[30px] sm:px-10 py-10 rounded-md w-[90%] sm:w-[80%] md:w-[75%] xl:w-[52%] border border-gray-700 relative'>

                    <svg className='absolute top-0 right-0' width="162" height="91" viewBox="0 0 162 91" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.3"><path opacity="0.45" d="M1 89.9999C8 77.3332 27.7 50.7999 50.5 45.9999C79 39.9999 95 41.9999 106 30.4999C117 18.9999 126 -3.50014 149 -3.50014C172 -3.50014 187 4.99986 200.5 -8.50014C214 -22.0001 210.5 -46.0001 244 -37.5001C270.8 -30.7001 307.167 -45 322 -53" stroke="url(#paint0_linear_1028_603)"></path><path opacity="0.45" d="M43 64.9999C50 52.3332 69.7 25.7999 92.5 20.9999C121 14.9999 137 16.9999 148 5.49986C159 -6.00014 168 -28.5001 191 -28.5001C214 -28.5001 229 -20.0001 242.5 -33.5001C256 -47.0001 252.5 -71.0001 286 -62.5001C312.8 -55.7001 349.167 -70 364 -78" stroke="url(#paint1_linear_1028_603)"></path><path opacity="0.45" d="M4 73.9999C11 61.3332 30.7 34.7999 53.5 29.9999C82 23.9999 98 25.9999 109 14.4999C120 2.99986 129 -19.5001 152 -19.5001C175 -19.5001 190 -11.0001 203.5 -24.5001C217 -38.0001 213.5 -62.0001 247 -53.5001C273.8 -46.7001 310.167 -61 325 -69" stroke="url(#paint2_linear_1028_603)"></path><path opacity="0.45" d="M41 40.9999C48 28.3332 67.7 1.79986 90.5 -3.00014C119 -9.00014 135 -7.00014 146 -18.5001C157 -30.0001 166 -52.5001 189 -52.5001C212 -52.5001 227 -44.0001 240.5 -57.5001C254 -71.0001 250.5 -95.0001 284 -86.5001C310.8 -79.7001 347.167 -94 362 -102" stroke="url(#paint3_linear_1028_603)"></path></g><defs><linearGradient id="paint0_linear_1028_603" x1="291.35" y1="12.1032" x2="179.211" y2="237.617" gradientUnits="userSpaceOnUse"><stop offset="0.328125" stopColor="#fff"></stop><stop offset="1" stopColor="#fff" stopOpacity="0"></stop></linearGradient><linearGradient id="paint1_linear_1028_603" x1="333.35" y1="-12.8968" x2="221.211" y2="212.617" gradientUnits="userSpaceOnUse"><stop offset="0.328125" stopColor="#fff"></stop><stop offset="1" stopColor="#fff" stopOpacity="0"></stop></linearGradient><linearGradient id="paint2_linear_1028_603" x1="294.35" y1="-3.89678" x2="182.211" y2="221.617" gradientUnits="userSpaceOnUse"><stop offset="0.328125" stopColor="#fff"></stop><stop offset="1" stopColor="#fff" stopOpacity="0"></stop></linearGradient><linearGradient id="paint3_linear_1028_603" x1="331.35" y1="-36.8968" x2="219.211" y2="188.617" gradientUnits="userSpaceOnUse"><stop offset="0.328125" stopColor="#fff"></stop><stop offset="1" stopColor="#fff" stopOpacity="0"></stop></linearGradient></defs></svg>

                    <h1 className='text-[#6e75c6] text-4xl font-nuninto text-center pb-2'>Get in Touch</h1>

                    <div className='font-lexend'>

                        <form onSubmit={handleSubmit(Submitform)} noValidate>
                            
                            <div className='flex flex-col md:flex-row gap-5 my-9'>

                                <div className='flex flex-col w-full'>

                                    <label htmlFor="firstname" className='mb-3'>First name</label>

                                    <input type="text" name='firstname' id='firstname' className='bg-transparent outline-0 border-2 border-[#79808a] py-3 px-5 rounded-md focus:border-[#5d6eee] transition-all duration-300 placeholder:text-gray-700' placeholder='David' {...register("firstname",{required:"First name is required",pattern:{ value: /^[A-Za-z]+$/, message: "Only alphabets allowed"},maxLength: { value: 20, message: "Maximum 20 characters" }})}/>

                                    { errors.firstname && <span className='text-red-500 text-sm pt-1 font-light'>{errors.firstname.message}</span>}

                                </div>

                                <div className='flex flex-col w-full'>

                                    <label htmlFor="lastname" className='mb-3'>Last name</label>

                                    <input type="text" name='lastname' id='lastname' className='bg-transparent outline-0 border-2 border-[#79808a] py-3 px-5 rounded-md focus:border-[#5d6eee] transition-all duration-300 placeholder:text-gray-700' placeholder='Wonder' {...register("lastname",{pattern:{ value: /^[A-Za-z]+$/, message: "Only alphabets allowed"},maxLength: { value: 20, message: "Maximum 20 characters" }})}/>

                                    { errors.lastname && <span className='text-red-500 text-sm pt-1 font-light'>{errors.lastname.message}</span>}

                                </div>

                            </div>

                            <div className='flex flex-col md:flex-row gap-5 my-9'>

                                <div className='flex flex-col w-full'>

                                    <label htmlFor="email" className='mb-3'>Email</label>

                                    <input autoComplete='name' type="email" name='email' id='email' className='bg-transparent outline-0 border-2 border-[#79808a] py-3 px-5 rounded-md focus:border-[#5d6eee] transition-all duration-300 placeholder:text-gray-700' placeholder='example@gmail.com' {...register("email",{required:"Email is required",pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,message: "Enter a valid email"}})}/>

                                    { errors.email && <span className='text-red-500 text-sm pt-1 font-light'>{errors.email.message}</span>}

                                </div>

                                <div className='flex flex-col w-full'>

                                    <label htmlFor="phonenumber" className='mb-3'>Phone</label>

                                    <input type="tel" name='phonenumber' id='phonenumber' className='bg-transparent outline-0 border-2 border-[#79808a] py-3 px-5 rounded-md focus:border-[#5d6eee] transition-all duration-300 placeholder:text-gray-700' placeholder='1234567890' inputMode='numeric'  pattern="[0-9]*" maxLength={10} {...register("phonenumber",{pattern: { value: /^[0-9]{10}$/,message: "Enter a valid 10-digit phone number"}})}/>

                                    { errors.phonenumber && <span className='text-red-500 text-sm pt-1 font-light'>{errors.phonenumber.message}</span>}

                                </div>

                            </div>

                            <div className='flex flex-col my-9 w-full'>

                                <label htmlFor="textarea" className='mb-3'>Message</label>

                                <textarea name="textarea" id="textarea" rows={10} className='bg-transparent outline-0 border-2 border-[#79808a] resize-none py-3 px-5 rounded-md focus:border-[#5d6eee] transition-all duration-300 placeholder:text-gray-700' placeholder='Type Something' {...register("message",{required:"Message is required"})}></textarea>

                                { errors.message && <span className='text-red-500 text-sm pt-1 font-light'>{errors.message.message}</span>}

                            </div>

                            <div className='text-center'>

                                <button type="submit" className='bg-[#5d6eee] rounded-full px-8 py-2.5 font-rubik font-medium transition-all duration-200 active:scale-95' disabled={isSubmitting && loading}> { isSubmitting ? "Submitting...":"Send Message"}</button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </section>

        <ReviewSlider></ReviewSlider>

        <Footer></Footer>

    </div>

  )
}

export default Contact