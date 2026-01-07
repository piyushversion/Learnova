import React, { useRef, useState } from 'react'
import { Sidebar } from '../Reusable/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdCloudUpload } from "react-icons/io";
import { MdPerson4 } from "react-icons/md";
import { MdPerson2 } from "react-icons/md";
import { RiHeart2Line } from "react-icons/ri";
import { MdCall } from "react-icons/md";
import { FaVenusMars } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { MdDoneAll } from "react-icons/md";
import { LuRefreshCw } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbLockPlus } from "react-icons/tb";
import { AiOutlineSafety } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import { apiconnector } from '../../services/apiconnector';
import { authenticationurl, profileurl } from '../../services/apis';
import { setUser } from '../../redux/Userslice';
import { useForm } from 'react-hook-form';

const Settings = () => {

  const dispatch = useDispatch();

  const{register,handleSubmit,formState:{errors}} = useForm();
  
  const{register:passregister,handleSubmit:passhandle,setValue:setval,formState:{errors:passerrors}} = useForm();
  
  const[profilepicture,setProfilePicture] = useState(null);
  
  const[preview,setPreview] = useState(null);

  const[currpass,showCurrPass] = useState(false);

  const[newpass,showNewPass] = useState(false);

  const[confipass,showConfiPass] = useState(false);

  const[loading,setLoading] = useState(false);

  const[loading1,setLoading1] = useState(false);

  const[loading2,setLoading2] = useState(false);
  
  const userdata = useSelector(state => state.User.user);

  const token = useSelector(state => state.Auth.token);

  const handlefilechange = (e) => {

    setProfilePicture(e.target.files[0]);

    setPreview(URL.createObjectURL(e.target.files[0]));

  }

  async function handleupload(){

    const formData = new FormData();
    
    formData.append("profilepicture",profilepicture);

    const id = toast.loading("Changing...");

    setLoading(true);

    try{

        const res = await apiconnector("PUT",profileurl.updateprofilepicture,formData,{

            "Authorization": `Bearer ${token}`

        });

        console.log(res)

        if(!res.data.success){

            throw new Error(res.data.message);

        }

        const userimg = res.data.data.image;
        
        const user = {
        
          userinfo:res.data.data,
          image:userimg
        
        }
        
        dispatch(setUser(user));
        
        localStorage.setItem("userdetails",JSON.stringify(user));

        setProfilePicture(null);

        setPreview(null);

        toast.success('Profile Picture changed', {

          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });

    } catch(error){

        console.log("Error in updating profile picture : ",error);

        toast.error('Error in updating profile picture', {

          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });

    } finally{

        toast.dismiss(id);

        setLoading(false);

    }

  }

  const submitProfile = async(data) => {

    const id = toast.loading("Updating...")

    setLoading1(true);

    try{

        const res = await apiconnector("PUT",profileurl.updateprofile,data,{

            "Authorization": `Bearer ${token}`

        })

        console.log(res);

        if(!res.data.success){

            throw new Error(res.data.message);

        }

        // const userimg = res.data.data.image;

        const userimg = `https://api.dicebear.com/5.x/initials/svg?seed=${res.data.data.firstname} ${res.data.data.lastname}&backgroundColor=714ada`
        
        const user = {
        
          userinfo:res.data.data,
          image:userimg
        
        }
        
        dispatch(setUser(user));
        
        localStorage.setItem("userdetails",JSON.stringify(user));

        toast.success('Profile Updated', {

          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });

    } catch(err){

        console.log("Error in updating profile : ",err);

        toast.error('Error in updating profile', {

          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });

    } finally{

      toast.dismiss(id);

      setLoading1(false);

    }


  }

  async function handlepassword(data){

      const id = toast.loading("Refreshing...")

      setLoading2(true);

      try{

          const res = await apiconnector("POST",authenticationurl.changepassword,data,{

            "Authorization": `Bearer ${token}`

          })

          if(!res.data.success){

              throw new Error(res.data.message);

          }

          toast.success('Password Refreshed', {

            style: {
              border: '1px solid #713200',
              padding: '16px',
              color: '#713200',
            },
            iconTheme: {
              primary: '#713200',
              secondary: '#FFFAEE',
            },

          });

      } catch(err){

          console.log("Error in refreshing password : ",err);

          toast.error(`${err.response.data.message}`, {

            style: {
              border: '1px solid #713200',
              padding: '16px',
              color: '#713200',
            },
            iconTheme: {
              primary: '#713200',
              secondary: '#FFFAEE',
            },
          });

      } finally{

        setval("currentpassword","");

        setval("newpassword","");

        setval("confirmpassword","");

        toast.dismiss(id);

        setLoading2(false);

      }


  }

  return (

    <div className='flex flex-col-reverse md:flex-row bg-[#181825] h-screen overflow-hidden'>
        
      <Sidebar></Sidebar>

      <div className='pt-[90px] pb-5 px-4 sm:px-[20px] xl:px-[26px] w-full md:w-[69%] lg:w-[76%] xl:w-[81%] overflow-y-scroll no-scrollbar'>

        <h3 className='text-[#dbdded] font-lexend text-[26px] mb-[22px] tracking-wide text-center sm:text-left'>Edit Account</h3>

        <div className='bg-[#020813] text-white rounded-[10px] flex items-center gap-7 sm:gap-5 sm:px-7 py-7 flex-col sm:flex-row'>

                <img src={preview ? preview : userdata?.image} alt="XXX" className='w-[25%] sm:w-[18%] lg:w-[12%] xl:w-[10%] rounded-full aspect-square object-cover border border-[#dbdded]/70 scale-110'/>

                <div className='flex flex-col gap-4 items-center sm:items-start'>

                    <p className='font-nuninto text-xl sm:text-[22px] font-medium tracking-wide'>Update Profile Picture</p>

                    <div className='flex gap-3.5 sm:gap-2 font-nuninto items-center flex-col sm:flex-row'>

                        <input type="file" accept='image/png,image/jpg, image/jpeg' id='fileinp' className='hidden' onChange={handlefilechange}/>

                        <label htmlFor="fileinp" className='bg-[#dbdded] text-black px-4 rounded-lg py-1.5 text-base sm:text-[17px]'>Browse Image</label>

                        <button className='flex items-center gap-2 bg-[#5d6eee] px-4 py-1.5 rounded-lg text-base sm:text-[17px]' onClick={handleupload} disabled={!profilepicture || loading}>
                          
                          <span>Upload</span>

                          <IoMdCloudUpload size={20}></IoMdCloudUpload>

                        </button>

                    </div>

                </div>

        </div>

        <div className="bg-[#020813] mt-5 rounded-lg text-white pt-[20px] pb-7 px-5 lg:px-6 flex flex-col gap-6">
                                        
          <div className="flex items-center gap-2 place-self-center sm:place-self-start mb-3.5">
            
            <MdPerson4 size={25} color="#6a5acd"></MdPerson4>
            
            <span className="text-[20px] font-rubik">Update Details</span>
            
          </div>

          <form onSubmit={handleSubmit(submitProfile)} className='flex flex-col gap-[27px]'>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[25px] sm:gap-5">

              <div className="w-full">

                <div className="flex gap-1.5 mb-2">

                  <MdPerson2 size={21} color="#8ca5ed"></MdPerson2>

                  <span className="text-[#dbdded] font-rubik text-[16px]">FIRST NAME</span>

                </div>
                
                <input type="text" name="firstname" id='firstname' placeholder='David' {...register("firstname",{required:"First Name is Required",pattern:{ value: /^[A-Za-z]+$/, message: "Only alphabets allowed"},maxLength: { value: 20, message: "Maximum 20 characters" }})} defaultValue={userdata?.userinfo?.firstname} className='text-[18px] font-nuninto font-medium bg-[#17171b]/45 border border-[#17171b] rounded-lg px-3.5 pt-2 pb-2 w-full outline-0 focus:border-[#303036]' />

                {errors.firstname && <span className='text-red-500 text-sm pt-1 italic font-rubik'>{errors.firstname.message}</span>}

              </div> 

              <div className="w-full">

                <div className="flex gap-1.5 mb-2">

                  <MdPerson2 size={21} color="#af8ced"></MdPerson2>

                  <span className="text-[#dbdded] font-rubik text-[16px]">LAST NAME</span>

                </div>
                
                <input type="text" name="lastname" id='lastname' placeholder='Wonder' {...register("lastname",{pattern:{ value: /^[A-Za-z]+$/, message: "Only alphabets allowed"},maxLength: { value: 20, message: "Maximum 20 characters" }})} defaultValue={userdata?.userinfo?.lastname} className='text-[18px] font-nuninto font-medium bg-[#17171b]/45 border border-[#17171b] rounded-lg px-3.5 pt-2 pb-2 w-full outline-0 focus:border-[#303036]' />

                {errors.lastname && <span className='text-red-500 text-sm pt-1 italic font-rubik'>{errors.lastname.message}</span>}

              </div>          

              <div className="w-full">

                <div className="flex gap-1.5 mb-2">

                  <MdDateRange size={21} color="#e2cc64"></MdDateRange>                

                  <span className="text-[#dbdded] font-rubik text-[16px]">DATE OF BIRTH</span>

                </div>

                <input type="date" name='dateofbirth' id='dateofbirth' {...register("dateofbirth",{max:{value: new Date().toISOString().split("T")[0],message:"Birth date should be on/before today."}})} defaultValue={userdata?.userinfo?.additionaldetails?.dateofbirth} className='text-[18px] font-nuninto font-medium bg-[#17171b]/45 border border-[#17171b] rounded-lg px-3.5 pt-2 pb-2 w-full outline-0 focus:border-[#303036] relative'/>

                {errors.dateofbirth && <span className='text-red-500 text-sm pt-1 italic font-rubik'>{errors.dateofbirth.message}</span>}

              </div>
              
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[25px] sm:gap-5">

              <div className="w-full">

                <div className="flex gap-1.5 mb-2">

                  <FaVenusMars size={21} color="#c980b0"></FaVenusMars>

                  <span className="text-[#dbdded] font-rubik text-[16px]">GENDER</span>

                </div>
                
                <select name="gender" id="gender" {...register("gender")} defaultValue={userdata?.userinfo?.additionaldetails?.gender || ""} className='text-[18px] font-nuninto font-medium bg-[#17171b]/45 border border-[#17171b] rounded-lg px-3.5 pt-2 pb-2 w-full outline-0 focus:border-[#303036] appearance-none'>

                    <option value=""> -- Choose an option -- </option>
                    <option value="Male" className='bg-black'>Male</option>
                    <option value="Female" className='bg-black'>Female</option>
                    <option value="Other" className='bg-black'>Other</option>

                </select>

              </div> 

              <div className="w-full">

                <div className="flex gap-1.5 mb-2">

                  <MdCall size={21} color="#c89359"></MdCall>

                  <span className="text-[#dbdded] font-rubik text-[16px]">CONTACT</span>

                </div>
                
                <input type="tel" inputMode='numeric' pattern="[0-9]*" maxLength={10} name='contactnumber' placeholder='0000000000' id='contactnumber' {...register("contactnumber",{pattern: { value: /^[0-9]{10}$/,message: "Enter a valid 10-digit contact number"}})} defaultValue={userdata?.userinfo?.additionaldetails?.contactnumber} className='text-[18px] font-nuninto font-medium bg-[#17171b]/45 border border-[#17171b] rounded-lg px-3.5 pt-2 pb-2 w-full outline-0 focus:border-[#303036]' />

                { errors.contactnumber && <span className='text-red-500 text-sm pt-1 italic font-rubik'>{errors.contactnumber.message}</span>}

              </div>          

              <div className="w-full">

                <div className="flex gap-1.5 mb-2">

                  <RiHeart2Line size={21} color="#6a5acd"></RiHeart2Line>            

                  <span className="text-[#dbdded] font-rubik text-[16px]">ABOUT</span>

                </div>
                
                <input type="text" name='about' id='about' placeholder='-- Add something about yourself --' {...register("about")} defaultValue={userdata?.userinfo?.additionaldetails?.about} className='text-[18px] font-nuninto font-medium bg-[#17171b]/45 border border-[#17171b] rounded-lg px-3.5 pt-2 pb-2 w-full outline-0 focus:border-[#303036]' />

              </div>

            </div>

            <button className='flex items-center bg-[#5d6eee] gap-2 font-nuninto font-semibold px-4 py-1.5 rounded-md sm:self-end mt-2 self-center' disabled={loading1}>
              
              <span className='text-lg sm:text-[19px]'>Apply</span>

              <MdDoneAll className='text-[22px] sm:text-[25px]'></MdDoneAll>

            </button>

          </form>
   
        </div>

        <div className="bg-[#020813] mt-5 rounded-lg text-white pt-[20px] pb-7 px-5 lg:px-6 flex flex-col gap-6">
                                        
          <div className="flex items-center gap-2 place-self-center sm:place-self-start mb-3.5">
            
            <LuRefreshCw size={24} color="#6a5acd"></LuRefreshCw>
            
            <span className="text-[20px] font-rubik">Refresh Password</span>
            
          </div>

          <form onSubmit={passhandle(handlepassword)} className='flex flex-col gap-[27px]'>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[25px] sm:gap-5">

              <div className="w-full">

                <div className="flex gap-1.5 mb-2">

                  <RiLockPasswordLine size={20} color="#8ca5ed"></RiLockPasswordLine>

                  <span className="text-[#dbdded] font-rubik text-[16px]">CURRENT PASSWORD</span>

                </div>

                <div className='relative'>
                
                    <input type={currpass ? "text" : "password"} name="currentpassword" id='currentpassword' placeholder='XXXX' {...passregister("currentpassword",{required:"Current Password is required"})} className='text-[18px] font-nuninto font-medium bg-[#17171b]/45 border border-[#17171b] rounded-lg px-3.5 pt-2 pb-2 w-full outline-0 focus:border-[#303036]' />

                    {currpass ? <FaEyeSlash size={20} onClick={()=>showCurrPass(false)} className='absolute top-1/2 -translate-y-1/2 right-4 text-[#dbdded] cursor-pointer'></FaEyeSlash> : <FaEye size={20} onClick={()=>showCurrPass(true)} className='absolute top-1/2 -translate-y-1/2 right-4 text-[#dbdded] cursor-pointer'></FaEye>}

                </div>
                
                {passerrors.currentpassword && <span className='text-red-500 text-sm pt-1 italic font-rubik'>{passerrors.currentpassword.message}</span>}

              </div> 

              <div className="w-full">

                <div className="flex gap-1.5 mb-2">

                  <TbLockPlus size={21} color="#af8ced"></TbLockPlus>

                  <span className="text-[#dbdded] font-rubik text-[16px]">NEW PASSWORD</span>

                </div>

                <div className='relative'>
                
                    <input type={newpass ? "text" : "password"} name="newpassword" id='newpassword' placeholder='XXXX' {...passregister("newpassword",{required:"New Password is required"})} className='text-[18px] font-nuninto font-medium bg-[#17171b]/45 border border-[#17171b] rounded-lg px-3.5 pt-2 pb-2 w-full outline-0 focus:border-[#303036]' />

                    {newpass ? <FaEyeSlash size={20} onClick={()=>showNewPass(false)} className='absolute top-1/2 -translate-y-1/2 right-4 text-[#dbdded] cursor-pointer'></FaEyeSlash> : <FaEye size={20} onClick={()=>showNewPass(true)} className='absolute top-1/2 -translate-y-1/2 right-4 text-[#dbdded] cursor-pointer'></FaEye>}

                </div>

                {passerrors.newpassword && <span className='text-red-500 text-sm pt-1 italic font-rubik'>{passerrors.newpassword.message}</span>}

              </div>          

              <div className="w-full">

                <div className="flex gap-1.5 mb-2">

                  <AiOutlineSafety size={19} color="#e2cc64"></AiOutlineSafety>               

                  <span className="text-[#dbdded] font-rubik text-[16px]">CONFIRM PASSWORD</span>

                </div>

                <div className='relative'>

                    <input type={confipass ? "text" : "password"} name='confirmpassword' id='confirmpassword' placeholder='XXXX' {...passregister("confirmpassword",{required:"Confirm Password is required"})} className='text-[18px] font-nuninto font-medium bg-[#17171b]/45 border border-[#17171b] rounded-lg px-3.5 pt-2 pb-2 w-full outline-0 focus:border-[#303036] relative'/>

                    {confipass ? <FaEyeSlash size={20} onClick={()=>showConfiPass(false)} className='absolute top-1/2 -translate-y-1/2 right-4 text-[#dbdded] cursor-pointer'></FaEyeSlash> : <FaEye size={20} onClick={()=>showConfiPass(true)} className='absolute top-1/2 -translate-y-1/2 right-4 text-[#dbdded] cursor-pointer'></FaEye>}

                </div>

                {passerrors.confirmpassword && <span className='text-red-500 text-sm pt-1 italic font-rubik'>{passerrors.confirmpassword.message}</span>}

              </div>
              
            </div>

            <button className='flex items-center bg-[#5d6eee] gap-2 font-nuninto font-semibold px-4 py-1.5 rounded-md sm:self-end mt-2 self-center' disabled={loading2}>
              
              <span className='text-lg sm:text-[19px]'>Refresh</span>

              <MdDoneAll className='text-[22px] sm:text-[25px]'></MdDoneAll>

            </button>

          </form>

        </div>

      </div>

    </div>
  )

}

export default Settings