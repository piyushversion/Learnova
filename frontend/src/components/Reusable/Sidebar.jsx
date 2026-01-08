import { IoMdPerson } from "react-icons/io";
import { LiaSchoolSolid } from "react-icons/lia";
import { MdCreate } from "react-icons/md";
import { IoMdBook } from "react-icons/io";
import { FiBarChart2 } from "react-icons/fi";
import { RiShoppingBagFill } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { IoWarningOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setToken } from "../../redux/Authslice";
import { setUser } from "../../redux/Userslice";
import toast from "react-hot-toast";
import { resetCourseState } from "../../redux/Courseslice";
import { Resetstate } from "../../redux/Rightsideslice";

export const Sidebar = ()=>{

    const[open,setOpen] = useState(false);

    const dispatch = useDispatch();

    const navi = useNavigate();

    const handleLogout = ()=>{

      dispatch(setToken(null));
      dispatch(setUser(null));
      localStorage.removeItem("token");
      localStorage.removeItem("userdetails");
      toast.success("Logged Out");
      setOpen(false);
      navi("/");

    }

    const sidebarlinks = [

        { id : 1,name:"My Profile",path:"/dashboard/profile",icon:<IoMdPerson></IoMdPerson>,typee:"profile"},
        { id : 2,name:"My Analytics",path:"/dashboard/analytics",type:"Instructor",icon:<FiBarChart2></FiBarChart2>,typee:"analytics"},
        { id : 3,name:"My Classroom",path:"/dashboard/classroom",type:"Instructor",icon:<LiaSchoolSolid></LiaSchoolSolid>,typee:"classroom"},
        { id : 4,name:"Create Course",path:"/dashboard/create-course",type:"Instructor",icon:<MdCreate></MdCreate>,typee:"create-course"},
        { id : 5,name:"My Learnings",path:"/dashboard/learnings",type:"Student",icon:<IoMdBook></IoMdBook>,typee:"learnings"},
        { id : 6,name:"My Basket",path:"/dashboard/basket",type:"Student",icon:<RiShoppingBagFill></RiShoppingBagFill>,typee:"basket"},

    ]

    const userdata = useSelector((state)=> state.User.user);

    const location = useLocation();

    const pathname = location.pathname.split("/").at(-1);

    useEffect(()=>{

        dispatch(resetCourseState());
        dispatch(Resetstate());

    },[location.pathname])

    return (

        <div className="bg-[#020813] w-full md:w-[31%] lg:w-[24%] xl:w-[19%] py-2.5 md:pt-24 md:h-screen border-t-[0.1px] border-[#696969] fixed bottom-0 md:static z-10">

            <div className="flex flex-row md:flex-col gap-5 px-3 sm:px-5 justify-evenly md:justify-start overflow-auto no-scrollbar">

                {
                    sidebarlinks.map((link)=>{

                        if(link.type){

                            if(userdata?.userinfo?.accounttype === link.type){

                                return <NavLink key={link.id} to={link.path} className={`${pathname === link.typee ? "text-white bg-[#5d6eee]":"text-[#dbdded]"} flex items-center gap-3 font-lexend rounded-md px-2 py-1.5 tracking-wide w-max md:w-full`} onClick={()=> {
                                    
                                    if(link.name === "Create Course"){

                                        dispatch(resetCourseState());

                                    }
                                    
                                    }}>

                                    <span className="text-[25px] sm:text-[27px]">{link.icon}</span>
                                    <span className="text-[16px] hidden md:block">{link.name}</span>

                                </NavLink>

                            }

                            return null;

                        } else{

                            return <NavLink key={link.id} to={link.path} className={`${pathname === link.typee ? "text-white bg-[#5d6eee]":"text-[#dbdded]"} flex items-center gap-3 font-lexend rounded-md px-2 py-1.5 tracking-wide w-max md:w-full`}>
                                
                                <span className="text-[25px] sm:text-[27px]">{link.icon}</span>
                                <span className="text-[16px] hidden md:block">{link.name}</span>
                                
                            </NavLink>

                        }

                    })
                }

                <NavLink className={`${pathname ===  "settings" ? "text-white bg-[#5d6eee]":"text-[#dbdded]"} flex items-center gap-3 font-lexend rounded-md px-2 py-1.5 tracking-wide w-max md:w-full`} to={"/dashboard/settings"}>

                    <span className="text-[28px] sm:text-[30px]"><MdManageAccounts></MdManageAccounts></span>
                    <span className="text-[16px] hidden md:block">Manage Account</span>

                </NavLink>

                <button className="flex items-center text-[#dbdded] gap-3 font-lexend rounded-md px-2 py-1.5 tracking-wide" onClick={()=> setOpen(true)}>

                    <span className="text-[25px] sm:text-[27px]"><TbLogout></TbLogout></span>
                    <span className="text-[16px] hidden md:block">Logout</span>

                </button>

            </div>

            {open && (

                <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">

                    <div className="bg-white rounded-lg shadow-lg sm:px-5 py-5 w-[80%] sm:w-max">

                        <IoWarningOutline size={60} className="mx-auto text-yellow-600"></IoWarningOutline>

                        <h2 className="text-[22px] font-bold mb-1 mt-3 font-nuninto text-center">Are you sure?</h2>

                        <p className="text-gray-600 mb-[18px] text-[19px] font-nuninto font-semibold text-center">This will log you out of your account.</p>

                        <div className="flex justify-around text-white font-nuninto font-medium">

                            <button className="px-5 py-2 rounded-lg bg-green-500" onClick={() =>setOpen(false)}>

                                Go Back

                            </button>

                            <button className="px-5 py-2 bg-red-500 rounded-lg" onClick={handleLogout}>

                                End Session

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    )

}