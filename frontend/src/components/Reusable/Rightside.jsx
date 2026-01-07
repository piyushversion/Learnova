import React from 'react'
import Loginform from '../Authentication/Loginform'
import Signupform from '../Authentication/Signupform'

const Rightside = (props) => {

  return (

    <div className='bg-gradient-to-br from-purple-50 to-purple-100 py-10 px-3 sm:px-12 lg:px-[30px] xl:px-16 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%]'>
        
        {

            props.showlogin && <Loginform></Loginform>

        }

        {

            props.showsignup && <Signupform></Signupform>

        }    

    </div>

  )
}

export default Rightside