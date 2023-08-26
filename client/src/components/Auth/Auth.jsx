import React ,{useState}from 'react'
import { Avatar , Button , Paper , Typography , Container , Grid, TextField } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import useStyles from './Styles';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { useDispatch , useSelector } from 'react-redux';
import { Auth2  } from '../../Store/Authorization';
import { signIn , signUp } from '../../Store/Authentication';



import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const initialState = { firstName: "" , lastName : "" , email : "" , password : "" , confirmPassword : "" };

const Auth = () => {
    const classes = useStyles();
    const [showPassword , setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);
    const [formData , setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData , [e.target.name]: e.target.value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            dispatch(signUp(formData , Navigate))
        }else{
            dispatch(signIn(formData , Navigate));
        }
    };
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);


    const switchMode = () => {
        setIsSignUp((prevSignUp) => !prevSignUp);
        setShowPassword();
    }
     
    
    


   const googleSuccess = async (res) => {
    const decode = jwt_decode(res.credential);

    const result = {
        email : decode.email,
        familyName : decode.family_name,
        givenName : decode.given_name,
        googleId : decode.sub,
        imageUrl : decode.picture,
        name : decode.name,
    }
    const token = res.credential;
        
    const data = { result ,token }
        try {
            dispatch(Auth2(data));
            Navigate('/');
        } catch (error) {
            console.log(error);
        }


   };
   const googleError = (error) => {
        console.log(`Google Sign In was UnSuccessful. Try Again Later`);
   };
  
    return (
        <Container component='main' maxWidth='xs' >
          <Paper style={classes.paper} elevation={3}>
            <Avatar style={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography varient="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form style={classes.form} onSubmit={handleSubmit}>
                <Grid Container spacing={2} >
                {
                    isSignup && (
                       <>
                            
                            <Input name='firstName' label= 'First Name' handleChange={handleChange} autoFocus half/>        
                            <Input name='lastName' label= 'Last Name' handleChange={handleChange} half/>
                
                       </>
                    )
                }
                <Input name='email' label='Email Address' handleChange={handleChange} type='email'/>
                <Input name='password' label='password' handleChange={handleChange} type={showPassword?"text" :"password" } handleShowPassword = {handleShowPassword} />
                { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                </Grid>
               

                <Button type='submit' fullWidth variant='contained' color='primary' style={classes.submit} >
                    {isSignup ? "Sign Up" : 'Sign In'}
                </Button>
                <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an Account ? Sign In' : "Don't have an account ? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
          </Paper>

        </Container>
    )
}

export default Auth;

// onClick={renderProps.onClick} disabled={renderProps.disabled}
// startIcon={<Icon/>} 
// render={(renderProps) => (
//     <Button style={classes.googleButton} color="primary" fullWidth  variant="contained">
//         Google Sign In
//     </Button>
//     )}
// cookiePolicy="single_host_origin"

