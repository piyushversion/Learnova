import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getcartfromstorage, removefromcartstorage, savecarttostorage } from "./Cartstorage";

export const Cartslice = createSlice({

    name:"Cart",
    initialState:{

        totalitems:localStorage.getItem("totalitems") ? JSON.parse(localStorage.getItem("totalitems")) : 0,
        totalamount:localStorage.getItem("totalamount") ? JSON.parse(localStorage.getItem("totalamount")) : 0,
        items:localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [],
        // userId:null
    },
    reducers:{

        addtocart:(state,action)=>{

            const course = action.payload;

            const chk = state.items.findIndex((item) => item._id === course._id);

            if(chk >= 0){

                toast.error("Course Already in Cart!");

                return;
            }

            state.items.push(course);
            state.totalitems += 1;
            state.totalamount += course.price;

            localStorage.setItem("items",JSON.stringify(state.items));
            localStorage.setItem("totalitems",JSON.stringify(state.totalitems));
            localStorage.setItem("totalamount",JSON.stringify(state.totalamount));

            // savecarttostorage(state.userId,{

            //     items:state.items,
            //     totalitems:state.totalitems,
            //     totalamount:state.totalamount

            // });

            toast.success("Course Added to Cart");

        },

        removefromcart:(state,action) => {

            const course = action.payload;

            state.items = state.items.filter((item) => item._id !== course._id);
            state.totalitems -= 1;
            state.totalamount -= course.price;

            localStorage.setItem("items",JSON.stringify(state.items));
            localStorage.setItem("totalitems",JSON.stringify(state.totalitems));
            localStorage.setItem("totalamount",JSON.stringify(state.totalamount));

            // savecarttostorage(state.userId,{

            //     items:state.items,
            //     totalitems:state.totalitems,
            //     totalamount:state.totalamount

            // })

            toast.success("Course Removed from Cart");

        },

        resetcart:(state) => {

            state.items = [];
            state.totalamount = 0;
            state.totalitems = 0;

            localStorage.removeItem("items",state.items);
            localStorage.removeItem("totalitems",state.totalitems);
            localStorage.removeItem("totalamount",state.totalamount);

            // removefromcartstorage(state.userId);

        },

        loadcart:(state,action) => {

            const userid = action.payload;

            const cart = getcartfromstorage(userid);

            state.items = cart.items;
            state.totalitems = cart.totalitems;
            state.totalamount = cart.totalamount;
            state.userId = userid;

        }
    }

})

export const{addtocart,removefromcart,resetcart,loadcart} = Cartslice.actions;

export default Cartslice.reducer;