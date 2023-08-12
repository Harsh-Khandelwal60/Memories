import React from "react";
import Post from "./post/Post.jsx";
import useStyles from './styles';
import { useSelector } from "react-redux";

const Posts = () => {
    const posts = useSelector((state) => {
        return state.Post;
    })
    console.log(posts);
    const classes= useStyles();


    return (
       <>
             <h1>POSTS</h1>
            <Post/>
            <Post/>
       </>
    );
};

export default Posts;