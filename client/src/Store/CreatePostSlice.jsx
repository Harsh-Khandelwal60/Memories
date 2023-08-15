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
            
            return state.map((post) => action.payload.id===post.id ? action.payload:post );
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

export const createPosts  = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post)
        dispatch(create(data));
    } catch (error) {
        console.log(error);
    }
}

export const updatePosts = (id,postData) => async (dispatch) => {
        try {
            const { data } = await api.updatePost(id,postData);
            dispatch(update({id,data}));
        } catch (error) {
            console.log(error.message);
        }
}

export default CreatePostSlice.reducer;
export const {create, fetchApi, update}= CreatePostSlice.actions;

