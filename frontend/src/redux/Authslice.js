import { createSlice } from "@reduxjs/toolkit";

export const Authslice = createSlice({

    name:"Auth",
    initialState:{

        token : localStorage.getItem("token") ? localStorage.getItem("token") : null,
        signupdata:null

    },
    reducers:{

        setToken:(state,action)=>{

            state.token = action.payload

        },
        setSignupData:(state,action)=>{

            state.signupdata = action.payload

        }

    }

})

export const{setToken,setSignupData} = Authslice.actions;

export default Authslice.reducer;