import React ,{useState , useEffect} from "react";
import { TextField , Button , Typography , Paper} from "@mui/material";
import FileBase from "react-file-base64";
// import useStyles from './styles';

import { useDispatch } from "react-redux";
import { createPosts , updatePosts } from "../../Store/CreatePostSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import useStyles from './styles';


const Form = ({currentId, setCurrentId}) => {
    const dispatch = useDispatch();
    const [postData,setPostData] = useState({title:'', message:'', tags:'', selectedFile:''});
    const post = useSelector((state) => currentId ? state.Post.posts.find((p) => p._id === currentId) : null );
    const user = JSON.parse(localStorage.getItem(`profile`));
    const classes = useStyles();
    const location = useLocation();





    useEffect(() => {
        if (post) {
            setPostData(post);
        }
    }, [currentId , post , location]);

    
    
    const clear = () => {
        setCurrentId(null);
       
        setPostData({title:'', message:'', tags:'', selectedFile:''});
        
    }
   
    const handleSubmit = (event) => {
        event.preventDefault();
        if(currentId){
            dispatch(updatePosts(currentId,{...postData , name : user?.result?.name }));
        }else{
            
            dispatch(createPosts({...postData , name : user?.result?.name}));
        }
        setCurrentId(null);
       
        setPostData({title:'', message:'', tags:'', selectedFile:''});

    }




    if(!(user?.result?.name)){
        return (
            <Paper className= {classes.paper}>
                <Typography variant="h6" align="center" >
                    Please signIn to create Your Own Memories and like other memories
                </Typography>
            </Paper>
        )
    }
   

    return (
       <Paper sx = {classes.paper} >
            <form sx = {`${classes.root} ${classes.form}`} autoComplete="off" noValidate  onSubmit={handleSubmit}>
                <Typography
                variant="h6" >{!currentId ? 'Creating' : 'Editing'} a Memory</Typography>
                {/* <TextField 
                name="creator"
                variant="outlined" 
                label="creator" 
                fullWidth  
                value={postData.creator}  
                onChange={(event) =>setPostData((prevData) => {
                       return { ...prevData, creator: event.target.value };  })}/> */}
                <TextField 
                name="title"
                variant="outlined" 
                label="title" 
                fullWidth  
                value={postData.title}  
                onChange={(event) =>setPostData((prevData) => {   
                    return { ...prevData, title: event.target.value }; })}/>
                <TextField 
                name="message"
                variant="outlined" 
                label="message" 
                fullWidth  
                value={postData.message}  
                onChange={(event) =>setPostData((prevData) => {   
                    return { ...prevData, message: event.target.value }; })}/>
                <TextField 
                name="tags"
                variant="outlined" 
                label="tags" 
                fullWidth  
                value={postData.tags}  
                onChange={(event) =>setPostData((prevData) => {   
                    return { ...prevData, tags: event.target.value.split(',') } })}/>
           
            <div style={classes.fileInput } >
                <FileBase 
                type="file" 
                multiple={false} 
                onDone={({base64}) => setPostData({...postData,selectedFile:base64})}/>
            </div>
            <Button 
            sx={classes.buttonSubmit} 
            variant="contained" 
            color="primary" 
            size="large" 
            type="submit" 
            fullWidth>Submit</Button>
            <Button  
            variant="contained" 
            color="error" 
            size="small" 
            onClick={clear} 
            fullWidth>Clear</Button>
            </form>
       </Paper>
    );
};

export default Form;