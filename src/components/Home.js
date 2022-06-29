import { CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import {Card} from '@mui/material'
import {Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate=useNavigate()
  
        return (
    <Container>
        <Card>
        <CardMedia 
       image="https://www.simicart.com/blog/wp-content/uploads/featured-image-differences-ecommerce-mcommerce-01.png"
        component="img" 
        sx={{height:"450px"}}
        alt="banner"/>
        <CardContent>
            <Typography align="center">Welcome To Neostore E Shop. We have so much offers for you hurry up!!!</Typography>
        </CardContent>

        <CardActions sx={{display:"flex",justifyContent:"center"}}>
           <Button onClick={()=>navigate("/products")}  color="primary" variant="contained">Shop Now</Button>
        </CardActions>
        </Card>
        
       
    </Container>
  )
}
