import React, { useEffect , useState } from "react";
import { Container , Grow , Grid , Paper , AppBar , TextField , Button } from '@mui/material';
import { getPosts } from '../../Store/CreatePostSlice';
import { useDispatch  } from "react-redux";
import {useNavigate , useLocation } from 'react-router-dom';
import {Stack , Chip , Box} from "@mui/material";
import useStyles from './Styles';
import { getPostsBySearch } from "../../Store/CreatePostSlice";


import Posts from "../Posts/Posts";
import Form from "../Forms/Form";

import Pagination from "../Pagination";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    
    const dispatch = useDispatch();
    const [currentId,setCurrentId] = useState(null);
    const classes = useStyles();
   

    const query = useQuery();
    const Navigate = useNavigate();
    const [search , setSearch] = useState('');
    const [tags , setTags] = useState([]);
    const [searchTags , setSearchTags] = useState('');

    
    const page = query.get(`page`) || 1;
    const searchQuery = query.get(`searchQuery`);
    
    const [flag , setFlag] = useState(false);


    useEffect(() => {
         searchPost();
        },[tags]);

     const searchPost = () => {
            if(search.trim() || tags) {
                if(flag) {
                    console.log(`enter`);
                    dispatch(getPostsBySearch({search,tags: tags.join(',')}));
                    Navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}` )
                }
                setFlag(true);
                setSearchTags('');
            }else{
            Navigate('/');
            }  
         };
    
      const handleKeyPress = (e) => {
        if(e.key === `Enter`) {
            if(searchTags.length > 0) {
                setTags((prev) => [...prev, searchTags]);
            }else{
                searchPost();
            }
        }
      };  

      
     const handleDeleteTag = (tag , idx) => {
        setTags(tags.filter((data , index) => {
            if(idx !== index)
              return data;
        }));
     }

     const searchPostByButton = () => {
        if(searchTags.length > 0) {
            setTags((prev) => [...prev, searchTags]);
        }else{
            searchPost();
        }
     }

    
    return (
        <Grow in>
                <Container maxWidth="xl">
                    <Grid container  justify="space-between" alignItems="stretch" sx={classes.gridContainer} spacing={3}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <AppBar sx={classes.appBarSearch} position="static" color="inherit">
                            <TextField sx = {{margin : '10px 0'}} onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />

                            <TextField sx={{margin:"10px 0px"}} name="Tags" variant="outlined" label="Tags" fullWidth value={searchTags} onChange = { (e) => setSearchTags(e.target.value) } onKeyDown={handleKeyPress}  />
                            {
                                <Box maxHeight={100} overflow="auto">
                                    <Stack direction="row" spacing={1}>
                                    {tags.map((tag, index) => (
                                        <Chip
                                        key={index}
                                        label={tag}
                                        onDelete={() => handleDeleteTag(tag , index)}
                                        color="primary"
                                        />
                                    ))}
                                    </Stack>
                                </Box>
                            }

                            <Button onClick={searchPostByButton} sx={classes.searchButton} variant="contained" color="primary" > Search </Button>
                           
                        </AppBar>
                             <Form currentId={currentId} setCurrentId={setCurrentId}  />
                             {(!searchQuery && !tags.length) &&(
                                <Paper elevation={6}>
                                    <Pagination page = {page} />
                                </Paper>
                             )}
                            
                         </Grid>
                     </Grid>
                </Container>
         </Grow>
    )
};


export default Home;