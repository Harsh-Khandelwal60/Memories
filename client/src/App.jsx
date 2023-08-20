import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {  GoogleOAuthProvider  } from '@react-oauth/google';
import Home from './components/Home/Home';
import Navbar from './components/NavBar/Navbar';
import Auth from './components/Auth/Auth';

const App = () => (
  <BrowserRouter>
     <GoogleOAuthProvider clientId="1035523181687-d5agul9utuplosu60q73pdicertnqimp.apps.googleusercontent.com" >
        <Container maxWidth="lg">
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Home/>} />
                <Route path="/auth" exact element={<Auth/>} />
            </Routes>
        </Container>
    </GoogleOAuthProvider>
  </BrowserRouter>
);

export default App;

// 1035523181687-d5agul9utuplosu60q73pdicertnqimp.apps.googleusercontent.com