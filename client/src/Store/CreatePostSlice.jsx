import { createSlice  } from "@reduxjs/toolkit";
import * as api from '../api/index';


const CreatePostSlice = createSlice({
    name:"Post",
    initialState:[],
    reducers:{
        create(state,action) {
            return [...state,action.payload]
        },
        fetchApi(state,action){
            return  action.payload;
        }, 
        update(state,action){
            return state.map((post) => action.payload._id===post._id ? action.payload:post );
        },
        Delete(state,action) {
            return state.filter((post) => post._id !== action.payload );
        },
        like(state,action) {
            return state.map((post) => action.payload._id===post._id ? action.payload:post );
        }
    },
})
export const getPosts = () => {
    return async function getPostsThunk(dispatch) {
        try {
            const {data} = await api.fetchPosts();
            dispatch(fetchApi(data));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
};


export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        console.log(searchQuery);
        const {data : {data}} = await api.fetchPostsBySearch(searchQuery);
        
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export const createPosts  = (post) => async (dispatch) => {
    try {
       
        const {data} = await api.createPost(post)
        // console.log(res);
        dispatch(create(data));
    } catch (error) {
        console.log(error);
    }
}

export const updatePosts = (id,postData) => async (dispatch) => {
        try {
            const { data } = await api.updatePost(id,postData);
            console.log(data);
            dispatch(update(data));
        } catch (error) {
            console.log(error.message);
        }
}

export const deletePosts = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        
        dispatch(Delete(id));

    } catch (error) {
        console.log(error);
    }
}

export const likePosts = (id) => async (dispatch) => {
    try {
        
        const { data } = await api.likePost(id);
        
        dispatch(like(data));
    } catch (error) {
        console.log(error);
    }
}

export default CreatePostSlice.reducer;
export const {create, fetchApi, update , Delete , like}= CreatePostSlice.actions;

