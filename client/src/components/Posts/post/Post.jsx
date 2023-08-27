import React from "react";
import {Card ,CardContent , CardMedia , Button , Typography, CardActions , ButtonBase} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useDispatch} from 'react-redux';
import { deletePosts , likePosts } from "../../../Store/CreatePostSlice";
import usestyles from './styles';
import { useNavigate } from "react-router-dom";


const Post = ({post , setCurrentId}) => {
    const dispatch = useDispatch();
    const classes = usestyles();
    const user = JSON.parse(localStorage.getItem(`profile`));
    const Navigate = useNavigate();

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

      const openPost = () => Navigate(`/posts/${post._id}`);
   
    
    return (
        <Card sx={classes.card} raised elevation={6}>
            <ButtonBase sx={classes.cardActions} onClick={openPost}>

                <CardMedia sx={classes.media} image={post.selectedFile} title={post.title} alt="Image"/> 
                        <CardMedia sx={classes.media} image={post.selectedFile} title={post.title} alt="Image"/>
                        <div style={classes.overlay}>
                            <Typography variant="h6"> {post.name}</Typography>
                            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                        </div>
                        {(user?.result?.googleId === post?.creator  ||  user?.result?._id === post?.creator) && (
                            <div style={classes.overlay2}>
                            <Button sx={{ color: 'white' }}
                            size="small" 
                            onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
                        </div>
                        )}
                    
                        <div style={classes.details}>
                            <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => ` # ${tag}`)}</Typography>
                        </div>
                        
                            <Typography sx={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                            <CardContent>
                                <Typography variant="body2" color='textSecondary' component="p">{post.message}</Typography>
                            </CardContent>
                </ButtonBase>
                <CardActions sx={classes.cardActions}>
                    <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePosts(post._id))} >
                        <Likes/>
                    </Button>

                    {(user?.result?.googleId === post?.creator  ||  user?.result?._id === post?.creator) && (
                        <Button size="small" color="primary" onClick={() => dispatch(deletePosts(post._id))} >
                            <DeleteIcon fontSize="small" />
                            Delete
                        </Button>
                    ) }
                    

                </CardActions>

            
            

        </Card>
    );
};

export default Post;