import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    step:1,
    course:null,
    editcourse:false
}

const Courseslice = createSlice({

    name:"Course",
    initialState:initialState,
    reducers:{

        setStep:(state,action)=>{

            state.step = action.payload

        },
        setCourse:(state,action)=>{

            state.course = action.payload

        },
        setEditCourse:(state,action)=>{

            state.editcourse = action.payload

        },
        resetCourseState: (state)=>{

            state.step = 1;
            state.course = null;
            state.editcourse = false;

        }

    }

})

export const{setStep,setCourse,setEditCourse,resetCourseState} = Courseslice.actions;

export default Courseslice.reducer;