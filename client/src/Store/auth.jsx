import { createSlice } from "@reduxjs/toolkit";
import * as api from '../api/index';

export const signIn = (data) => async (dispatch) => {
    const {formData , Navigate} = data;
    try {
        //login the user...

        Navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signUp = (data) => async (dispatch) => {
    const {formData , Navigate} = data;
    try {
        //sign Up the user...

        Navigate('/');
    } catch (error) {
        console.log(error);
    }
}
