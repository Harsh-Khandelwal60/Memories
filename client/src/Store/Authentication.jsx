import { createSlice } from "@reduxjs/toolkit";
import * as api from '../api/index.jsx';


const Authentication = createSlice({
    name : "Authentication",
    initialState : [],
    reducers : {
        AUTH(state , action) {
            localStorage.setItem('profile' , JSON.stringify({...action?.payload}))
            return [ ...state , action.payload]
        }
    }
})

export const signIn = (formData , Navigate) => async (dispatch) => {
    try {
        
        const { data } = await api.signIn(formData);
        console.log(data);
        dispatch(AUTH(data));
        Navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signUp = (formData , Navigate) => async (dispatch) => {
    try {
        console.log(formData);
                
        const { data } = await api.signUp(formData);

        console.log(data);

        dispatch(AUTH(data));

        Navigate('/');
    } catch (error) {
        console.log(error.response);
    }
}

export default Authentication.reducer;
export const { AUTH } = Authentication.actions;
