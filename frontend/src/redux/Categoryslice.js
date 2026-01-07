import { createSlice } from "@reduxjs/toolkit";

export const Categoryslice = createSlice({

    name:"Category",
    initialState:{

        categories:[],
        loading:false
    },
    reducers:{

        setCategories:(state,action)=>{

            state.categories = action.payload

        },
        setLoading:(state,action)=>{

            state.loading = action.payload

        }

    }

})

export const{setCategories,setLoading} = Categoryslice.actions

export default Categoryslice.reducer