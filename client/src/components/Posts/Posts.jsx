import React from "react";
import Post from "./post/Post";
import {classes} from './styles';
import { useSelector } from "react-redux";
import { Grid , CircularProgress } from '@mui/material';


const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => {
        // console.log(state.Post);
        return state.Post;
    })
   
    return (
       !posts.length ? <CircularProgress/> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {
                posts.map((post) => (
                    <Grid key={post.id} item xs={12} sm={6}>
                        <Post post={post}  setCurrentId={setCurrentId} />
                    </Grid>
                ))
            }
        </Grid>
       )
    );
};

export default Posts;