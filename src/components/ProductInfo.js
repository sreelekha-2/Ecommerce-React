import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../service/Product'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import { updateCartCount,updatePrice } from '../redux/cartcounter';
import { useDispatch } from 'react-redux';

export default function ProductInfo() {
    const {id}=useParams()

    const [product,setProduct]=useState({})
    const dispatch=useDispatch()
  

    const addToCart=(id)=>{
        getProductById(id)
        .then(res=>{
          
           if(localStorage.getItem("mycart")!=undefined){
            
            const cartArr=JSON.parse(localStorage.getItem("mycart"))
            if(cartArr.some(item=>item._id===id)){
              alert("product already added to cart")
            }
            else{
              cartArr.push(res.data)
              localStorage.setItem("mycart",JSON.stringify(cartArr))
              alert("product added")
              dispatch(updateCartCount())
              // dispatch(updatePrice())
            }
           
           
          }
          else{
            const cartArr=[]
            cartArr.push(res.data)
            localStorage.setItem("mycart",JSON.stringify(cartArr))
            alert("product added")
            dispatch(updateCartCount())
            // dispatch(updatePrice())
          }
        })
    }
    useEffect(()=>{

        getProductById(id)
        .then(res=>{
            console.log(res.data)
            setProduct(res.data)
        })
        .catch(err=>console.log(err))
    },[])
  return (
    <Container>
       
   <Grid item xs={4} key={product._id} >
   {/* <Item>xs=4</Item> */}
   <Card sx={{ maxWidth: 650, margin:"30px auto" }} >
     <CardMedia
       component="img"
       height="380"
       image={product.imageURL}
       alt="green iguana"
       
     />
     <CardContent>
       <Typography gutterBottom variant="h5" component="div">
         {product.name}
       </Typography>
       <Typography variant="body2" color="text.secondary">
        {product.description}
       </Typography>
       <Typography variant="h6" color="text.secondary">
        Price :{product.price}
       </Typography>
       <Typography variant="h6" color="text.secondary">
        Avail Items :{product.availableItems}
       </Typography>
     </CardContent>
     <CardActions>
       
       <Button size="small" sx={{backgroundColor:"#ffbf00",color:"#000000"}} variant="contained" onClick={()=>addToCart(product._id)}>Add To Cart</Button>
     </CardActions>
   </Card>
 </Grid>

    </Container>
  )
}
