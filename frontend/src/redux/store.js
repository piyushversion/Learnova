import {configureStore} from "@reduxjs/toolkit";
import Authslice from "./Authslice";
import Userslice from "./Userslice";
import Cartslice from "./Cartslice";
import Categoryslice from "./Categoryslice";
import Courseslice from "./Courseslice";
import Rightsideslice from "./Rightsideslice"
import ViewCourseSlice from "./ViewCourseslice"

export const store = configureStore({

    reducer:{

        Auth:Authslice,
        User:Userslice,
        Cart:Cartslice,
        Category:Categoryslice,
        Course:Courseslice,
        Rightside:Rightsideslice,
        ViewCourse:ViewCourseSlice

    }

})