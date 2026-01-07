import React from 'react'
import footerimage from "../../assets/utilities image/footer-bg.jpg"
import learnova from "../../assets/utilities image/learnova1.png";
import {NavLink} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { setLoading } from '../../redux/Categoryslice';

const Footer = () => {

  const {categories,loading} = useSelector(state => state.Category);

  return (

    <div>

        <section className='p-8 pb-7 bg-cover' style={{backgroundImage:`url(${footerimage})`}}>

            <div className='flex justify-around items-center sm:items-start flex-col sm:flex-row pt-6 pb-[20px] sm:pb-10'>

                <div className='font-lexend w-full sm:w-[40%] md:w-1/4'>

                    <div className='flex items-center justify-center sm:justify-start gap-3'>

                        <img src={learnova} alt="XXX" className='w-[40px]'/>

                        <h2 className='text-[#5d6eee] font-nuninto text-[35px] tracking-wide font-semibold'>Learnova</h2>
                        
                    </div>

                    <p className='text-[#798795] my-5 text-center sm:text-left'>Thanks for exploring Learnova. Your learning journey matters to us come back anytime to discover more and level up your skills.</p>

                    <p className='text-[#798795] text-center sm:text-left'>Keep learning, keep growing see you again on your next step toward success!</p>

                </div>

                <div className='font-lexend hidden lg:block'>

                    <h1 className='text-2xl font-bold font-nuninto'>Quick Links</h1>

                    <div className='mt-4 flex flex-col gap-2'>

                        <li className='list-none'>

                            <NavLink to={"/"}>Home</NavLink>
                                
                        </li>
                        <li className='list-none'>

                            <NavLink to={"/about"}>About</NavLink>

                        </li>
                        <li className='list-none'>

                            <NavLink to={"/contact"}>Contact</NavLink>

                        </li>

                    </div>

                </div>

                <div className='flex flex-col gap-7 w-full items-center sm:items-start text-center sm:text-start sm:w-max mt-10 sm:mt-0'>

                <div className='font-lexend'>

                    <h1 className='text-2xl font-bold font-nuninto'>Categories</h1>

                    <div className='mt-4 flex flex-col gap-2'>

                        {
                            loading ? <p className='text-black'>Fetching...</p> : categories.length !== 0 ? <>{

                            categories.map((cat,index)=>{

                                return <NavLink to={`/categorypage/${cat._id}`} key={index}><li key={index} className='list-none'>{cat.name}</li></NavLink>

                            })

                        }
                        
                        </> : <p className='text-black'>No Categories Found</p>

                        }

                    </div>

                </div>

                <div className='font-lexend block lg:hidden'>

                    <h1 className='text-2xl font-bold font-nuninto'>Quick Links</h1>

                    <div className='mt-4 flex flex-col gap-2'>

                        <li className='list-none'>

                            <NavLink to={"/"}>Home</NavLink>
                                
                        </li>
                        <li className='list-none'>

                            <NavLink to={"/about"}>About</NavLink>

                        </li>
                        <li className='list-none'>

                            <NavLink to={"/contact"}>Contact</NavLink>

                        </li>

                    </div>

                </div>

                </div>

                <div className='font-lexend hidden md:block md:w-[30%] lg:w-max'>

                    <h1 className='text-2xl font-bold font-nuninto'>Contact Info</h1>

                    <div className='mt-4 flex flex-col gap-2'>

                        <p className='text-[#798795]'>Flat No. 203, Shanti Residency, VIP Road, <br/> Raipur – 492001, Chhattisgarh, India</p>

                        <p className='text-[#798795]'>piyushdhote966@gmail.com</p>

                        <p className='text-[#798795]'>8305766456</p>

                    </div>

                </div>

            </div>

            <div className='font-lexend text-center block md:hidden mt-5 mb-7'>

                <h1 className='text-2xl font-bold font-nuninto'>Contact Info</h1>

                <div className='mt-4 flex flex-col gap-2'>

                    <p className='text-[#798795]'>Flat No. 203, Shanti Residency, VIP Road, <br/> Raipur – 492001, Chhattisgarh, India</p>

                    <p className='text-[#798795]'>piyushdhote966@gmail.com</p>

                    <p className='text-[#798795]'>8305766456</p>

                </div>

            </div>

            <div className='bg-gray-300 h-[1px] w-[95%] mx-auto'></div>

            <p className='text-[#798795] font-semibold font-nuninto text-center pt-8'>© 2025 Crafted by <span className='text-[#5d6eee]'>Learnova</span> All Rights Reserved.</p>

        </section>

    </div>

  )

}

export default Footer