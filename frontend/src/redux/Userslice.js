import { createSlice } from "@reduxjs/toolkit";

export const Userslice = createSlice({

    name:"User",
    initialState:{

        user: localStorage.getItem("userdetails") ? JSON.parse(localStorage.getItem("userdetails")) : null

    },
    reducers:{

        setUser:(state,action)=>{

            state.user = action.payload

        }

    }

})

export const{setUser} = Userslice.actions;

export default Userslice.reducer;