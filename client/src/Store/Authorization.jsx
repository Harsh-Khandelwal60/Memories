import { createSlice  } from "@reduxjs/toolkit";



const Authorization = createSlice({
    name:"authorization",
    initialState: {
        authData : null
    },
    reducers:{
        Auth2(state , action){
            console.log(action.payload);
            localStorage.setItem('profile' , JSON.stringify({...action?.payload}))
            return {...state , authData: action?.payload}
        }
    }
});




export default Authorization.reducer
export const {Auth2} = Authorization.actions;