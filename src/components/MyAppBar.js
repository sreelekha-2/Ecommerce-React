import  React, {useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useNavigate} from 'react-router-dom'
import { isLoggedIn,isAdmin,doLogout } from '../service/Auth';
import { Badge } from '@mui/material';
import {useSelector,useDispatch} from "react-redux"
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';

export default function MyAppBar() {
  const navigate=useNavigate();
  const count=useSelector(state=>state.cartcounter.count)

  const [searchInput,setSearchInput]=useState("")

  useEffect(()=>{
    let searchParams=new URLSearchParams()
    console.log(searchParams)
    if(searchInput){
      searchParams.set("name",searchInput)
    }
    navigate({pathname:"/products",search:searchParams.toString()})


  },[searchInput])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ShoppingCartIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Neostore E-Shop
          </Typography>
          {isLoggedIn() && <>
            <Box sx={{ flexGrow: 1,display:"flex",alignItems:"center",backgroundColor:"rgb(97, 95, 93,0.2)",borderRadius:"8px",padding:"3px 10px"}}>
            <SearchIcon />
               <InputBase 
               placeholder='Search'
               sx={{color:"white",marginLeft:"8px"}}
              //  value={searchInput}
               onChange={(event)=> setSearchInput(event.target.value)}/>
            </Box>
           
          </>}
          {isLoggedIn() && (
            <>
              <Button color="inherit" onClick={()=> navigate("/home") }>Home</Button>
             

            </>
          )}
           {isLoggedIn() && (
            <>
              <Button color="inherit" onClick={()=> navigate("/products") }>Products</Button>
             

            </>
          )}
          {!isLoggedIn() && (
            <>
              <Button color="inherit" onClick={()=> navigate("/") }>Login</Button>
              <Button color="inherit" onClick={()=> navigate("/signup")}>SignUp</Button>
            </>
          )}

        

          {isLoggedIn() && isAdmin() && (
             <>
            
             <Button color="inherit" onClick={()=> navigate("/addproduct") }>Add Product</Button>
         
           </>
          )}

        {isLoggedIn() && (
          <Button color="inherit" onClick={()=>navigate("/cart")}>
              <Badge badgeContent={count} color="warning">
                <ShoppingCartIcon color="inherit"/>
              </Badge>
          </Button>
           
          )}
         
          {isLoggedIn() && (
            <>
              <Button color="inherit" onClick={doLogout }>Logout</Button>
            </>
          )}
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}
