import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginimage from "../../assets/utilities image/loginimage.jpg"
import signupimage from "../../assets/utilities image/signupimage.jpg"
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

function Mainauth(){

    const dispatch = useDispatch();

    const mainmodal = useSelector(state => state.Formstate.mainmodal);

    const loginform = useSelector(state => state.Formstate.loginform);

    const signupform = useSelector(state => state.Formstate.signupform);

    const handlesignup = () => {

        dispatch(setsignupform(true));
        dispatch(setloginform(false));

    }

    const handlesignin = () => {

        dispatch(setsignupform(false));
        dispatch(setloginform(true));

    }

    const handlecancel = ()=>{

        dispatch(setmainmodal(false));
        dispatch(setloginform(false));
        dispatch(setsignupform(false));

    }

    return(

        <div className={`fixed top-0 left-0 h-screen w-screen text-white z-50 bg-[rgba(0,0,0,0.8)] transition-all duration-500 transform flex justify-center items-center ${mainmodal ? "block" : "hidden"}`}>


            { loginform && <div className="flex justify-center">


                <div className="w-[40%] relative">

                    <img src={loginimage} alt="XXX" className="h-full object-cover" />

                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent"></div>
                    
                    <div className="absolute bottom-0 pl-10 pb-8 font-nuninto">

                        <h1 className="text-3xl pb-1">Welcome Back!</h1>

                        <p>Continue your learning journey with us.</p>

                    </div>

                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 py-10 px-16 w-[40%] relative">

                    <div className="bg-white text-black p-8 rounded-xl shadow-xl">

                        <h1 className="text-[28px] font-rubik mb-1 text-center">Sign in to <span className="text-[#a855f7]">Learnova</span></h1>

                        <p className="text-gray-600 font-rubik text-center mb-6">Please enter your credentials</p>

                        <form className="flex flex-col gap-7">

                            <div className="flex flex-col">

                                <label htmlFor="email" className="font-rubik mb-1.5">Email</label>

                                <div className="relative">

                                    <input type="email" id="email" placeholder="Enter your email" className="outline-none border border-[#e2e8f0] pl-12 py-2 rounded-md w-full focus:border-purple-400"></input>

                                    <MdOutlineMail size={23} className="absolute top-1/2 -translate-y-1/2 text-gray-400 left-3"></MdOutlineMail>

                                </div>

                            </div>

                            <div className="flex flex-col">

                                <label htmlFor="password" className="font-rubik mb-1.5">Password</label>

                                <div className="relative">

                                    <input type="password" id="password" placeholder="Enter your password" className="outline-none border border-[#e2e8f0] pl-12 py-2 rounded-md w-full focus:border-purple-400"/>

                                    <MdOutlineLock size={23} className="absolute top-1/2 -translate-y-1/2 text-gray-400 left-3"></MdOutlineLock>


                                </div>

                                <button className="place-self-end italic text-[#4169e1] font-nuninto pt-1">Forgot Password</button>

                            </div>

                            <button className="text-lg bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-nuninto font-semibold transition-all duration-200">Sign In</button>

                        </form>

                        <p className="mt-5 text-center font-rubik">Don't have an account? <button className="text-[#a855f7]" onClick={handlesignup}>Sign Up</button></p>

                    </div>

                    <button className="absolute -top-[12px] -right-[12px] bg-purple-500 rounded-full p-1.5" onClick={handlecancel}><IoClose size={25}></IoClose></button>

                </div>


                                          </div>
            }
            

            { signupform && <div className="flex justify-center">

                <div className="w-[40%] relative">

                    <img src={signupimage} alt="XXX" className="h-full object-cover" />

                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent"></div>
                    
                    <div className="absolute bottom-0 pl-10 pb-8 font-nuninto">

                        <h1 className="text-3xl pb-1">Join our Community</h1>

                        <p>Start your learning journey today.</p>

                    </div>

                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 py-10 px-16 w-[41%] relative">

                    <div className="bg-white text-black px-8 py-[25px] rounded-xl shadow-xl">

                        <h1 className="text-[28px] font-rubik mb-1 text-center">Create an account</h1>

                        <p className="text-gray-600 font-rubik text-center mb-6">Join <span className="text-[#a855f7]">learnova</span> today</p>

                        <form className="flex flex-col gap-[27px]">

                            <div className="flex gap-5">

                                <div className="flex flex-col">

                                    <label htmlFor="firstname" className="font-rubik mb-1.5">First Name</label>

                                    <div className="relative">

                                        <input type="text" id="firstname" placeholder="David" className="outline-none border border-[#e2e8f0] pl-12 py-2 rounded-md w-full focus:border-purple-400"></input>

                                        <LuUserRound size={23} className="absolute top-1/2 -translate-y-1/2 text-gray-400 left-3"></LuUserRound>

                                    </div>

                                </div>

                                <div className="flex flex-col">

                                    <label htmlFor="lastname" className="font-rubik mb-1.5">Last Name</label>

                                    <div className="relative">

                                        <input type="text" id="lastname" placeholder="Wonder" className="outline-none border border-[#e2e8f0] pl-12 py-2 rounded-md w-full focus:border-purple-400"></input>

                                        <LuUserRound size={23} className="absolute top-1/2 -translate-y-1/2 text-gray-400 left-3"></LuUserRound>

                                    </div>

                                </div>

                            </div>

                            <div className="flex flex-col">

                                <label htmlFor="email" className="font-rubik mb-1.5">Email</label>

                                <div className="relative">

                                    <input type="email" id="email" placeholder="example@gmail.com" className="outline-none border border-[#e2e8f0] pl-12 py-2 rounded-md w-full focus:border-purple-400"></input>

                                    <MdOutlineMail size={23} className="absolute top-1/2 -translate-y-1/2 text-gray-400 left-3"></MdOutlineMail>

                                </div>

                            </div>

                            <div className="flex gap-5">

                                <div className="flex flex-col">

                                    <label htmlFor="password" className="font-rubik mb-1.5">Password</label>

                                    <div className="relative">

                                        <input type="password" id="password" placeholder="XXXXXXXX" className="outline-none border border-[#e2e8f0] pl-12 py-2 rounded-md w-full focus:border-purple-400"/>

                                        <MdOutlineLock size={23} className="absolute top-1/2 -translate-y-1/2 text-gray-400 left-3"></MdOutlineLock>


                                    </div>

                                </div>

                                <div className="flex flex-col">

                                    <label htmlFor="confirmpassword" className="font-rubik mb-1.5">Confirm Password</label>

                                    <div className="relative">

                                        <input type="password" id="confirmpassword" placeholder="XXXXXXXX" className="outline-none border border-[#e2e8f0] pl-12 py-2 rounded-md w-full focus:border-purple-400"/>

                                        <MdOutlineLock size={23} className="absolute top-1/2 -translate-y-1/2 text-gray-400 left-3"></MdOutlineLock>


                                    </div>

                                </div>

                            </div>

                            <div>

                                <label htmlFor="accounttype" className="font-rubik">Account Type</label>

                                <div className="flex items-center gap-6 mt-1">

                                    <div className="flex gap-1.5">

                                        <input type="radio" name="accounttype" id="student" value="Student" defaultChecked></input>
                                        <label htmlFor="student" className="font-rubik">Student</label>

                                    </div>

                                    <div className="flex gap-1.5">

                                        <input type="radio" name="accounttype" id="instructor" value="Instructor"></input>
                                        <label htmlFor="instructor" className="font-rubik">Instructor</label>

                                    </div>

                                </div>


                            </div>

                            <button className="text-lg bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-nuninto font-semibold transition-all duration-200">Sign Up</button>

                        </form>

                        <p className="mt-5 text-center font-rubik">Already have an account? <button className="text-[#a855f7]" onClick={handlesignin}>Sign In</button></p>

                    </div>

                    <button className="absolute -top-[12px] -right-[12px] bg-purple-500 rounded-full p-1.5" onClick={handlecancel}><IoClose size={25}></IoClose></button>

                </div>


                                           </div>
            }

        </div>

    )

}

export default Mainauth;