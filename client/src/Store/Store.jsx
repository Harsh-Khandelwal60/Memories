import { configureStore } from "@reduxjs/toolkit";
import CreatePostSlice from "./CreatePostSlice";
import Authorization from "./Authorization";

const store = configureStore({
    reducer:{
        Post :CreatePostSlice,
        Authorization : Authorization,
    },
});

export default store;