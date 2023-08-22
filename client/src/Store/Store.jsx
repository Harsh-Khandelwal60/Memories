import { configureStore } from "@reduxjs/toolkit";
import CreatePostSlice from "./CreatePostSlice";
import Authorization from "./Authorization";
import Authentication from "./Authentication";

const store = configureStore({
    reducer:{
        Post :CreatePostSlice,
        Authorization : Authorization,
        Authentication : Authentication,
    },
});

export default store;