import React from "react";
import {classes} from './styles';
import {Card ,CardContent , CardMedia , Button , Typography, CardActions} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useDispatch} from 'react-redux';
import { deletePosts , likePosts, updatePosts } from "../../../Store/CreatePostSlice";


const Post = ({post , setCurrentId}) => {
   
    const dispatch = useDispatch();
    return (
        <Card sx={classes.card}>
            <CardMedia sx={classes.media} image={post.selectedFile} title={post.title} alt="Image"/>
            <div style={classes.overlay}>
                <Typography variant="h6"> {post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div style={classes.overlay2}>
                <Button sx={{ color: 'white' }}
                 size="small" 
                 onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
            </div>
            <div style={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => ` # ${tag}`)}</Typography>
            </div>
            <div>
                <Typography sx={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color='textSecondary' component="p">{post.message}</Typography>
                </CardContent>
                <CardActions sx={classes.cardActions}>
                    <Button size="small" color="primary" onClick={() => dispatch(likePosts(post._id))} >
                        <ThumbUpAltIcon fontSize="small" />
                        &nbsp; Like &nbsp;
                        {post.likeCount}
                    </Button>
                    <Button size="small" color="primary" onClick={() => dispatch(deletePosts(post._id))} >
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>

                </CardActions>

            </div>
            

        </Card>
    );
};

export default Post;