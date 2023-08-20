import { createSlice  } from "@reduxjs/toolkit";



const Authorization = createSlice({
    name:"Authorization",
    initialState: {
        authData : null
    },
    reducers : {
        Auth2(state , action){
            console.log(action.payload);
            localStorage.setItem('profile' , JSON.stringify({...action?.payload}))
            return {...state , authData: action?.payload}
        },
        logout2(state , action) {
            localStorage.clear();
            return { authData : null};
        },
    },
});




export default Authorization.reducer;
export const {Auth2 , logout2} = Authorization.actions;