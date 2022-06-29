import React, {useState,useEffect} from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getProductById, getProducts,deleteProductItem ,searchProducts} from '../service/Product';
import { Container } from '@mui/system';
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import {updateCartCount,updatePrice} from "../redux/cartcounter"
import { isAdmin } from '../service/Auth';
import { useLocation } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.seconday,
}));





export default function Products({products}) {

  const [proData,setProData]=useState([])

  const location=useLocation();
  console.log(location)


  const navigate=useNavigate()
  const dispatch=useDispatch()

  useEffect(()=>{
    searchProducts(location.search)
    .then(res=>{
      console.log(res)
      if(res.data.err===0){
        setProData(res.data.prodata)
        // products=res.data.prodata
      }
    })
  },[location.search])

  const addToCart=(id)=>{
      getProductById(id)
      .then(res=>{
        
         if(localStorage.getItem("mycart")!=undefined){
          
          const cartArr=JSON.parse(localStorage.getItem("mycart"))
          if(cartArr.some(item=>item._id===id)){
            alert("product already added to cart")
          }
          else{
          
            let data=res.data
            
            if(data.quantity===undefined){
              data.quantity=1
            }
            cartArr.push(data)
            localStorage.setItem("mycart",JSON.stringify(cartArr))
            alert("product added")
            dispatch(updateCartCount())
         
          }
         
         
        }
        else{
          const cartArr=[]
          let data=res.data
          if(data.quantity===undefined){
              data.quantity=1
          }
          cartArr.push(data)
          localStorage.setItem("mycart",JSON.stringify(cartArr))
          alert("product added")
          dispatch(updateCartCount())
          
        }
      })
  }
 
  // useEffect(()=>{
  //     getProducts()
  //     .then(res=>setProData(res.data.prodata))
  //     .catch(err=>console.log(err))
  // },[])


  const deleteProduct=(id)=>{
      deleteProductItem(id)
      .then(res=>{
        if(res){
          getProducts()
          .then(res=>setProData(res.data.prodata))
          .catch(err=>console.log(err))
        }
        window.location.reload()
      })
  }

  
  return (
   
      
      <Container>
      <h2>Products</h2>
      <Grid container spacing={2}>

{products.map(product=>
   <Grid item xs={4} key={product._id}>
 
   <Card sx={{ maxWidth: 500,marginTop:"10px"}} >
     <CardMedia
       component="img"
       height="300"
       image={product.imageURL}
       alt="green iguana"
     />
     <CardContent>
       <Typography gutterBottom variant="h5" style={{fontWeight:"bold"}} component="div">
         {product.name}
       </Typography>

       <Typography variant="h6">Rs.{product.price}</Typography>
   
     </CardContent>
     <CardActions>
       <Button size="small" variant="contained" sx={{backgroundColor:"#808080"}}  onClick={()=>navigate(`/productinfo${product._id}`)}>Info</Button>
       <Button size="small" variant="contained" sx={{backgroundColor:"#ffbf00",color:"#000000"}}   onClick={()=>addToCart(product._id)}>Add To Cart</Button>
       {isAdmin() && <Button variant="contained" color="error" size="small" onClick={()=>deleteProduct(product._id)}>Delete</Button>}
     </CardActions>
   </Card>
 </Grid>)}
</Grid>
</Container>

  
  )
}

