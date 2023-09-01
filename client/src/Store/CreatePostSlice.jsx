import { createSlice  } from "@reduxjs/toolkit";
import * as api from '../api/index';


const CreatePostSlice = createSlice({
    name:"Post",
    initialState:{ 
        isLoading: true, 
        posts: []
     },
    reducers:{
        create(state,action) {
            return { ...state, posts: [...state.posts, action.payload] };
        },
        fetchApi(state,action){
            return {
                ...state ,
                posts : action.payload.data,
                currentPage : action.payload.currentPage,
                numberOfPages : action.payload.numberOfPages
            }
        },
        fetchPost(state,action){
            return { ...state, post: action.payload };
        }, 
        update(state,action){
            return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        },
        Delete(state,action) {
            return  { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        },
        like(state,action) {
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        }, 
        fetchPostsBySearch(state , action) {
            return { ...state, posts: action.payload };
        },
        startLoading(state) {
            state.isLoading = true;
        },
        stopLoading(state) {
            state.isLoading = false;
        },
        comment(state,action) {
           return {
                ...state , 
                posts : state.posts.map((post) => {
                    if(post._id === action.payload._id) {
                        return action.payload;
                    } 
                    return post;
                })
           }
        }
    },
})

export const getPost = (id) => {
    return async function getPostsThunk(dispatch) {
        try {
            
            dispatch(startLoading());
            const {data} = await api.fetchPost(id);


            console.log(data);
            dispatch(fetchPost(data));
        } catch (error) {
            console.error('Error fetching products:', error);
        }finally {
            dispatch(stopLoading()); // Stop loading after API call is done (whether success or error)
        }
    };
};
export const getPosts = (page) => {
    return async function getPostsThunk(dispatch) {
        try {
            // console.log(`enter`);
            dispatch(startLoading());
            const {data} = await api.fetchPosts(page);

            dispatch(fetchApi(data));

            // console.log(data);
           
        } catch (error) {
            console.error('Error fetching products:', error);
        }finally {
            dispatch(stopLoading()); // Stop loading after API call is done (whether success or error)
        }
    };
};


export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        console.log(searchQuery);
        const {data : {data}} = await api.fetchPostsBySearch(searchQuery);
        
        // console.log(data);

        dispatch(fetchPostsBySearch(data));
       
    } catch (error) {
        console.log(error);
    }
}

export const createPosts  = (post , Navigate) => async (dispatch) => {
    try {
       
        const {data} = await api.createPost(post)

        dispatch(create(data));

        Navigate(`${data._id}`);

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

export const commentPosts = ( value , id) => async (dispatch) => {
    try {
         const {data} = await api.comment(value , id);

         dispatch(comment(data));

         return data.comments;

    } catch (error) {
        
    }
}

export default CreatePostSlice.reducer;
export const {create, fetchApi, update , Delete , like , fetchPostsBySearch , startLoading , stopLoading , fetchPost , comment}= CreatePostSlice.actions;

