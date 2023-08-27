import React, { useState , useEffect } from "react";
import { AppBar, Typography , Toolbar , Avatar , Button} from "@mui/material";
import useStyles from './styles';
import decode from 'jwt-decode';
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import { Link , useNavigate , useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout2 } from "../../Store/Authorization";



const Navbar = () => {
    const classes = useStyles();
    const [user , setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const location = useLocation();

    

    const logout = () => {
        dispatch(logout2())
        setUser(null);
        Navigate('/');

    };  




    useEffect(() => {
        const token = user?.token;
        if(token) {
            const decodedToken = decode(token);

            if(decodedToken * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])
 
      

    return (
        <AppBar style={classes.appBar} position="static" color="inherit">
            
            <Link to="/" className={classes.brandContainer}>
                <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
            </Link>
            
            <Toolbar style={classes.toolbar}>
                {user?.result ? (
                <div style={classes.profile}>
                    <Avatar style={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                    <Typography style={classes.userName} variant="h6">{user?.result.name}</Typography>
                    <Button variant="contained" style={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
                ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar