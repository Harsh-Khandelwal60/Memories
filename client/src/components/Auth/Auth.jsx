import React ,{useState}from 'react'
import { Avatar , Button , Paper , Typography , Container , Grid, TextField } from '@mui/material';
import {  GoogleLogin } from '@react-oauth/google';
import useStyles from './Styles';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import Icon from './Icon';

const Auth = () => {
    const classes = useStyles();
    const [showPassword , setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);

    const handleChange = () => {};
    const handleSubmit = () => {};
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const switchMode = () => setIsSignUp((prevSignUp) => !prevSignUp);

   const googleSuccess = (res) => {
        console.log(res);
   };
   const googleFailure = () => {
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
                    <GoogleLogin
                        
                        render={(renderProps) => (
                        <Button style={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                            Google Sign In
                        </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
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
