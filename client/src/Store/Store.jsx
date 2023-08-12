import { configureStore } from "@reduxjs/toolkit";
import CreatePostSlice from "./CreatePostSlice";

const store = configureStore({
    reducer:{
        Post :CreatePostSlice,
    },
});

export default store;