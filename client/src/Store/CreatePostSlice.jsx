import { createSlice  } from "@reduxjs/toolkit";
import * as api from '../api/index';

const CreatePostSlice = createSlice({
    name:"Post",
    initialState:[],
    reducers:{
        createPosts(state,action) {

        },
        fetchApi(state,action){
            return  action.payload;
        }
    },
})
export const getPosts = () => {
    return async function getProductsThunk(dispatch, getState) {
        try {
            const {data} = await api.fetchPosts();
            dispatch(fetchApi(data));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
};

export default CreatePostSlice.reducer;
export const {createPosts , fetchApi}= CreatePostSlice.actions;

