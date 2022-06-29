
import { createSlice } from "@reduxjs/toolkit";
let arr
let totalPrice;
if(localStorage.getItem("mycart")!=undefined){
    arr=JSON.parse(localStorage.getItem("mycart")) 
    if(arr.length===0){
        totalPrice=0
    } 
    else{
        totalPrice=arr.map(each=>each.price*1).reduce((acc,curr)=>acc+curr)
    } 
}
else{
    arr=[]
    totalPrice=0
}

export const counterSlice=createSlice({
    name:"cartcounter",
    initialState:{
        count:arr.length,
        total:totalPrice
    },
    reducers:{
        updateCartCount:(state)=>{
            if(localStorage.getItem("mycart")!=undefined){
                const arr=JSON.parse(localStorage.getItem("mycart"))
                state.count=arr.length
                if(arr.length===0){
                    totalPrice=0
                } 
                else{
                    totalPrice=arr.map(each=>each.price*each.quantity).reduce((acc,curr)=>acc+curr)
                }
                state.total=totalPrice 
            }
        }
        


        
    }
  
})

export const {updateCartCount,updatePrice}=counterSlice.actions
export default counterSlice.reducer