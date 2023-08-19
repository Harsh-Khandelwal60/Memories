import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {  GoogleOAuthProvider  } from '@react-oauth/google';
import Home from './components/Home/Home';
import Navbar from './components/NavBar/Navbar';
import Auth from './components/Auth/Auth';

const App = () => (
  <BrowserRouter>
     <GoogleOAuthProvider clientId="441732350372-gvjcd2i4bdfpfcghhapqds0715thnbhk.apps.googleusercontent.com">
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