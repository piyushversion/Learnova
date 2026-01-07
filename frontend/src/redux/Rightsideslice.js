import { createSlice } from "@reduxjs/toolkit";

const Rightsideslice = createSlice({

    name:"Rightside",
    initialState:{

        title:null,
        description:null,
        imagee:null,
        noofsec:0,
        nooflec:0,
        estimateddur:0

    },
    reducers:{

        setTitle:(state,action)=>{

            state.title = action.payload

        },
        setDescription:(state,action)=>{

            state.description = action.payload

        },
        setImagee:(state,action)=>{

            state.imagee = action.payload

        },
        setNumberOfSections:(state,action)=>{

            state.noofsec = action.payload

        },
        setNumberOfLectures:(state,action)=>{

            state.nooflec = action.payload

        },
        setEstimatedDuration:(state,action)=>{

            state.estimateddur = action.payload

        },
        Resetstate:(state)=>{

            state.title = null;
            state.description = null;
            state.imagee = null;
            state.noofsec = 0;
            state.nooflec = 0;
            state.estimateddur = 0;

        }

    }

})

export const{setTitle,setDescription,setImagee,setNumberOfSections,setNumberOfLectures,setEstimatedDuration,Resetstate} = Rightsideslice.actions;

export default Rightsideslice.reducer;