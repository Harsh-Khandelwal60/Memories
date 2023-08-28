import React , { useState , useRef} from "react";
import { Typography , TextField , Button } from "@mui/material";
import { useDispatch } from "react-redux";

import useStyles from './Styles';

const CommentSection = ({post}) => {

    const Classes = useStyles();
    const [comments , setComments] = useState([1,2,3,4]);
    const [comment , setComment] = useState('');

    const handleClick = () => {}


    return (
       <div>
            <div style={Classes.commentsOuterContainer}>
                <div style={Classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6" >Comments</Typography>
                    {comments.map((c , i) => (
                        <Typography key={i} gutterBottom variant="subtitle1" >
                            comment {i}
                        </Typography>
                    ))}
                </div>
            </div>
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
                 <Button variant="contained"  style={{marginTop : '10px'}} fullWidth disabled={!comment} onClick={handleClick} >Comment</Button>
            </div>
       </div>
    );
};


export default CommentSection;
