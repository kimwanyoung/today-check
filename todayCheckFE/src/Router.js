import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import Navigation from './components/Navigation';

//components
import Home from './pages/Home';
import Mypage from './pages/Mypage';
import Posting from './pages/Posting';
import LoginCallback from './pages/LoginPage/LoginCallback';
import NaverLoginCallback from './pages/LoginPage/NaverLoginCallback';

const Router = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/posting" element={<Posting />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="/login/navercallback" element={<NaverLoginCallback />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
