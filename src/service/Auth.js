import { MAIN_API } from "../env";
import axios from "axios";
import jwt_decode from "jwt-decode"
function userSignUp(data){
    return axios.post(`${MAIN_API}users`,data);
}

function loginUser(data){
    return axios.post(`${MAIN_API}auth`,data);
}

function isLoggedIn(){
    const data=localStorage.getItem("_token")
   
    if(!data){
        return false
    }
    else{
        return true
    }
}

function getUser(){
    try{
        return jwt_decode(localStorage.getItem("_token"))
    }
    catch(err){
        return null
    }
}

function isAdmin(){
    // console.log(getUser())
    return !getUser()?false:getUser().isAdmin
}

function doLogout(){
    localStorage.removeItem("_token")
    window.location="/"
       
}


export {userSignUp,loginUser,isLoggedIn,getUser,isAdmin,doLogout};