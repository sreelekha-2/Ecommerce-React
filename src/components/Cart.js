import React,{useState,useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import { Box, CardMedia, Typography } from '@mui/material';
import {Button} from '@mui/material';
import {useSelector, useDispatch } from 'react-redux';
import { getProductById } from '../service/Product';
import { updateCartCount} from '../redux/cartcounter';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


export default function Cart() {

    const [products,setProducts]=useState([])

  //  window.location.reload("/cart")

    const total=useSelector(state=>state.cartcounter.total)
    const dispatch=useDispatch()

    const deleteItem=(id)=>{
        const filteredArr=products.filter(product=>product._id!==id)
        localStorage.setItem("mycart",JSON.stringify(filteredArr))
        setProducts(filteredArr)
        dispatch(updateCartCount())
        
    }

    useEffect(()=>{
        if(localStorage.getItem("mycart")!=undefined){
            const arr=JSON.parse(localStorage.getItem("mycart"))
            setProducts(arr)
            
          
        }
    },[])

    const increaseQuantity=(id)=>{
      
      if(localStorage.getItem("mycart")!=undefined){
        const arr=JSON.parse(localStorage.getItem("mycart"))
        
        let index=arr.findIndex(product=>{
          if(product._id===id){
            return true
          }
          else{
            return false
          }
        })

        console.log(index)
        if(arr[index].quantity==1){
          arr[index].quantity=1
        }
        arr[index].quantity=arr[index].quantity+1
        localStorage.setItem("mycart",JSON.stringify(arr))
        setProducts(arr)
        dispatch(updateCartCount())  
      
    }

    }

    const decreaseQuantity=(id)=>{
      if(localStorage.getItem("mycart")!=undefined){
        const arr=JSON.parse(localStorage.getItem("mycart"))
        
        let index=arr.findIndex(product=>{
          if(product._id===id){
            return true
          }
          else{
            return false
          }
        })

        console.log(index)
        if(arr[index].quantity<=1){
          arr[index].quantity=1
        }
        else{
          arr[index].quantity=arr[index].quantity-1
          localStorage.setItem("mycart",JSON.stringify(arr))
          setProducts(arr)
          dispatch(updateCartCount())
        }
            
    }
    }
    
  return (
    <Container>
        <h2>Cart</h2>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
     
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" width="150" height="150" scope="row">
              <CardMedia
                component="img"
                
                image={product.imageURL}
                alt="green iguana"
            />
              </TableCell>
              
              <TableCell align="center">{product.name}</TableCell>
              <TableCell align="center">Rs.{product.price*product.quantity}</TableCell>
              <TableCell align="center">
               <Box sx={{display:"flex",alignItems:"center"}}>
                <Button>
                    <RemoveCircleOutlineIcon onClick={()=>decreaseQuantity(product._id)}/>
                </Button>
              
                <Typography>{product.quantity}</Typography>
                <Button>
                    <AddCircleOutlineIcon onClick={()=>increaseQuantity(product._id)}/>
                </Button>
               
               </Box>
              
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" color="error" onClick={()=>deleteItem(product._id)}>Delete</Button>
              </TableCell>
             
             
            </TableRow>
            
          ))}
          <TableRow>
            
         
           
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            <TableCell>
             
              {total>0?<h2>Total Price: {total}</h2>:<h2>Cart is Empty</h2>}
                
            
               
              </TableCell>
              
              
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

            
    </Container>
  )
}
