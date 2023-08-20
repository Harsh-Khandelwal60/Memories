import React ,{useState}from 'react'
import { Avatar , Button , Paper , Typography , Container , Grid, TextField } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import useStyles from './Styles';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { useDispatch } from 'react-redux';
import { Auth2 } from '../../Store/Authorization';
import Icon from './Icon';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const Auth = () => {
    const classes = useStyles();
    const [showPassword , setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const handleChange = () => {};
    const handleSubmit = () => {};
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const switchMode = () => setIsSignUp((prevSignUp) => !prevSignUp);



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
        
    const data = {result ,token }
        try {
            dispatch(Auth2(data));
            Navigate('/');
        } catch (error) {
            console.log(error);
        }


   };
   const googleError = (error) => {
        console.log(error);
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
                            
                            <Input name='firstname' label= 'First Name' handleChange={handleChange} autoFocus half/>        
                            <Input name='lastname' label= 'Last Name' handleChange={handleChange} half/>
                
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

