import React ,{useState}from 'react'

import { Avatar , Button , Paper , Typography , Container , Grid, TextField } from '@mui/material';
import useStyles from './Styles';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";

const Auth = () => {
   const classes = useStyles();
    const [showPassword , setShowPassword] = useState(false);

   const handleChange = () => {};
   const handleSubmit = () => {};
   const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
   const isSignup = true;
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
            </form>
          </Paper>

        </Container>
    )
}

export default Auth;
