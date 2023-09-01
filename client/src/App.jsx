import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route ,Navigate } from 'react-router-dom';
import {  GoogleOAuthProvider  } from '@react-oauth/google';
import Home from './components/Home/Home';
import Navbar from './components/NavBar/Navbar';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  let [user , setUser] = useState(null);

    useEffect(() => {
      if(user){
        setUser(JSON.parse(localStorage.getItem(`profile`)))
      }
    },[user])

    

   return (
    <BrowserRouter>
    <GoogleOAuthProvider clientId="441732350372-gvjcd2i4bdfpfcghhapqds0715thnbhk.apps.googleusercontent.com" >
       <Container maxWidth="lg">
           <Navbar />
           <Routes>
               <Route path="/" exact element={<Navigate to = "/posts"/>} />
               <Route path='/posts' exact element={<Home/>}/>
               <Route path='/posts/search' exact element={<Home/>}/>
               <Route path='/posts/:id' exact element={<PostDetails/>}/>
               <Route path="/auth" exact element={ !user ? <Auth/> : <Navigate to="/posts"/>} />
               <Route path="*" exact element={ !user ? <Auth/> : <Navigate to="/posts"/>} />
           </Routes>
         </Container>
      </GoogleOAuthProvider>
    </BrowserRouter>
   )
 
};

export default App;

// 1035523181687-d5agul9utuplosu60q73pdicertnqimp.apps.googleusercontent.com