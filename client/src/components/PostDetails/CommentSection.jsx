import React , { useState , useRef} from "react";
import { Typography , TextField , Button } from "@mui/material";
import { useDispatch } from "react-redux";

import useStyles from './Styles';
import { commentPosts } from '../../Store/CreatePostSlice'

const CommentSection = ({post}) => {

    const Classes = useStyles();
    const [comments , setComments] = useState(post?.comments);
    const [comment , setComment] = useState('');
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const commentsRef = useRef();

    const handleClick = async () => {
        const finalComment = `${user.result.name } : ${comment}`;
        const newComments = await dispatch(commentPosts(finalComment , post._id));
        
        console.log(newComments);
        setComments(newComments);
        setComment("");

        commentsRef.current.scrollIntoView({ behaviour : 'smooth'}) ;
    }


    return (
       <div>
            <div style={Classes.commentsOuterContainer}>
                <div style={Classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6" >Comments</Typography>
                    {comments.map((c , i) => (
                        <Typography key={i} gutterBottom variant="subtitle1" >
                            <strong>{c.split(' : ')[0]}</strong> 
                                {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                { user?.result?.name  &&  (
                    <div style={{width : '70%'}}>
                        <Typography gutterBottom variant="h6" >Write a comment</Typography>
                        <TextField 
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button variant="contained"  style={{marginTop : '10px'}} color="primary" fullWidth disabled={!comment} onClick={handleClick} >Comment</Button>
                     </div>
               ) }
            </div>
            
       </div>
    );
};


export default CommentSection;
