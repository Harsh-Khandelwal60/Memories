import React ,{useState , useEffect} from "react";
import { TextField , Button , Typography , Paper} from "@mui/material";
import FileBase from "react-file-base64";
// import useStyles from './styles';
import  { root ,myPaper , myForm , myfileInput , buttonSubmit} from './styles';
import { useDispatch } from "react-redux";
import { createPosts , updatePosts } from "../../Store/CreatePostSlice";
import { useSelector } from "react-redux";


const Form = ({currentId, setCurrentId}) => {
    // const classes = useStyles();
    const dispatch = useDispatch();
    const [postData,setPostData] = useState({creator:'',title:'', message:'', tags:'', selectedFiles:''});
    const post = useSelector((state) => currentId ? state.Post.find((p) => p._id === currentId) :null );
    console.log(post);
    useEffect(() => {
        if(post){
            setPostData(post);
        }
    },[post]);
   
    const handleSubmit = (event) => {
        event.preventDefault();
        if(currentId){
            dispatch(updatePosts(currentId,postData));
        }else{
            dispatch(createPosts(postData));
        }
        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setPostData({creator:'',title:'', message:'', tags:'', selectedFiles:''});
    }

    return (
       <Paper sx = {myPaper} >
            <form sx = {`${root} ${myForm}`} autoComplete="off" noValidate  onSubmit={handleSubmit}>
                <Typography
                variant="h6" >{!currentId ? 'Creating' : 'Editing'} a Memory</Typography>
                <TextField 
                name="creator"
                variant="outlined" 
                label="creator" 
                fullWidth  
                value={postData.creator}  
                onChange={(event) =>setPostData((prevData) => {
                       return { ...prevData, creator: event.target.value };  })}/>
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
                    return { ...prevData, tags: event.target.value }; })}/>
           
            <div style={myfileInput } >
                <FileBase 
                type="file" 
                multiple={false} 
                onDone={({base64}) => setPostData({...postData,selectedFile:base64})}/>
            </div>
            <Button 
            sx={buttonSubmit} 
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