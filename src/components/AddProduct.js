import React,{useState,useEffect} from 'react'

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import { addProduct } from '../service/Product';

import { Container } from '@mui/system';
import {useNavigate} from "react-router-dom"
import { Typography } from '@mui/material';

export default function AddProduct() {

  const [state,setState]=useState({name:"",category:"",price:"", description:"",imageURL:"",availableItems:""})
  
  const [error,setError]=useState({name:"",category:"",price:"", description:"",imageURL:"",availableItems:""})
  const navigate=useNavigate()
  
  const handler=(e)=>{
    const {name,value}=e.target
    setState({...state,[name]:value})
  }

  const nameValidate=()=>{
    let regEx=new RegExp(/^[a-zA-Z0-9\s]*$/)
    console.log("blur")
    if(state.name===""){
      console.log("triggered")
      error.name="Required*"
      setError({...error})
      return false
    }
    else if(regEx.test(state.name)===false){
      error.name="Name can contain only alphabets and numbers"
      setError({...error})
      return false
    }
    else{

      error.name=""
      setError({...error})
      return true
    }
  }

  const categoryValidate=()=>{
    let regEx=new RegExp(/^[a-zA-Z\s]*$/)
    console.log("blur")
    if(state.category===""){
      console.log("validated")
    
      error.category="Category can contain only alphabets"
      setError({...error})
      return false
    }
    else if(regEx.test(state.category)===false){
      error.category="Category can contain only alphabets"
      setError({...error})
      return false
    }
    else{

      error.category=""
      setError({...error})
      return true
    }
  }

  const priceValidate=()=>{
    let regEx=new RegExp(/^[0-9]*$/)
    console.log("blur")
    if(state.price===""){
      console.log("triggered")
      error.price="Required*"
      setError({...error})
      return false
    }
    else if(regEx.test(state.price)===false){
      error.price="Price should contain only numbers"
      setError({...error})
      return false
    }
    else{

      error.price=""
      setError({...error})
      return true
    }
  }

  const descValidate=()=>{
    if(state.description===""){
      error.description="Required*"
      setError({...error})
      return false
    }
    else{

      error.description=""
      setError({...error})
      return true
    }
  }

  const availItemsValidate=()=>{
    let regEx=new RegExp(/^[0-9]*$/)
    console.log("blur")
    if(state.availableItems===""){
      console.log("triggered")
      error.availableItems="Required*"
      setError({...error})
      return false
    }
    else if(regEx.test(state.availableItems)===false){
      error.availableItems="availableItems should contain only numbers"
      setError({...error})
      return false
    }
    else{

      error.availableItems=""
      setError({...error})
      return true
    }
  }

  const urlValidate=()=>{
    let regEx=new RegExp(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/)
    if(state.imageURL===""){
      error.imageURL="Required*"
      setError({...error})
      return false
    }
    else if(regEx.test(state.imageURL)===false){
      error.imageURL="Enter Proper URL"
      setError({...error})
      return false
    }
    else{
      error.imageURL=""
      setError({...error})
      return true
    }
  }

  const validateFields=()=>{
    let res1=nameValidate()
    let res2=categoryValidate()
    let res3=priceValidate()
    let res4=descValidate()
    let res5=availItemsValidate()
    let res6=urlValidate()
    console.log(res1,res2)

    return res1 && res2 && res3 && res4 && res5 && res6
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    let result=validateFields()
    if(result){
      addProduct(state)
      .then(res=>{
        navigate("/products")
      })
      .catch(err=>console.log(err))
    }
   
  }
  return (
    <Container>
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
         
          <Box component="form" onSubmit={handleSubmit}   sx={{ mt: 1 ,width:"500px"}}>
            <TextField
              margin="normal"  
              fullWidth
              id="name"
              label="product name"
              name="name"
              onChange={handler}
              onBlur={nameValidate}
            />
            <Typography sx={{color:"red"}} variant="p" component="p">{error.name}</Typography>
            <TextField
              margin="normal"
              fullWidth
              name="category"
              label="Category"
              type="text"
              id="category"
              onChange={handler}
              onBlur={categoryValidate}
            />
           <Typography sx={{color:"red"}} variant="p" component="p">{error.category}</Typography>
          <TextField
              margin="normal" 
              fullWidth
              id="price"
              label="Price"
              name="price"
              onChange={handler}
              onBlur={priceValidate}
            />
             <Typography sx={{color:"red"}} variant="p" component="p">{error.price}</Typography>
                <TextField
              margin="normal"
              fullWidth
              id="description"
              label="Description"
              name="description" 
              onChange={handler}
              onBlur={descValidate}
            />
           <Typography sx={{color:"red"}} variant="p" component="p">{error.description}</Typography>
          <TextField
              margin="normal"
              fullWidth
              id="availableItems"
              label="Available Items"
              name="availableItems" 
              onChange={handler}
              onBlur={availItemsValidate}
            />
           <Typography sx={{color:"red"}} variant="p" component="p">{error.availableItems}</Typography>
          <TextField
              margin="normal" 
              fullWidth
              id="imageURL"
              label="Image Url"
              name="imageURL"  
              onChange={handler}
              onBlur={urlValidate}
            />
             <Typography sx={{color:"red"}} variant="p" component="p">{error.imageURL}</Typography>
           
            <Button
              type="submit"
             
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Product
            </Button>
          
          </Box>
        </Box>
    </Container>
  )
}
