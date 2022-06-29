import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userSignUp } from '../service/Auth';
import {useNavigate} from 'react-router-dom'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [state,setState]=useState({firstName:'',lastName:'',password:'',email:'',contactNumber:''})

  const [error,setError]=useState({firstName:'',lastName:'',password:'',email:'',contactNumber:''})



  const navigate=useNavigate();
  const handler=(event)=>{
    let {name,value}=event.target;
    setState({...state,[name]:value})
  }

  const fnameValidate=()=>{
    let regEx=new RegExp(/^[a-zA-Z\s]*$/)
    if(state.firstName===""){
      error.firstName="Required*"
      setError({...error})
      return false
    }
    else if(regEx.test(state.firstName)===false){
      error.firstName="First name should contain only alphabets"
      setError({...error})
      return false
    }
    else{
      error.firstName=""
      setError({...error})
      return true
    }
  }

  const lnameValidate=()=>{
    let regEx=new RegExp(/^[a-zA-Z\s]*$/)
    if(state.lastName===""){
      error.lastName="Required*"
      setError({...error})
      return false
    }
    else if(regEx.test(state.lastName)===false){
      error.lastName="Last name should contain only alphabets"
      setError({...error})
      return false
    }
    else{
      error.lastName=""
      setError({...error})
      return true
    }
  }

  const emailValidate=()=>{
    let regEx=new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    if(state.email===""){
      error.email="Required*"
      setError({...error})
      return false
    }
    else if(regEx.test(state.email)===false){
      error.email="Please Enter Valid Email"
      setError({...error})
      return false
    }
    else{
      error.email=""
      setError({...error})
      return true
    }
  }

  const passwordValidate=()=>{
    let regEx=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])")
    if(state.password===""){
      error.password="Required*"
      setError({...error})
      return false
    }
    else if(regEx.test(state.password)===false){
      error.password="password should contain atleast one capital letter, small letter, one digit and one special character"
      setError({...error})
      return false
    }
    else{
      error.password=""
      setError({...error})
      return true
    }
  }

  const contactValidate=()=>{
    let regEx=new RegExp(/^\d{10}$/)
    if(state.contactNumber===""){
      error.contactNumber="Required*"
      setError({...error})
      return false
    }
    else if(regEx.test(state.contactNumber)===false){
      error.contactNumber="Contact Number should contain only numbers and length is 10"
      setError({...error})
      return false
    }
    else{
      error.contactNumber=""
      setError({...error})
      return true
    }
  }

  const validation=()=>{
    let res1=fnameValidate()
    let res2=lnameValidate()
    let res3=emailValidate()
    let res4=passwordValidate()
    let res5=contactValidate()
    return res1 && res2 && res3 && res4 && res5
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let result=validation()
    if(result){
      userSignUp(state)
      .then(res=>{
        if(res.data.err==0){
         navigate("/");
        }
        if(res.data.err==1){
          alert(res.data.msg)
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }
 
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={handler}
                  onBlur={fnameValidate}
                />
                <Typography variant="p" sx={{color:"red"}}>{error.firstName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handler}
                  onBlur={lnameValidate}
                />
                <Typography variant="p" sx={{color:"red"}}>{error.lastName}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handler}
                  onBlur={emailValidate}
                />
                 <Typography variant="p" sx={{color:"red"}}>{error.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handler}
                  onBlur={passwordValidate}
                />
                 <Typography variant="p" sx={{color:"red"}}>{error.password}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contactNumber"
                  label="Contact Number"
                 
                  id="contact"
                  autoComplete="contact"
                  onChange={handler}
                  onBlur={contactValidate}

                />
                 <Typography variant="p" sx={{color:"red"}}>{error.contactNumber}</Typography>
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}