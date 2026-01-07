import React from 'react'
import {NavLink, useLocation, useNavigate} from 'react-router-dom'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { BsCaretUpFill } from "react-icons/bs";
import { PiShoppingCartSimple } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import { useEffect,useState,useRef } from "react";
import learnova from "../../assets/utilities image/learnova1.png";
import { useDispatch, useSelector } from 'react-redux';
import { apiconnector } from '../../services/apiconnector';
import { categoriesurl } from '../../services/apis';
import toast from 'react-hot-toast';
import { setCategories,setLoading } from '../../redux/Categoryslice';
import { setToken } from '../../redux/Authslice';
import { setUser } from '../../redux/Userslice';
import Hambuger from '../Reusable/Hambuger';

const Navbar = () => {
  
  const navi = useNavigate();

  const dispatch = useDispatch();

  const[open,setOpen] = useState(false);

  const token = useSelector(state => state.Auth.token);
  const user = useSelector(state => state.User.user);
  const totalitems = useSelector(state => state.Cart.totalitems);
  const categories = useSelector(state => state.Category.categories);
  const loading = useSelector(state => state.Category.loading);

  const NavbarLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Categories"
    },
    {
      title: "About Us",
      path: "/about",
    },
    {
      title: "Contact Us",
      path: "/contact",
    },
  ];

  const [scroll, setScroll] = useState(false);
  
  useEffect(() => {
  
    window.addEventListener("scroll", () => {
  
      if (scrollY > 20) {
  
        setScroll(true);
          
      } else {
  
        setScroll(false);
  
      }
  
    });
  
  }, []);

  const handlelogin = () =>{

    navi("/login");

  }

  const location = useLocation();

  let loc = location.pathname;

  useEffect(()=>{

    loc = location.pathname;

  },[location.pathname])

  const[showLogout,setShowLogout] = useState(false);

  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowLogout(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

  }, []);

  // const[loading,setLoading] = useState(false);

  const getcategories = async()=>{

    setLoading(true);

    try {
      
        const result = await apiconnector("GET",categoriesurl.showallcategory,null,null,null)

        dispatch(setCategories(result.data.data));

    } catch (error) {
      
        console.log("Could not fetch categories",error);

        toast.error("Could not fetch categories! refresh the page");

    }

    setLoading(false);

  }

  const logouthandler = () => {

      dispatch(setToken(null));
      dispatch(setUser(null));
      localStorage.removeItem("token");
      localStorage.removeItem("userdetails");
      toast.success("Logged Out");
      setShowLogout(false);
      navi("/");
      setOpen(false);

  }

  useEffect(()=>{

    getcategories();

  },[])

  return (

    <div className={`bg-[#020813] flex items-center justify-around gap-[70px] sm:gap-36 lg:gap-5 py-[9px] fixed left-0 right-0 z-20 ${scroll ? "border-b-[1px] border-gray-700" : ""} ${location.pathname.includes("dashboard") && "border-b-[0.1px] border-gray-700"}`}>
      
      <NavLink to={"/"}>

        <div className='flex items-center gap-3'>

          <img src={learnova} alt="XXX" className='w-[32px] sm:w-[40px]'/>

          <h2 className='text-[#DBDDED] font-nuninto text-[32px] sm:text-3xl tracking-wide'>Learnova</h2>
          
        </div>

      </NavLink>

      <div className={`hidden lg:block ${token ? "pr-0" : "pr-[83px]"}`}>

        <ul className='flex font-lexend gap-5 text-base items-center'>
          
          {
            NavbarLinks.map((item,index)=>{

              return <li key={index} className='text-[#DBDDED] text-[17px]'>

                {
                  item.title === "Categories" ? <div className='cursor-pointer flex items-center relative group'>

                    <h3>{item.title}</h3>

                    <MdOutlineKeyboardArrowDown size={25}></MdOutlineKeyboardArrowDown>

                    <div className={`invisible group-hover:visible transition-all duration-100 absolute bg-[#f1f2ff] top-10 ${loading ? "left-[43px]" : "-left-[32px]"} p-5 w-max rounded-lg`}>

                      <BsCaretUpFill size={25} className='text-[#f1f2ff] absolute -top-4 left-1/2 -translate-x-1/2'></BsCaretUpFill>

                      {

                        loading ? <p className='text-black'>Loading...</p> : 

                        categories.length > 0 ? categories.map((category,index)=>{

                          return <NavLink to={`/categorypage/${category._id}`} key={index}><span key={index} className='text-black py-3 pl-2.5 pr-10 hover:bg-[#c5c7d4] rounded-lg block'>{category.name}</span></NavLink>

                        }) : <p className='text-black px-7'>No Categories Found</p>

                      }

                    </div>

                  </div> : <NavLink to={item.path}><span className={`${loc == item?.path ? "text-[#5d6eee]":""}`}>{item.title}</span></NavLink>
                }

              </li>

            })
          }

        </ul>

      </div>


      {

        token ? <div className='hidden lg:flex lg:items-center lg:gap-2'>

          <button className='text-[#dbdded] flex items-center gap-1.5 border rounded-full px-6 py-1.5' onClick={()=>navi("/dashboard/profile")}>
            
            <span className='font-lexend text-[17px]'>Dashboard</span>

            <RiDashboardHorizontalFill size={17}></RiDashboardHorizontalFill>

          </button>

          {
            user && user?.userinfo?.accounttype !== "Instructor" && <NavLink to={"/dashboard/basket"} className={"text-[#dbdded] relative"}>
              
              <PiShoppingCartSimple size={30}></PiShoppingCartSimple>

              {
                totalitems > 0 && <span className='absolute text-[15px] text-center -top-2 left-3 bg-[#5d6eee] rounded-full w-[80%] h-[80%] animate-bounce'>{totalitems}</span>
              }

            </NavLink>
          }

          <div className='cursor-pointer relative pl-2' ref={buttonRef} onClick={()=>setShowLogout(!showLogout)}>

            <img src={user.image} alt="XXX" className='w-[35px] border rounded-full object-cover bg-black aspect-square' />

            {
              showLogout && <button onClick={logouthandler} className='absolute bg-[#6a5acd]/75 border border-[#6a5acd] text-white flex items-center font-nuninto font-semibold top-[42px] left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-md gap-1.5' ref={modalRef}>

                <span className='text-[17px]'>Logout</span>
                <TbLogout size={20}></TbLogout>

              </button>
            }
            

          </div>

        </div> : <button className='hidden lg:block lg:bg-gradient-to-r lg:from-indigo-500 lg:to-purple-600 lg:px-6 lg:py-2 lg:rounded-lg lg:shadow-lg lg:hover:opacity-90 lg:transition lg:font-lexend lg:text-[#DBDDED] lg:text-[17px] lg:duration-200 lg:active:scale-95' onClick={()=>handlelogin()}>Log In</button>

      }

      {

        <Hambuger open={open} setOpen={setOpen}></Hambuger>

      }

      {/* Hamburger Menu Options */}

      {
        <div className={`lg:hidden text-white fixed top-[67px] sm:top-[66px] inset-0 backdrop-blur-sm bg-[#020813]/90 ${open ? "h-full" : "h-0"} transition-all duration-300 overflow-scroll no-scrollbar`}>

          <div className='flex flex-col items-center gap-10 py-10 h-full'>

            <ul className='flex flex-col gap-5 items-center'>

              {
                NavbarLinks.map((item,index)=>{

                  return <li key={index} className='text-[#DBDDED] text-[23px] sm:text-[17px]'>

                    {
                      item.title === "Categories" ? <div className='flex flex-col items-center'>

                        <h3>{item.title}</h3>

                        <div className={`pb-1.5 pt-5 w-max flex flex-col gap-5 items-center text-[18px] sm:text-[16px]`}>

                          {

                            loading ? <p className='text-white text-[19px]'>Loading categories...</p> : 

                            categories.length > 0 ? categories.map((category,index)=>{

                              return <NavLink to={`/categorypage/${category._id}`} key={index} onClick={()=>setOpen(false)}><span key={index} className='text-white'>{category.name}</span></NavLink>

                            }) : <p className='text-white text-[17px]'>No Categories Found</p>

                          }

                        </div>

                      </div> : <NavLink to={item.path} onClick={()=>setOpen(false)}><span className={`${loc == item?.path ? "text-[#5d6eee]":""}`}>{item.title}</span></NavLink>
                    }

                  </li>

                })
              }

            </ul>

            {

              token ? <> <div className='flex items-center gap-5'>

                <button className='text-[#dbdded] flex items-center gap-1.5 border rounded-full px-6 pt-1.5 pb-2' onClick={()=>{navi("/dashboard/profile");setOpen(false)}}>
                  
                  <span className='font-lexend text-[20px] sm:text-[17px]'>Dashboard</span>

                  <RiDashboardHorizontalFill className='text-[20px] sm:text-[17px]'></RiDashboardHorizontalFill>

                </button>

                {
                  user && user?.userinfo?.accounttype !== "Instructor" && <NavLink to={"/dashboard/basket"} className={"text-[#dbdded] relative"} onClick={()=>setOpen(false)}>
                    
                    <PiShoppingCartSimple className='text-[35px] sm:text-[30px]'></PiShoppingCartSimple>

                    {
                      totalitems > 0 && <span className='absolute text-[20px] sm:text-[15px] text-center -top-2 left-3 bg-[#5d6eee] rounded-full w-[80%] h-[80%] animate-bounce'>{totalitems}</span>
                    }

                  </NavLink>
                }

                </div>

                <div className='cursor-pointer flex items-center gap-5'>

                  <img src={user.image} alt="XXX" className='w-[48px] h-[48px] sm:w-[45px] sm:h-[45px] border rounded-full bg-black aspect-square' />

                  {
                    <button onClick={logouthandler} className=' bg-[#6a5acd]/75 border border-[#6a5acd] text-white flex items-center font-nuninto font-semibold px-3.5 pt-1.5 pb-2 rounded-md gap-1.5'>

                      <span className='text-[20px] sm:text-[17px]'>Logout</span>

                      <TbLogout size={20}></TbLogout>

                    </button>
                  }
                  

                </div>

              </> : <button className='block bg-gradient-to-r from-indigo-500 to-purple-600 px-6 pt-2 pb-2.5 rounded-lg shadow-lg hover:opacity-90 transition-all font-lexend text-[#DBDDED] text-[20px] sm:text-[17px] lg:duration-200 lg:active:scale-95' onClick={()=>{navi("/login");setOpen(false)}}>Log In</button>

            }

          </div>

        </div>
      }


    </div>

    
    
  )
}

export default Navbar