import React ,{useState} from "react";
import { TextField , Button , Typography , Paper } from "@mui/material";
import FileBase from "react-file-base64";
import useStyles from './styles';

const Form = () => {
    const classes = useStyles();
    const [postData,setPostData] = useState({creator:'',title:'', message:'', tags:'', selectedFiles:''});

    const handleSubmit = () => {

    }
    const clear = () => {

    }

    return (
       <Paper className={classes.paper} >
            <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h6" >Creating a Memory</Typography>
                <TextField name="creator"variant="outlined" label="creator" fullWidth  value={postData.creator}  onChange={(event) =>setPostData((prevData) => {   return { ...prevData, creator: event.target.value }; })}/>
                <TextField name="title"variant="outlined" label="title" fullWidth  value={postData.title}  onChange={(event) =>setPostData((prevData) => {   return { ...prevData, title: event.target.value }; })}/>
                <TextField name="message"variant="outlined" label="message" fullWidth  value={postData.message}  onChange={(event) =>setPostData((prevData) => {   return { ...prevData, message: event.target.value }; })}/>
                <TextField name="tags"variant="outlined" label="tags" fullWidth  value={postData.tags}  onChange={(event) =>setPostData((prevData) => {   return { ...prevData, tags: event.target.value }; })}/>
            </form>
            <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData,selectedFiles:base64})}/></div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

       </Paper>
    );
};

export default Form;