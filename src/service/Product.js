
import { MAIN_API } from "../env";
import axios from "axios";
import jwt_decode from "jwt-decode"

function getProducts(){
    return axios.get(`${MAIN_API}products`);
}

function getProductById(id){
    return axios.get(`${MAIN_API}products/${id}`)
}
function addProduct(data){
    return axios.post(`${MAIN_API}products`,data)
}

function deleteProductItem(id){
    return axios.delete(`${MAIN_API}products/${id}`)
}

function searchProducts(searchVal){
    return axios.get(`${MAIN_API}products/${searchVal}`)
}
export {getProducts,addProduct,getProductById,deleteProductItem,searchProducts}