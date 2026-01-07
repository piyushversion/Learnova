import { useSelector } from "react-redux"
import { Sidebar } from "../Reusable/Sidebar"
import { GoVerified } from "react-icons/go";
import { TbEdit } from "react-icons/tb";
import { FiCornerRightUp } from "react-icons/fi";
import { RiHeart2Line } from "react-icons/ri";
import { RxDotFilled } from "react-icons/rx";
import { MdPerson4 } from "react-icons/md";
import { MdPerson2 } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { MdCall } from "react-icons/md";
import { FaVenusMars } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const MyProfile = () => { 

    const userdata = useSelector((state)=> state.User.user);

    const navi = useNavigate();

    const profile = {

        firstname:userdata.userinfo.firstname,
        lastname:userdata.userinfo.lastname,
        email:userdata.userinfo.email,
        image:userdata.userinfo.image,
        dob:userdata.userinfo.additionaldetails.dateofbirth,
        gender:userdata.userinfo.additionaldetails.gender,
        about:userdata.userinfo.additionaldetails.about,
        number:userdata.userinfo.additionaldetails.contactnumber

    }

    const feilds = Object.values(profile);

    const filled = feilds.filter(feild => feild !== null).length;

    const completion = Math.round((filled / feilds.length) * 100);

    return (

        <div className="flex flex-col-reverse md:flex-row bg-[#181825] h-screen overflow-hidden">

            <Sidebar></Sidebar>

            <div className="pt-[90px] px-4 pb-5 sm:px-[20px] xl:px-[26px] w-full md:w-[69%] lg:w-[76%] xl:w-[81%] overflow-y-scroll no-scrollbar">

                <div className="bg-[#5d6eee] rounded-lg px-4 sm:px-10 pt-[12px] sm:pt-[20px] pb-[18px] sm:pb-[24px] text-white text-center font-lexend font-normal">

                    <h1 className="text-[25px] sm:text-[36px] lg:text-[40px] mb-1.5">Welcome back, {userdata.userinfo.firstname}!</h1>
                    <p className="text-base sm:text-[18px]">Manage your Profile and Personal Information</p>

                </div>

                <div className="flex mt-5 flex-col lg:flex-row gap-5">

                    <div className="bg-[#020813] text-white rounded-lg pt-[18px] pb-[30px] sm:pb-9 px-5 sm:px-6 flex flex-col gap-5 w-full lg:w-[65%] xl:w-[70%]">

                        <div className="flex justify-between flex-col sm:flex-row gap-3 sm:gap-0">

                            <span className="text-[18px] sm:text-[20px] font-lexend text-center sm:text-left">Profile Information</span>

                            <button className="flex items-center justify-center font-rubik gap-2.5 bg-black border border-[#6a5acd] rounded-lg pt-2.5 pb-[11px] px-3" onClick={()=>navi("/dashboard/settings")}>

                                <TbEdit className="text-[20px] sm:text-[23px]"></TbEdit>

                                <span className="text-[15px] sm:text-[16px]">Edit Account</span>

                            </button>

                        </div>

                        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-5">

                            <div className="w-[90px] h-[90px] rounded-full overflow-hidden border border-[#dbdded]/70">

                                <img src={userdata.image} alt="XXX" className="w-full h-full object-cover"/>

                            </div>

                            <div className="font-nuninto flex flex-col items-center sm:items-start">

                                <span className="flex items-center gap-2 text-lg sm:text-[20px] pb-1.5">
                                    
                                    {userdata.userinfo.firstname} {userdata.userinfo.lastname ? userdata.userinfo.lastname : ""}

                                    <GoVerified className="text-[20px] sm:text-[22px]" color="lightgreen"></GoVerified>

                                </span>

                                <span className="text-base sm:text-[17px]">{userdata.userinfo.email}</span>

                                <div className="bg-[#90ee90]/30 border-[1px] border-[#90ee9099] text-[#90ee90] w-max px-3.5 py-[3px] rounded-full font-rubik text-sm sm:text-[15px] mt-2">{userdata.userinfo.accounttype}</div>

                            </div>

                        </div>

                    </div>

                    <div className="bg-[#020813] text-white rounded-lg font-lexend pt-[18px] px-5 sm:px-6 pb-6 w-full lg:w-[35%] xl:w-[30%] flex flex-col">

                        <span className="text-[18px] sm:text-[20px] text-center sm:text-left">Quick Stats</span>

                        <div className="flex justify-between mt-4 mb-1.5">

                            <span className="text-[15px] sm:text-[16px]">Profile Completion</span>

                            <span className="text-[#6870e6] text-[15px] sm:text-base">{completion}%</span>

                        </div>

                        <div className="h-1.5 bg-[#dbdded] rounded-full w-full relative">

                            <div className="h-1.5 bg-[#6870e6] absolute rounded-full" style={{width:`${completion}%`}}></div>

                        </div>

                        <button className="mt-10 place-self-end flex items-center gap-1.5 bg-black border border-[#6a5acd] rounded-lg px-3.5 pt-2.5 pb-[11px] self-center sm:self-end" disabled={completion === 100 ? true : false} onClick={()=>navi("/dashboard/settings")}>
                            
                            {
                                completion === 100 ? <span className="text-[15px] sm:text-[16px]">Profile completed</span> : <> 
                                
                                    <span className="text-[16px] font-rubik">Finish Profile</span>

                                    <FiCornerRightUp size={21}></FiCornerRightUp>

                                </>
                            }

                            
                        </button>

                    </div>

                </div>

                <div className="flex mt-5 flex-col lg:flex-row gap-5">

                    <div className="bg-[#020813] text-white pt-[18px] pb-9 px-5 sm:px-6 flex flex-col gap-5 rounded-lg w-full lg:w-[60%] xl:w-[70%]">

                        <div className="flex items-center gap-2 self-center sm:self-start">

                            <RiHeart2Line className="text-[23px] sm:text-[25px]" color="#6a5acd"></RiHeart2Line>

                            <span className="text-lg sm:text-[20px] font-rubik">About</span>

                        </div>

                        <div className="text-white bg-[#17171b]/45 border border-[#17171b] rounded-lg px-3 sm:px-4 py-2.5 font-nuninto text-base sm:text-[17px] text-justify">

                            {
                                userdata.userinfo.additionaldetails.about ? userdata.userinfo.additionaldetails.about : "-- Add something about yourself --"
                            }

                        </div>

                    </div>

                    <div className="bg-[#020813] text-white rounded-lg font-lexend pt-[18px] px-5 sm:px-6 pb-6 w-full lg:w-[40%] xl:w-[30%] flex flex-col">

                        <span className="text-lg sm:text-[20px] mb-[18px] text-center sm:text-left">Recent Activity</span>

                        <div className="flex items-center gap-1.5 mb-3 font-nuninto font-semibold">

                            <RxDotFilled size={25} color="#90ee90"></RxDotFilled>

                            <div className="flex flex-col gap-[2px]">

                                <span className="text-base sm:text-[18px]">Member Since</span>

                                <div className="text-sm sm:text-[16px] font-rubik font-normal">

                                    {new Date(userdata.userinfo.joined).toDateString()}, {new Date(userdata.userinfo.joined).toLocaleTimeString("en-US",{
                                        
                                        hour:"numeric",
                                        minute:"numeric",
                                        hour12:true
                                        
                                    })}

                                </div>

                            </div>

                        </div>

                        <div className="flex items-center gap-1.5 font-nuninto font-semibold">

                            <RxDotFilled size={25} color="#6a5acd"></RxDotFilled>

                            <div className="flex flex-col gap-[2px]">

                                <span className="text-base sm:text-[18px]">Total Login</span>

                                <div className="text-sm sm:text-[16px] font-rubik font-normal">

                                    {userdata.userinfo.totallogins} {userdata.userinfo.totallogins > 1 ? "times" : "time"}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                
                <div className="bg-[#020813] mt-5 rounded-lg text-white pt-[19px] pb-9 px-5 sm:px-6 flex flex-col gap-6">
                
                    <div className="flex justify-between flex-col sm:flex-row mb-3.5 gap-3 sm:gap-0">

                        <div className="flex items-center gap-2 place-self-center sm:place-self-start">

                            <MdPerson4 className="text-[22px] sm:text-[25px]" color="#6a5acd"></MdPerson4>

                            <span className="text-lg sm:text-[20px] font-rubik">Basic Details</span>

                        </div>

                        <button className="flex items-center justify-center font-rubik gap-2.5 bg-black border border-[#6a5acd] rounded-lg pt-2.5 pb-[11px] px-3" onClick={()=>navi("/dashboard/settings")}>

                            <TbEdit className="text-[20px] sm:text-[23px]"></TbEdit>

                            <span className="text-[15px] sm:text-[16px]">Edit Account</span>

                        </button>

                    </div>

                    <div className="flex flex-col lg:flex-row justify-between gap-5">

                        <div className="flex gap-2 bg-[#17171b]/45 border border-[#17171b] w-full rounded-lg px-2 sm:px-3.5 pt-4 pb-5">

                            <MdPerson2 className="text-[20px] sm:text-[21px]" color="#8ca5ed"></MdPerson2>

                            <div className="flex flex-col gap-1.5">

                                <span className="text-[#dbdded] font-rubik text-[15px] sm:text-[16px]">FIRST NAME</span>

                                <span className="text-lg sm:text-[19px] font-nuninto font-medium">{userdata.userinfo.firstname}</span>

                            </div>

                        </div>

                        <div className="flex gap-2 bg-[#17171b]/45 border border-[#17171b] w-full rounded-lg px-2 sm:px-3.5 pt-4 pb-5">

                            <MdPerson2 className="text-[20px] sm:text-[21px]" color="#af8ced"></MdPerson2>

                            <div className="flex flex-col gap-1.5">

                                <span className="text-[#dbdded] font-rubik text-[15px] sm:text-[16px]">LAST NAME</span>

                                <span className="text-lg sm:text-[19px] font-nuninto font-medium">{userdata.userinfo.lastname ? userdata.userinfo.lastname : "Null"}</span>

                            </div>

                        </div>

                        <div className="flex gap-2 bg-[#17171b]/45 border border-[#17171b] w-full rounded-lg px-2 sm:px-3.5 pt-4 pb-5">

                            <MdOutlineMail className="text-[18px] sm:text-[20px]" color="#9dd591"></MdOutlineMail>

                            <div className="flex flex-col gap-1.5 min-w-0 w-full">

                                <span className="text-[#dbdded] font-rubik text-[15px] sm:text-[16px]">EMAIL</span>

                                <span className="text-[18px] sm:text-[19px] font-nuninto font-medium break-words">{userdata.userinfo.email}</span>

                            </div>

                        </div>

                    </div>

                    <div className="flex flex-col lg:flex-row justify-between gap-5">

                        <div className="flex gap-2 bg-[#17171b]/45 border border-[#17171b] w-full rounded-lg px-2 sm:px-3.5 pt-4 pb-5">

                            <MdCall className="text-[20px] sm:text-[21px]" color="#c89359"></MdCall>

                            <div className="flex flex-col gap-1.5">

                                <span className="text-[#dbdded] font-rubik text-[15px] sm:text-[16px]">PHONE NUMBER</span>

                                <span className="text-lg sm:text-[19px] font-nuninto font-medium">{userdata.userinfo.additionaldetails.contactnumber ? userdata.userinfo.additionaldetails.contactnumber : "Null" }</span>

                            </div>

                        </div>

                        <div className="flex gap-2 bg-[#17171b]/45 border border-[#17171b] w-full rounded-lg px-2 sm:px-3.5 pt-4 pb-5">

                            <FaVenusMars className="text-[20px] sm:text-[21px]" color="#c980b0"></FaVenusMars>

                            <div className="flex flex-col gap-1.5">

                                <span className="text-[#dbdded] font-rubik text-[15px] sm:text-[16px]">GENDER</span>

                                <span className="text-lg sm:text-[19px] font-nuninto font-medium">{userdata.userinfo.additionaldetails.gender ? userdata.userinfo.additionaldetails.gender : "Null"}</span>

                            </div>

                        </div>

                        <div className="flex gap-2 bg-[#17171b]/45 border border-[#17171b] w-full rounded-lg px-2 sm:px-3.5 pt-4 pb-5">

                            <MdDateRange className="text-[20px] sm:text-[21px]" color="#e2cc64"></MdDateRange>

                            <div className="flex flex-col gap-1.5">

                                <span className="text-[#dbdded] font-rubik text-[15px] sm:text-[16px]">DATE OF BIRTH</span>

                                <span className="text-lg sm:text-[19px] font-nuninto font-medium">{userdata.userinfo.additionaldetails.dateofbirth ? userdata.userinfo.additionaldetails.dateofbirth : "Null"}</span>

                            </div>

                        </div>

                    </div>
  
                </div>                   

            </div>

            {/* <div className="bg-[#020813] border-t-[1px] border-gray-800">


            </div> */}

        </div>

    )

}