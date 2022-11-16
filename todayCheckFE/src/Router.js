import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import Navigation from './components/Navigation';

//components
import Home from './pages/Home';
import Mypage from './pages/Mypage';
import Posting from './pages/Posting';

const Router = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/posting" element={<Posting />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/login/*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
