import React, { useEffect , useState } from "react";
import { Container , AppBar , Typography , Grow , Grid } from '@mui/material';


import memories from './images/memories.png';
import Form from "./components/Forms/Form";
import Posts from "./components/Posts/Posts";
import useStyles from './Styles';
import { getPosts } from "./Store/CreatePostSlice";

import { useDispatch  } from "react-redux";



const App = () => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const [currentId,setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getPosts());
        // console.log(currentId);
    },[currentId,dispatch]);

 

    return(
        <Container  maxWidth="lg">
            <AppBar style={classes.appBar} position="static" color="inherit">
                <Typography style={classes.heading} variant="h2" align="center">Memories</Typography>
                <img  style={classes.image}  src={memories} alt="icon" height="60" />
            </AppBar>
            <Grow in>
                <Container>
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId}  />
                    </Grid>
                </Grid>
                </Container>
            </Grow>
    </Container>
    );
};

export default App;