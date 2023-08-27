import React from "react";
import Post from "./post/Post";
import {classes} from './styles';
import { useSelector } from "react-redux";
import { Grid , CircularProgress } from '@mui/material';


const Posts = ({setCurrentId}) => {
    const {posts , isLoading } = useSelector((state) => {
        return state.Post;
    })

    if(!posts.length && !isLoading) return `No Posts`;
   
    return (
       !posts?.length ? <CircularProgress/> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {
                posts.map((post) => (
                    <Grid key={post.id} item xs={12} sm={12} md={6} lg={4} >
                        <Post post={post}  setCurrentId={setCurrentId} />
                    </Grid>
                ))
            }
        </Grid>
       )
    );
};

export default Posts;