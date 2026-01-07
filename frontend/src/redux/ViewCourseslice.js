import { createSlice } from "@reduxjs/toolkit";

const ViewCourseslice = createSlice({

    name:"ViewCourse",
    initialState:{

        coursefulldata:[],
        coursesectiondata:[],
        coursecompletedlectures:[],
        totalnumoflectures:0
    },
    reducers:{

        setCourseFullData:(state,action)=>{

            state.coursefulldata = action.payload

        },
        setCourseSectionData:(state,action)=>{

            state.coursesectiondata = action.payload

        },
        setCourseCompletedlectures:(state,action)=>{

            state.coursecompletedlectures = action.payload

        },
        setTotalNumOfLectures:(state,action)=>{

            state.totalnumoflectures = action.payload

        },
        updateCompletedLectures:(state,action)=>{

            state.coursecompletedlectures = [...state.coursecompletedlectures,action.payload]

        }

    }

})

export const{setCourseFullData,setCourseSectionData,setCourseCompletedlectures,setTotalNumOfLectures,updateCompletedLectures} = ViewCourseslice.actions

export default ViewCourseslice.reducer